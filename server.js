const express = require("express");
const cors = require("cors");
const path = require("path");
const fetch = (...args) =>
  import("node-fetch").then(({ default: f }) => f(...args));

const app = express();
app.use(cors());
app.use(express.json({ limit: "2mb" }));

// Landing page at /
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "landing.html"));
});

// App at /app
app.get("/app", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "app.html"));
});

app.use(express.static("public"));

// ── Groq proxy ─────────────────────────────────────────────────────────────
app.post("/api/groq", async (req, res) => {
  try {
    const { apiKey, system, prompt } = req.body;
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + apiKey,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: system },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 4000,
      }),
    });
    const data = await response.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ── Notion: create page ────────────────────────────────────────────────────
app.post("/api/notion/pages", async (req, res) => {
  try {
    const response = await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + req.body.notionToken,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body.payload),
    });
    const data = await response.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ── Notion: append blocks ──────────────────────────────────────────────────
app.patch("/api/notion/blocks/:id/children", async (req, res) => {
  try {
    const response = await fetch(
      `https://api.notion.com/v1/blocks/${req.params.id}/children`,
      {
        method: "PATCH",
        headers: {
          Authorization: "Bearer " + req.body.notionToken,
          "Notion-Version": "2022-06-28",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ children: req.body.children }),
      }
    );
    const data = await response.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ── Notion: create database ────────────────────────────────────────────────
app.post("/api/notion/databases", async (req, res) => {
  try {
    const response = await fetch("https://api.notion.com/v1/databases", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + req.body.notionToken,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body.payload),
    });
    const data = await response.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ── Notion: update database (relations/rollups) ────────────────────────────
app.patch("/api/notion/databases/:id", async (req, res) => {
  try {
    const response = await fetch(
      `https://api.notion.com/v1/databases/${req.params.id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: "Bearer " + req.body.notionToken,
          "Notion-Version": "2022-06-28",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body.payload),
      }
    );
    const data = await response.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ── Notion: create DB row ──────────────────────────────────────────────────
app.post("/api/notion/db-rows", async (req, res) => {
  try {
    const response = await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + req.body.notionToken,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body.payload),
    });
    const data = await response.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n✅  Notionify AI running`);
  console.log(`   Landing page → http://localhost:${PORT}`);
  console.log(`   App          → http://localhost:${PORT}/app\n`);
});
