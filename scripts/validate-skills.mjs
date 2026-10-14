import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = path.resolve(import.meta.dirname, "..");
const skillRoots = [path.join(root, "skills"), path.join(root, "profiles", "spark", "skills")];
let count = 0;
const errors = [];

for (const base of skillRoots) {
  if (!fs.existsSync(base)) continue;
  for (const entry of fs.readdirSync(base, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const file = path.join(base, entry.name, "SKILL.md");
    if (!fs.existsSync(file)) {
      errors.push(`Missing SKILL.md: ${path.relative(root, file)}`);
      continue;
    }
    const source = fs.readFileSync(file, "utf8");
    const match = source.match(/^---\n([\s\S]*?)\n---\n/);
    if (!match) {
      errors.push(`Missing YAML frontmatter: ${path.relative(root, file)}`);
      continue;
    }
    const name = match[1].match(/^name:\s*(.+)$/m)?.[1]?.trim();
    const description = match[1].match(/^description:\s*(.+)$/m)?.[1]?.trim();
    if (name !== entry.name) errors.push(`Name/folder mismatch: ${entry.name} vs ${name ?? "missing"}`);
    if (!name?.match(/^[a-z0-9-]+$/)) errors.push(`Invalid name: ${name ?? "missing"}`);
    if (!description) errors.push(`Missing description: ${path.relative(root, file)}`);
    if (/TODO|PLACEHOLDER|<skill-name>/i.test(source)) errors.push(`Unfinished scaffold: ${path.relative(root, file)}`);
    count += 1;
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(`Validated ${count} skills.`);
