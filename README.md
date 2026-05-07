# Atlantic EEE Supply S.A. — Website

Corporate website for Atlantic EEE Supply S.A., a maritime and industrial supply company based in Panama City and Colón, Panama.

Built with **Next.js 16**, **Tailwind CSS v4**, **Sanity CMS**, and deployed on **Vercel**.

---

## Tech Stack

| Layer      | Technology                                 |
|------------|--------------------------------------------|
| Framework  | Next.js 16 (App Router)                    |
| Styling    | Tailwind CSS v4                            |
| CMS        | Sanity v5 (embedded studio at `/studio`)   |
| Animations | Framer Motion                              |
| Map        | Custom SVG — Natural Earth 50m vector data |
| Fonts      | Inter Tight (display) · DM Sans (body)     |
| Deployment | Vercel                                     |

---

## Local Development

### Prerequisites

- Node.js 18 or higher
- npm 9 or higher

### Setup

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_ORG/atlantic-eee-supply.git
cd atlantic-eee-supply

# 2. Install dependencies
npm install

# 3. Copy the environment file and fill in your values
cp .env.example .env.local

# 4. Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The Sanity Studio is available at [http://localhost:3000/studio](http://localhost:3000/studio).

---

## Environment Variables

| Variable                         | Required | Description                                      |
|----------------------------------|----------|--------------------------------------------------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID`  | Yes      | Sanity project ID from sanity.io/manage          |
| `NEXT_PUBLIC_SANITY_DATASET`     | No       | Sanity dataset — defaults to `production`        |
| `SANITY_API_READ_TOKEN`          | No       | Viewer token for server-side draft preview       |
| `NEXT_PUBLIC_SITE_URL`           | Yes      | Production URL — used in sitemap and OG tags     |

---

## Sanity CMS Setup

### 1. Create a Sanity project

Go to [sanity.io/manage](https://sanity.io/manage), create a new project, and copy the **Project ID**.

Or use the CLI:

```bash
npx sanity@latest init --env
```

### 2. Add credentials to your env

```bash
# .env.local
NEXT_PUBLIC_SANITY_PROJECT_ID=abc123xyz
NEXT_PUBLIC_SANITY_DATASET=production
```

### 3. Add CORS origins

In [sanity.io/manage](https://sanity.io/manage) → your project → **API** → **CORS Origins**, add:

- `http://localhost:3000` (development)
- `https://your-preview.vercel.app` (Vercel preview)
- `https://atlanticeee.com` (production)

### 4. Access the Studio

Visit `/studio` on any running instance to edit content.

### Editable content schemas

| Schema          | Where it appears                                        |
|-----------------|---------------------------------------------------------|
| `hero`          | Home page — headline, subheading, badge, CTA labels, stat numbers |
| `aboutContent`  | Home overview strip + About page — headline, body, stats, 6 capability tiles |
| `contactInfo`   | Footer — phone, WhatsApp, email, office addresses, tagline |
| `operationsMap` | Operations page — section text, map node labels         |
| `category`      | Products page — category name, description, image, order |
| `brand`         | Brands page + home brands strip — name, specialty, logo |

### How to edit content

1. Go to `/studio` on your running instance (local: `http://localhost:3000/studio`, or your Vercel URL)
2. Log in with your Sanity account
3. Pick the document you want to edit from the left sidebar
4. Edit the fields — every text field has both an **English** and **Spanish** version
5. Click **Publish** — changes go live on next page load

> **Fallback:** If a field is left blank, the site automatically falls back to the hardcoded copy in `src/lib/translations.ts`. You can fill in fields gradually without breaking anything.

---

## Deployment on Vercel

### First deploy

```bash
# Install Vercel CLI if needed
npm i -g vercel

# Deploy from the project directory
vercel
```

Vercel auto-detects Next.js. Add environment variables either via CLI or the Vercel dashboard.

### Production deploy

```bash
vercel --prod
```

Or push to `main` — Vercel auto-deploys on merge to your production branch.

### Required environment variables in Vercel

Add these under **Project Settings → Environment Variables**:

```
NEXT_PUBLIC_SANITY_PROJECT_ID   → your Sanity project ID
NEXT_PUBLIC_SANITY_DATASET      → production
NEXT_PUBLIC_SITE_URL            → https://your-domain.com
SANITY_API_READ_TOKEN           → (optional — needed for draft preview only)
```

The `vercel.json` references these as `@sanity_project_id`, `@sanity_dataset`, etc. — Vercel resolves them automatically from the environment variable values you set in the dashboard.

---

## Repository Structure

```
site/
├── sanity/
│   ├── lib/
│   │   ├── client.ts         Sanity client configuration
│   │   └── queries.ts        GROQ queries for all content types
│   └── schemas/
│       ├── hero.ts
│       ├── category.ts
│       ├── brand.ts
│       ├── contactInfo.ts
│       ├── operationsMap.ts
│       └── index.ts          Schema registry
├── scripts/
│   └── gen-caribbean-map.mjs  Regenerate geographic SVG path data
├── src/
│   ├── app/
│   │   ├── studio/            Embedded Sanity Studio at /studio
│   │   ├── layout.tsx         Root layout — metadata, JSON-LD, fonts
│   │   ├── page.tsx           Home page
│   │   ├── products/
│   │   ├── brands/
│   │   ├── operations/
│   │   ├── about/
│   │   ├── contact/
│   │   ├── sitemap.ts         Auto-generated sitemap.xml
│   │   └── robots.ts          robots.txt
│   ├── components/
│   │   ├── sections/          Page section components
│   │   └── ui/                Shared UI primitives (shadcn)
│   ├── data/
│   │   └── caribbean-map.json Pre-computed geographic SVG paths
│   └── lib/
│       ├── LanguageContext.tsx EN/ES language switcher
│       ├── translations.ts    Hardcoded fallback copy (EN + ES)
│       └── utils.ts
├── public/
│   └── images/                Product category photos
├── .env.example
├── sanity.config.ts
├── next.config.ts
└── vercel.json
```

---

## Regenerating the Map

The geographic SVG map uses pre-processed Natural Earth 50m data. To update the projection or node positions:

```bash
node scripts/gen-caribbean-map.mjs
```

Reads `node_modules/world-atlas/countries-50m.json` and writes updated paths to `src/data/caribbean-map.json`.

---

## Bilingual Support

The site is fully bilingual (EN / ES). Language is toggled client-side. All copy lives in:

- `src/lib/translations.ts` — hardcoded fallback (always works without CMS)
- Sanity CMS — each text field has `{ en, es }` sub-fields for per-language editing

---

## Scripts

```bash
npm run dev      # Development server on :3000
npm run build    # Production build
npm run start    # Serve production build locally
npm run lint     # ESLint
```
