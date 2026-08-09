# JARVIS - Consultancy Copilot PoC

An AI-powered idea validation system that transforms product concepts into market-validated PRDs in minutes.

## What It Does

- **Idea Input:** Describe your product concept
- **Agent 1 - Market Research:** Analyzes TAM, competitors, trends, opportunity score
- **Agent 2 - PRD Generation:** Creates structured product spec from market data
- **Decision Gate:** Build, Refine, or Park the idea
- **Save to JSON:** Persist ideas for later review

## Tech Stack

- **Runtime:** Node.js
- **AI Engine:** Claude API (Anthropic)
- **Frontend:** HTML + Vanilla JS
- **Backend:** Express.js (coming Week 1)
- **Storage:** JSON files (local filesystem)

## Project Structure

jarvis-poc/
├── agents/ # AI agent implementations
│ ├── marketResearch.js
│ └── prdGenerator.js
├── consultancy/ # Knowledge base
│ ├── frameworks/
│ └── ideas/ # Saved ideas (JSON)
├── utils/ # Helper functions
├── dashboard.html # Frontend interface
├── server.js # Express backend
├── orchestrator.js # Agent orchestration
└── .env # Configuration (not committed)


## Quick Start

```bash
# Install dependencies
npm install

# Set your API key
echo "ANTHROPIC_API_KEY=your_key_here" > .env

# Test the setup
node index.js
```

## Week 1 Roadmap

- [x] Day 1: Environment setup
- [ ] Day 2: Agent 1 - Market Research
- [ ] Day 3: Agent 2 - PRD Generation
- [ ] Day 4: Orchestration + Save Ideas
- [ ] Day 5: HTML Dashboard
- [ ] Day 6: Express Backend
- [ ] Day 7: Testing + Demo Prep

## Value Proposition

Compress 5 days of research into 1 hour of validation. Structured AI agents + decision gates = repeatable, client-ready methodology.

## Author

Built by Jonny Paine | PackPT Founder