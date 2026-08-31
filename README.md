# AGAP

AGAP is a Context-Aware Burnout Prevention System that looks for changes in computer-interaction patterns that may be associated with fatigue and burnout risk, specifically for remote workers. It observes behavioral patterns, not content.

---

## Current Status

**Phase 4 — Architecture Preparation**

The frontend prototype and initial desktop foundation have been established.

The current project includes:

* React 19
* TypeScript
* Vite 8
* Tailwind CSS 4
* Mock data
* Application screens
* Reusable UI components
* Electron 44
* Electron Main process
* Preload
* IPC communication
* Initial service/data boundary preparation

The current application can run as a Vite frontend and as an Electron desktop application.

Backend, database, authentication, real telemetry collection, and production API integration are still planned for later development phases.

---

## Technology Stack

| Technology     | Purpose                     |
| -------------- | --------------------------- |
| React 19       | Frontend UI                 |
| TypeScript     | Application language        |
| Vite 8         | Development and build tool  |
| Tailwind CSS 4 | Styling                     |
| Electron 44    | Desktop application runtime |
| pnpm           | Package manager             |
| Node.js 22     | Development runtime         |
| Oxfmt          | Code formatting             |

The project uses Node.js 22 and pnpm 10.34.3.

---

## Getting Started

### 1. Clone the repository

```bash
git clone <AGAP-GITHUB-REPOSITORY-URL>
cd AGAP_BPS
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Start the frontend development server

```bash
pnpm dev
```

Vite will provide the local development URL in the terminal.

The current development server uses port `8443`.

### 4. Build the Electron processes

```bash
pnpm build:electron
```

### 5. Start the Electron application

With the Vite development server running, open another terminal and run:

```bash
pnpm dev:electron
```

This launches the AGAP interface inside an Electron desktop window.

---

## Project Structure

The current project is organized around the React renderer and Electron desktop layer:

```text
AGAP_BPS/

├── src/
│   ├── components/
│   │   ├── charts/
│   │   ├── layout/
│   │   └── ui/
│   ├── data/
│   ├── lib/
│   ├── screens/
│   ├── services/
│   └── types/
│
├── electron/
│   ├── main.ts
│   └── preload.ts
│
├── electron.vite.config.ts
├── vite.config.ts
├── tsconfig.json
├── package.json
├── README.md
├── DEVELOPMENT.md
└── CONTRIBUTING.md
```

### `src/components/`

Reusable UI components.

### `src/screens/`

Application-level screens.

### `src/data/`

Mock data and temporary data implementations used during frontend development.

### `src/services/`

The service/data boundary between UI code and data access.

Services provide a stable interface that allows mock implementations to be replaced by real data sources later.

### `src/lib/`

Reusable utility and domain-support logic.

### `src/types/`

Shared TypeScript types.

### `electron/`

Desktop-specific Electron code.

* `main.ts` — Electron Main process
* `preload.ts` — secure bridge between the renderer and Electron Main

---

## Development Workflow

AGAP uses a feature-branch workflow.

```text
feature/fix/refactor/docs/chore
              ↓
           develop
              ↓
             main
```

### Main branches

* **`main`** — stable/release-ready code
* **`develop`** — integration branch

### Working branches

```text
feature/<description>
fix/<description>
refactor/<description>
docs/<description>
chore/<description>
hotfix/<description>
```

Example:

```text
feature/cloud-backup
```

All normal changes should be submitted through a Pull Request.

At least one other team member should review a Pull Request before it is merged.

See [`CONTRIBUTING.md`](CONTRIBUTING.md) for the complete contribution workflow.

---

## Commit Convention

Use:

```text
type: short description
```

Examples:

```text
feat: add cloud backup setting

fix: resolve settings save issue

refactor: separate dashboard data service

docs: update development guide

chore: update dependencies

test: add settings service tests
```

---

## Current Architecture

The current application has two primary layers: the React renderer and the Electron desktop layer.

```text
                    AGAP Desktop Application

              ┌─────────────────────────────┐
              │       React Renderer        │
              │                             │
              │   App → Screens → UI        │
              │            │                │
              │         Services            │
              └─────────────┬───────────────┘
                            │
                     Service / Data
                        Boundary
                            │
                 ┌──────────┴──────────┐
                 │                     │
                 ▼                     ▼
          Mock Data Provider      Electron API
                                      │
                                    Preload
                                      │
                                     IPC
                                      │
                                Electron Main
                                      │
                                      ▼
                                      OS
```

The React renderer is responsible for the user interface and frontend behavior.

The service layer separates UI code from the underlying data source.

The Electron Main process handles controlled desktop/system functionality.

The preload layer exposes only the Electron capabilities that the renderer needs.

The renderer does not receive unrestricted Node.js or Electron access.

---

## Service / Data Boundary

The frontend is being prepared so that screens do not directly depend on the final data source.

The intended pattern is:

```text
Screen
  ↓
Service
  ↓
Provider
  ↓
Mock Data
```

Later, a real backend implementation can replace the mock provider:

```text
Screen
  ↓
Service
  ↓
API Client
  ↓
Backend API
  ↓
Database
```

This allows the UI to remain relatively stable while the underlying data source changes.

The service boundary should be introduced incrementally rather than through a large project-wide rewrite.

---

## Electron Boundary

Electron provides the desktop capabilities required by AGAP.

The current boundary is:

```text
React Renderer
      ↓
Preload
      ↓
IPC
      ↓
Electron Main
      ↓
Operating System
```

The preload uses Electron's `contextBridge` to expose a controlled API to the renderer.

Electron is configured so that:

```text
contextIsolation = true
nodeIntegration = false
```

The renderer should not directly access Node.js APIs or Electron internals.

The current IPC bridge includes a basic connection test to verify that the renderer-to-Electron boundary is functioning.

---

## Planned Architecture

The intended future architecture is:

```text
                         AGAP Desktop Application

┌─────────────────────────────────────────────────────────────┐
│                         Renderer                            │
│                         React UI                            │
│                                                             │
│  Screens → Services → Data Provider / API Client            │
└───────────────────────┬───────────────────────┬─────────────┘
                        │                       │
                        │ HTTPS                 │ Desktop API
                        ▼                       ▼
                 ┌─────────────┐          ┌──────────┐
                 │  Backend    │          │ Preload │
                 │    API      │          └────┬─────┘
                 └──────┬──────┘               │
                        │                     IPC
                        ▼                       │
                 ┌─────────────┐               ▼
                 │  Database   │       ┌──────────────┐
                 └─────────────┘       │ Electron Main│
                                        └──────┬───────┘
                                               │
                                               ▼
                                               OS
```

The two boundaries have different responsibilities.

### Renderer → Backend

Used for application data and server-side functionality.

Examples may include:

* Dashboard data
* User information
* Settings
* Check-in records
* Authentication
* Application/business data

### Renderer → Preload → Main

Used for desktop and system-level functionality.

Examples may eventually include:

* System monitoring
* Native notifications
* System tray functionality
* Approved filesystem operations
* Desktop-specific functionality

The exact implementation of monitoring capabilities will be introduced only after the architecture and data requirements have been established.

---

## Documentation

| Document              | Purpose                                                                       |
| --------------------- | ----------------------------------------------------------------------------- |
| **`README.md`**       | Project overview and quick start                                              |
| **`DEVELOPMENT.md`**  | Development setup, architecture, project structure, and technical conventions |
| **`CONTRIBUTING.md`** | Team workflow, branches, commits, Pull Requests, and contribution rules       |

---

## Project Development

AGAP is being developed incrementally.

The current progression is:

```text
Frontend Prototype
        ↓
GitHub / Team Workflow
        ↓
Electron Foundation
        ↓
Architecture Preparation
        ↓
Backend Foundation
        ↓
Database
        ↓
Authentication
        ↓
API Integration
        ↓
System / Monitoring Integration
        ↓
Testing
        ↓
Packaging / Deployment
```

The first three stages have been established.

The current focus is establishing clear service/data boundaries before introducing the backend and real system data.

Future architecture should be introduced when it becomes necessary rather than restructuring the entire project prematurely.

---

## License

This project is currently being developed as an academic/group project.
