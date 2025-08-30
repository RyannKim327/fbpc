import { readdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const api: Record<string, any> = {};

for (const file of readdirSync(__dirname)) {
  if (file.endsWith(".ts") && !file.endsWith("index.ts")) {
    const name = file.replace(/\.ts$/i, "");
    const mod = await import(pathToFileURL(join(__dirname, file)).href);
    api[name] = mod.default;
  }
}

export default api;
