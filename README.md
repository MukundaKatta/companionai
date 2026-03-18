# CompanionAI

AI character companion platform for creating personalized AI personas with distinct personalities, memories, and conversation styles.

<!-- Add screenshot here -->

## Features

- **Character Gallery** — Browse and select from pre-built AI companion characters
- **Character Creator** — Design custom AI characters with unique personality, backstory, and traits
- **Contextual Chat** — Engage in themed conversations that reflect each character's personality
- **Memory System** — Characters remember past interactions with importance-ranked memory entries
- **Personality Traits** — Define voice tone, conversation style, and behavioral traits per character
- **Themed Experiences** — Characters span cosmic, science, wellness, gaming, and custom themes
- **Conversation History** — Persistent message history with timestamp tracking

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Database:** Supabase (with SSR helpers)
- **Icons:** Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase project

### Installation

```bash
git clone <repo-url>
cd companionai
npm install
```

### Environment Variables

Create a `.env.local` file:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Running

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   └── page.tsx      # Main app with character gallery, chat, creator, and memory views
├── components/       # Shared UI components
├── lib/              # Store, Supabase client, utilities
└── types/            # TypeScript type definitions
```

