# Biblebridge

A voice-activated scripture lookup web application.

## Features

- Continuous speech recognition
- Automatic scripture detection and parsing
- Beautiful animated UI with Framer Motion
- Multiple Bible translations (KJV, NIV, ESV)
- Real-time microphone volume visualization

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up Supabase:
   - Create a new Supabase project
   - Create a table `verses` with columns:
     - `id` (uuid, primary key)
     - `book` (text)
     - `chapter` (integer)
     - `verse` (integer)
     - `translation` (text)
     - `text` (text)
   - Insert Bible verses data
4. Copy `.env.example` to `.env` and fill in your Supabase credentials
5. Run the development server: `npm run dev`

## Supabase Setup

Create the `verses` table with the following SQL:

```sql
CREATE TABLE verses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  book TEXT NOT NULL,
  chapter INTEGER NOT NULL,
  verse INTEGER NOT NULL,
  translation TEXT NOT NULL,
  text TEXT NOT NULL
);

-- Example insert
INSERT INTO verses (book, chapter, verse, translation, text) VALUES
('John', 3, 16, 'KJV', 'For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.');
```

## Deployment

Deploy to Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
4. Deploy

## Usage

- The app continuously listens for speech
- Say scripture references like "John 3:16" or "Romans 8 verse 28"
- The app will detect, fetch, and display the scripture
- Change translations using the dropdown
- Close the scripture card by clicking the close button
