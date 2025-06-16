const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;
const HF_TOKEN = process.env.HF_TOKEN;

app.use(cors());
app.use(express.json());

app.post("/api/generate", async (req, res) => {
  const input = req.body?.text;
  if (!input) return res.status(400).json({ error: "Missing input text." });

  try {
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/google/flan-t5-small",
      { inputs: `Zerlege folgenden Text in Aufgaben mit Titel, Uhrzeit, Wiederholung, Menge:
${input}` },
      {
        headers: {
          Authorization: `Bearer ${HF_TOKEN}`,
          "Content-Type": "application/json"
        },
        timeout: 20000,
      }
    );

    const result = response.data?.[0]?.generated_text || "Keine Antwort.";
    res.json({ result });
  } catch (error) {
    console.error("HF-Fehler:", error.message);
    res.status(500).json({ error: "Fehler beim Abrufen von Hugging Face." });
  }
});

app.listen(PORT, () => console.log(`🟢 PlanJo KI-Proxy läuft auf Port ${PORT}`));