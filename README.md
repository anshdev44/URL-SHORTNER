# BitLinks

A modern, fast, and feature-rich URL Shortener built with Next.js 15 (App Router), MongoDB, and Tailwind CSS v4.  
Shorten long URLs into neat, shareable links, customize your aliases, set expiration dates, and track analytics privately with an interactive dashboard!

**Live Demo:** [https://urlshortneransh.netlify.app/](https://bitlinks3.netlify.app/)

---

## Features

- **Lightning Fast Shortening**: Shorten any valid URL instantly.
- **Custom Aliases**: Create memorable, branded short links (e.g., `bitlinks3.netlify.app/my-brand`). Auto-generates a secure 6-character alias if left blank.
- **Link Expiration**: Set your links to expire after 1 hour, 24 hours, 7 days, 30 days, or a custom exact date and time. Expired links safely redirect visitors to an `/expired` page.
- **Private Analytics Dashboard**: Track total clicks, average performance, and view your top-performing links. Analytics are securely tied to your browser (via `localStorage` and `creatorId` tagging) so you only see your own links without needing to create an account!
- **Premium UI/UX**: Stunning glassmorphism design with a dynamic WebGL animated orb background (powered by `ogl`). Fully responsive and mobile-friendly.
- **Built on Modern Tech**: Next.js 15 App Router, React 19, and Tailwind CSS v4.

---

## Tech Stack

- **Frontend:** Next.js (App Router), React, Tailwind CSS v4, Lucide React (Icons), OGL (WebGL)
- **Backend:** Next.js API Routes (Serverless)
- **Database:** MongoDB (Atlas)
- **Deployment:** Netlify + `@netlify/plugin-nextjs`

---

## Installation & Setup

```bash
# 1. Clone the repository
git clone https://github.com/anshdev44/url-shortener.git
cd url-shortener

# 2. Install dependencies
npm install

# 3. Add environment variables
# Create a .env or .env.local file in the root with:
# (Replace with your actual MongoDB Atlas connection string)
MONGO_URL=mongodb+srv://<username>:<password>@cluster0.mongodb.net/BITLINKS?retryWrites=true&w=majority
NEXT_PUBLIC_URL=http://localhost:3000/

# 4. Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## Security & Privacy
- **No Signup Required**: Link ownership is tracked privately using a unique `creatorId` stored in your browser's local storage.
- **Protected Analytics**: API routes enforce `creatorId` verification, ensuring analytics for your links cannot be viewed by unauthorized users.

---

## Project Structure Highlights
- `app/short/page.js`: Main URL generation interface with alias and expiration controls.
- `app/dashboard/page.js`: Private analytics dashboard.
- `app/api/generate/route.js`: API endpoint for generating links and handling database insertions.
- `app/api/analytics/route.js`: Secure API endpoint returning analytics data filtered by the user's `creatorId`.
- `app/[shorturl]/page.js`: Dynamic route handling the redirection and click-tracking logic.
