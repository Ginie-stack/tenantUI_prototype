# Multitenant Video SaaS Frontend Prototype

This repository contains a self-contained frontend prototype for a tenant-facing SaaS dashboard for a multitenant video platform.

> This is a frontend demonstration prototype and is not a production-ready SaaS implementation.

## What this prototype includes

- Login screen prototype
- Dashboard with demo metrics and activity
- Video management interface with upload, edit, preview, and delete interactions
- Subscription plan management
- Website customization preview
- Withdrawal workflows and PIN prototype
- Transaction history and verification flows
- My Account profile and password screens
- Customer-facing tenant website preview
- Responsive layout and toast/modal interactions

## How to run

Open the project in a browser directly, or serve it locally:

```bash
cd "e:\vscode\projects\Multitenant SAAS\PROTOTYPE"
python -m http.server 8000
```

Then open:

```text
http://localhost:8000/
```

## Technology used

- HTML5
- CSS3
- Vanilla JavaScript

## Folder structure

```text
PROTOTYPE/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── app.js
├── README.md
```

## Demo account behavior

Use either of the following values on the login screen:

- demo_tenant
- tenant@example.com

Any password will work for the prototype login flow.

## Demo data behavior

The prototype uses a central demo state stored in browser localStorage. This allows the UI to feel interactive while staying self-contained.

To reset the prototype state:

- use the built-in Reset Demo Data behavior if present in the interface, or
- delete the localStorage key for this project in your browser dev tools.

## Simulated behaviors

This prototype intentionally simulates the following:

- video upload progress
- premium preview countdown
- verification processing
- plan editing/new-subscriber messaging
- withdrawal confirmation and approval flow
- copy-to-clipboard interaction
- responsive dashboard behavior

## Production features intentionally absent

This prototype intentionally does NOT implement:

- real authentication
- real authorization
- real tenant isolation
- real database access
- real video storage
- real video upload
- real video streaming
- real Selcom integration
- real subscription billing
- real withdrawals
- real payment verification
- real audit logging
- production security

## Prototype limitations

This is a frontend-only concept to validate the information architecture, interaction flow, and visual fit of the product before backend implementation begins.
