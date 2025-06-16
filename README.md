# PlanJo Hugging Face Proxy

Ein kleiner Node.js-Proxy für Hugging Face Inference API (z. B. flan-t5-small).

## Nutzung

1. Erstelle auf https://huggingface.co/settings/tokens einen Token (READ access)
2. Setze in Vercel eine Umgebungsvariable:

   HF_TOKEN = dein_token

3. Deploye dieses Projekt bei Vercel (als `Other`, root directory `./`)
4. Deine API läuft danach z. B. unter:
   https://deinprojekt.vercel.app/api/generate

## API

POST /api/generate

JSON Body:
```json
{ "text": "200g Creatin täglich um 8 Uhr" }
```

Antwort:
```json
{ "result": "1. Titel: Creatin\n2. Menge: 200g\n3. Uhrzeit: 08:00\n4. Wiederholung: täglich" }
```