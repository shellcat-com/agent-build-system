import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = path.resolve(import.meta.dirname, "..");
const required = [
  "README.md", "LICENSE", "AGENTS.md", "docs/SKILL_SOURCES.md",
  "profiles/spark/STACK.md", "profiles/spark/DESIGN.md",
  "integrations/mobbin/README.md", "integrations/mobbin/mcp.example.json"
];
const missing = required.filter((item) => !fs.existsSync(path.join(root, item)));
if (missing.length) {
  console.error(`Missing required files:\n${missing.join("\n")}`);
  process.exit(1);
}

const trackedText = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if ([".git", "node_modules"].includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (/\.(md|json|mjs)$/.test(entry.name)) trackedText.push(full);
  }
}
walk(root);
const forbiddenParts = [
  "gh" + "o_[A-Za-z0-9]+",
  "s" + "k-[A-Za-z0-9]{20,}",
  "MOBBIN_AUTH_" + "COOKIE",
  "BEGIN (RSA|OPENSSH) PRIVATE KEY"
];
const forbidden = new RegExp(forbiddenParts.join("|"));
for (const file of trackedText) {
  if (forbidden.test(fs.readFileSync(file, "utf8"))) {
    console.error(`Possible secret in ${path.relative(root, file)}`);
    process.exit(1);
  }
}
console.log(`Checked ${trackedText.length} text files and required links.`);
