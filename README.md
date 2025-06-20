# Fútbol Academy Portal & Mobile App

## Overview
A modern, full-stack web and mobile-friendly platform to manage multiple soccer academies. Features role-based dashboards, player development tracking, and smooth communication among administrators, coaches, players, and parents. Inspired by the structure and design of the "World in Ink" platform.

## Tech Stack
- **Frontend:** Next.js 14+ (App Router), React, TypeScript, Tailwind CSS, Lucide React, Zustand, React Hot Toast, React Quill, clsx, class-variance-authority, tailwind-merge
- **Backend:** Next.js API Routes, Prisma ORM, PostgreSQL, Zod
- **Authentication:** NextAuth.js with Prisma adapter
- **Uploads:** Vercel Blob
- **Payments:** Stripe (optional)
- **Security:** bcryptjs
- **Dev Tools:** ESLint, Prettier, TypeScript, Autoprefixer

## Features
- Multi-Academy Support
- Role-Based Access (Admin, Coach, Player, Parent)
- Player Registration & Profiles
- Team Management
- Training Sessions
- Match Management
- Performance Tracking
- Messaging System
- Media Uploads
- Notifications (Email + in-app)
- Fully Responsive

## Getting Started

### 1. Clone the repository
```bash
git clone <repo-url>
cd futbol-academy
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Create a `.env` file in the root:
```
DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/futbol_academy
NEXTAUTH_SECRET=your-secret
NEXTAUTH_URL=http://localhost:3000
VERCEL_BLOB_READ_WRITE_TOKEN=your-vercel-blob-token
STRIPE_SECRET_KEY=your-stripe-key # (optional)
```

### 4. Set up the database
```bash
npx prisma migrate dev --name init
```

### 5. Seed the database
```bash
npx tsx prisma/seed.ts
```

### 6. Run the development server
```bash
npm run dev
```

## Example Login Credentials
- **Admin:** admin@academy.com / adminpass
- **Coach:** coach@academy.com / coachpass
- **Player:** player@academy.com / playerpass
- **Parent:** parent@academy.com / parentpass

## Project Structure
- `/src/app` - App Router pages and layouts
- `/src/components` - Reusable UI components
- `/prisma` - Prisma schema and seed script

## Dev Commands
- `npm run dev` - Start development server
- `npm run lint` - Run ESLint
- `npm run format` - Run Prettier

## Contributing
PRs and issues welcome!

## License
MIT
