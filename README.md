# 🎮 Mona Mayhem

<div align="center">

**A VS Code & GitHub Copilot CLI Workshop**

*Build a retro arcade GitHub Contribution Battle Arena — from scratch, with AI.*

[![Use this template](https://img.shields.io/badge/Use%20this%20template-2ea44f?style=for-the-badge&logo=github)](https://github.com/rasinduravisara/my-mona-mayhem/generate)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)
[![Astro](https://img.shields.io/badge/Astro-v5-FF5D01?style=for-the-badge&logo=astro&logoColor=white)](https://astro.build/)
[![Open in Dev Containers](https://img.shields.io/static/v1?label=Dev%20Containers&message=Open&color=blue&style=for-the-badge&logo=visualstudiocode)](https://vscode.dev/redirect?url=vscode://ms-vscode-remote.remote-containers/cloneInVolume?url=https://github.com/rasinduravisara/my-mona-mayhem)

</div>

---

![Mona Mayhem Screenshot](https://github.com/user-attachments/assets/5eca79e2-cb9f-4e93-aa0d-23666ebde3b7)

---

## 🕹️ What Is This?

**Mona Mayhem** is a hands-on workshop where you build a fully functioning **GitHub Contribution Battle Arena** — a retro arcade-themed web app that lets two GitHub users face off based on their commit activity.

This repository is your **starting point**. Using GitHub Copilot, you'll go from an empty scaffold to a polished, interactive app — one AI-assisted step at a time.

### 🏆 What You'll Build

| | Feature |
|---|---|
| 🎮 | Retro arcade-themed landing page with pixel-art styling |
| ⚡ | Real-time GitHub contribution graph comparison |
| 🏅 | Dynamic winner announcement based on total contributions |
| 🔥 | Contribution streak counters and color-coded activity graphs |
| 📋 | Shareable battle results with one click |
| 🔊 | Optional: retro sound effects via the Web Audio API |

---

## 📚 Workshop

This workshop supports **two tracks** — pick the one that matches your workflow:

| Track | Tools | Best For |
|-------|-------|----------|
| 🖥️ **VS Code** | Chat, Plan Mode, Agent Mode, background agents | Editor-native development |
| 💻 **CLI** | `copilot`, `@file`, `/plan`, `/fleet`, `/delegate`, `/review` | Terminal-first workflows |

### Lab Parts

| Part | Title | What You'll Do |
|------|-------|----------------|
| [**00**](workshop/00-overview.md) | Overview | Choose your track and review learning goals |
| [**01**](workshop/01-setup.md) | Setup & Context Engineering | Configure your environment and teach Copilot your codebase |
| [**02**](workshop/02-plan-and-scaffold.md) | Plan & Scaffold | Design the API and page architecture before writing code |
| [**03**](workshop/03-agent-mode.md) | Build the Game | Wire up the battle page and contribution graphs with AI |
| [**04**](workshop/04-design-vibes.md) | Design-First Theming | Transform the scaffold into a retro arcade experience |
| [**05**](workshop/05-polish.md) | Polish & Parallel Work | Run multi-agent workflows for UX, resilience, and quality |
| [**06**](workshop/06-bonus.md) | Bonus & Extensions | Tackle open-ended challenges and extra Copilot experiments |

---

## 🚀 Quick Start

### 1. Get the template

Click **[Use this template](https://github.com/rasinduravisara/my-mona-mayhem/generate)** to create your own copy, or fork this repository.

### 2. Open your environment

| Option | Steps |
|--------|-------|
| **Dev Container** *(fastest)* | Open in VS Code → "Reopen in Container" — everything is pre-configured |
| **VS Code (local)** | Clone your repo, open in VS Code, install dependencies with `npm install` |
| **CLI** | Clone your repo, install `copilot`, run `npm install` in the project root |

### 3. Start the workshop

```bash
npm run dev   # start the dev server at http://localhost:4321
```

Then follow the [workshop guide →](workshop/00-overview.md)

---

## 🧠 Skills You'll Practice

| Skill | Description |
|-------|-------------|
| **Context Engineering** | Teach Copilot your codebase with instructions, references, and constraints |
| **Planning** | Draft architecture and design before implementation |
| **Agentic Coding** | Delegate multi-file, multi-step work to Copilot |
| **Design Iteration** | Start from a visual direction and iterate toward a polished result |
| **Review Discipline** | Inspect and approve AI-generated changes before committing |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Astro](https://astro.build/) v5 (SSR) |
| Runtime | Node.js + [@astrojs/node](https://docs.astro.build/en/guides/integrations-guide/node/) adapter |
| Language | TypeScript (strict mode) |
| Styling | Component-scoped CSS + Press Start 2P (retro font) |
| Data | GitHub contribution graph API |

---

## ✅ Prerequisites

**Everyone needs:**
- GitHub Copilot (Pro, Business, or Enterprise)
- Git
- Node.js

**VS Code track also needs:**
- VS Code v1.107+
- GitHub Copilot extension (signed in)

**CLI track also needs:**
- GitHub Copilot CLI (`copilot`)
- Node.js 22+ (for `npm install -g @github/copilot`) or Homebrew / WinGet

> 💡 **Tip:** Use the included **Dev Container** for a zero-setup environment that has everything pre-installed.

---

## License

[MIT](LICENSE)
