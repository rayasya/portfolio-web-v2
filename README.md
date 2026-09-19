# Portfolio Web v2

Interactive personal portfolio website and terminal workspace for **Muhammad Rayasya Dziqi Cahyana** (Fullstack Software Engineer). Built with Next.js 16, React 19, Tailwind CSS v4, Drizzle ORM, Neon PostgreSQL, and Clerk authentication.

---

## Features

- **Dual-Interface Experience**:
  - **Modern Portfolio**: Hero section, profile about, featured projects grid, certificates, and contact form.
  - **Interactive Terminal & IDE Workspace**: Embedded terminal CLI with custom commands and desktop widgets.
- **Terminal Arcade & Utilities**:
  - Mini-games: Snake, Tetris, Tic-Tac-Toe, Quiz, Typing Test.
  - Interactive tools: Matrix rain animation, htop system monitor simulator, and lofi audio jukebox.
- **Sound Effects**: Audio feedback for terminal interactions, clicks, and retro arcade controls.
- **Theme Switching**: Dark, Light, and System theme support with `next-themes`.
- **Protected Admin CMS (`/admin`)**:
  - Protected via Clerk authentication and admin email whitelist.
  - CRUD management for Projects (tech stack, links, featured flag).
  - CRUD management for Certificates & Achievements.
  - Inbox to read and manage visitor contact messages.

---

## Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Frontend**: [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/), `@tailwindcss/postcss`, `tw-animate-css`
- **UI Components & Icons**: `@base-ui/react`, `lucide-react`, `class-variance-authority`, `clsx`, `tailwind-merge`
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Authentication**: [Clerk](https://clerk.com/)
- **Database & ORM**: [PostgreSQL (Neon Serverless)](https://neon.tech/), [Drizzle ORM](https://orm.drizzle.team/)
- **Font**: Google Fonts (`Sora`, `Fraunces`, `Geist Mono`)

---

## Project Structure

```text
portfolio-web-v2/
├── public/                  # Static assets, icons, and PDF files (CV, portfolio)
├── src/
│   ├── app/
│   │   ├── (public)/page.tsx# Main public portfolio landing page
│   │   ├── admin/           # Protected admin dashboard, projects, certs, contacts
│   │   ├── sign-in/         # Clerk authentication sign-in page
│   │   ├── layout.tsx       # Root layout (ClerkProvider, ThemeProvider, fonts)
│   │   └── globals.css      # Design tokens and theme styling
│   ├── components/
│   │   ├── admin/           # Admin forms and mutation buttons
│   │   ├── terminal/        # Terminal games, arcade hub, and monitor widgets
│   │   ├── ui/              # Reusable UI primitives (Button, Card, Input, etc.)
│   │   ├── Hero.tsx         # Hero introduction component
│   │   ├── About.tsx        # Profile overview and bio
│   │   ├── ProjectCard.tsx  # Project showcase cards
│   │   ├── CertificateItem.tsx # Certificate entries
│   │   ├── TerminalCLI.tsx  # Interactive terminal command runner
│   │   └── TerminalWorkspace.tsx # Split workspace container
│   ├── db/
│   │   ├── index.ts         # Neon HTTP database client connection
│   │   └── schema.ts        # Drizzle schema (projects, certificates, contacts)
│   ├── lib/
│   │   ├── actions.ts       # Next.js Server Actions for database CRUD
│   │   ├── sound.ts         # Sound effect handlers
│   │   └── utils.ts         # Utility helpers (cn)
│   └── middleware.tsx       # Route protection middleware via Clerk
├── drizzle.config.ts        # Drizzle Kit migration configuration
├── next.config.ts           # Next.js configuration
├── package.json
└── tsconfig.json
```

---

## Getting Started

### 1. Prerequisites

- Node.js 20+ installed
- A PostgreSQL database instance (such as [Neon](https://neon.tech/))
- A [Clerk](https://clerk.com/) account for authentication

### 2. Installation

Clone repository and install dependencies:

```bash
git clone https://github.com/rayasya/portfolio-web-v2.git
cd portfolio-web-v2
npm install
```

### 3. Environment Variables

Create `.env.local` in project root:

```env
# Database (Neon PostgreSQL)
DATABASE_URL=postgresql://user:password@endpoint.neon.tech/neondb?sslmode=require

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in

# Admin Authorization
ADMIN_EMAIL=your-email@example.com
```

### 4. Database Setup

Push schema directly to PostgreSQL database using Drizzle Kit:

```bash
npx drizzle-kit push
```

Or generate and run migrations:

```bash
npx drizzle-kit generate
npx drizzle-kit migrate
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in browser.

---

## Available Scripts

- `npm run dev`: Start Next.js development server.
- `npm run build`: Build application for production.
- `npm run start`: Start production server after build.
- `npm run lint`: Run ESLint checks.

---

## License

Private project. All rights reserved.
