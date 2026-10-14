import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

const root = path.resolve(import.meta.dirname, "..");
const temp = fs.mkdtempSync(path.join(os.tmpdir(), "agent-build-system-"));
try {
  const dry = spawnSync(process.execPath, [path.join(root, "scripts/install.mjs"), "--scope", "project", "--target", temp, "--profile", "spark"], { encoding: "utf8" });
  if (dry.status !== 0) throw new Error(dry.stderr || dry.stdout);
  if (fs.readdirSync(temp).length !== 0) throw new Error("Dry run changed the target directory");

  const applied = spawnSync(process.execPath, [path.join(root, "scripts/install.mjs"), "--scope", "project", "--target", temp, "--profile", "spark", "--apply"], { encoding: "utf8" });
  if (applied.status !== 0) throw new Error(applied.stderr || applied.stdout);
  for (const expected of [
    ".agents/skills/product-interview/SKILL.md",
    ".claude/skills/product-interview/SKILL.md",
    ".agent-build-system.json", "STACK.md", "DESIGN.md", "AGENTS.md", "CLAUDE.md"
  ]) {
    if (!fs.existsSync(path.join(temp, expected))) throw new Error(`Missing installed file: ${expected}`);
  }
  console.log("Installer dry-run and Spark-profile tests passed.");
} finally {
  fs.rmSync(temp, { recursive: true, force: true });
}
