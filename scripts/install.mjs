import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";

const sourceRoot = path.resolve(import.meta.dirname, "..");
const args = process.argv.slice(2);
const value = (flag, fallback) => {
  const index = args.indexOf(flag);
  return index >= 0 ? args[index + 1] : fallback;
};
const scope = value("--scope", "project");
const profile = value("--profile", "generic");
const apply = args.includes("--apply");
const target = scope === "user" ? os.homedir() : path.resolve(value("--target", process.cwd()));

if (!new Set(["project", "user"]).has(scope)) throw new Error("--scope must be project or user");
if (!new Set(["generic", "spark"]).has(profile)) throw new Error("--profile must be generic or spark");
if (scope === "project" && target === path.parse(target).root) throw new Error("Refusing to install into filesystem root");

const operations = [];
const skillsTarget = scope === "user" ? path.join(target, ".agents", "skills") : path.join(target, ".agents", "skills");
const claudeTarget = path.join(target, ".claude", "skills");
const codexTarget = path.join(target, ".codex", "skills");

function planCopyDir(from, to) {
  operations.push({ type: "copy-dir", from, to });
}
function planCopyFile(from, to) {
  operations.push({ type: "copy-file", from, to });
}
function planAppend(from, to, marker) {
  operations.push({ type: "append", from, to, marker });
}
function planLink(to, targetPath) {
  operations.push({ type: "link", to, targetPath });
}

for (const entry of fs.readdirSync(path.join(sourceRoot, "skills"), { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const dest = path.join(skillsTarget, entry.name);
  planCopyDir(path.join(sourceRoot, "skills", entry.name), dest);
  const relative = path.relative(claudeTarget, dest);
  planLink(path.join(claudeTarget, entry.name), relative);
  if (scope === "user") planLink(path.join(codexTarget, entry.name), path.relative(codexTarget, dest));
}

if (profile === "spark") {
  const profileRoot = path.join(sourceRoot, "profiles", "spark");
  for (const entry of fs.readdirSync(path.join(profileRoot, "skills"), { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const dest = path.join(skillsTarget, entry.name);
    planCopyDir(path.join(profileRoot, "skills", entry.name), dest);
    planLink(path.join(claudeTarget, entry.name), path.relative(claudeTarget, dest));
    if (scope === "user") planLink(path.join(codexTarget, entry.name), path.relative(codexTarget, dest));
  }
  if (scope === "project") {
    planCopyFile(path.join(profileRoot, "STACK.md"), path.join(target, "STACK.md"));
    planCopyFile(path.join(profileRoot, "DESIGN.md"), path.join(target, "DESIGN.md"));
    planCopyFile(path.join(profileRoot, "project-config.json"), path.join(target, ".agent-build-system.json"));
    planAppend(path.join(profileRoot, "AGENTS.addendum.md"), path.join(target, "AGENTS.md"), "# Spark agent workflow");
    planAppend(path.join(profileRoot, "CLAUDE.addendum.md"), path.join(target, "CLAUDE.md"), "## Spark reusable workflow");
  }
} else if (scope === "project") {
  planCopyFile(path.join(sourceRoot, "profiles", "generic", "project-config.example.json"), path.join(target, ".agent-build-system.json"));
  planAppend(path.join(sourceRoot, "profiles", "generic", "AGENTS.addendum.md"), path.join(target, "AGENTS.md"), "# Agent Build System");
}

function describe(op) {
  return `${op.type.padEnd(9)} ${path.relative(target, op.to) || op.to}`;
}
console.log(`${apply ? "Applying" : "Dry run"} ${operations.length} operations to ${target}`);
for (const op of operations) console.log(describe(op));
if (!apply) {
  console.log("No files changed. Re-run with --apply to install.");
  process.exit(0);
}

function backupIfNeeded(dest) {
  if (!fs.existsSync(dest)) return;
  const backup = `${dest}.agent-build-system.bak`;
  if (!fs.existsSync(backup)) fs.cpSync(dest, backup, { recursive: true });
}

for (const op of operations) {
  fs.mkdirSync(path.dirname(op.to), { recursive: true });
  if (op.type === "copy-dir") {
    if (fs.existsSync(op.to)) backupIfNeeded(op.to);
    fs.cpSync(op.from, op.to, { recursive: true, force: true });
  } else if (op.type === "copy-file") {
    if (fs.existsSync(op.to) && fs.readFileSync(op.to, "utf8") !== fs.readFileSync(op.from, "utf8")) backupIfNeeded(op.to);
    fs.copyFileSync(op.from, op.to);
  } else if (op.type === "append") {
    const addition = fs.readFileSync(op.from, "utf8").trim();
    const current = fs.existsSync(op.to) ? fs.readFileSync(op.to, "utf8") : "";
    if (!current.includes(op.marker)) fs.appendFileSync(op.to, `${current.trim() ? "\n\n" : ""}${addition}\n`);
  } else if (op.type === "link") {
    if (fs.existsSync(op.to) || fs.lstatSync(path.dirname(op.to), { throwIfNoEntry: false })?.isSymbolicLink()) {
      const stat = fs.lstatSync(op.to, { throwIfNoEntry: false });
      if (stat?.isSymbolicLink() && fs.readlinkSync(op.to) === op.targetPath) continue;
      backupIfNeeded(op.to);
      fs.rmSync(op.to, { recursive: true, force: true });
    }
    try {
      fs.symlinkSync(op.targetPath, op.to, process.platform === "win32" ? "junction" : "dir");
    } catch {
      const resolved = path.resolve(path.dirname(op.to), op.targetPath);
      fs.cpSync(resolved, op.to, { recursive: true });
    }
  }
}
console.log("Installation complete. Review changes before committing.");
