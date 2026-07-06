# Implementation Specification
## Module 12 Project 3 – Interactive Sales Dashboard

| Field | Value |
|---|---|
| Status | Ready for Build Mode |
| Version | 1.0 |
| Date | 2026-07-01 |
| Format | Sequential micro-tasks for Cursor/Claude execution |

---

## How to Use This Document

- Execute tasks **in order** — each one builds on the previous.
- Give the AI coding assistant **one task at a time**, copy-pasting only that task's description.
- Each task is scoped to **≤15 minutes** and touches **one file/component**.
- Do not proceed to the next task until the current task's **Success Criteria** are met.
- No implementation code is included here — each task describes *what* to build and *how to verify it*, not the code itself.

---

## Task List Overview

| # | Task | Layer |
|---|---|---|
| 1 | Scaffold Vite + React + TS project | Setup |
| 2 | Configure Tailwind CSS | Setup |
| 3 | Configure ESLint + strict TypeScript | Setup |
| 4 | Define core TypeScript data models | Types |
| 5 | Create mock dataset | Data |
| 6 | Build the data service (mock fetch + latency + failure mode) | Data |
| 7 | Create Dashboard Context | State |
| 8 | Build `useDashboardData` hook | State |
| 9 | Build `useDateRangeFilter` hook | State |
| 10 | Build number/currency/percent formatters | Utils |
| 11 | Build trend delta calculator | Utils |
| 12 | Build `DashboardLayout` shell | Layout |
| 13 | Build `Header` component | Layout |
| 14 | Build `LoadingSpinner` component | UI State |
| 15 | Build `EmptyState` component | UI State |
| 16 | Build `ErrorState` component | UI State |
| 17 | Build `ErrorBoundary` component | UI State |
| 18 | Build `KpiCard` component | KPI |
| 19 | Build `KpiGrid` component | KPI |
| 20 | Build `RevenueTrendChart` component | Chart |
| 21 | Build `OrdersBarChart` component | Chart |
| 22 | Build `CustomersChart` component | Chart |
| 23 | Build `ConversionRateChart` component | Chart |
| 24 | Build `DateRangeFilter` component | Filter |
| 25 | Assemble `DashboardPage` (wire everything together) | Integration |
| 26 | Responsive QA pass | Polish |
| 27 | Production build + deploy | Deploy |

*(27 tasks total — slightly above "around 20" to keep each one genuinely ≤15 minutes and single-component; combine 2–3 setup tasks if you want an even 20.)*

---

## Task 1 — Scaffold Vite + React + TS Project

**Goal:** Initialize the base project skeleton.
**Scope:** Root project only — no components yet.
**Instructions:** Create a new Vite project using the React + TypeScript template. Verify the dev server runs and displays the default starter page.
**Success Criteria:**
- `npm run dev` starts without errors
- Default Vite/React starter page renders in browser
- `tsconfig.json` present with `strict: true`

---

## Task 2 — Configure Tailwind CSS

**Goal:** Install and wire up Tailwind so utility classes are available project-wide.
**Scope:** `tailwind.config.ts`, `index.css` only.
**Instructions:** Install Tailwind and its peer dependencies, generate config, add Tailwind directives to the global stylesheet.
**Success Criteria:**
- A test Tailwind class (e.g., `bg-blue-500`) visibly applies when added to any element
- No console errors related to PostCSS/Tailwind on dev server start

---

## Task 3 — Configure ESLint + Strict TypeScript

**Goal:** Enforce code quality rules before any feature code is written.
**Scope:** `.eslintrc.cjs`, `tsconfig.json` only.
**Instructions:** Configure ESLint for React + TypeScript. Confirm strict mode settings (`noImplicitAny`, `strictNullChecks`) are active.
**Success Criteria:**
- `npx eslint .` runs with zero errors on the starter project
- `npx tsc --noEmit` runs with zero errors

---

## Task 4 — Define Core TypeScript Data Models

**Goal:** Create the single source of truth for all data shapes.
**Scope:** `src/types/dashboard.types.ts` only.
**Instructions:** Define `DateRangeOption`, `MonthlyDataPoint`, `PeriodMetrics`, `KpiSummary`, `DashboardData`, `DashboardState`, and `TrendResult` exactly as specified in the Technical Architecture document.
**Success Criteria:**
- File compiles with no TypeScript errors
- Every type/interface is exported
- No `any` used anywhere in the file

---

## Task 5 — Create Mock Dataset

**Goal:** Produce realistic sample data matching `MonthlyDataPoint[]`.
**Scope:** `src/services/mockData.ts` only.
**Instructions:** Create a 12-month dataset (current month back 11 months) with plausible, gradually-varying revenue, orders, customers, and conversion rate values.
**Success Criteria:**
- Exported array matches `MonthlyDataPoint[]` type exactly (verified via TS compile)
- Contains exactly 12 entries, chronologically ordered
- No two entries share the same `month` value

---

## Task 6 — Build the Data Service

**Goal:** Implement the `DataService` contract from the Technical Architecture doc.
**Scope:** `src/services/dataService.ts` only.
**Instructions:** Implement `getDashboardData(range)` returning a `Promise<DashboardData>`, filtering `mockData` by the given range, computing `current`/`previous` period metrics, with a simulated delay (e.g., 500–800ms) and an optional simulated-failure toggle for testing.
**Success Criteria:**
- Calling the function with each `DateRangeOption` resolves with correctly filtered data
- Function returns a rejected Promise when failure mode is enabled
- Return shape matches `DashboardData` exactly (TS-verified)

---

## Task 7 — Create Dashboard Context

**Goal:** Set up the shared state container for the whole dashboard.
**Scope:** `src/context/DashboardContext.tsx` only.
**Instructions:** Create a React Context typed to `DashboardState` plus setter functions, and a `DashboardProvider` component that will hold this state (state logic itself comes in Task 8).
**Success Criteria:**
- Context compiles with correct types, no `any`
- `DashboardProvider` renders its children without errors when wrapped around a placeholder component
- Custom `useDashboardContext()` accessor hook throws a clear error if used outside the provider

---

## Task 8 — Build `useDashboardData` Hook

**Goal:** Connect the data service to context state.
**Scope:** `src/hooks/useDashboardData.ts` only.
**Instructions:** On mount and whenever `selectedRange` changes, call `dataService.getDashboardData()`, updating `isLoading`, `data`, and `error` in context accordingly.
**Success Criteria:**
- Loading state is `true` while fetch is pending, `false` after resolution
- `error` is populated only on rejected fetch; cleared on successful retry
- Changing range triggers a new fetch (verified via console logging or React DevTools)

---

## Task 9 — Build `useDateRangeFilter` Hook

**Goal:** Provide a clean interface for reading/updating the selected date range.
**Scope:** `src/hooks/useDateRangeFilter.ts` only.
**Instructions:** Expose `selectedRange` and a `setSelectedRange` function that updates context state.
**Success Criteria:**
- Calling `setSelectedRange('30d')` updates context's `selectedRange` value
- Hook returns a properly typed tuple/object (no `any`)

---

## Task 10 — Build Formatters

**Goal:** Centralize all display formatting logic.
**Scope:** `src/utils/formatters.ts` only.
**Instructions:** Implement `formatCurrency(value)`, `formatPercent(value)`, and `formatNumber(value)` as pure functions.
**Success Criteria:**
- `formatCurrency(45231)` → `"$45,231"`
- `formatPercent(0.045)` → `"4.5%"`
- `formatNumber(12000)` → `"12,000"` (or compact form if specified)
- Functions have no side effects and no React dependencies

---

## Task 11 — Build Trend Delta Calculator

**Goal:** Compute trend direction and magnitude between two periods.
**Scope:** `src/utils/calculations.ts` only.
**Instructions:** Implement `computeTrend(current, previous)` returning a `TrendResult` (`deltaValue`, `deltaPercent`, `direction`).
**Success Criteria:**
- `computeTrend(120, 100)` returns `direction: 'up'`, correct `deltaPercent`
- `computeTrend(80, 100)` returns `direction: 'down'`
- `computeTrend(100, 100)` returns `direction: 'flat'`, `deltaPercent: 0`
- Function is pure (no side effects)

---

## Task 12 — Build `DashboardLayout` Shell

**Goal:** Create the page's outer structural wrapper.
**Scope:** `src/components/layout/DashboardLayout.tsx` only.
**Instructions:** Build a layout component that renders a header slot and a main content slot, styled with Tailwind for page padding/max-width, wrapped in `DashboardProvider`.
**Success Criteria:**
- Renders children passed to it correctly
- Applies consistent page padding/max-width at desktop width
- No data-fetching logic inside this component

---

## Task 13 — Build `Header` Component

**Goal:** Create the top bar containing the dashboard title and filter placeholder.
**Scope:** `src/components/layout/Header.tsx` only.
**Instructions:** Build a header with the dashboard title and a slot/placeholder for `DateRangeFilter` (filter itself built in Task 24).
**Success Criteria:**
- Renders title text correctly
- Layout collapses appropriately at mobile width (title + filter don't overlap)
- No business logic inside this component

---

## Task 14 — Build `LoadingSpinner` Component

**Goal:** Provide visual feedback during data fetch.
**Scope:** `src/components/common/LoadingSpinner.tsx` only.
**Instructions:** Build a simple animated spinner/loading indicator with accessible labeling (e.g., `aria-live`, `role="status"`).
**Success Criteria:**
- Renders visibly with animation
- Includes an accessible text label (visually hidden if needed)
- No props required to render (or sensible defaults)

---

## Task 15 — Build `EmptyState` Component

**Goal:** Communicate "no data" clearly to the user.
**Scope:** `src/components/common/EmptyState.tsx` only.
**Instructions:** Build a component showing a message and icon/illustration indicating no data is available for the selected range.
**Success Criteria:**
- Renders a clear, user-friendly message
- Accepts an optional custom message via props
- Visually distinct from `ErrorState`

---

## Task 16 — Build `ErrorState` Component

**Goal:** Communicate fetch failures clearly to the user.
**Scope:** `src/components/common/ErrorState.tsx` only.
**Instructions:** Build a component showing an error message and (optionally) a retry button/callback prop.
**Success Criteria:**
- Renders the provided error message
- Retry callback prop fires correctly when button is clicked (if implemented)
- Visually distinct from `EmptyState`

---

## Task 17 — Build `ErrorBoundary` Component

**Goal:** Catch unexpected render-time exceptions gracefully.
**Scope:** `src/components/common/ErrorBoundary.tsx` only.
**Instructions:** Build a class-based React error boundary that renders a fallback UI when a child component throws.
**Success Criteria:**
- Throwing an error in a test child component triggers the fallback UI, not a blank screen
- Original app (outside the boundary) remains functional after the error

---

## Task 18 — Build `KpiCard` Component

**Goal:** Display a single KPI metric with its trend.
**Scope:** `src/components/kpi/KpiCard.tsx` only.
**Instructions:** Build a card accepting `label`, `value` (pre-formatted string), and `trend` (`TrendResult`) as props, showing the value plus an up/down indicator with color and icon.
**Success Criteria:**
- Renders label, value, and trend direction correctly for all 3 directions (up/down/flat)
- Trend indicator uses both color AND a non-color cue (icon/arrow)
- Component has no data-fetching or context dependency (pure presentational, driven by props)

---

## Task 19 — Build `KpiGrid` Component

**Goal:** Lay out all 4 KPI cards responsively.
**Scope:** `src/components/kpi/KpiGrid.tsx` only.
**Instructions:** Build a grid component that reads `kpiSummary` from context, computes trends via `computeTrend`, formats values via formatters, and renders 4 `KpiCard` instances.
**Success Criteria:**
- Renders 1 column on mobile, 2 on tablet, 4 on desktop (Tailwind responsive classes verified in browser resize)
- All 4 KPI cards show correct current values and correct trend direction against mock data
- No formatting logic duplicated inside this component (delegated to `utils/formatters.ts`)

---

## Task 20 — Build `RevenueTrendChart` Component

**Goal:** Visualize revenue over time.
**Scope:** `src/components/charts/RevenueTrendChart.tsx` only.
**Instructions:** Build a Recharts line/area chart accepting `data: MonthlyDataPoint[]` as a prop, plotting `month` on X-axis and `revenue` on Y-axis, wrapped in `ResponsiveContainer`, with a tooltip.
**Success Criteria:**
- Chart renders correctly with mock data
- Resizes fluidly when browser window is resized
- Tooltip shows correct formatted revenue value on hover

---

## Task 21 — Build `OrdersBarChart` Component

**Goal:** Visualize order volume over time.
**Scope:** `src/components/charts/OrdersBarChart.tsx` only.
**Instructions:** Build a Recharts bar chart accepting `data: MonthlyDataPoint[]`, plotting `month` vs. `orders`, with `ResponsiveContainer` and tooltip.
**Success Criteria:**
- Chart renders correctly with mock data
- Resizes fluidly
- Tooltip shows correct order count on hover

---

## Task 22 — Build `CustomersChart` Component

**Goal:** Visualize customer growth over time.
**Scope:** `src/components/charts/CustomersChart.tsx` only.
**Instructions:** Build a Recharts line/area chart accepting `data: MonthlyDataPoint[]`, plotting `month` vs. `customers`, with `ResponsiveContainer` and tooltip.
**Success Criteria:**
- Chart renders correctly with mock data
- Resizes fluidly
- Tooltip shows correct customer count on hover

---

## Task 23 — Build `ConversionRateChart` Component

**Goal:** Visualize conversion rate trend over time.
**Scope:** `src/components/charts/ConversionRateChart.tsx` only.
**Instructions:** Build a Recharts line chart accepting `data: MonthlyDataPoint[]`, plotting `month` vs. `conversionRate`, with Y-axis formatted as a percentage, `ResponsiveContainer`, and tooltip.
**Success Criteria:**
- Chart renders correctly with mock data
- Y-axis labels display as percentages (e.g., "4.5%"), not raw decimals
- Tooltip shows correctly formatted percentage on hover

---

## Task 24 — Build `DateRangeFilter` Component

**Goal:** Let the user change the active date range.
**Scope:** `src/components/filters/DateRangeFilter.tsx` only.
**Instructions:** Build a segmented control/dropdown listing all `DateRangeOption` values, using `useDateRangeFilter` to read/update the selected value.
**Success Criteria:**
- Displays all 5 range options (7d, 30d, 6m, YTD, 12m)
- Selecting an option updates context's `selectedRange` (verify via React DevTools or a console log in the hook)
- Fully keyboard-operable (tab + enter/arrow keys)
- Collapses to a dropdown on mobile width, inline control on desktop width

---

## Task 25 — Assemble `DashboardPage`

**Goal:** Wire all pieces together into the final working page.
**Scope:** `src/pages/DashboardPage.tsx` (plus minimal wiring in `App.tsx`) only.
**Instructions:** Compose `ErrorBoundary` → conditional rendering of `LoadingSpinner` / `ErrorState` / `EmptyState` / (`KpiGrid` + charts grid) based on context state, using `useDashboardData`.
**Success Criteria:**
- On initial load, `LoadingSpinner` displays, then KPI cards and charts render with correct data
- Changing the date range filter updates KPI cards and all 4 charts in sync
- Triggering the data service's failure mode displays `ErrorState`, not a broken page
- Selecting a range with no mock data (if applicable) displays `EmptyState`

---

## Task 26 — Responsive QA Pass

**Goal:** Verify the full page across breakpoints.
**Scope:** No new files — layout/styling adjustments only, across existing components.
**Instructions:** Test and fix layout at 375px, 768px, and 1280px widths. Confirm no horizontal scroll, no overlapping elements, no clipped text.
**Success Criteria:**
- All 3 breakpoints render cleanly with no visual bugs
- KPI grid and chart grid reflow correctly at each width
- Header/filter reflow correctly at each width

---

## Task 27 — Production Build & Deploy

**Goal:** Ship a working, publicly accessible deployment.
**Scope:** Build/deploy configuration only — no component changes.
**Instructions:** Run `tsc --noEmit` and ESLint to confirm zero errors, run production build, preview locally, then deploy to the chosen static host (Vercel/Netlify/GitHub Pages).
**Success Criteria:**
- `npm run build` completes with zero errors
- `npm run preview` shows a fully working dashboard identical to dev mode
- Deployed URL is publicly accessible and functions identically to local preview

---

## Notes on Sequencing

- Tasks 1–11 (**Setup → Types → Data → State → Utils**) have no UI output — this is expected; verification is via terminal/console/TS compiler, not the browser.
- Tasks 12–17 (**Layout & UI States**) can be visually spot-checked with placeholder/mock props before real data is wired in.
- Tasks 18–24 (**KPI, Charts, Filter**) are the first tasks producing user-facing, data-driven output.
- Task 25 is the **integration checkpoint** — this is where the app becomes fully functional end-to-end.
- Tasks 26–27 are **polish and shipping**, not new functionality.

---

## ✅ Implementation Specification Status: Ready for Execution

Each task above can be handed to Cursor/Claude individually, in order, with its own Success Criteria used as the review checklist before moving to the next task.
