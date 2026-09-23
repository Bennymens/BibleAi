import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Inline dev API handler — mirrors api/verse.js so no separate backend is needed
function devApiPlugin() {
  const bibleDB = JSON.parse(
    readFileSync(join(__dirname, "api", "bibleDB.json"), "utf-8")
  );

  return {
    name: "dev-api",
    configureServer(server) {
      server.middlewares.use("/api/verse", (req, res, next) => {
        if (req.method !== "GET") {
          next();
          return;
        }
        const url = new URL(req.url, "http://localhost");
        const reference = url.searchParams.get("reference");

        if (!reference) {
          res.statusCode = 400;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "Missing reference parameter" }));
          return;
        }

        const refRaw = reference.replace(/_/g, " ").toLowerCase().trim();

        let entry = bibleDB.find(
          (v) => v.reference.toLowerCase().trim() === refRaw
        );
        if (!entry) {
          const refSpaced = refRaw.replace(/:/g, " ");
          entry = bibleDB.find(
            (v) =>
              v.reference.toLowerCase().replace(/:/g, " ").trim() === refSpaced
          );
        }
        // Psalm ↔ Psalms
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

        res.setHeader("Content-Type", "application/json");
        if (entry) {
          res.statusCode = 200;
          res.end(JSON.stringify(entry));
        } else {
          res.statusCode = 404;
          res.end(JSON.stringify({ error: `Verse not found: ${reference}` }));
        }
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), devApiPlugin()],
  // Build: output React app into "build" so the backend can serve it
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
