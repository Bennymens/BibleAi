/* global process */

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { book, chapter, verse, translation } = req.query;

  if (!book || !chapter || !verse || !translation) {
    return res.status(400).json({ error: "Missing parameters" });
  }

  try {
    const { data, error } = await supabase
      .from("verses")
      .select("text")
      .eq("book", book)
      .eq("chapter", parseInt(chapter))
      .eq("verse", parseInt(verse))
      .eq("translation", translation)
      .single();

    if (error || !data) {
      return res.status(404).json({ error: "Scripture not found" });
    }

    res.status(200).json({
      book,
      chapter: parseInt(chapter),
      verse: parseInt(verse),
      translation,
      text: data.text,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}
