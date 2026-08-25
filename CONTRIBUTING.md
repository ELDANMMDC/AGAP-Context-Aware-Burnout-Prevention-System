# Contributing to AGAP

This document defines the team rules for contributing code and documentation to AGAP.

The goal is to keep development organized and predictable while allowing multiple team members to work on the project at the same time.

---

## 1. Basic Rule

Do not develop directly on `main`.

Normal development should follow:

```text
feature/fix/refactor/docs/chore
              ↓
           develop
              ↓
             main
```

* `main` contains stable, release-ready code.
* `develop` is the shared integration branch.
* Work is done on short-lived branches created from `develop`.
* Changes are submitted through Pull Requests.
* At least one other team member should review a Pull Request before it is merged.

---

## 2. Branches

### `main`

`main` contains stable code that is considered ready for a release, demonstration, or deployment.

Do not push directly to `main`.

Changes should normally reach `main` through a Pull Request from `develop`.

### `develop`

`develop` is the team's main integration branch.

Completed feature work is merged into `develop` first.

Developers should normally create their working branches from the latest `develop`.

---

## 3. Branch Naming

Use:

```text
<type>/<short-description>
```

Use lowercase letters and hyphens.

### Feature

Use `feature/` for new functionality.

```text
feature/cloud-backup
feature/user-authentication
feature/settings-api
feature/weekly-checkins
```

### Bug Fix

Use `fix/` for correcting existing behavior.

```text
fix/settings-dialog
fix/check-in-validation
fix/dashboard-loading
```

### Refactoring

Use `refactor/` when restructuring code without intentionally changing its behavior.

```text
refactor/mock-data-service
refactor/settings-components
refactor/electron-ipc
```

### Documentation

Use `docs/` for documentation-only changes.

```text
docs/development-guide
docs/github-workflow
docs/project-architecture
```

### Chore

Use `chore/` for maintenance that does not represent a user-facing feature or bug fix.

```text
chore/update-dependencies
chore/configure-ci
chore/update-project-config
```

### Hotfix

Use `hotfix/` only for urgent fixes to release-ready code in `main`.

```text
hotfix/application-crash
```

Hotfixes should be uncommon.

---

## 4. Creating a Branch

Always start from an updated `develop` branch.

```bash
git checkout develop
git pull
git checkout -b feature/your-feature
```

For example:

```bash
git checkout develop
git pull
git checkout -b feature/cloud-backup
```

Do not create a new feature branch from an outdated local copy of `develop` if you can avoid it.

---

## 5. Commit Convention

Use the following format:

```text
type: short description
```

Supported types:

| Type       | Use                       |
| ---------- | ------------------------- |
| `feat`     | New functionality         |
| `fix`      | Bug fix                   |
| `refactor` | Code restructuring        |
| `docs`     | Documentation             |
| `chore`    | Maintenance/configuration |
| `test`     | Tests                     |

### Good examples

```text
feat: add cloud backup setting
feat: add weekly check-in screen
fix: prevent duplicate check-in submission
refactor: separate dashboard data service
docs: update development guide
test: add settings service tests
chore: update project dependencies
```

### Avoid

```text
update
changes
fixed stuff
final
final2
test
please work
asdf
```

Commit messages should describe the actual change.

---

## 6. Keep Commits Focused

A commit should represent one logical change whenever practical.

Prefer:

```text
feat: add monitoring toggle
feat: add monitoring status service
test: add monitoring service tests
```

over one large commit such as:

```text
feat: add monitoring, settings, dashboard changes, tests, and docs
```

Small, focused commits make reviews and troubleshooting easier.

---

## 7. Pull Requests

All normal feature, fix, refactor, and significant documentation work should be submitted through a Pull Request.

The normal flow is:

```text
Issue
  ↓
Branch
  ↓
Development
  ↓
Testing
  ↓
Push
  ↓
Pull Request
  ↓
Code Review
  ↓
Changes if needed
  ↓
Merge into develop
```

---

## 8. Before Opening a Pull Request

Before opening a PR:

1. Make sure your branch contains the intended changes.
2. Run the application.
3. Test the affected functionality.
4. Check the browser/dev console for obvious errors.

For the current frontend:

```bash
pnpm dev
```

As Electron, backend, and testing are introduced, the PR requirements will be updated accordingly.

---

## 9. Pull Request Rules

A Pull Request should:

* Have a clear title.
* Explain what was changed.
* Explain why the change was needed.
* Reference the relevant GitHub Issue when applicable.

Avoid combining unrelated work into one PR.

## 10. Code Review

At least one other team member should review a normal PR before it is merged.

## 11. Addressing Review Comments

If a reviewer requests changes:

1. Make the requested changes on the same branch.
2. Test the changes.
3. Commit them.
4. Push the branch.
5. Respond to the review comments.

Do not create a completely new pull request.

---

## 12. Merging

Feature branches should normally merge into:

```text
develop
```

Do not merge unfinished work into `main`.

After a PR has been reviewed and approved:

```text
feature/your-feature
        ↓
     develop
```

Once the feature branch has been successfully merged, it can be deleted.

---

## 13. Keeping Your Local Repository Updated

After a feature has been merged, update your local `develop`:

```bash
git checkout develop
git pull
```

Before starting your next task, make sure you are working from the latest `develop`.

---

## 14. Merge Conflicts

If Git reports a merge conflict:

1. Communicate with the team.
2. Resolve the conflict carefully.
---

## 15. Avoiding Duplicate Work

Before starting a task:

1. Check the GitHub Issues.
2. Check open Pull Requests.
3. Check what teammates are currently working on.
4. Assign yourself to the relevant Issue.
5. Create your branch.

This prevents two team members from unknowingly implementing the same feature.

---

## 16. Code Organization Rules

Follow the existing project structure unless there is a clear reason to change it.

Current source organization includes:

```text
src/
├── components/
├── data/
├── lib/
├── screens/
└── types/
```

Use these areas according to their purpose.

### `components/`

Reusable UI components.

### `screens/`

Application screens/pages.

### `data/`

Current mock data and temporary data sources.

### `lib/`

Small reusable utilities or logic that do not belong to a specific screen/component.

### `types/`

Shared TypeScript types.

As the project grows, additional folders such as `services/`, `hooks/`, and Electron-specific directories may be introduced.

Do not create folders simply to make the structure look more complicated.

---

## 17. Naming Conventions

### React components

Use PascalCase:

```text
DashboardScreen.tsx
SettingsScreen.tsx
TrendChart.tsx
```

### Variables and functions

Use camelCase:

```text
riskLevel
userName
handleCheckIn()
getDashboard()
```

### Hooks

Use:

```text
useSomething()
```

For example:

```text
useMonitoring()
useSettings()
useDashboard()
```

### Types

Use PascalCase:

```text
RiskLevel
NavTab
Signal
```

### Files

Use names that describe their purpose.

Avoid vague names such as:

```text
thing.ts
stuff.ts
helper.ts
newComponent.tsx
```

unless the file genuinely represents that concept.

---

## 18. Electron Rules

Electron is planned for a later phase. Once it is introduced, the team will follow these architectural boundaries:

### Renderer

Responsible for:

* React UI
* Components
* Screens
* Frontend state
* User interactions

### Preload

Responsible for exposing a limited, safe API between the renderer and Electron.

### Main Process

Responsible for:

* Electron lifecycle
* Native desktop functionality
* System-level operations
* Window management
* IPC handlers

Renderer code should not receive unrestricted access to Node.js or Electron APIs.

Detailed Electron architecture will be documented in `DEVELOPMENT.md` when Electron integration begins.

---

## 19. Environment Variables and Secrets

Do not commit:

```text
.env
```

or files containing:

* Database passwords
* Authentication secrets
* Private API keys
* Encryption keys
* Other credentials

Use `.env.example` to document required variables without including real values.

Remember that values bundled into a distributed Electron application should not be considered secret.

---

## 19. Quick Reference

For normal feature work:

```bash
git checkout develop
git pull
git checkout -b feature/my-feature

# make changes

pnpm dev

git add .
git commit -m "feat: describe the change"
git push -u origin feature/my-feature
```

Then:

```text
Open Pull Request
        ↓
develop
        ↓
Review
        ↓
Fix comments if needed
        ↓
Merge
        ↓
Delete branch
```
