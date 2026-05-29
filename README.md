# ✦ Notionify AI

> Describe your workspace. Notionify AI builds it in Notion — databases, formulas, relations, cover images, and sample data. Done in under 60 seconds.

![Notionify AI](https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&q=80)

## What it does

Notionify AI takes a natural-language prompt and uses **LLaMA 3.3 70B via Groq** to design a complete Notion workspace. It then calls the **Notion API** to build everything live:

- ✅ Multiple linked databases with custom properties
- ✅ Working formula properties (XP, scores, progress)
- ✅ Relations + rollups between databases (wired automatically)
- ✅ Rich page content — callouts, toggles, to-do lists, dividers
- ✅ Contextual cover images from Unsplash
- ✅ Pre-filled sample rows so it looks alive immediately

---

## Quick Start

### 1. Clone and install

```bash
git clone https://github.com/YOUR_USERNAME/notionify-ai.git
cd notionify-ai
npm install
npm start
```

Open `http://localhost:3000`

### 2. Get your API keys

| Key | Where to get it | Cost |
|-----|-----------------|------|
| Groq API Key | [console.groq.com](https://console.groq.com) | Free |
| Notion Token | [notion.so/my-integrations](https://www.notion.so/my-integrations) | Free |

### 3. Set up Notion

1. Go to [notion.so/my-integrations](https://www.notion.so/my-integrations)
2. Create a new integration → copy the token
3. Open the Notion page you want to build inside
4. Click `•••` → Connections → add your integration
5. Copy the page URL and paste it into Notionify AI

---

## Deploy to Railway (recommended)

One-click deploy for a permanent public URL:

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template)

Or manually:
```bash
# Install Railway CLI
npm i -g @railway/cli
railway login
railway init
railway up
```

---

## File Structure

```
notionify-ai/
├── server.js           # Express backend — proxies Groq + Notion APIs
├── package.json
├── README.md
└── public/
    ├── landing.html    # Landing page (served at /)
    └── app.html        # Builder app (served at /app)
```

---

## Example Prompts

```
Startup CRM: contacts linked to deals pipeline, meeting notes per client,
revenue formula, activity log with rollup on last contact date

Freelancer HQ: client database linked to projects, invoices with
formula totals, time tracker, contract templates with toggle sections

Product team OS: roadmap linked to feature requests, bugs database,
sprint tracker with velocity formula, OKR tracker with rollup scores
```

---

## Tech Stack

- **AI**: Groq API — LLaMA 3.3 70B Versatile (4000 tokens)
- **Backend**: Node.js + Express (proxy server)
- **Notion**: Official Notion API v2022-06-28
- **Images**: Unsplash Source API
- **Frontend**: Vanilla HTML/CSS/JS — zero dependencies

---

## License

MIT — use it, fork it, build on it.
