import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const requiredFiles = [
  "HANDOFF.md",
  "AGENTS.md",
  "ARCHITECTURE.md",
  "README.md",
  "docs/PROJECT_STATE.md",
  "docs/CONTEXT_MAP.md",
  "docs/PLANS.md",
  "docs/PRODUCT_SENSE.md",
  "docs/FRONTEND.md",
  "docs/RELIABILITY.md",
  "docs/SECURITY.md",
  "docs/generated/project-dsl-schema.md",
  ".github/workflows/ci.yml",
  ".github/pull_request_template.md",
];

const requiredScripts = [
  "dev",
  "lint",
  "typecheck",
  "test",
  "test:e2e",
  "build",
  "harness:check",
  "handoff:check",
];

const failures = [];

for (const file of requiredFiles) {
  if (!existsSync(file)) {
    failures.push(`Missing required handoff file: ${file}`);
  }
}

const activePlansDirectory = "docs/exec-plans/active";
const activePlans = existsSync(activePlansDirectory)
  ? readdirSync(activePlansDirectory).filter((file) => file.endsWith(".md"))
  : [];

if (activePlans.length !== 1) {
  failures.push(`Expected exactly one active exec plan, found ${activePlans.length}.`);
}

const packageJson = JSON.parse(readFileSync("package.json", "utf8"));

for (const script of requiredScripts) {
  if (!packageJson.scripts?.[script]) {
    failures.push(`Missing package script: ${script}`);
  }
}

const handoffText = readFileSync("HANDOFF.md", "utf8");
const activePlanPath = activePlans[0] ? join(activePlansDirectory, activePlans[0]) : "";

if (activePlanPath && !handoffText.includes(activePlanPath)) {
  failures.push(`HANDOFF.md does not mention active plan: ${activePlanPath}`);
}

if (failures.length > 0) {
  console.error("Handoff verification failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Handoff verification passed.");
