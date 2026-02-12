// Dummy Bible Database
// Format: "Book Chapter:Verse" : { text: "scripture text", translations: {...} }
//
// Available Scriptures:
// - John: 1:1, 3:16, 3:17, 14:6
// - Genesis: 1:1, 1:3
// - Psalm/Psalms: 23:1, 23:4, 46:1, 91:1
// - Proverbs: 3:5, 3:6
// - Romans: 8:28, 12:2
// - Philippians: 4:6, 4:13
// - Matthew: 6:33, 11:28, 28:20
// - Jeremiah: 29:11
// - Isaiah: 40:31, 41:10
// - 1 Corinthians: 10:13, 13:4

export const bibleDB = {
  // John
  "John 3:16": {
    book: "John",
    chapter: 3,
    verse: 16,
    translations: {
      KJV: "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.",
      NIV: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
      ESV: "For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life.",
    },
  },
  "John 3:17": {
    book: "John",
    chapter: 3,
    verse: 17,
    translations: {
      KJV: "For God sent not his Son into the world to condemn the world; but that the world through him might be saved.",
      NIV: "For God did not send his Son into the world to condemn the world, but to save the world through him.",
      ESV: "For God did not send his Son into the world to condemn the world, but in order that the world might be saved through him.",
    },
  },
  "John 1:1": {
    book: "John",
    chapter: 1,
    verse: 1,
    translations: {
      KJV: "In the beginning was the Word, and the Word was with God, and the Word was God.",
      NIV: "In the beginning was the Word, and the Word was with God, and the Word was God.",
      ESV: "In the beginning was the Word, and the Word was with God, and the Word was God.",
    },
  },
  "John 14:6": {
    book: "John",
    chapter: 14,
    verse: 6,
    translations: {
      KJV: "Jesus saith unto him, I am the way, the truth, and the life: no man cometh unto the Father, but by me.",
      NIV: "Jesus answered, 'I am the way and the truth and the life. No one comes to the Father except through me.'",
      ESV: "Jesus said to him, 'I am the way, and the truth, and the life. No one comes to the Father except through me.'",
    },
  },

  // Genesis
  "Genesis 1:1": {
    book: "Genesis",
    chapter: 1,
    verse: 1,
    translations: {
      KJV: "In the beginning God created the heaven and the earth.",
      NIV: "In the beginning God created the heavens and the earth.",
      ESV: "In the beginning, God created the heavens and the earth.",
    },
  },
  "Genesis 1:3": {
    book: "Genesis",
    chapter: 1,
    verse: 3,
    translations: {
      KJV: "And God said, Let there be light: and there was light.",
      NIV: "And God said, 'Let there be light,' and there was light.",
      ESV: "And God said, 'Let there be light,' and there was light.",
    },
  },

  // Psalms
  "Psalm 23:1": {
    book: "Psalm",
    chapter: 23,
    verse: 1,
    translations: {
      KJV: "The LORD is my shepherd; I shall not want.",
      NIV: "The LORD is my shepherd, I lack nothing.",
      ESV: "The LORD is my shepherd; I shall not want.",
    },
  },
  "Psalms 23:1": {
    book: "Psalms",
    chapter: 23,
    verse: 1,
    translations: {
      KJV: "The LORD is my shepherd; I shall not want.",
      NIV: "The LORD is my shepherd, I lack nothing.",
      ESV: "The LORD is my shepherd; I shall not want.",
    },
  },
  "Psalm 23:4": {
    book: "Psalm",
    chapter: 23,
    verse: 4,
    translations: {
      KJV: "Yea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me; thy rod and thy staff they comfort me.",
      NIV: "Even though I walk through the darkest valley, I will fear no evil, for you are with me; your rod and your staff, they comfort me.",
      ESV: "Even though I walk through the valley of the shadow of death, I will fear no evil, for you are with me; your rod and your staff, they comfort me.",
    },
  },
  "Psalm 46:1": {
    book: "Psalm",
    chapter: 46,
    verse: 1,
    translations: {
      KJV: "God is our refuge and strength, a very present help in trouble.",
      NIV: "God is our refuge and strength, an ever-present help in trouble.",
      ESV: "God is our refuge and strength, a very present help in trouble.",
    },
  },
  "Psalm 91:1": {
    book: "Psalm",
    chapter: 91,
    verse: 1,
    translations: {
      KJV: "He that dwelleth in the secret place of the most High shall abide under the shadow of the Almighty.",
      NIV: "Whoever dwells in the shelter of the Most High will rest in the shadow of the Almighty.",
      ESV: "He who dwells in the shelter of the Most High will abide in the shadow of the Almighty.",
    },
  },

  // Proverbs
  "Proverbs 3:5": {
    book: "Proverbs",
    chapter: 3,
    verse: 5,
    translations: {
      KJV: "Trust in the LORD with all thine heart; and lean not unto thine own understanding.",
      NIV: "Trust in the LORD with all your heart and lean not on your own understanding.",
      ESV: "Trust in the LORD with all your heart, and do not lean on your own understanding.",
    },
  },
  "Proverbs 3:6": {
    book: "Proverbs",
    chapter: 3,
    verse: 6,
    translations: {
      KJV: "In all thy ways acknowledge him, and he shall direct thy paths.",
      NIV: "In all your ways submit to him, and he will make your paths straight.",
      ESV: "In all your ways acknowledge him, and he will make straight your paths.",
    },
  },

  // Romans
  "Romans 8:28": {
    book: "Romans",
    chapter: 8,
    verse: 28,
    translations: {
      KJV: "And we know that all things work together for good to them that love God, to them who are the called according to his purpose.",
      NIV: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.",
      ESV: "And we know that for those who love God all things work together for good, for those who are called according to his purpose.",
    },
  },
  "Romans 12:2": {
    book: "Romans",
    chapter: 12,
    verse: 2,
    translations: {
      KJV: "And be not conformed to this world: but be ye transformed by the renewing of your mind, that ye may prove what is that good, and acceptable, and perfect, will of God.",
      NIV: "Do not conform to the pattern of this world, but be transformed by the renewing of your mind. Then you will be able to test and approve what God's will is—his good, pleasing and perfect will.",
      ESV: "Do not be conformed to this world, but be transformed by the renewal of your mind, that by testing you may discern what is the will of God, what is good and acceptable and perfect.",
    },
  },

  // Philippians
  "Philippians 4:13": {
    book: "Philippians",
    chapter: 4,
    verse: 13,
    translations: {
      KJV: "I can do all things through Christ which strengtheneth me.",
      NIV: "I can do all this through him who gives me strength.",
      ESV: "I can do all things through him who strengthens me.",
    },
  },
  "Philippians 4:6": {
    book: "Philippians",
    chapter: 4,
    verse: 6,
    translations: {
      KJV: "Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God.",
      NIV: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.",
      ESV: "Do not be anxious about anything, but in everything by prayer and supplication with thanksgiving let your requests be made known to God.",
    },
  },

  // Matthew
  "Matthew 6:33": {
    book: "Matthew",
    chapter: 6,
    verse: 33,
    translations: {
      KJV: "But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you.",
      NIV: "But seek first his kingdom and his righteousness, and all these things will be given to you as well.",
      ESV: "But seek first the kingdom of God and his righteousness, and all these things will be added to you.",
    },
  },
  "Matthew 11:28": {
    book: "Matthew",
    chapter: 11,
    verse: 28,
    translations: {
      KJV: "Come unto me, all ye that labour and are heavy laden, and I will give you rest.",
      NIV: "Come to me, all you who are weary and burdened, and I will give you rest.",
      ESV: "Come to me, all who labor and are heavy laden, and I will give you rest.",
    },
  },
  "Matthew 28:20": {
    book: "Matthew",
    chapter: 28,
    verse: 20,
    translations: {
      KJV: "Teaching them to observe all things whatsoever I have commanded you: and, lo, I am with you always, even unto the end of the world. Amen.",
      NIV: "And teaching them to obey everything I have commanded you. And surely I am with you always, to the very end of the age.",
      ESV: "Teaching them to observe all that I have commanded you. And behold, I am with you always, to the end of the age.",
    },
  },

  // Jeremiah
  "Jeremiah 29:11": {
    book: "Jeremiah",
    chapter: 29,
    verse: 11,
    translations: {
      KJV: "For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end.",
      NIV: "For I know the plans I have for you, declares the LORD, plans to prosper you and not to harm you, plans to give you hope and a future.",
      ESV: "For I know the plans I have for you, declares the LORD, plans for welfare and not for evil, to give you a future and a hope.",
    },
  },

  // Isaiah
  "Isaiah 40:31": {
    book: "Isaiah",
    chapter: 40,
    verse: 31,
    translations: {
      KJV: "But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint.",
      NIV: "But those who hope in the LORD will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.",
      ESV: "But they who wait for the LORD shall renew their strength; they shall mount up with wings like eagles; they shall run and not be weary; they shall walk and not faint.",
    },
  },
  "Isaiah 41:10": {
    book: "Isaiah",
    chapter: 41,
    verse: 10,
    translations: {
      KJV: "Fear thou not; for I am with thee: be not dismayed; for I am thy God: I will strengthen thee; yea, I will help thee; yea, I will uphold thee with the right hand of my righteousness.",
      NIV: "So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand.",
      ESV: "Fear not, for I am with you; be not dismayed, for I am your God; I will strengthen you, I will help you, I will uphold you with my righteous right hand.",
    },
  },

  // 1 Corinthians
  "1 Corinthians 13:4": {
    book: "1 Corinthians",
    chapter: 13,
    verse: 4,
    translations: {
      KJV: "Charity suffereth long, and is kind; charity envieth not; charity vaunteth not itself, is not puffed up,",
      NIV: "Love is patient, love is kind. It does not envy, it does not boast, it is not proud.",
      ESV: "Love is patient and kind; love does not envy or boast; it is not arrogant",
    },
  },
  "1 Corinthians 10:13": {
    book: "1 Corinthians",
    chapter: 10,
    verse: 13,
    translations: {
      KJV: "There hath no temptation taken you but such as is common to man: but God is faithful, who will not suffer you to be tempted above that ye are able; but will with the temptation also make a way to escape, that ye may be able to bear it.",
      NIV: "No temptation has overtaken you except what is common to mankind. And God is faithful; he will not let you be tempted beyond what you can bear. But when you are tempted, he will also provide a way out so that you can endure it.",
      ESV: "No temptation has overtaken you that is not common to man. God is faithful, and he will not let you be tempted beyond your ability, but with the temptation he will also provide the way of escape, that you may be able to endure it.",
    },
  },
};

// Helper function to search for scripture
export function getScripture(book, chapter, verse, translation = "KJV") {
  // Try different variations of the book name
  const variations = [
    `${book} ${chapter}:${verse}`,
    `${book}s ${chapter}:${verse}`, // e.g., Psalms vs Psalm
  ];

  for (const key of variations) {
    if (bibleDB[key]) {
      const scripture = bibleDB[key];
      return {
        book: scripture.book,
        chapter: scripture.chapter,
        verse: scripture.verse,
        translation: translation,
        text: scripture.translations[translation] || scripture.translations.KJV,
      };
    }
  }

  // If plural form, try singular and vice versa
  const alternateBook = book.endsWith("s") ? book.slice(0, -1) : book + "s";
  const alternateKey = `${alternateBook} ${chapter}:${verse}`;

  if (bibleDB[alternateKey]) {
    const scripture = bibleDB[alternateKey];
    return {
      book: scripture.book,
      chapter: scripture.chapter,
      verse: scripture.verse,
      translation: translation,
      text: scripture.translations[translation] || scripture.translations.KJV,
    };
  }

  return null;
}
