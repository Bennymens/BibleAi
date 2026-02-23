const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Load Bible verses from JSON file
const dbPath = path.join(__dirname, "bibleDB.json");
let bibleDB = [];
try {
  bibleDB = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
} catch (e) {
  console.error("Failed to load bibleDB.json:", e);
}

// API: Get all verses
app.get("/api/verses", (req, res) => {
  res.json(bibleDB);
});

// Shared helper to find a verse from the in-memory DB
function findVerseByReference(ref) {
  const refRaw = ref.replace(/_/g, " ").toLowerCase().trim();
  // Try to match with colon (Book Chapter:Verse)
  let verse = bibleDB.find((v) => v.reference.toLowerCase().trim() === refRaw);
  if (!verse) {
    // Try to match with space (Book Chapter Verse)
    const refSpace = refRaw.replace(/:/g, " ");
    verse = bibleDB.find(
      (v) => v.reference.toLowerCase().replace(/:/g, " ").trim() === refSpace,
    );
  }
  return verse || null;
}

// API: Get verse by reference using path param (for backwards compatibility)
app.get("/api/verse/:reference", (req, res) => {
  const { reference } = req.params;
  const verse = findVerseByReference(reference);
  if (verse) {
    res.json(verse);
  } else {
    console.log("Verse not found for:", reference);
    res.status(404).json({ error: "Verse not found" });
  }
});

// API: Get verse by reference using query param (?reference=...) to match Vercel function
app.get("/api/verse", (req, res) => {
  const { reference } = req.query;
  if (!reference) {
    return res
      .status(400)
      .json({ error: "Missing reference parameter (e.g. ?reference=John%203:16)" });
  }
  const verse = findVerseByReference(reference);
  if (verse) {
    res.json(verse);
  } else {
    console.log("Verse not found for:", reference);
    res.status(404).json({ error: "Verse not found" });
  }
});

// Serve React static files
const buildPath = path.join(__dirname, "..", "build");
if (fs.existsSync(buildPath)) {
  app.use(express.static(buildPath));
  // Fallback for client-side routing
  app.get("*", (req, res) => {
    if (req.path.startsWith("/api/")) return res.status(404).end();
    res.sendFile(path.join(buildPath, "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`BibleAI backend running on port ${PORT}`);
});
