// SPDX-License-Identifier: MIT
// Seventeen Syllables of Debugging — a program that writes one haiku about
// debugging to /output/entry.txt. No dependencies, no network, deterministic.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// Syllable counts for every word used in the haiku, written out explicitly
// so the 5-7-5 shape can be checked by the program itself.
const SYLLABLES: Record<string, number> = {
  cursor: 2, blinks: 1, at: 1, three: 1,
  log: 1, lines: 1, scroll: 1, past: 1, tired: 2, eyes: 1,
  bug: 1, found: 1, it: 1, was: 1, me: 1,
};

// The haiku, assembled from its lines. Expected shape: 5-7-5 syllables.
const LINES = [
  "Cursor blinks at three",
  "log lines scroll past tired eyes",
  "bug found: it was me",
];
const EXPECTED = [5, 7, 5];

function countSyllables(line: string): number {
  const words = line
    .replace(/[^a-zA-Z ]/g, "")
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);
  // Every word must be in the explicit syllable map; unknown words fail
  // loudly instead of silently counting as zero.
  for (const word of words) {
    if (!(word in SYLLABLES)) {
      throw new Error(`no syllable count for word: ${word}`);
    }
  }
  return words.reduce((sum, word) => sum + SYLLABLES[word], 0);
}

// Validate before writing: exactly 3 non-empty lines, 5-7-5 syllables,
// at most 200 chars total.
if (LINES.length !== 3) throw new Error(`expected 3 lines, got ${LINES.length}`);
if (LINES.some((line) => line.trim().length === 0)) {
  throw new Error("haiku contains an empty line");
}
const text = LINES.join("\n") + "\n";
if (text.length > 200) throw new Error(`haiku too long: ${text.length} chars`);
LINES.forEach((line, i) => {
  const n = countSyllables(line);
  if (n !== EXPECTED[i]) {
    throw new Error(`line ${i + 1}: expected ${EXPECTED[i]} syllables, got ${n}`);
  }
});

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", text, "utf8");

// Read back what was written and confirm it matches exactly.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== text) throw new Error("read-back mismatch: entry.txt differs");
