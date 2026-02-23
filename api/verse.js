import fs from "fs";
import path from "path";

export default function handler(req, res) {
  // Only allow GET
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  // Get reference from query string
  const { reference } = req.query;
  if (!reference) {
    res.status(400).json({ error: "Missing reference parameter" });
    return;
  }

  // Load bibleDB.json from the api folder (works locally and on Vercel)
  const dbPath = path.join(process.cwd(), "api", "bibleDB.json");
  let bibleDB = [];
  try {
    bibleDB = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
  } catch (e) {
    res.status(500).json({ error: "Failed to load bibleDB.json" });
    return;
  }

  const refRaw = reference.replace(/_/g, " ").toLowerCase().trim();
  // Try to match with colon (Book Chapter:Verse)
  let verse = bibleDB.find((v) => v.reference.toLowerCase().trim() === refRaw);
  if (!verse) {
    // Try to match with space (Book Chapter Verse)
    const refSpace = refRaw.replace(/:/g, " ");
    verse = bibleDB.find(
      (v) => v.reference.toLowerCase().replace(/:/g, " ").trim() === refSpace,
    );
  }
  if (verse) {
    res.status(200).json(verse);
  } else {
    res.status(404).json({ error: "Verse not found" });
  }
}
