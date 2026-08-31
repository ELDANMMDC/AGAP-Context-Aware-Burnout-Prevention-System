# AGAP Development Guide

This document explains how to set up, run, and develop AGAP.

It describes the project's current architecture and the development conventions that will be used as AGAP evolves.

> **Current status:** AGAP has a completed React frontend prototype, an established GitHub development workflow, and a working Electron desktop foundation. The project is currently preparing its service/data boundaries before backend and real system integration are introduced.

---

# 1. Project Overview

AGAP is being developed as a desktop application.

The current project consists of a React frontend running inside an Electron desktop application. The frontend currently uses mock data while the architecture is being prepared for future backend and system integration.

The current implementation includes:

* React UI
* TypeScript
* Vite
* Tailwind CSS
* Application screens
* Reusable UI components
* Mock data
* Type definitions
* Frontend interaction/state
* Electron Main process
* Electron Preload
* IPC communication
* Initial service/data boundary preparation

The current project does **not yet** contain:

* Backend/API
* Database
* Authentication
* Real telemetry/data collection
* Production API integration
* Final monitoring implementation
* Automated testing setup
* Production packaging/deployment configuration

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
| Electron 44    | Desktop application runtime       |
| pnpm 10.34.3   | Package manager                   |
| Node.js 22     | Runtime/development environment   |
| Oxfmt          | Code formatting                   |

The project's Node and pnpm versions are specified in **`.mise.toml`**.

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

The project should use the versions specified by **`.mise.toml`**.

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

The project uses **`pnpm-lock.yaml`**.

Do not replace pnpm with another package manager unless the team explicitly decides to change the project configuration.

---

# 5. Running the Project

## 5.1 Run the frontend

Start the Vite development server:

```bash
pnpm dev
```

Vite will provide the local development URL in the terminal.

The current development server uses port `8443`.

The frontend can be opened directly in a browser during renderer development.

---

## 5.2 Build the Electron processes

Build the Electron Main and Preload processes:

```bash
pnpm build:electron
```

This produces the Electron build output in:

```text
dist-electron/
├── main.js
└── preload.cjs
```

The exact generated contents may change as the Electron configuration evolves.

---

## 5.3 Run the Electron application

Start Vite first:

```bash
pnpm dev
```

Then, in another terminal:

```bash
pnpm build:electron
```

Start Electron:

```bash
pnpm dev:electron
```

The AGAP interface should open inside an Electron desktop window.

---

# 6. Building the Project

Build the React renderer:

```bash
pnpm build
```

Build the Electron processes:

```bash
pnpm build:electron
```

The renderer and Electron processes currently use separate Vite build configurations.

The renderer uses:

```text
vite.config.ts
```

The Electron processes use:

```text
electron.vite.config.ts
```

These configurations should remain separate because they target different runtime environments.

---

# 7. Current Project Structure

The current project structure is:

```text
AGAP_BPS/

├── src/
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   │
│   ├── components/
│   │   ├── charts/
│   │   │   └── TrendChart.tsx
│   │   ├── layout/
│   │   │   └── Sidebar.tsx
│   │   ├── icons.tsx
│   │   ├── overlays.tsx
│   │   └── ui/
│   │       └── index.tsx
│   │
│   ├── data/
│   │   └── mockData.ts
│   │
│   ├── lib/
│   │   └── signal.ts
│   │
│   ├── screens/
│   │   ├── AboutScreen.tsx
│   │   ├── CheckInScreen.tsx
│   │   ├── DashboardScreen.tsx
│   │   ├── SettingsScreen.tsx
│   │   └── onboarding/
│   │       └── OnboardingScreens.tsx
│   │
│   ├── services/
│   │
│   └── types/
│       └── agap.ts
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

---

# 8. Application Entry Point

The React application begins at:

```text
src/main.tsx
```

The basic renderer flow is:

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

This remains acceptable for the current stage.

As the application grows, responsibilities may gradually move into dedicated hooks, state modules, or services.

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

Screens should avoid directly implementing infrastructure or platform-specific logic.

---

# 12. Mock Data

Current mock data is located in:

```text
src/data/mockData.ts
```

Mock data currently allows frontend development to continue before the backend and real data sources are available.

Mock data is intentionally temporary.

Do not treat `mockData.ts` as the final data architecture.

The project is transitioning toward:

```text
CURRENT

Screen
  ↓
Mock Data
```

to:

```text
PREPARATION

Screen
  ↓
Service
  ↓
Mock Provider
  ↓
Mock Data
```

and eventually:

```text
FUTURE

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

The purpose of this separation is to allow the backend to replace the mock implementation without requiring the UI to be completely rewritten.

---

# 13. Service / Data Boundary

The service layer is being introduced to separate UI behavior from data access.

The basic principle is:

```text
Screen
  ↓
Service
  ↓
Provider
```

The screen should ask for the information it needs without knowing whether that information comes from mock data, an API, a local store, or another implementation.

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

This boundary should be introduced gradually.

Do not move every existing piece of code into a service simply because a `services/` folder exists.

A service should be created when there is a meaningful data-access or application-operation boundary.

---

# 14. Types

Shared TypeScript types are currently located in:

```text
src/types/agap.ts
```

Types should be reused rather than duplicated across components.

If multiple parts of the application depend on the same data structure, define the type in an appropriate shared location.

Services and providers should use the same shared domain types as the UI where appropriate.

---

# 15. Utilities

Small reusable logic that does not belong to a specific screen or component can be placed in:

```text
src/lib/
```

The current project includes:

```text
src/lib/signal.ts
```

Do not turn `lib/` into a general dumping ground for unrelated code.

If code represents a data-access operation, it should generally belong to the service/provider boundary instead.

---

# 16. Styling

The project uses Tailwind CSS.

Existing styling conventions should be followed when adding UI.

Do not introduce another styling framework without agreement from the team.

Do not redesign unrelated screens while implementing a feature.

---

# 17. Electron Architecture

Electron has now been introduced as the desktop runtime.

The current architecture is:

```text
              AGAP Desktop Application

┌─────────────────────────────────────┐
│             Renderer                │
│                                     │
│          React / TypeScript         │
└──────────────────┬──────────────────┘
                   │
                   ▼
               Preload
                   │
                   ▼
                  IPC
                   │
                   ▼
┌─────────────────────────────────────┐
│          Electron Main              │
│                                     │
│       Desktop/system boundary       │
└──────────────────┬──────────────────┘
                   │
                   ▼
                  OS
```

---

# 18. Electron Main Process

The Electron Main process is located at:

```text
electron/main.ts
```

The Main process is responsible for Electron application lifecycle and desktop-level functionality.

It currently:

* creates the Electron window
* loads the Vite development application
* loads the production renderer
* registers IPC handlers
* manages the Electron application lifecycle

The Main process should eventually contain only controlled desktop/system operations.

It should not become a general-purpose location for application UI logic.

---

# 19. Preload

The preload script is located at:

```text
electron/preload.ts
```

The preload creates the controlled bridge between the renderer and Electron Main.

The current bridge exposes a basic IPC connection test.

The renderer communicates through the exposed API rather than directly importing Electron.

The Electron configuration uses:

```text
contextIsolation: true
nodeIntegration: false
```

These settings should remain enabled.

The preload should expose only the minimum API required by the renderer.

---

# 20. IPC

IPC provides communication between the renderer and Electron Main process.

The current architecture is:

```text
React Renderer
      ↓
window.agap
      ↓
Preload
      ↓
ipcRenderer
      ↓
ipcMain
      ↓
Electron Main
```

The current bridge includes:

```text
agap:ping
```

This is currently a connectivity test rather than a production AGAP capability.

Future IPC channels should be defined deliberately according to actual application requirements.

Do not expose unrestricted Electron APIs to the renderer.

---

# 21. Electron and Service Responsibilities

The service/data boundary and Electron boundary solve different problems.

The service layer answers:

> Where does the application's data or operation come from?

The Electron boundary answers:

> How does the renderer safely access desktop/system capabilities?

For example:

```text
DashboardScreen
      ↓
dashboardService
      ↓
Data Provider
```

is a data boundary.

Whereas:

```text
MonitoringService
      ↓
window.agap.monitoring
      ↓
Preload
      ↓
IPC
      ↓
Electron Main
```

would represent a future desktop capability boundary.

These boundaries should not be collapsed into one layer.

---

# 22. Renderer → Backend Boundary

The future backend architecture is:

```text
React Renderer
      ↓
Frontend Service
      ↓
API Client
      │
      │ HTTPS
      ▼
Backend API
      ↓
Database
```

The renderer should not directly access the database.

The backend should be responsible for:

* API endpoints
* business logic
* authentication
* authorization
* validation
* database access

---

# 23. Renderer → Electron Boundary

Desktop/system functionality should follow:

```text
React Renderer
      ↓
Service / Desktop API
      ↓
Preload
      ↓
IPC
      ↓
Electron Main
      ↓
Operating System
```

Potential future capabilities may include:

* system monitoring
* native notifications
* system tray functionality
* approved filesystem operations
* desktop-specific functionality

These capabilities should be exposed through narrow APIs rather than giving the renderer unrestricted system access.

---

# 24. Development Workflow

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

See **`CONTRIBUTING.md`** for the detailed rules.

---

# 25. Working on a New Feature

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

Run the frontend:

```bash
pnpm dev
```

If the feature involves Electron, also build and run the Electron layer:

```bash
pnpm build:electron
pnpm dev:electron
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

Open a Pull Request into **`develop`**.

---

# 26. Architecture Rules

The following rules should guide development:

### UI

UI components should focus on presentation and user interaction.

### Screens

Screens should coordinate application-level UI behavior but should avoid direct infrastructure access.

### Services

Services should provide application-facing operations and hide the underlying data source or implementation.

### Providers

Providers should implement a particular data source, such as mock data or an API client.

### Electron

Electron Main should handle desktop/system functionality.

### Preload

Preload should expose only narrowly defined APIs required by the renderer.

### Backend

The backend should handle server-side business logic and database access.

### Database

The database should never be accessed directly by the renderer.

---

# 27. Future Project Structure

As the architecture develops, the project may gradually evolve toward:

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

# 28. Testing

Testing infrastructure has not yet been fully established.

As development progresses, appropriate tests should be introduced for:

* utility logic
* services
* data providers
* API integration
* IPC communication
* critical user workflows

Testing should be added according to the risk and importance of each part of the system rather than creating tests purely to increase coverage numbers.

---

# 29. Documentation Responsibilities

Update documentation when a change affects how the team develops, builds, runs, or understands AGAP.

Examples include:

* new development commands
* architecture changes
* new dependencies
* new project conventions
* new service boundaries
* Electron API changes
* backend integration
* deployment changes

Documentation should describe the **actual current state** separately from future plans.

---

# 30. Development Phases

The planned development progression is:

### Phase 1 — Frontend Prototype

**Completed**

* React
* TypeScript
* Vite
* Tailwind
* Mock data
* Completed frontend prototype

### Phase 2 — GitHub and Development Workflow

**Completed**

* Repository
* `main`
* `develop`
* Branch conventions
* Commit conventions
* Pull Requests
* Documentation
* Team development rules

### Phase 3 — Electron Foundation

**Completed**

* Electron
* Main process
* Preload
* IPC
* Desktop application startup
* Secure renderer-to-main boundary

### Phase 4 — Architecture Preparation

**Current**

* Service/data boundaries
* Mock data providers
* Separation between UI and data access
* Clear Electron/API boundaries

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

