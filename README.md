# URL Shortener 🚀

A simple and fast **URL Shortener** built with **Next.js (App Router)**, MongoDB, and deployed on **Netlify**.  
You can shorten long URLs into neat, shareable links and track them with ease.  

**Live Demo:** [https://bitlinks3.netlify.app/](https://bitlinks3.netlify.app/)

---

## ✨ Features
- 🔗 Shorten any valid URL in seconds
- 📡 Redirects to the original URL instantly
- ⚡ Built using **Next.js App Router**
- 📦 MongoDB for storing URLs
- ☁️ Deployed on **Netlify** with API routes
- 📱 Responsive UI

---

## 🛠 Tech Stack
- **Frontend:** Next.js (App Router), React
- **Backend:** Next.js API Routes
- **Database:** MongoDB (Atlas)
- **Deployment:** Netlify + `@netlify/plugin-nextjs`

---

## 📂 Project Structure
URL-SHORTENER/
├── app/
│ ├── [shorturl]/ # Dynamic route for redirects
│ ├── about/ # About page
│ ├── api/
│ │ └── generate/ # API route to generate short URLs
│ ├── components/ # UI Components (Navbar, Main section)
│ ├── db/ # MongoDB connection
│ ├── short/ # Shortened link display page
│ ├── layout.js # Root layout
│ ├── page.js # Homepage
│
├── public/ # Static assets
├── .env.local # Environment variables
├── package.json
├── netlify.toml



---

## ⚙️ Installation & Setup

```bash
# 1️⃣ Clone the repository
git clone https://github.com/anshdev44/url-shortener.git
cd url-shortener

# 2️⃣ Install dependencies
npm install

# 3️⃣ Add environment variables
# Create a .env.local file in the root with:
# (Replace with your actual MongoDB connection string)
MONGODB_URI=your_mongodb_connection_string
NEXT_PUBLIC_URL=https://bitlinks3.netlify.app/

# 4️⃣ Run locally
npm run dev




