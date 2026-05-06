# AI vs Human Classifier — TextScan v2.0

A lightweight, client-side web app that classifies text as **AI-generated** or **Human-written** using heuristic token scoring and linguistic pattern analysis.

---

## Project Structure

```
ai-vs-human-classifier/
│
├── index.html          # Entry point
│
├── css/
│   └── styles.css      # All styles, CSS variables, animations
│
├── js/
│   ├── data.js         # Example texts, AI/human token lists, stop words
│   ├── classifier.js   # Tokenization + scoring logic
│   ├── ui.js           # DOM rendering, theme toggle, result display
│   └── app.js          # Main entry: event wiring, analysis orchestration
│
├── assets/
│   └── icons/          # (reserved for local icon assets)
│
└── README.md
```

---

## How It Works

Classification is based on three signals:

1. **Token matching** — text is tokenized (lowercased, stop-words removed) and each token is checked against curated AI-signal and human-signal word lists. AI tokens score +2, human tokens score +3.
2. **Average word length** — longer average word length boosts the AI score; shorter boosts the human score.
3. **Sentence length** — more words per sentence pushes toward AI; fewer toward human.

A final confidence score (52–97%) is derived from the relative proportion of AI vs human signals.

---

## Getting Started

No build step required — just open `index.html` in a browser:

```bash
open index.html
# or
npx serve .
```

---

## Features

- 🌙 Dark / ☀️ Light theme toggle
- ⚡ Instant client-side classification (no server needed)
- 🔍 Signal token highlighting (teal = AI, purple = Human)
- 📊 Word count, matched signals, and average word length stats
- 🕓 Last 5 analyses shown in history panel
- 📋 Three built-in example texts (AI essay, human chat, academic paper)

---

## Customization

- **Add token signals** — edit `AI_TOKENS` and `HUMAN_TOKENS` arrays in `js/data.js`
- **Tune scoring weights** — adjust the `+2`, `+3`, `+4` etc. values in `js/classifier.js`
- **Reskin** — all colours are CSS custom properties in `css/styles.css`
