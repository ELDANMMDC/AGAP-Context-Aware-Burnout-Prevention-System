# AGAP Development Guide

This document explains how to set up, run, and develop AGAP.

It describes the project's current architecture and the development conventions that will be used as AGAP evolves.

> **Current status:** AGAP is currently a React + TypeScript + Vite frontend prototype using mock data. Electron, backend, database, authentication, and real API integration are planned for later development phases.

---

# 1. Project Overview

AGAP is being developed as a desktop application.

The current project is the completed frontend prototype that will serve as the foundation for the future Electron application.

The current prototype includes:

* React UI
* TypeScript
* Vite
* Tailwind CSS
* Application screens
* Reusable UI components
* Mock data
* Type definitions
* Frontend interaction/state

The current prototype does **not** yet contain:

* Electron
* Electron Main process
* Preload
* IPC
* Backend/API
* Database
* Authentication
* Real telemetry/data collection
* Automated testing setup

These will be introduced in later development phases.

---

# 2. Technology Stack

The current project uses:

| Technology     | Purpose                           |
| -------------- | --------------------------------- |
| React 19       | UI framework                      |
| TypeScript     | Programming language              |
| Vite 8         | Development server and build tool |
| Tailwind CSS 4 | Styling                           |
| pnpm 10.34.3   | Package manager                   |
| Node.js 22     | Runtime/development environment   |
| Oxfmt          | Code formatting                   |

The project's Node and pnpm versions are specified in `.mise.toml`.

---

# 3. Requirements

Before developing AGAP, install:

* Node.js 22
* pnpm 10.34.3
* Git
* VS Code or another suitable code editor

Check your versions:

```bash
node --version
pnpm --version
git --version
```

The project should use the versions specified by `.mise.toml`.

---

# 4. Installing the Project

Clone the repository:

```bash
git clone <AGAP-GITHUB-REPOSITORY-URL>
```

Enter the project:

```bash
cd AGAP_BPS
```

Install dependencies:

```bash
pnpm install
```

The project uses `pnpm-lock.yaml`.

Do not replace pnpm with another package manager unless the team explicitly decides to change the project configuration.

---

# 5. Running the Project

Start the development server:

```bash
pnpm dev
```

Vite will provide the local development URL in the terminal.

Open that URL in the browser.

---

# 6. Building the Project
--
---

# 7. Current Project Structure

The current source structure is:

```text
src/
├── App.tsx
├── main.tsx
├── index.css
│
├── components/
│   ├── charts/
│   │   └── TrendChart.tsx
│   ├── layout/
│   │   └── Sidebar.tsx
│   ├── icons.tsx
│   ├── overlays.tsx
│   └── ui/
│       └── index.tsx
│
├── data/
│   └── mockData.ts
│
├── lib/
│   └── signal.ts
│
├── screens/
│   ├── AboutScreen.tsx
│   ├── CheckInScreen.tsx
│   ├── DashboardScreen.tsx
│   ├── SettingsScreen.tsx
│   └── onboarding/
│       └── OnboardingScreens.tsx
│
└── types/
    └── agap.ts
```

---

# 8. Application Entry Point

The application begins at:

```text
src/main.tsx
```

The basic flow is:

```text
index.html
    ↓
src/main.tsx
    ↓
<App />
    ↓
src/App.tsx
    ↓
Screens / Components
```

`main.tsx` creates the React application root and renders `App`.

---

# 9. `App.tsx`

`App.tsx` currently acts as the central application controller.

It currently manages things such as:

* onboarding state
* active navigation
* user information
* risk state
* monitoring state
* notifications
* check-in state
* screen selection

It also connects the main screens and shared layout components.

This is acceptable for the current prototype.

As the application grows, some of these responsibilities may be moved into dedicated hooks, state modules, or services.

Do not perform a large rewrite simply for the sake of restructuring.

---

# 10. Components

Reusable UI components belong in:

```text
src/components/
```

Examples include:

```text
components/layout/Sidebar.tsx
components/charts/TrendChart.tsx
components/ui/index.tsx
```

A component should generally be placed here when it is reusable or represents a shared UI element rather than a complete application screen.

---

# 11. Screens

Application-level screens belong in:

```text
src/screens/
```

Current screens include:

```text
DashboardScreen
CheckInScreen
SettingsScreen
AboutScreen
OnboardingScreens
```

Screens should represent larger sections of the application and compose reusable components.

---

# 12. Mock Data

Current mock data is located in:

```text
src/data/mockData.ts
```

This currently provides the data used by the frontend prototype.

Mock data is intentionally temporary.

Do not treat `mockData.ts` as the final data architecture.

The planned transition is:

```text
CURRENT

Screen
  ↓
Mock Data


PREPARATION

Screen
  ↓
Service / Data Provider
  ↓
Mock Data


FUTURE

Screen
  ↓
Service / API Client
  ↓
Backend
  ↓
Database
```

The purpose of this separation is to allow the backend to replace the mock implementation without requiring the UI to be completely rewritten.

---

# 13. Types

Shared TypeScript types are currently located in:

```text
src/types/agap.ts
```

Types should be reused rather than duplicated across components.

If multiple parts of the application depend on the same data structure, define the type in an appropriate shared location.

---

# 14. Utilities

Small reusable logic that does not belong to a specific screen or component can be placed in:

```text
src/lib/
```

The current project includes:

```text
src/lib/signal.ts
```

Do not turn `lib/` into a general dumping ground for unrelated code.

---

# 15. Styling

The project uses Tailwind CSS.

Existing styling conventions should be followed when adding UI.

Do not introduce another styling framework without agreement from the team.

Do not redesign unrelated screens while implementing a feature.

---

# 16. Development Workflow

The standard development workflow is:

```text
GitHub Issue
      ↓
Assign task
      ↓
Update develop
      ↓
Create branch
      ↓
Implement
      ↓
Test
      ↓
Commit
      ↓
Push
      ↓
Pull Request
      ↓
Code Review
      ↓
Merge into develop
```

See `CONTRIBUTING.md` for the detailed rules.

---

# 17. Working on a New Feature

Start with:

```bash
git checkout develop
git pull
```

Create a branch:

```bash
git checkout -b feature/my-feature
```

Develop the feature.

Run:

```bash
pnpm dev
```
Test the application.

Commit your changes:

```bash
git add .
git commit -m "feat: describe the feature"
```

Push:

```bash
git push -u origin feature/my-feature
```

Open a Pull Request into `develop`.

---

# 18. Current Architecture

The current application is:

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

There is currently no Electron layer.

This is important when working on the current prototype.

Do not create Electron-specific code until the Electron integration phase begins.

---

# 19. Planned Electron Architecture (not final)

Electron will be introduced in a later phase.

The intended architecture is:

```text
                 AGAP Desktop Application

                 ┌───────────────────────┐
                 │       Renderer        │
                 │   React application   │
                 └───────────┬───────────┘
                             │
                          Preload
                             │
                            IPC
                             │
                 ┌───────────▼───────────┐
                 │    Electron Main      │
                 │ native/system work    │
                 └───────────┬───────────┘
                             │
                            OS
```

The renderer should handle UI and frontend behavior.

The Electron Main process should handle desktop/system-level functionality.

The preload should expose only the APIs that the renderer actually needs.

The renderer should not receive unrestricted Node.js or Electron access.

---

# 20. Backend Architecture (not final)

The planned backend architecture is:

```text
React Renderer
      │
      ↓
Frontend Service / API Client
      │
      │ HTTPS
      ↓
Backend API
      │
      ↓
Database
```

The database should be accessed by the backend rather than directly by the renderer.

---

# 21. Electron and Backend Responsibilities

The two boundaries serve different purposes.

### Renderer → Backend

Used for ordinary application data.

Examples:

```text
Get dashboard data
Save settings
Submit check-in
Retrieve user information
```

### Renderer → Preload → Main

Used for desktop/system capabilities.

Examples may eventually include:

```text
System monitoring
Native notifications
System tray
Filesystem operations
Desktop-specific functionality
```

This separation should be maintained as AGAP grows.

---

# 22. Backend and Database

The backend should be responsible for:

* API endpoints
* business logic
* authentication
* authorization
* validation
* database access

The database should not be exposed directly to the renderer.

Database credentials must never be included in the renderer or committed to GitHub.

The exact backend and database technologies will be selected during the backend architecture phase rather than introduced prematurely.

---

# 23. Mock Data to Real Data (plan not final)

The current mock data allows frontend development to continue before the backend exists.

When backend development begins, do not replace mock data everywhere manually.

Instead, establish a service boundary.

For example:

```text
DashboardScreen
      ↓
dashboardService
      ↓
mockDashboardProvider
```

Later:

```text
DashboardScreen
      ↓
dashboardService
      ↓
apiClient
      ↓
Backend API
```

This allows the UI to remain relatively stable while the data source changes.

---

# 24. Future Project Structure (plan not final)

As Electron and backend development begin, the project may gradually evolve toward something similar to:

```text
AGAP/
├── src/
│   ├── components/
│   ├── screens/
│   ├── hooks/
│   ├── services/
│   ├── data/
│   │   └── mock/
│   ├── lib/
│   └── types/
│
├── electron/
│   ├── main.ts
│   ├── preload.ts
│   ├── ipc/
│   └── services/
│
├── backend/
│   ├── api/
│   ├── services/
│   ├── database/
│   └── ...
│
├── README.md
├── DEVELOPMENT.md
├── CONTRIBUTING.md
└── .env.example
```

---

# 25. Testing

--

---


# 26. Documentation Responsibilities

Update documentation when a change affects how the team develops or runs AGAP.

---

# 27. Development Phases (not final)

The planned development progression is:

### Phase 1 — Frontend Prototype

Current state:

* React
* TypeScript
* Vite
* Tailwind
* Mock data
* Completed frontend prototype

### Phase 2 — GitHub and Development Workflow

Current setup:

* Repository
* `main`
* `develop`
* Branch conventions
* Commit conventions
* Pull Requests
* Documentation

### Phase 3 — Electron Foundation

Introduce:

* Electron
* Main process
* Preload
* IPC
* Desktop application startup

### Phase 4 — Architecture Preparation

Introduce:

* Service/data boundaries
* Mock data providers
* Clear separation between UI and data access

### Phase 5 — Backend Foundation

Introduce:

* Backend API
* API structure
* Business logic
* Backend configuration

### Phase 6 — Database

Introduce:

* Database schema
* Migrations
* Seed/development data
* Database access layer

### Phase 7 — Authentication

Introduce authentication and authorization where required.

### Phase 8 — API Integration

Gradually replace mock providers with real backend services.

### Phase 9 — System/Monitoring Integration

Introduce the approved Electron/system-level functionality.

### Phase 10 — Testing

Add appropriate tests for:

* Logic
* Services
* API
* IPC
* Critical workflows

### Phase 11 — Packaging and Deployment

Prepare:

* Electron builds
* Installers
* Production configuration
* Release process


