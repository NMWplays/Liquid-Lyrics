type Primitive = string | number | boolean | null;
type Unpacked = Primitive | Unpacked[] | { [key: string]: Unpacked };

const LIMITS = {
  depth: 512,
  arrayLength: 1 << 20,
  objectKeys: 1 << 16,
  streamLength: 1 << 24,
  valuesLength: 1 << 22,
  decodeOps: 1 << 22,
} as const;

const FORBIDDEN_KEYS = new Set(["__proto__", "constructor", "prototype"]);

export function isPackedPayload(value: unknown): value is [unknown[], unknown[]] {
  return Array.isArray(value) && value.length === 2 && Array.isArray(value[0]) && Array.isArray(value[1]);
}

export function unpackSpicyPayload(packed: [unknown[], unknown[]]): Unpacked {
  const valuesRaw = packed[0];
  const stream = packed[1];

  if (valuesRaw.length > LIMITS.valuesLength) throw new Error("SLObjPack: valuesList exceeds limit");
  if (stream.length > LIMITS.streamLength) throw new Error("SLObjPack: stream exceeds limit");

  for (let i = 0; i < valuesRaw.length; i++) {
    const value = valuesRaw[i];
    if (value === null) continue;
    const type = typeof value;
    if (type === "string" || type === "boolean") continue;
    if (type === "number" && Number.isFinite(value)) continue;
    throw new Error(`SLObjPack: invalid value at ${i}`);
  }
  const values = valuesRaw as Primitive[];

  let cursor = 0;

  const readStream = (): unknown => {
    if (cursor >= stream.length) throw new Error("SLObjPack: unexpected end of stream");
    return stream[cursor++];
  };

  const resolvePointer = (ptr: unknown): Primitive => {
    if (typeof ptr !== "number" || !Number.isInteger(ptr) || ptr < 0 || ptr >= values.length) {
      throw new Error(`SLObjPack: invalid value pointer ${ptr}`);
    }
    return values[ptr];
  };

  const readKey = (): string => {
    const key = resolvePointer(readStream());
    if (typeof key !== "string") throw new Error("SLObjPack: keys must be strings");
    if (FORBIDDEN_KEYS.has(key)) throw new Error(`SLObjPack: forbidden key ${key}`);
    return key;
  };

  const safeSet = (obj: Record<string, Unpacked>, key: string, value: Unpacked): void => {
    Object.defineProperty(obj, key, { value, writable: true, enumerable: true, configurable: true });
  };

  const validateCount = (n: unknown, max: number, label: string): number => {
    if (typeof n !== "number" || !Number.isInteger(n) || n < 0 || n > max) {
      throw new Error(`SLObjPack: invalid ${label} count ${n}`);
    }
    return n;
  };

  const requireStream = (min: number, label: string): void => {
    if (min > stream.length - cursor) throw new Error(`SLObjPack: ${label} exceeds remaining stream`);
  };

  const decode = (depth: number): Unpacked => {
    if (depth > LIMITS.depth) throw new Error("SLObjPack: max depth exceeded");
    const op = readStream();
    if (typeof op !== "number" || !Number.isInteger(op)) throw new Error(`SLObjPack: invalid opcode ${op}`);
    if (op >= 0) return resolvePointer(op);

    switch (op) {
      case -1: {
        const numKeys = validateCount(readStream(), LIMITS.objectKeys, "object key");
        requireStream(numKeys * 2, "object");
        const keys = new Array<string>(numKeys);
        for (let i = 0; i < numKeys; i++) keys[i] = readKey();
        const obj: Record<string, Unpacked> = {};
        for (let i = 0; i < numKeys; i++) safeSet(obj, keys[i], decode(depth + 1));
        return obj;
      }
      case -2: {
        const numItems = validateCount(readStream(), LIMITS.arrayLength, "array item");
        requireStream(numItems, "array");
        const arr = new Array<Unpacked>(numItems);
        for (let i = 0; i < numItems; i++) arr[i] = decode(depth + 1);
        return arr;
      }
      case -3: {
        const numItems = validateCount(readStream(), LIMITS.arrayLength, "schema array item");
        const numKeys = validateCount(readStream(), LIMITS.objectKeys, "schema key");
        if (numItems * numKeys > LIMITS.decodeOps) throw new Error("SLObjPack: schema array budget exceeded");
        requireStream(numKeys + numItems * numKeys, "schema array");
        const keys = new Array<string>(numKeys);
        for (let i = 0; i < numKeys; i++) keys[i] = readKey();
        const arr = new Array<Unpacked>(numItems);
        for (let i = 0; i < numItems; i++) {
          const obj: Record<string, Unpacked> = {};
          for (let k = 0; k < numKeys; k++) safeSet(obj, keys[k], decode(depth + 1));
          arr[i] = obj;
        }
        return arr;
      }
      case -4:
        return [];
      case -5:
        return [decode(depth + 1)];
      case -6:
        return {};
      default:
        throw new Error(`SLObjPack: unknown opcode ${op}`);
    }
  };

  const result = decode(0);
  if (cursor !== stream.length) throw new Error("SLObjPack: extra data after decoding");
  return result;
}
