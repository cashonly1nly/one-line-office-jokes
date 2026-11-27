import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// one-line-office-jokes — a single line that makes office life funny:
// the passive-aggressive "per my last email", taken one step too far.
// Entry (152 chars): I started every email with 'per my last email'
// until IT flagged me as a phishing risk, which honestly felt like the
// first promotion I'd earned in years.
// The joke turns on a real office detail — "per my last email", the
// classic passive-aggressive opener — and lands the laugh in the last
// few words: being flagged as a phishing risk by IT feels like a
// promotion, the first one in years. No setup paragraph, one reading,
// fresh wording.
// Deterministic: the same line every run, no randomness, no network.
const ENTRY_LINE =
  "I started every email with 'per my last email' until IT flagged me as a phishing risk, which honestly felt like the first promotion I'd earned in years.";

// Guard: the entry must stay a single line within 1 to 199 characters,
// and not only white space (the gate refuses a white-space-only entry).
if (
  ENTRY_LINE.length < 1 ||
  ENTRY_LINE.length > 199 ||
  ENTRY_LINE.includes("\n") ||
  ENTRY_LINE.trim().length === 0
) {
  throw new Error("entry line must be one line of 1 to 199 characters");
}

const outDir = process.argv[2] ?? process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY_LINE + "\n", "utf8");

// Guard the artifact the gate actually reads, not just the constant:
// the file carries the line plus one trailing newline, so it must still
// be within 1 to 199 characters once written.
const written = readFileSync(outPath, "utf8");
if (written.length < 1 || written.length > 199) {
  throw new Error("written entry.txt must be 1 to 199 characters");
}
