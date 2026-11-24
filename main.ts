// SPDX-License-Identifier: MIT
// Seventeen Syllables of Debugging — a program that writes one haiku about
// debugging to /output/entry.txt. No dependencies, no network, deterministic.
import { mkdirSync, writeFileSync } from "node:fs";

// The haiku, composed for this entry (5-7-5 syllables):
//   "Cursor blinks at three"                — 5 (Cur-sor 2, blinks 1, at 1, three 1)
//   "log lines scroll past tired eyes"      — 7 (log 1, lines 1, scroll 1, past 1, tir-ed 2, eyes 1)
//   "bug found: it was me"                  — 5 (bug 1, found 1, it 1, was 1, me 1)
const haiku = [
  "Cursor blinks at three",
  "log lines scroll past tired eyes",
  "bug found: it was me",
].join("\n") + "\n";

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", haiku, "utf8");
