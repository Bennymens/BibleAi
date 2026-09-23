// ─── Book name map (canonical) ───────────────────────────────────────────────
const bookMap = {
  genesis: "Genesis",
  exodus: "Exodus",
  leviticus: "Leviticus",
  numbers: "Numbers",
  deuteronomy: "Deuteronomy",
  joshua: "Joshua",
  judges: "Judges",
  ruth: "Ruth",
  "first samuel": "1 Samuel",
  "1 samuel": "1 Samuel",
  "second samuel": "2 Samuel",
  "2 samuel": "2 Samuel",
  "first kings": "1 Kings",
  "1 kings": "1 Kings",
  "second kings": "2 Kings",
  "2 kings": "2 Kings",
  "first chronicles": "1 Chronicles",
  "1 chronicles": "1 Chronicles",
  "second chronicles": "2 Chronicles",
  "2 chronicles": "2 Chronicles",
  ezra: "Ezra",
  nehemiah: "Nehemiah",
  esther: "Esther",
  job: "Job",
  psalms: "Psalms",
  psalm: "Psalms",
  proverbs: "Proverbs",
  ecclesiastes: "Ecclesiastes",
  "song of solomon": "Song of Solomon",
  "song of songs": "Song of Solomon",
  isaiah: "Isaiah",
  jeremiah: "Jeremiah",
  lamentations: "Lamentations",
  ezekiel: "Ezekiel",
  daniel: "Daniel",
  hosea: "Hosea",
  joel: "Joel",
  amos: "Amos",
  obadiah: "Obadiah",
  jonah: "Jonah",
  micah: "Micah",
  nahum: "Nahum",
  habakkuk: "Habakkuk",
  zephaniah: "Zephaniah",
  haggai: "Haggai",
  zechariah: "Zechariah",
  malachi: "Malachi",
  matthew: "Matthew",
  mark: "Mark",
  luke: "Luke",
  john: "John",
  acts: "Acts",
  romans: "Romans",
  "first corinthians": "1 Corinthians",
  "1 corinthians": "1 Corinthians",
  "second corinthians": "2 Corinthians",
  "2 corinthians": "2 Corinthians",
  galatians: "Galatians",
  ephesians: "Ephesians",
  philippians: "Philippians",
  colossians: "Colossians",
  "first thessalonians": "1 Thessalonians",
  "1 thessalonians": "1 Thessalonians",
  "second thessalonians": "2 Thessalonians",
  "2 thessalonians": "2 Thessalonians",
  "first timothy": "1 Timothy",
  "1 timothy": "1 Timothy",
  "second timothy": "2 Timothy",
  "2 timothy": "2 Timothy",
  titus: "Titus",
  philemon: "Philemon",
  hebrews: "Hebrews",
  james: "James",
  "first peter": "1 Peter",
  "1 peter": "1 Peter",
  "second peter": "2 Peter",
  "2 peter": "2 Peter",
  "first john": "1 John",
  "1 john": "1 John",
  "second john": "2 John",
  "2 john": "2 John",
  "third john": "3 John",
  "3 john": "3 John",
  jude: "Jude",
  revelation: "Revelation",
};

// ─── Phonetic / misheard aliases ──────────────────────────────────────────────
// Maps common speech-recognition errors → lowercase canonical key in bookMap
const phoneticAliases = {
  // John
  june: "john",
  joan: "john",
  jon: "john",
  gene: "john",
  jean: "john",
  jan: "john",
  jhon: "john",
  "jo an": "john",

  // Genesis
  geneses: "genesis",
  jenesis: "genesis",
  "jeanesis": "genesis",
  "jeniasis": "genesis",
  jenasies: "genesis",

  // Matthew
  mathew: "matthew",
  mathieu: "matthew",
  mateo: "matthew",
  mattew: "matthew",
  "mat thew": "matthew",

  // Psalms
  palm: "psalms",
  palms: "psalms",
  sams: "psalms",
  "some": "psalms",

  // Romans
  roman: "romans",
  romanes: "romans",

  // Revelation / Revelations
  revelations: "revelation",
  revelacion: "revelation",
  revelashion: "revelation",
  revelashuns: "revelation",
  revalation: "revelation",
  revalations: "revelation",
  revilation: "revelation",

  // Philippians
  filipians: "philippians",
  fillipians: "philippians",
  philipians: "philippians",
  "philip ians": "philippians",
  filipinos: "philippians",

  // Ephesians
  efesians: "ephesians",
  efesian: "ephesians",
  efeshians: "ephesians",

  // Corinthians
  corinthans: "corinthians",
  corintheans: "corinthians",
  corinthins: "corinthians",
  corinthans: "corinthians",
  "first corinthans": "first corinthians",
  "second corinthans": "second corinthians",

  // Galatians
  galations: "galatians",
  galatians: "galatians",
  "gala tians": "galatians",

  // Colossians
  colosians: "colossians",
  colossian: "colossians",
  "colos ians": "colossians",

  // Thessalonians
  thesalonians: "thessalonians",
  "thess alonians": "thessalonians",
  thessalonias: "thessalonians",

  // Timothy
  timathy: "timothy",
  timothey: "timothy",

  // Hebrews
  hebrues: "hebrews",
  hebros: "hebrews",
  hebrew: "hebrews",

  // Chronicles
  chronicals: "chronicles",
  "first chronicals": "first chronicles",
  "second chronicals": "second chronicles",

  // Deuteronomy
  dueteronomy: "deuteronomy",
  deteronomy: "deuteronomy",
  deutronomy: "deuteronomy",

  // Isaiah
  isiah: "isaiah",
  isaih: "isaiah",
  izaiah: "isaiah",

  // Jeremiah
  jeramiah: "jeremiah",
  jerimiah: "jeremiah",
  jeremia: "jeremiah",
  jeremiya: "jeremiah",

  // Ezekiel
  ezekial: "ezekiel",
  ezeekial: "ezekiel",

  // Habakkuk
  habakuk: "habakkuk",
  habacuc: "habakkuk",

  // Zephaniah
  zefaniah: "zephaniah",
  zepania: "zephaniah",

  // Nehemiah
  nehimiah: "nehemiah",
  neemiya: "nehemiah",

  // Ecclesiastes
  eclesiastes: "ecclesiastes",
  ecleasiastes: "ecclesiastes",
  eclesiastes: "ecclesiastes",

  // Acts
  act: "acts",

  // Luke
  luck: "luke",
  luk: "luke",

  // Mark
  marc: "mark",

  // Proverbs
  proverb: "proverbs",
  provers: "proverbs",

  // Lamentations
  lamentacion: "lamentations",

  // Zechariah
  zacharia: "zechariah",
  zachariah: "zechariah",
  zecharia: "zechariah",

  // Malachi
  malacy: "malachi",
  malaki: "malachi",

  // Philemon
  filemon: "philemon",
  philamen: "philemon",

  // Obadiah
  obadia: "obadiah",
  obadiah: "obadiah",

  // Jonah
  jona: "jonah",
  joana: "jonah",

  // Nahum
  naham: "nahum",
  naum: "nahum",

  // Haggai
  haggi: "haggai",
  hagay: "haggai",

  // Jude
  jood: "jude",
  jued: "jude",

  // Titus
  titas: "titus",
  tytus: "titus",

  // Joshua
  joshuah: "joshua",
  joshwa: "joshua",

  // Daniel
  danniel: "daniel",
  danial: "daniel",
  danyel: "daniel",

  // Song of Solomon / Song of Songs
  "song solomon": "song of solomon",
  "songs": "song of solomon",
  "song of song": "song of solomon",
};

// ─── Ordinal / number prefix normalization ────────────────────────────────────
// Spoken "first", "second", "third", "1st", "2nd", "3rd" → "1", "2", "3"
const ordinalMap = {
  first: "1",
  "1st": "1",
  second: "2",
  "2nd": "2",
  third: "3",
  "3rd": "3",
};

// ─── Number word map ──────────────────────────────────────────────────────────
const numberWords = {
  zero: 0,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10,
  eleven: 11,
  twelve: 12,
  thirteen: 13,
  fourteen: 14,
  fifteen: 15,
  sixteen: 16,
  seventeen: 17,
  eighteen: 18,
  nineteen: 19,
  twenty: 20,
  thirty: 30,
  forty: 40,
  fifty: 50,
  sixty: 60,
  seventy: 70,
  eighty: 80,
  ninety: 90,
  hundred: 100,
};

function parseNumber(word) {
  if (numberWords[word] !== undefined) return numberWords[word];
  const num = parseInt(word, 10);
  if (!isNaN(num)) return num;
  return null;
}

// ─── Split a concatenated number into [chapter, verse] candidates ─────────────
// e.g. "316" → [[3, 16]], "2316" → [[23, 16]], "114" → [[1, 14], [11, 4]]
function splitConcatenatedNumber(n) {
  const s = String(n);
  const results = [];
  if (s.length === 2) {
    // e.g. 36 → 3:6
    const ch = parseInt(s[0], 10);
    const v = parseInt(s[1], 10);
    if (ch > 0 && v > 0) results.push([ch, v]);
  } else if (s.length === 3) {
    // e.g. 316 → 3:16
    results.push([parseInt(s[0], 10), parseInt(s.slice(1), 10)]);
    // also try 31:6
    const alt = [parseInt(s.slice(0, 2), 10), parseInt(s[2], 10)];
    if (alt[0] !== results[0][0]) results.push(alt);
  } else if (s.length === 4) {
    // e.g. 2316 → 23:16, also try 2:316 (unlikely) or 231:6 (unlikely)
    results.push([parseInt(s.slice(0, 2), 10), parseInt(s.slice(2), 10)]);
    results.push([parseInt(s[0], 10), parseInt(s.slice(1), 10)]);
  }
  return results.filter(([ch, v]) => ch > 0 && v > 0 && ch <= 150 && v <= 176);
}

// ─── Levenshtein distance (for fuzzy last-resort matching) ───────────────────
function levenshtein(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, (_, i) =>
    Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  );
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}

// ─── Normalize text before matching ──────────────────────────────────────────
function normalize(text) {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
}

// ─── Try to resolve a word/phrase to a book name ─────────────────────────────
function resolveBook(candidate) {
  // 1. Direct match in bookMap
  if (bookMap[candidate]) return bookMap[candidate];

  // 2. Phonetic alias map
  if (phoneticAliases[candidate]) {
    const resolved = phoneticAliases[candidate];
    return bookMap[resolved] || null;
  }

  // 3. Fuzzy last-resort: find closest bookMap key within edit distance ≤ 2
  //    Only for single-word candidates (to avoid slow multi-word searches)
  const words = candidate.split(" ");
  if (words.length === 1 && candidate.length >= 4) {
    let best = null, bestDist = 3; // threshold
    for (const key of Object.keys(bookMap)) {
      const keyWords = key.split(" ");
      if (keyWords.length === 1) {
        const dist = levenshtein(candidate, key);
        if (dist < bestDist) {
          bestDist = dist;
          best = bookMap[key];
        }
      }
    }
    if (best) return best;

    // Also check phonetic aliases with fuzzy
    for (const key of Object.keys(phoneticAliases)) {
      const keyWords = key.split(" ");
      if (keyWords.length === 1) {
        const dist = levenshtein(candidate, key);
        if (dist < bestDist) {
          bestDist = dist;
          best = bookMap[phoneticAliases[key]] || null;
        }
      }
    }
    if (best) return best;
  }

  return null;
}

// ─── Main export ──────────────────────────────────────────────────────────────
export function parseScripture(transcript) {
  // Normalize and replace ordinals ("first" → "1", "1st" → "1", etc.)
  let text = normalize(transcript);

  // Replace ordinal words/abbreviations before filtering
  for (const [ord, num] of Object.entries(ordinalMap)) {
    text = text.replace(new RegExp(`\\b${ord}\\b`, "gi"), num);
  }

  // Filler words to strip (keep number words & book-relevant words)
  const fillers = new Set([
    "turn", "with", "me", "to", "verse", "chapter", "book",
    "open", "read", "from", "the", "a", "an", "and", "or", "but",
    "in", "on", "at", "for", "by", "let", "us", "go", "now",
    "here", "is", "that", "this", "it", "are", "was", "were",
    "be", "been", "being", "have", "has", "had", "do", "does",
    "did", "will", "would", "can", "could", "should", "may",
    "might", "must", "shall", "i", "you", "he", "she", "we",
    "they", "them", "their", "our", "my", "your", "his", "her", "its",
  ]);

  const words = text.split(/\s+/).filter((w) => w && !fillers.has(w));

  // ── Step 1: find the book name ─────────────────────────────────────────────
  let book = null;
  let startIndex = 0;

  // Try multi-word candidates first (up to 4 words), then single words
  for (let len = Math.min(4, words.length); len >= 1; len--) {
    for (let start = 0; start <= words.length - len; start++) {
      const candidate = words.slice(start, start + len).join(" ");
      const resolved = resolveBook(candidate);
      if (resolved) {
        book = resolved;
        startIndex = start + len;
        break;
      }
    }
    if (book) break;
  }

  if (!book) return null;

  // ── Step 2: extract chapter & verse numbers ────────────────────────────────
  const remaining = words.slice(startIndex);
  const nums = remaining.map(parseNumber).filter((n) => n !== null);

  if (nums.length >= 2) {
    // Normal case: two or more numbers found
    const chapter = nums[0];
    const verse = nums[1];
    return { book, chapter, verse, reference: `${book} ${chapter}:${verse}` };
  }

  if (nums.length === 1) {
    const n = nums[0];

    // Single large number — try to split into chapter:verse
    if (n >= 10) {
      const candidates = splitConcatenatedNumber(n);
      if (candidates.length > 0) {
        // Take the first (most likely) split
        const [chapter, verse] = candidates[0];
        return { book, chapter, verse, reference: `${book} ${chapter}:${verse}` };
      }
    }

    // Single small number — might be chapter only (e.g. "John 3"), not enough
    return null;
  }

  return null;
}
