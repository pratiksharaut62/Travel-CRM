# MoonTrip Dashboard (UI Skeleton)

A React + TypeScript + Tailwind CSS front-end skeleton that mirrors the
structure and visual design of the MoonTrip travel-agency dashboard
screenshots: sidebar navigation with collapsible groups, ~28 routed pages,
and Add / Edit / Delete interactions on every list-style module.

**This build is UI-only.** There is no backend and no network calls. All
"data" lives in memory for the current browser session (see
`src/context/DataContext.tsx`) and resets on refresh — which is why every
page starts in the same empty state as the reference screenshots. Wiring
it to a real API is a matter of swapping the functions in
`DataContext.tsx` for `fetch`/`axios` calls; every page already reads and
writes through that one context, so no page code needs to change.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (defaults to http://localhost:5173).

To type-check and build a production bundle:

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  App.tsx                 route table (~28 routes)
  main.tsx                app entry point
  context/DataContext.tsx local in-memory CRUD store (swap for a real API here)
  data/
    navigation.ts          sidebar structure (groups + children + badges)
    moduleConfigs.ts        per-module config: columns, add/edit form fields, labels
  layout/
    Sidebar.tsx             dark nav with collapsible groups (matches reference)
    DashboardLayout.tsx     sidebar + content area + floating help widget
  components/
    icons.tsx               hand-built SVG icon set (no external icon package)
    GenericListPage lives in pages/ — see below
    FormModal.tsx            config-driven Add/Edit modal
    ConfirmDialog.tsx        delete confirmation
    FloatingHelp.tsx         WhatsApp + "Ask Tara" floating widget
  pages/
    Dashboard.tsx            home page (stat cards, charts, quick actions)
    GenericListPage.tsx      generic list/search/filter/table page used by
                              every CRUD module (Leads, Bookings, Accounting
                              Entries, Bank Accounts, Chart of Accounts,
                              Sales Invoices, Receipts, Customers, Vendor
                              Directory, Bills, Payments, Datasets, Lead
                              Sources, Team, ...)
    Tara.tsx, AskAnything.tsx, InteractiveDemo.tsx, Help.tsx, ...
    accounts/, customers/, vendors/, datasets/, settings/   route groups
```

## How the CRUD pages work

Every "list" page (Leads, Bookings, Bills, Invoices, etc.) is the same
`GenericListPage` component, configured by an entry in
`src/data/moduleConfigs.ts`. Each entry defines:

- the table columns
- the Add/Edit form fields (label, input type, options, required)
- the empty-state copy
- optional status filter chips

To add a brand-new list page, add one object to `moduleConfigs.ts` and one
route in `App.tsx` — you do not need to write a new page component.

Records are added/edited/deleted through `useData()` from
`DataContext.tsx`, keyed by module (e.g. `"leads"`, `"bookings"`). Swap
that file's three functions (`addRecord`, `updateRecord`, `deleteRecord`,
`getRecords`) for real API calls and every page in the app will use live
data with zero other changes.

## Design tokens

Colors, radii and shadows are defined once in `tailwind.config.js` under
`theme.extend` (`sidebar.*`, `brand.*`, `ink.*`, `canvas`, `card`) so the
whole app's palette can be retuned from one file.

## Notes

- Icons are hand-built inline SVGs in `src/components/icons.tsx` (no
  external icon package), styled to resemble the reference screenshots'
  navigation icons, plus a WhatsApp badge icon and an AI "sparkle" icon
  for Tara / Ask Anything, matching the reference.
- The floating "Ask Tara" + WhatsApp widget appears on every page except
  the Tara chat page itself.
- This was built without network access to npm, so dependencies have not
  been installed or executed in the build environment — run `npm install`
  locally to pull them down and verify the build.
