import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// ES module-safe __dirname (works on Vercel AND locally)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load DB once at cold-start — same file sits next to this handler
const bibleDB = JSON.parse(
  readFileSync(join(__dirname, "bibleDB.json"), "utf-8")
);

export default function handler(req, res) {
  // CORS headers so the frontend can call this from any origin
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { reference } = req.query;
  if (!reference) {
    res.status(400).json({ error: "Missing reference parameter" });
    return;
  }

  const refRaw = reference.replace(/_/g, " ").toLowerCase().trim();

  // Try exact match (e.g. "john 3:16")
  let entry = bibleDB.find(
    (v) => v.reference.toLowerCase().trim() === refRaw
  );

  // Try match ignoring colon vs space (e.g. "john 3 16")
  if (!entry) {
    const refSpaced = refRaw.replace(/:/g, " ");
    entry = bibleDB.find(
      (v) => v.reference.toLowerCase().replace(/:/g, " ").trim() === refSpaced
    );
  }

  // Try with "Psalm" ↔ "Psalms" book name variant
  if (!entry) {
    let altRef = refRaw;
    if (refRaw.startsWith("psalms ")) altRef = "psalm " + refRaw.slice(7);
    else if (refRaw.startsWith("psalm ")) altRef = "psalms " + refRaw.slice(6);
    if (altRef !== refRaw) {
      entry = bibleDB.find(
        (v) => v.reference.toLowerCase().trim() === altRef
      );
    }
  }

  if (entry) {
    res.status(200).json(entry);
  } else {
    res.status(404).json({ error: `Verse not found: ${reference}` });
  }
}
