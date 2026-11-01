import esbuild from "esbuild";
import path from "path";
import os from "os";
import { fileURLToPath } from "url";
import { copyFileSync, mkdirSync } from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isWatch = process.argv.includes("--watch");
const isDeploy = process.argv.includes("--deploy");

const buildOptions = {
  entryPoints: [path.resolve(__dirname, "src/app.ts")],
  bundle: true,
  outfile: path.resolve(__dirname, "dist/liquid-lyrics.js"),
  format: "iife",
  globalName: "LiquidLyrics",
  platform: "browser",
  target: "es2020",
  alias: {
    "@": path.resolve(__dirname, "src"),
  },
  loader: {
    ".css": "text",
    ".svg": "text",
  },
  define: {
    "process.env.NODE_ENV": '"production"',
    // aromanize reads document.currentScript, which is null for an injected script.
    AROMANIZE_EXTEND_STRING: "false",
  },
  banner: {
    js: "// Liquid Lyrics - SpotiKit extension",
  },
  minify: !isWatch,
};

function spotikitConfigDir() {
  if (process.platform === "win32") {
    const roaming = process.env.APPDATA || path.join(os.homedir(), "AppData", "Roaming");
    return path.join(roaming, "SpotiKit");
  }
  const xdg = process.env.XDG_CONFIG_HOME || path.join(os.homedir(), ".config");
  return path.join(xdg, "SpotiKit");
}

function deployToSpotiKit() {
  const destDir = path.join(spotikitConfigDir(), "Extensions", "Liquid Lyrics");
  mkdirSync(destDir, { recursive: true });
  copyFileSync(buildOptions.outfile, path.join(destDir, path.basename(buildOptions.outfile)));
  copyFileSync(path.resolve(__dirname, "spotikit.json"), path.join(destDir, "spotikit.json"));
  console.log(`Deployed to: ${destDir}`);
}

if (isWatch) {
  const ctx = await esbuild.context(buildOptions);
  await ctx.watch();
  console.log("Watching for changes...");
} else {
  await esbuild.build(buildOptions);
  console.log("Build complete: dist/liquid-lyrics.js");
  if (isDeploy) deployToSpotiKit();
}
