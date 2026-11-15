import esbuild from "esbuild";
import path from "path";
import os from "os";
import { fileURLToPath } from "url";
import { copyFileSync, mkdirSync } from "fs";
import { addonOptions } from "./scripts/lifecycle.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isWatch = process.argv.includes("--watch");
const isDeploy = process.argv.includes("--deploy");

const outfile = path.resolve(__dirname, "dist/liquid-lyrics.js");

const buildOptions = addonOptions({
  entry: path.resolve(__dirname, "src/app.ts"),
  outfile,
  runtime: path.resolve(__dirname, "src/lifecycle/runtime.ts"),
  globals: /^(__liquidLyrics|liquidLyrics)|^(__ll|LiquidLyrics|lenis|lenisVersion)$/,
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
    AROMANIZE_EXTEND_STRING: "false",
  },
  minify: !isWatch,
});

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
  copyFileSync(outfile, path.join(destDir, path.basename(outfile)));
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
