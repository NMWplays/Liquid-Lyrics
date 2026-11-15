import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import ts from "typescript";

const TIMERS = [
  "setTimeout",
  "clearTimeout",
  "setInterval",
  "clearInterval",
  "requestAnimationFrame",
  "cancelAnimationFrame",
  "requestIdleCallback",
  "cancelIdleCallback",
  "MutationObserver",
  "ResizeObserver",
  "IntersectionObserver",
];

export const lifecycleDefine = Object.fromEntries([
  ...TIMERS.flatMap((name) => [
    [name, `__lq.${name}`],
    [`window.${name}`, `__lq.${name}`],
  ]),
  ["document.createElement", "__lq.createElement"],
  ["document.createElementNS", "__lq.createElementNS"],
]);

const TRIGGER = /addEventListener|style|Property|classList|Attribute|dataset|hidden|inert|animate|innerHTML|cloneNode/;
const CLASS_METHODS = new Set(["add", "toggle"]);
const ATTR_METHODS = new Set(["setAttribute", "removeAttribute", "toggleAttribute"]);
const PROPS = new Set(["hidden", "inert"]);

function nameOf(node) {
  if (ts.isPropertyAccessExpression(node)) return node.name.text;
  if (ts.isElementAccessExpression(node) && ts.isStringLiteralLike(node.argumentExpression)) {
    return node.argumentExpression.text;
  }
  return null;
}

const isAccess = (node) => ts.isPropertyAccessExpression(node) || ts.isElementAccessExpression(node);

export function transformLifecycle(text, fileName) {
  if (!TRIGGER.test(text)) return text;
  const kind = /\.tsx$/.test(fileName)
    ? ts.ScriptKind.TSX
    : /\.ts$/.test(fileName)
      ? ts.ScriptKind.TS
      : /\.jsx$/.test(fileName)
        ? ts.ScriptKind.JSX
        : ts.ScriptKind.JS;
  const sf = ts.createSourceFile(fileName, text, ts.ScriptTarget.Latest, true, kind);
  const edits = [];
  let depth = 0;
  const open = (pos, str) => edits.push({ start: pos, end: pos, str, rank: 1, depth });
  const close = (pos, str) => edits.push({ start: pos, end: pos, str, rank: 0, depth: -depth });
  const replace = (start, end, str) => edits.push({ start, end, str, rank: 2, depth });

  const wrapCall = (node, target, helper, extra) => {
    open(target.getStart(sf), `${helper}(`);
    const args = node.arguments.length ? ", " : "";
    replace(target.end, node.arguments.pos, extra ? `, ${extra}${args}` : args);
  };

  const wrapAssign = (node, target, helper, key) => {
    const left = node.left;
    const value = node.right;
    open(target.getStart(sf), `${helper}(`);
    if (ts.isElementAccessExpression(left) && !ts.isStringLiteralLike(left.argumentExpression)) {
      replace(target.end, left.argumentExpression.getStart(sf), ", ");
      replace(left.argumentExpression.end, value.getStart(sf), ", ");
    } else {
      replace(target.end, value.getStart(sf), `, ${JSON.stringify(key)}, `);
    }
    close(value.end, ")");
  };

  const visit = (node) => {
    depth++;
    if (ts.isCallExpression(node) && isAccess(node.expression)) {
      const callee = node.expression;
      const method = nameOf(callee);
      const obj = callee.expression;
      if (method === "addEventListener") {
        wrapCall(node, obj, "__lqOn");
      } else if (method === "setProperty" || method === "removeProperty") {
        if (isAccess(obj) && nameOf(obj) === "style") {
          wrapCall(node, obj.expression, method === "setProperty" ? "__lqSetProp" : "__lqDelProp");
        } else if (method === "setProperty") {
          wrapCall(node, obj, "__lqSetPropDecl");
        }
      } else if (CLASS_METHODS.has(method) && isAccess(obj) && nameOf(obj) === "classList") {
        wrapCall(node, obj.expression, "__lqClass", JSON.stringify(method));
      } else if (method === "cloneNode") {
        wrapCall(node, obj, "__lqClone");
      } else if (method === "animate") {
        wrapCall(node, obj, "__lqAnimate");
      } else if (ATTR_METHODS.has(method)) {
        wrapCall(node, obj, "__lqAttr", JSON.stringify(method));
      }
    } else if (
      ts.isBinaryExpression(node) &&
      node.operatorToken.kind === ts.SyntaxKind.EqualsToken &&
      isAccess(node.left)
    ) {
      const left = node.left;
      const inner = left.expression;
      const key = nameOf(left);
      if (isAccess(inner) && nameOf(inner) === "style") {
        wrapAssign(node, inner.expression, "__lqStyle", key);
      } else if (isAccess(inner) && nameOf(inner) === "dataset") {
        wrapAssign(node, inner.expression, "__lqData", key);
      } else if (key === "innerHTML" && ts.isPropertyAccessExpression(left)) {
        wrapAssign(node, inner, "__lqHtml", key);
      } else if (PROPS.has(key) && ts.isPropertyAccessExpression(left)) {
        wrapAssign(node, inner, "__lqProp", key);
      }
    } else if (ts.isDeleteExpression(node) && ts.isPropertyAccessExpression(node.expression)) {
      const inner = node.expression.expression;
      if (isAccess(inner) && nameOf(inner) === "dataset") {
        replace(node.getStart(sf), inner.expression.getStart(sf), "__lqDataDel(");
        replace(inner.expression.end, node.end, `, ${JSON.stringify(node.expression.name.text)})`);
      }
    }
    ts.forEachChild(node, visit);
    depth--;
  };
  visit(sf);
  if (!edits.length) return text;

  edits.sort((a, b) => a.start - b.start || a.rank - b.rank || a.depth - b.depth);
  let out = "";
  let at = 0;
  for (const edit of edits) {
    if (edit.start < at) throw new Error(`Overlapping lifecycle edit in ${fileName} at ${edit.start}`);
    out += text.slice(at, edit.start) + edit.str;
    at = edit.end;
  }
  return out + text.slice(at);
}

function loaderOf(path) {
  if (path.endsWith(".tsx")) return "tsx";
  if (path.endsWith(".ts")) return "ts";
  if (path.endsWith(".jsx")) return "jsx";
  return "js";
}

export function lifecyclePlugin(runtime) {
  const runtimePath = resolve(runtime);
  return {
    name: "spotikit-lifecycle",
    setup(build) {
      build.onLoad({ filter: /\.[cm]?[jt]sx?$/ }, async (args) => {
        if (resolve(args.path) === runtimePath || args.path.endsWith(".d.ts")) return undefined;
        const text = await readFile(args.path, "utf8");
        return {
          contents: transformLifecycle(text, args.path),
          loader: loaderOf(args.path),
          resolveDir: dirname(args.path),
        };
      });
    },
  };
}

export function outerModule(inner) {
  return [
    `const source = ${JSON.stringify(inner)};`,
    "",
    "async function latest() {",
    "  try {",
    '    const text = await (await fetch(import.meta.url, { cache: "no-store" })).text();',
    '    const line = text.slice(0, text.indexOf("\\n"));',
    '    if (line.startsWith("const source = ") && line.endsWith(";")) return JSON.parse(line.slice(15, -1));',
    "  } catch {}",
    "  return source;",
    "}",
    "",
    "export default async function start(context) {",
    '  const code = (await latest()) + "\\n//# sourceURL=" + import.meta.url;',
    '  const url = URL.createObjectURL(new Blob([code], { type: "text/javascript" }));',
    "  let module;",
    "  try {",
    "    module = await import(url);",
    "  } finally {",
    "    URL.revokeObjectURL(url);",
    "  }",
    "  return module.run(context);",
    "}",
    "",
  ].join("\n");
}

export function addonOptions({ entry, outfile, runtime, globals, remove, plugins = [], define = {}, ...rest }) {
  const runtimePath = resolve(runtime).replace(/\\/g, "/");
  const entryPath = resolve(entry).replace(/\\/g, "/");
  const options = `{ remove: ${JSON.stringify(remove ?? null)}, globals: ${globals ? globals.toString() : "null"} }`;
  return {
    ...rest,
    stdin: {
      contents: [
        `import { lifecycle } from ${JSON.stringify(runtimePath)};`,
        `import main from ${JSON.stringify(entryPath)};`,
        `export function run(context) { return lifecycle(context, main, ${options}); }`,
      ].join("\n"),
      resolveDir: dirname(entryPath),
      sourcefile: "addon-entry.js",
      loader: "js",
    },
    bundle: true,
    format: "esm",
    write: false,
    inject: [runtime],
    define: { ...lifecycleDefine, ...define },
    plugins: [
      ...plugins,
      lifecyclePlugin(runtime),
      {
        name: "spotikit-addon-output",
        setup(build) {
          build.onEnd(async (result) => {
            if (result.errors.length || !result.outputFiles?.length) return;
            const inner = result.outputFiles.find((file) => file.path.endsWith(".js")) ?? result.outputFiles[0];
            await mkdir(dirname(resolve(outfile)), { recursive: true });
            await writeFile(outfile, outerModule(inner.text));
          });
        },
      },
    ],
    outfile,
  };
}
