export function wait<T>(getter: () => T | undefined | null, timeout = 10000): Promise<T> {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const interval = setInterval(() => {
      const value = getter();
      if (value) {
        clearInterval(interval);
        resolve(value);
      } else if (Date.now() - start > timeout) {
        clearInterval(interval);
        reject(new Error("wait() timed out"));
      }
    }, 100);
  });
}
