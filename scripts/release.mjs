// scripts/release.mjs
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { execSync } from "node:child_process";

function getArgValue(flag) {
  const idx = process.argv.indexOf(flag);
  if (idx === -1) return null;
  const val = process.argv[idx + 1];
  if (!val || val.startsWith("--")) return null;
  return val;
}

function readJsonFile(filepath) {
  const abs = path.isAbsolute(filepath)
    ? filepath
    : path.join(process.cwd(), filepath);
  const raw = fs.readFileSync(abs, "utf8");
  return JSON.parse(raw);
}

function getGitShaShort() {
  try {
    return execSync("git rev-parse --short HEAD", {
      stdio: ["ignore", "pipe", "ignore"],
    })
      .toString()
      .trim();
  } catch {
    return null;
  }
}

function assertReleasePayload(payload) {
  const errors = [];

  if (!payload || typeof payload !== "object")
    errors.push("Payload must be a JSON object.");

  if (!payload.version || typeof payload.version !== "string") {
    errors.push('Missing required field "version" (string).');
  }

  if (payload.notes != null && typeof payload.notes !== "string") {
    errors.push('"notes" must be a string if provided.');
  }

  if (!Array.isArray(payload.items) || payload.items.length === 0) {
    errors.push('Missing required field "items" (non-empty array).');
  } else {
    for (let i = 0; i < payload.items.length; i++) {
      const item = payload.items[i];
      if (!item || typeof item !== "object") {
        errors.push(`items[${i}] must be an object.`);
        continue;
      }
      if (!item.componentKey || typeof item.componentKey !== "string") {
        errors.push(`items[${i}].componentKey is required (string).`);
      }
      if (!item.changeType || typeof item.changeType !== "string") {
        errors.push(`items[${i}].changeType is required (string).`);
      }
      if (!item.note || typeof item.note !== "string") {
        errors.push(`items[${i}].note is required (string).`);
      }
    }
  }

  if (errors.length) {
    const msg = errors.map((e) => `- ${e}`).join("\n");
    throw new Error(`Invalid release JSON:\n${msg}`);
  }
}

async function main() {
  const file = getArgValue("--file") || getArgValue("-f");
  const version = getArgValue("--version") || getArgValue("-v");

  let resolvedFile = file;
  if (!resolvedFile && version) {
    resolvedFile = `release-notes/${version}.json`;
  }

  if (!resolvedFile) {
    console.error(
      "Usage: node scripts/release.mjs --version 1.1.0\n       node scripts/release.mjs --file release-notes/1.1.0.json"
    );
    process.exit(2);
  }

  const apiBase = process.env.NOOK_API_BASE_URL || "http://localhost:8001";
  const url = `${apiBase.replace(/\/$/, "")}/releases`;

  const payload = readJsonFile(resolvedFile);

  // Fill commit sha automatically if missing (use camelCase to match API schema)
  if (!payload.commitSha) {
    const sha = getGitShaShort();
    if (sha) payload.commitSha = sha;
  }

  assertReleasePayload(payload);

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const text = await res.text();
  let body = null;
  try {
    body = text ? JSON.parse(text) : null;
  } catch {
    body = text;
  }

  if (!res.ok) {
    console.error("Release failed: %s %s", res.status, res.statusText);

    if (body && typeof body === "object") {
      const detail = body.detail;

      if (detail && typeof detail === "object") {
        if (detail.message) console.error("Error: %s", detail.message);
        if (Array.isArray(detail.missing_keys) && detail.missing_keys.length) {
          console.error("Missing component keys:");
          for (const k of detail.missing_keys) console.error("  - %s", k);
        }
      } else if (typeof detail === "string") {
        console.error("Detail: %s", detail);
      }

      if (body.errors)
        console.error("Errors: %s", JSON.stringify(body.errors));
    } else if (body) {
      console.error("%s", body);
    }

    process.exit(1);
  }

  console.log("Release created: %s", payload.version);
  if (body)
    console.log(
      "%s",
      typeof body === "string" ? body : JSON.stringify(body, null, 2)
    );
}

main().catch((err) => {
  console.error("Release script error: %s", err?.message || String(err));
  process.exit(1);
});
