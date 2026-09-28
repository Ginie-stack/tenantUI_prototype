# Multitenant Video SaaS — Copilot Frontend Prototype Guide

**Document Type:** AI Coding Guide / Prototype Specification  
**Target:** GitHub Copilot or another coding agent  
**Prototype Scope:** Tenant-facing frontend only  
**Technology Constraint:** HTML5, CSS3, and vanilla JavaScript only  
**Backend:** None  
**Database:** None  
**External APIs:** None  
**Purpose:** Produce a convincing interactive prototype for client demonstration

---

## 1. Purpose

Build a complete **tenant-page frontend prototype** for the Multitenant Video SaaS.

This prototype is intended to demonstrate to the client how the tenant-facing application is expected to look and behave before backend implementation begins.

The prototype must therefore:

- look like a polished SaaS application rather than a collection of plain HTML forms;
- provide all major tenant-platform pages;
- provide realistic sample data;
- support navigation between pages;
- demonstrate important interactions with JavaScript;
- demonstrate validation, modals, tables, cards, forms, notifications, empty states, loading states, and confirmation dialogs;
- include a responsive layout for desktop, tablet, and mobile;
- use only HTML, CSS, and vanilla JavaScript;
- remain completely self-contained and runnable without a backend.

**Important:** This is a visual/interaction prototype. Do not implement real authentication, real payment processing, real Selcom integration, real withdrawals, real database operations, or real file storage.

---

# 2. Source-of-Truth Requirements

The frontend must be based on the project requirements and system-design documents supplied with this project.

The current tenant-facing platform contains these major areas:

1. Dashboard
2. Videos
3. Plans
4. Customize Site
5. Withdrawals
6. Transaction History
7. Transaction Verification
8. My Account

The tenant also has a separate customer-facing website accessible through a platform-generated subdomain.

The prototype should represent the tenant management platform and include a **Preview Tenant Website** experience so the client can see what the customer's website will look like.

Do not invent major product capabilities that are not supported by the project requirements.

Small visual decisions such as spacing, typography, icons, card arrangement, modal presentation, navigation style, and responsive behavior may be chosen by the coding agent as UI implementation details.

---

# 3. Technology Rules

Use only:

- HTML5
- CSS3
- Vanilla JavaScript

Do NOT use:

- React
- Vue
- Angular
- Svelte
- Bootstrap
- Tailwind
- jQuery
- external UI frameworks
- external component libraries
- a frontend build framework
- a backend
- a database

External fonts may be avoided so the prototype remains self-contained.

Prefer a clean project structure:

```text
tenant-prototype/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── app.js
├── assets/
│   ├── images/
│   └── videos/
└── README.md
```

If actual local video/image assets are unavailable, use carefully designed placeholders rather than requiring external services.

---

# 4. Prototype Design Direction

Create a modern, professional SaaS dashboard.

The visual language should communicate:

- trustworthy financial management;
- professional video management;
- simplicity;
- clarity;
- modern SaaS usability.

Use a consistent design system:

- clear typography hierarchy;
- generous but controlled spacing;
- rounded cards;
- subtle borders/shadows;
- strong primary actions;
- clear secondary actions;
- status badges;
- responsive tables;
- modal dialogs;
- form validation feedback;
- toast notifications;
- consistent icons.

Do not make the interface visually excessive.

Avoid:

- unnecessary animations;
- excessive gradients;
- clutter;
- giant decorative elements;
- confusing navigation;
- excessive colors;
- overly complicated dashboards.

The interface should feel suitable for a real SaaS product.

---

# 5. Global Application Layout

Use a desktop dashboard layout consisting of:

```text
┌─────────────────────────────────────────────────────────────┐
│ Top Header                                                  │
│ Logo / Product Name    Search     Tenant Website   Profile │
├───────────────┬─────────────────────────────────────────────┤
│ Sidebar       │                                             │
│               │              Main Content                   │
│ Dashboard     │                                             │
│ Videos        │                                             │
│ Plans         │                                             │
│ Customize     │                                             │
│ Withdrawals   │                                             │
│ Transactions  │                                             │
│ Verification  │                                             │
│ My Account    │                                             │
│               │                                             │
│ Help/Status   │                                             │
└───────────────┴─────────────────────────────────────────────┘
```

On smaller screens:

- collapse the sidebar;
- provide a mobile menu button;
- keep the header usable;
- make cards stack;
- convert wide tables into horizontally scrollable containers or responsive cards;
- preserve all functionality.

The active navigation item must be visually obvious.

---

# 6. Global Header

The top header should include:

- SaaS/product name;
- optional small tenant identifier;
- link/button for "View Website";
- notification icon or notification area;
- tenant profile menu.

Profile menu should demonstrate:

- My Account
- View Website
- Logout

Logout is prototype-only and may return the user to a demonstration login screen.

---

# 7. Sidebar Navigation

Create navigation items for:

- Dashboard
- Videos
- Plans
- Customize Site
- Withdrawals
- Transaction History
- Transaction Verification
- My Account

Use clear icons if possible without external libraries. Inline SVG icons are acceptable.

Add a visually distinct "View Website" action near the bottom of the sidebar.

The sidebar should remain consistent while navigating between pages.

---

# 8. Dashboard Page

## 8.1 Purpose

The dashboard provides the tenant with an overview of the tenant's platform activity.

The project requirements establish that the dashboard includes:

- tenant website link;
- withdrawable amount;
- video count;
- active customer subscriptions;
- additional dashboard statistics;
- immediate updates after relevant transactions.

The requirements also establish that the dashboard amount is the **withdrawable amount** and that the revenue concept is **net revenue**.

## 8.2 Layout

Create a top welcome area:

```text
Welcome back, Demo Tenant

Manage your videos, subscriptions, website and earnings from one place.

[ View Website ]
```

Then provide metric cards such as:

- Withdrawable Balance
- Total Videos
- Active Subscriptions
- Net Revenue

Add additional useful statistics consistent with the requirements, for example:

- Premium Videos
- Free Videos
- Pending Transactions
- Pending Withdrawal

Do not present invented values as real production data. Clearly use demonstration/sample data.

## 8.3 Website Preview Card

Include a prominent card:

```text
Your Website

demo-tenant.example.com

[ Open Website ]
[ Copy Link ]
```

Because the real domain is not finalized, use a prototype domain such as:

```text
demo-tenant.prototype.local
```

Do not imply this is the final production domain.

## 8.4 Recent Activity

Show realistic sample activity:

- payment received;
- subscription activated;
- video uploaded;
- withdrawal submitted.

Include dates and statuses.

## 8.5 Dashboard Interactions

Implement:

- Copy website URL;
- View Website;
- refresh demo statistics;
- activity item interactions;
- toast notifications.

---

# 9. Videos Page

## 9.1 Purpose

The tenant can manage videos uploaded to their website.

The requirements establish:

- video upload;
- title;
- maximum upload size of 50 MB;
- MP4 only;
- poster image;
- MPEG/JPEG poster formats;
- priority;
- free/premium classification;
- editing;
- replacement of video;
- replacement of poster;
- deletion;
- videos displayed on the tenant website;
- priority controls ordering on the website.

## 9.2 Page Header

Use:

```text
Videos

Manage the videos available on your tenant website.

[ + Upload Video ]
```

## 9.3 Video Cards/Table

Show each video with:

- poster;
- title;
- Free/Premium badge;
- priority;
- upload date;
- status;
- actions.

Actions:

- Preview
- Edit
- Delete

Use a polished card/grid layout on desktop and a stacked layout on mobile.

## 9.4 Upload Modal

Fields:

- Video Title
- Video File
- Poster Image
- Priority
- Access Type:
  - Free
  - Premium

Display requirements beside the upload control:

```text
Maximum size: 50 MB
Video format: MP4
Poster format: MPEG/JPEG
```

Validate in JavaScript:

- title required;
- video required;
- video extension/type is MP4;
- video size <= 50 MB;
- poster format is accepted;
- priority is valid.

Show an upload progress simulation.

Do not actually upload anything to a server.

After simulated completion, add the video to the local demo state and update the interface.

## 9.5 Edit Video

The Edit action should open the same style of modal.

Allow:

- title change;
- video replacement;
- poster replacement;
- priority change;
- Free/Premium change.

Clearly distinguish replacing the video file from editing metadata.

## 9.6 Delete Video

Before deletion:

```text
Delete Video?

This action requires checking whether the video is still associated with active customer subscription access.

[Cancel] [Continue]
```

For the prototype, demonstrate the business rule with a simulated state:

- if active subscription access exists, show a warning that deletion cannot immediately remove the resource;
- otherwise show the deletion confirmation.

Do not implement a real subscription engine.

## 9.7 Video Preview

Open a modal containing:

- poster/video preview;
- title;
- Free/Premium status;
- priority.

For premium videos, demonstrate the preview concept:

```text
Preview remaining: 00:10
```

Then simulate playback blocking and show:

```text
Preview ended

Subscribe to continue watching.

[ View Plans ]
```

---

# 10. Plans Page

## 10.1 Purpose

The tenant manages subscription plans.

Each plan contains:

- name;
- cost;
- duration;
- time period.

Supported time-period choices:

- Day
- Weekly
- Monthly

Currency:

- TZS

## 10.2 Important Business Rules

The prototype must visually demonstrate:

- plans unlock access to all premium videos;
- individual premium-video purchases are not supported;
- editing a plan applies only to new subscribers;
- deleting a plan removes it from availability to new subscribers;
- existing subscribers retain the terms/access applicable to their existing subscription until expiration.

## 10.3 Plan Cards

Each card should show:

```text
Monthly Premium

TZS 15,000

Duration: 1 Month

Access:
✓ All premium videos

[ Edit ]
[ Delete ]
```

Use multiple sample plans.

## 10.4 Create Plan Modal

Fields:

- Plan Name
- Cost
- Duration
- Time Period

Validate:

- required fields;
- positive cost;
- positive duration.

## 10.5 Edit Plan

Show an informational message:

```text
Changes to this plan apply to new subscribers.
Existing subscriptions keep their existing subscription terms.
```

## 10.6 Delete Plan

Confirmation modal:

```text
Delete this plan?

The plan will no longer be available to new subscribers.
Existing subscribers will continue until their subscription expires.

[Cancel] [Delete Plan]
```

---

# 11. Customize Site Page

## 11.1 Purpose

The tenant can configure the appearance/content of the fixed tenant website template.

Supported configuration includes:

- website name;
- browser tab title;
- hero title;
- hero subtitle;
- video preview duration;
- navigation color;
- button color;
- hero-section color/general appearance.

The design explicitly does NOT provide:

- logo upload;
- background/hero image upload;
- custom fonts;
- custom layouts;
- multiple templates.

Therefore do not add controls for those features.

## 11.2 Layout

Use a two-column editor:

```text
┌──────────────────────────────┬─────────────────────────────┐
│ Customization Controls       │ Live Website Preview        │
│                              │                             │
│ Website Name                 │ Hero                        │
│ Browser Title                │                             │
│ Hero Title                   │ Video cards                 │
│ Hero Subtitle                │                             │
│ Preview Duration             │                             │
│ Navigation Color             │                             │
│ Button Color                 │                             │
│ Hero Color                   │                             │
│                              │                             │
│ [ Save Changes ]             │                             │
└──────────────────────────────┴─────────────────────────────┘
```

## 11.3 Live Preview

Changes to text/colors should update the preview immediately using JavaScript.

Provide:

- desktop preview;
- mobile preview toggle if practical.

---

# 12. Tenant Website Preview

Create a realistic customer-facing tenant website preview.

The website should contain:

## Header

- website name;
- navigation;
- optional "Plans" / "Subscribe" action.

## Hero

Display:

- hero title;
- hero subtitle;
- configurable colors.

## Video Section

Show free and premium videos on the same page.

Premium videos should be visually identifiable.

Each video card should include:

- poster;
- title;
- Free/Premium badge;
- Play button.

## Premium Preview Interaction

When the user selects a premium video:

1. Start simulated preview.
2. Display a preview countdown.
3. Stop playback when preview ends.
4. Show subscription/payment prompt.
5. Provide a button to view available plans.

The prototype must communicate that payment is required before continued premium playback.

## Responsive Website

The tenant website preview must work on:

- desktop;
- tablet;
- mobile.

---

# 13. Withdrawals Page

## 13.1 Purpose

The tenant can submit withdrawal requests.

The project requirements establish:

- withdrawal PIN;
- withdrawal amount;
- service provider;
- destination phone number;
- withdrawal status;
- manual approval by super admin;
- pending/verified/failed behavior;
- withdrawal cannot be canceled after submission;
- pending period is limited;
- external financial-service PIN must never be received or stored.

The system design currently specifies the following prototype business values:

- minimum withdrawal: 5,000 TZS;
- maximum withdrawal: 50,000 TZS;
- fee: 20% of available balance;
- status: Pending / Verified / Failed;
- pending maximum: 12 hours.

If these values are changed in a later approved requirements baseline, follow the latest approved source instead.

Supported providers:

- M-Pesa
- HaloPesa
- TigoPesa
- Airtel Money

## 13.2 Withdrawal Balance Card

Show:

```text
Withdrawable Balance
TZS 48,500
```

Also show a small explanation of fees.

## 13.3 Withdrawal PIN Section

Provide:

```text
Withdrawal PIN

Used to authorize withdrawal requests.

[ Set Withdrawal PIN ]
```

PIN rules for the prototype:

- 4 digits;
- maximum 3 failed attempts;
- lockout after the configured retry limit;
- lockout duration: 2 hours;
- reset requires administrator confirmation.

Never ask the user for their mobile-money account PIN.

## 13.4 Withdrawal Form

Fields:

- Amount
- Provider
- Destination Phone Number
- Withdrawal PIN

Do NOT include an "external account PIN" field.

This is an explicit security requirement.

## 13.5 Validation

Validate:

- amount >= 5,000 TZS;
- amount <= 50,000 TZS;
- amount <= demo withdrawable balance;
- provider selected;
- phone number supplied;
- withdrawal PIN exactly 4 digits.

Show calculated fee and estimated amount received.

Example:

```text
Requested:       TZS 20,000
Fee:             TZS 4,000
Net amount:      TZS 16,000
```

Clearly label this as prototype/demo behavior if the exact financial calculation is subject to later approval.

## 13.6 Withdrawal Confirmation

Show:

```text
Confirm Withdrawal

Amount: TZS 20,000
Provider: M-Pesa
Phone: 07XX XXX XXX

Once submitted, this withdrawal cannot be canceled.

[ Cancel ] [ Confirm Withdrawal ]
```

After confirmation, create a simulated Pending withdrawal.

---

# 14. Transaction History Page

Display transactions received by the tenant website.

Required visible information:

- Transaction ID
- Phone number
- Amount
- Status
- Date
- View action

Use a responsive table.

Example statuses:

- Pending
- Approved
- Canceled

Include filtering:

- All
- Pending
- Approved
- Canceled

Include search by transaction ID or phone number.

## Transaction Detail Modal

Clicking View opens a detailed form/modal containing:

- Transaction ID
- Phone
- Amount
- Status
- Date
- Provider reference
- Verification state
- Subscription effect where applicable

Use realistic but clearly fictional sample data.

---

# 15. Transaction Verification Page

Purpose:

Allow the tenant to see pending transactions and demonstrate the verification process.

Show:

```text
Pending Transactions

Transactions awaiting confirmation from the payment system.
```

For each pending transaction:

- Transaction ID
- Phone
- Amount
- Date
- Status
- Verify action

The project requirements establish that verification is automatic and pending transactions are checked very often.

Therefore the UI should communicate automatic verification rather than suggesting that the tenant manually approves payments.

Example:

```text
Automatic verification active
Last checked: a few seconds ago
```

A "Check Now" button may be included as a prototype interaction, but it should be labeled as a demonstration/manual refresh rather than implying that the tenant controls the real verification mechanism.

When verification succeeds:

- status changes to Approved;
- premium access/subscription demo state updates;
- dashboard statistics update;
- show success toast.

When verification fails:

- show an appropriate error;
- do not grant premium access.

---

# 16. My Account Page

Include sections for:

## Profile

- Username
- Email

The requirements establish:

- username must be unique;
- email does not have to be unique;
- tenant can change username;
- tenant can change email;
- changes are flexible without confirmation.

## Password

Allow:

- current password;
- new password;
- confirm password.

Use simple password validation consistent with the current prototype scope.

## Account Security

Show a small security summary:

```text
Username: demo_tenant
Email: tenant@example.com
Withdrawal PIN: Configured
```

Do not expose any actual password or PIN.

---

# 17. Authentication Prototype

Although the requested focus is the tenant page, provide a simple prototype login screen so the flow can be demonstrated.

Login must allow either:

- username;
- email.

Do not implement real authentication.

Use a demo account and allow the visitor to enter the dashboard.

Include:

- Login
- Forgot Password

Forgot Password should show a prototype email-reset confirmation message.

Email verification is not required during registration according to the requirements.

---

# 18. Notifications and Feedback

Implement a reusable toast notification system.

Examples:

```text
Video uploaded successfully.
Plan updated successfully.
Website customization saved.
Withdrawal submitted successfully.
Transaction verified.
Copied to clipboard.
```

Error examples:

```text
Video must be MP4.
Maximum video size is 50 MB.
Please enter a valid withdrawal amount.
Please select a provider.
Incorrect withdrawal PIN.
```

Use different visual treatments for:

- success;
- warning;
- error;
- informational.

Do not use browser `alert()` for normal interactions.

---

# 19. Modal System

Create one reusable JavaScript modal mechanism.

It should support:

- forms;
- confirmations;
- video previews;
- transaction details;
- delete confirmations;
- informational dialogs.

Modal behavior:

- close button;
- Escape key;
- clicking backdrop closes only where appropriate;
- focus should remain usable;
- mobile-friendly sizing.

---

# 20. Demo Data

Use a centralized JavaScript demo-state object.

Example conceptual structure:

```javascript
const demoState = {
    tenant: {
        username: "demo_tenant",
        email: "tenant@example.com",
        websiteSubdomain: "demo-tenant",
        websiteUrl: "https://demo-tenant.prototype.local"
    },

    dashboard: {
        withdrawableBalance: 48500,
        netRevenue: 126000,
        activeSubscriptions: 18
    },

    videos: [],
    plans: [],
    transactions: [],
    withdrawals: [],

    customization: {
        websiteName: "Demo Media",
        browserTitle: "Demo Media",
        heroTitle: "Watch Premium Content",
        heroSubtitle: "Explore our collection of videos.",
        previewDuration: 10,
        navigationColor: "#111827",
        buttonColor: "#2563eb",
        heroColor: "#f3f4f6"
    }
};
```

Use sample data sufficient to make every page look populated.

Keep demo data centralized so interactions remain consistent.

---

# 21. State and Persistence

Use `localStorage` if useful so the client can interact with the prototype and see changes survive page refreshes.

Store only prototype data.

Never store:

- real passwords;
- real withdrawal PINs;
- real payment credentials;
- external financial-service PINs;
- secrets.

If localStorage is used, clearly treat it as demonstration-only.

Provide a "Reset Demo Data" option so the prototype can be returned to its original state.

---

# 22. JavaScript Architecture

Avoid putting all behavior into one giant function.

Organize JavaScript into clear modules/sections such as:

```text
App initialization
State management
Navigation
Dashboard
Videos
Plans
Customization
Withdrawals
Transactions
Verification
Account
Tenant website preview
Modal system
Toast system
Validation
Local storage
Utility functions
```

Functions should have descriptive names.

Examples:

```javascript
renderDashboard()
renderVideos()
openVideoModal()
validateVideoUpload()
saveVideo()
deleteVideo()
renderPlans()
savePlan()
renderTransactions()
openTransactionDetails()
submitWithdrawal()
verifyTransaction()
saveCustomization()
renderTenantWebsite()
showToast()
openModal()
closeModal()
```

Avoid unnecessary abstraction.

---

# 23. Validation Requirements

Client-side validation is required for the prototype.

At minimum validate:

### Video

- required title;
- MP4;
- <= 50 MB;
- poster type;
- priority.

### Plan

- name required;
- positive cost;
- positive duration;
- valid time period.

### Withdrawal

- valid amount;
- balance;
- provider;
- phone;
- 4-digit withdrawal PIN.

### Account

- username;
- email;
- password confirmation.

Show validation errors close to the relevant controls.

---

# 24. Responsive Design Requirements

The prototype must be usable at:

- desktop;
- tablet;
- mobile.

Test representative widths such as:

```text
1440px
1024px
768px
480px
375px
```

Do not simply shrink desktop content.

Specifically handle:

- sidebar collapse;
- tables;
- cards;
- modals;
- forms;
- video grids;
- customization editor;
- tenant website preview.

---

# 25. Accessibility Basics

Use semantic HTML.

Examples:

- `header`
- `nav`
- `main`
- `section`
- `article`
- `form`
- `button`
- `label`

Every form control must have a label.

Buttons must have clear text or accessible labels.

Maintain reasonable color contrast.

Do not rely solely on color to communicate status.

Keyboard interaction should work for:

- navigation;
- buttons;
- modals;
- forms.

---

# 26. Security Boundaries for the Prototype

This is frontend-only, so client-side security must NOT be presented as real application security.

The prototype should demonstrate the intended UX, while comments/documentation should make clear that production enforcement belongs to the backend/API.

The actual system design requires:

- authentication;
- authorization on every request;
- tenant-scoped authorization;
- tenant isolation;
- secure handling of financial operations;
- protected audit records.

Do not implement fake frontend logic that claims to provide those guarantees.

---

# 27. Performance Expectations

The prototype should load quickly and remain responsive.

Avoid:

- large unnecessary assets;
- huge libraries;
- repeated DOM rebuilding when unnecessary;
- expensive animations;
- unnecessary polling loops.

The production requirements target fast normal tenant-platform operations and specifically require video workloads not to unnecessarily degrade core SaaS operations.

The prototype should therefore visually demonstrate a responsive application without pretending to reproduce production performance characteristics.

---

# 28. Error and Empty States

Every major page should have a sensible empty state.

Examples:

### No videos

```text
No videos yet

Upload your first video to start building your website.

[ Upload Video ]
```

### No plans

```text
No subscription plans

Create a plan to allow customers to access premium videos.

[ Create Plan ]
```

### No transactions

```text
No transactions found.
```

### No withdrawals

```text
No withdrawal requests yet.
```

Also include loading and error states where they improve the demonstration.

---

# 29. Demo Scenarios

The prototype must support these client-demo scenarios.

## Scenario A — Dashboard

1. Open dashboard.
2. Show balance/statistics.
3. Open tenant website.
4. Return to dashboard.

## Scenario B — Add Video

1. Open Videos.
2. Click Upload Video.
3. Enter sample information.
4. Select a simulated MP4.
5. Show progress.
6. Complete upload.
7. Display new video.

## Scenario C — Premium Video

1. Open tenant website.
2. Select premium video.
3. Start preview.
4. Show countdown.
5. Stop playback.
6. Display subscription/payment prompt.
7. Open Plans.

## Scenario D — Plan Management

1. Open Plans.
2. Create plan.
3. Edit plan.
4. Explain existing/new subscriber behavior.
5. Delete plan.

## Scenario E — Website Customization

1. Open Customize Site.
2. Change hero title.
3. Change subtitle.
4. Change colors.
5. Change preview duration.
6. Watch live preview update.
7. Save.

## Scenario F — Withdrawal

1. Open Withdrawals.
2. Show withdrawable balance.
3. Enter amount.
4. Select provider.
5. Enter destination phone.
6. Enter withdrawal PIN.
7. Show fee/net calculation.
8. Submit.
9. Show Pending status.
10. Explain that approval is handled outside the tenant frontend.

## Scenario G — Transactions

1. Open Transaction History.
2. Filter pending transactions.
3. View transaction details.
4. Open Transaction Verification.
5. Simulate successful verification.
6. Return to dashboard.
7. Show updated statistics.

---

# 30. Production-vs-Prototype Boundary

Include a clear comment in the README:

This prototype intentionally does NOT implement:

- real authentication;
- real authorization;
- real tenant isolation;
- real database access;
- real video storage;
- real video upload;
- real video streaming;
- real Selcom integration;
- real subscription billing;
- real withdrawals;
- real payment verification;
- real audit logging;
- production security.

Those belong to the later production implementation.

The prototype exists to validate:

- information architecture;
- page structure;
- user flows;
- visual design;
- interaction behavior;
- client expectations.

---

# 31. README Requirements

Create a README explaining:

1. What the prototype is.
2. How to run it.
3. Technology used.
4. Folder structure.
5. Prototype limitations.
6. Demo account behavior.
7. Available pages.
8. How demo data works.
9. How to reset demo state.
10. Which behaviors are simulated.
11. Which production features are intentionally absent.

The README should explicitly state:

> This is a frontend demonstration prototype and is not a production-ready SaaS implementation.

---

# 32. Implementation Quality Rules

The coding agent must:

- produce complete working files;
- avoid placeholder buttons that do nothing when an interaction is expected;
- avoid dead navigation links;
- keep JavaScript errors out of the browser console;
- validate user input;
- handle empty states;
- handle invalid input;
- keep UI state synchronized;
- use reusable UI functions where appropriate;
- keep CSS organized;
- use semantic HTML;
- ensure responsive behavior;
- ensure every major requirement has a visible representation.

Do not create backend code.

Do not create framework-specific code.

Do not add unsupported product features merely because they are common in SaaS applications.

---

# 33. Final Acceptance Checklist

Before considering the prototype complete, verify:

## Pages

- [ ] Login prototype
- [ ] Dashboard
- [ ] Videos
- [ ] Plans
- [ ] Customize Site
- [ ] Withdrawals
- [ ] Transaction History
- [ ] Transaction Verification
- [ ] My Account
- [ ] Tenant Website Preview

## Navigation

- [ ] Sidebar works
- [ ] Header works
- [ ] Active page is highlighted
- [ ] View Website works
- [ ] Profile menu works
- [ ] Mobile navigation works

## Videos

- [ ] Upload modal
- [ ] 50 MB validation
- [ ] MP4 validation
- [ ] Poster validation
- [ ] Priority
- [ ] Free/Premium
- [ ] Edit
- [ ] Replace
- [ ] Delete confirmation
- [ ] Preview

## Plans

- [ ] Create
- [ ] Edit
- [ ] Delete
- [ ] TZS
- [ ] Duration
- [ ] Day/Weekly/Monthly
- [ ] Existing subscriber explanation

## Customization

- [ ] Website name
- [ ] Browser title
- [ ] Hero title
- [ ] Hero subtitle
- [ ] Preview duration
- [ ] Navigation color
- [ ] Button color
- [ ] Hero color
- [ ] Live preview
- [ ] Fixed-template approach

## Withdrawals

- [ ] Balance
- [ ] Withdrawal PIN
- [ ] Amount
- [ ] Provider
- [ ] Destination phone
- [ ] Fee calculation
- [ ] Confirmation
- [ ] Pending state
- [ ] No external account PIN field

## Transactions

- [ ] Transaction history
- [ ] Search
- [ ] Filters
- [ ] Details
- [ ] Pending verification
- [ ] Simulated verification
- [ ] Dashboard update

## UX

- [ ] Responsive
- [ ] Toasts
- [ ] Modals
- [ ] Form validation
- [ ] Empty states
- [ ] Error states
- [ ] Loading/progress states
- [ ] Keyboard-friendly modals
- [ ] Accessible labels

## Code Quality

- [ ] No framework
- [ ] No unnecessary dependency
- [ ] No backend
- [ ] No console errors
- [ ] Clear functions
- [ ] Centralized demo state
- [ ] README included
- [ ] Reset demo data works

---

# 34. Final Instruction to Copilot

Build the prototype completely from this specification.

Do not stop after creating the basic layout.

The result should feel like a **real, polished tenant SaaS application prototype** that can be opened in a browser and demonstrated to a client.

Prioritize:

1. correctness against the supplied requirements;
2. complete navigation;
3. professional visual design;
4. realistic interaction flows;
5. responsive behavior;
6. maintainable vanilla JavaScript;
7. clear separation between simulated frontend behavior and future production backend behavior.

When a requirement is explicitly defined in this document, follow it.

When a visual implementation detail is not defined, choose the simplest professional design that keeps the prototype consistent with the product.

Do not silently introduce major product capabilities outside the supplied requirements.
