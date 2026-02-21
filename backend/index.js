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

// API: Get verse by reference (case-insensitive)
app.get("/api/verse/:reference", (req, res) => {
  const refRaw = req.params.reference.replace(/_/g, " ").toLowerCase();
  // Try to match with colon (Book Chapter:Verse)
  let verse = bibleDB.find((v) => v.reference.toLowerCase() === refRaw);
  if (!verse) {
    // Try to match with space (Book Chapter Verse)
    const refSpace = refRaw.replace(/:/g, " ");
    verse = bibleDB.find(
      (v) => v.reference.toLowerCase().replace(/:/g, " ") === refSpace,
    );
  }
  if (verse) {
    res.json(verse);
  } else {
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
