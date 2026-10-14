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
const requestedSkillsTarget = path.join(target, ".agents", "skills");
const skillsTarget = scope === "user" && fs.existsSync(requestedSkillsTarget)
  ? fs.realpathSync(requestedSkillsTarget)
  : requestedSkillsTarget;
const claudeTarget = path.join(target, ".claude", "skills");
const codexTarget = path.join(target, ".codex", "skills");

function resolvesToSameDirectory(left, right) {
  if (!fs.existsSync(left) || !fs.existsSync(right)) return false;
  return fs.realpathSync(left) === fs.realpathSync(right);
}

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
  if (!resolvesToSameDirectory(claudeTarget, skillsTarget)) {
    planLink(path.join(claudeTarget, entry.name), path.relative(claudeTarget, dest));
  }
  if (scope === "user" && !resolvesToSameDirectory(codexTarget, skillsTarget)) {
    planLink(path.join(codexTarget, entry.name), path.relative(codexTarget, dest));
  }
}

if (profile === "spark") {
  const profileRoot = path.join(sourceRoot, "profiles", "spark");
  for (const entry of fs.readdirSync(path.join(profileRoot, "skills"), { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const dest = path.join(skillsTarget, entry.name);
    planCopyDir(path.join(profileRoot, "skills", entry.name), dest);
    if (!resolvesToSameDirectory(claudeTarget, skillsTarget)) {
      planLink(path.join(claudeTarget, entry.name), path.relative(claudeTarget, dest));
    }
    if (scope === "user" && !resolvesToSameDirectory(codexTarget, skillsTarget)) {
      planLink(path.join(codexTarget, entry.name), path.relative(codexTarget, dest));
    }
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
