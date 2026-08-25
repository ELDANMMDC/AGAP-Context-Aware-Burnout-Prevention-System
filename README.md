# AGAP

AGAP is a Context-Aware Burnout Prevention System that looks for changes in computer-interaction patterns that may be associated with fatigue and burnout risk, specifically for remote workers. It observes behavioral patterns, not content.

## Current Status

**Phase 1 — Frontend Prototype**

The current version includes:

* React 19
* TypeScript
* Vite 8
* Tailwind CSS 4
* Mock data
* Application screens
* Reusable UI components

Electron, backend, database, authentication, and real data integration are planned for later development phases.

---

## Technology Stack

| Technology   | Purpose                    |
| ------------ | -------------------------- |
| React        | Frontend UI                |
| TypeScript   | Application language       |
| Vite         | Development and build tool |
| Tailwind CSS | Styling                    |
| pnpm         | Package manager            |
| Node.js 22   | Development runtime        |

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

### 3. Start the development server

```bash
pnpm dev
```

Open the local URL provided by Vite.

---

## Project Structure

The current source structure is:

```text
src/
├── components/
│   ├── charts/
│   ├── layout/
│   └── ui/
├── data/
├── lib/
├── screens/
└── types/
```

### `components/`

Reusable UI components.

### `screens/`

Application-level screens.

### `data/`

Current mock data.

### `lib/`

Reusable utility logic.

### `types/`

Shared TypeScript types.

See [`DEVELOPMENT.md`](DEVELOPMENT.md) for a detailed explanation of the project structure and architecture.

---

## Development Workflow

AGAP uses a simple feature-branch workflow.

```text
feature/fix/refactor/docs/chore
              ↓
           develop
              ↓
             main
```

### Main branches

* `main` — stable/release-ready code
* `develop` — integration branch

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

The current application is a React/Vite frontend:

```text
Vite
  ↓
React
  ↓
App.tsx
  ↓
Screens
  ↓
Components
  ↓
Mock Data
```

The project does not yet contain the Electron Main process, Preload, IPC, backend, or database.

These will be introduced incrementally as development progresses.

---

## Planned Architecture

The intended future desktop architecture is:

```text
React Renderer
      │
      ├──────────────→ Backend API
      │                     │
      │                     ↓
      │                 Database
      │
      ↓
   Preload
      ↓
     IPC
      ↓
Electron Main
      ↓
      OS
```

The renderer will be responsible for the user interface.

Electron Main and Preload will handle controlled desktop/system functionality.

The backend will handle application/business logic and database access.

Detailed architecture and development procedures are documented in [`DEVELOPMENT.md`](DEVELOPMENT.md).

---

## Documentation

| Document          | Purpose                                                       |
| ----------------- | ------------------------------------------------------------- |
| `README.md`       | Project overview and quick start                              |
| `DEVELOPMENT.md`  | Development setup, architecture, and project structure        |
| `CONTRIBUTING.md` | Team workflow, branches, commits, PRs, and contribution rules |

---

## Project Development

AGAP is being developed incrementally.

The planned progression is:

```text
Frontend Prototype
        ↓
GitHub / Team Workflow
        ↓
Electron Foundation
        ↓
Architecture Preparation
        ↓
Backend
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

Future architecture should be introduced when it becomes necessary rather than restructuring the entire project prematurely.

---

## License

This project is currently being developed as an academic/group project.
