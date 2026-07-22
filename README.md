![DayPilot AI dashboard](./public/image.png)

<p align="center">
  <img src="./public/readme-hook.svg" alt="One sentence in. Gmail and Calendar work out." />
</p>

<p align="center">
  <img src="./public/DayPilot.png" alt="DayPilot AI" width="180" />
</p>

<h1 align="center">DayPilot AI</h1>

<p align="center">
  <strong>DayPilot AI is your command center for email and time.</strong>
  <br />
  No tabs. No form filling. No switching context. Just tell DayPilot what should happen.
</p>

<table>
  <tr>
    <td width="50%">
      <h3>Gmail, From A Single Prompt</h3>
      <p><strong>Just say:</strong></p>
      <p><code>send an email to someone@gmail.com for the interview update</code></p>
      <p><strong>DayPilot handles:</strong> drafting, formatting, sending, and keeping the inbox flow inside your connected Gmail.</p>
    </td>
    <td width="50%">
      <h3>Calendar, Without The Back And Forth</h3>
      <p><strong>Just say:</strong></p>
      <p><code>schedule a meeting tomorrow at 3 PM with the design team</code></p>
      <p><strong>DayPilot handles:</strong> reading the intent, preparing the event, and turning natural language into calendar action.</p>
    </td>
  </tr>
</table>



DayPilot AI is an AI-powered Gmail and Google Calendar copilot. It lets a user sign in with Google, connect Gmail and Calendar through Corsair, view a Gmail-style inbox, send email, and talk to an AI workspace that can use tenant-scoped Gmail and Calendar tools.

The core idea is simple: write one natural-language instruction, and DayPilot turns it into useful inbox or calendar work.

## Table of Contents

- [What It Does](#what-it-does)
- [Product Walkthrough](#product-walkthrough)
- [Feature Map](#feature-map)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Local Setup](#local-setup)
- [Database Model](#database-model)
- [API Reference](#api-reference)
- [Important Flows](#important-flows)
- [Scripts](#scripts)
- [Testing And Debugging](#testing-and-debugging)
- [Production Notes](#production-notes)
- [Current Scope](#current-scope)

## What It Does

DayPilot AI brings together four major pieces:

- A public landing page that explains the product with interactive email and calendar demos.
- Google authentication through Auth.js / NextAuth.
- Corsair-powered Gmail and Google Calendar integrations, stored per tenant.
- A dashboard with a Gmail-like inbox and a right-side AI assistant panel.

Once a user is authenticated and has connected both integrations, the app opens the dashboard. The dashboard shows synced inbox data from Postgres, updates the inbox when Gmail webhooks arrive, and gives the user a chat surface for AI-powered email and calendar operations.

## Product Walkthrough

1. Visitor lands on `/landingPage`.
2. Visitor clicks the CTA and opens `/login`.
3. User signs in with Google.
4. Auth.js creates or fetches the user in the app database.
5. User goes through `/onboarding`.
6. User connects Gmail first.
7. User connects Google Calendar next.
8. The app redirects to `/dashboard`.
9. Dashboard shows the inbox, compose window, integration status, disconnect controls, and DayPilot AI chat.
10. Gmail webhooks flow into `/api/webhooks`, publish Redis events, and refresh the inbox through `/api/events` Server-Sent Events.

## Feature Map

### Landing Page

The landing page lives in `components/landing` and is rendered by `app/landingPage/page.tsx`.

- Sticky dark navigation.
- DayPilot AI branding.
- Hero pitch for AI-powered inbox and calendar control.
- Interactive email demo through `EmailChatDemo`.
- Interactive calendar demo through `CalendarChatDemo`.
- Feature cards from `components/landing/constants.tsx`.
- How-it-works section.
- Testimonials, integrations, pricing, and final CTA.
- Typewriter animation hook in `use-typewriter.ts`.

The landing page is intentionally product-focused, while the authenticated dashboard is the real app surface.

### Authentication

Authentication is handled by `lib/auth.ts` and `app/api/auth/[...nextauth]/route.ts`.

- Uses Auth.js / NextAuth v5 beta.
- Uses Google as the sign-in provider.
- Creates a user record when a new Google user signs in.
- Looks up the app database user by email during the JWT callback.
- Injects the database user ID into `session.user.id`.
- Extends NextAuth types in `types/next-auth.d.ts`.

This is important because the app uses `session.user.id` to build a Corsair tenant ID:

```ts
user_${session.user.id}
```

Every Gmail, Calendar, webhook, and AI operation is scoped to that tenant.

### Onboarding

Onboarding lives in `app/onboarding/page.tsx` and `components/onBoarding`.

- Fetches integration state from `/api/onboarding/status`.
- Shows a two-step setup flow.
- Connects Gmail through `/api/connectToGmail?plugin=gmail`.
- Connects Google Calendar through `/api/connectToCalendar?plugin=googlecalendar`.
- Redirects to `/dashboard` once Gmail and Calendar are both connected.
- Uses `FullPageLoader` while checking connection status.

### Corsair Integrations

Corsair is configured in `lib/corsair.ts`.

- Uses `createCorsair`.
- Enables the Gmail plugin from `@corsair-dev/gmail`.
- Enables the Google Calendar plugin from `@corsair-dev/googlecalendar`.
- Stores integration data in Postgres.
- Uses `CORSAIR_KEK` for key encryption.
- Runs in multi-tenant mode.
- Publishes inbox refresh events after Gmail message changes.

The Gmail plugin has a `messageChanged.after` hook. When Corsair processes a Gmail change, the hook publishes an inbox update through Redis.

### OAuth For Gmail And Calendar

Integration OAuth is separate from Google sign-in.

- `app/api/connectToGmail/route.ts` starts Corsair OAuth for Gmail.
- `app/api/connectToCalendar/route.ts` starts Corsair OAuth for Google Calendar.
- Both routes require an authenticated session.
- Both routes create an OAuth state cookie.
- `app/api/auth/route.ts` handles the Corsair OAuth callback.
- After Gmail connects, the callback sets up a Gmail watch for the tenant.

The integration callback redirects:

- Gmail connection success -> `/onboarding`
- Calendar connection success -> `/dashboard`

### Dashboard

The dashboard is the main app experience.

- Route: `app/(dashboard)/dashboard/page.tsx`
- Shell: `components/dashboard/client-dashboard.tsx`
- Sidebar: `components/dashboard/dashboard-sidebar.tsx`
- Header: `components/dashboard/dashboard-header.tsx`
- Stats: `components/dashboard/inbox-stats.tsx`
- Folder tabs: `components/dashboard/folder-tabs.tsx`
- Email list: `components/dashboard/email-list.tsx`
- Compose modal: `components/dashboard/compose-email.tsx`
- AI panel: `components/dashboard/ai-workspace.tsx`
- Resizable split layout: `components/dashboard/resizable-layout.tsx`

The dashboard is guarded by integration status. If the user has no connected integration, they are sent back to onboarding.

### Gmail-Style Inbox

The inbox reads email records from Corsair's synced entity table.

- Client component: `components/dashboard/email-list.tsx`
- API route: `app/api/email/route.ts`
- Service: `lib/services/gmail/get-email.ts`

The inbox service:

- Finds messages for the authenticated tenant.
- Filters for `INBOX`.
- Excludes `CATEGORY_PROMOTIONS`.
- Sorts by Gmail `internalDate`.
- Returns 10 emails per page.
- Uses a simple offset-style `pageToken`.

The client uses TanStack React Query with `useInfiniteQuery`.

### Realtime Inbox Refresh

Realtime updates use Gmail webhooks, Corsair, Redis, and SSE.

- Gmail Pub/Sub webhook endpoint: `app/api/webhooks/route.ts`
- Redis publisher: `lib/events/publish.ts`
- Redis connection: `lib/events/redis.ts`
- SSE endpoint: `app/api/events/route.ts`
- Inbox invalidation: `components/dashboard/email-list.tsx`

When Gmail sends a Pub/Sub push event:

1. `/api/webhooks` receives the payload.
2. The route resolves the tenant from the Gmail email address.
3. Corsair processes the webhook.
4. The Gmail history ID is saved.
5. Redis publishes `EMAIL_UPDATED` on `inbox:user_<id>`.
6. The browser receives the SSE event from `/api/events`.
7. React Query invalidates the inbox query.
8. The email list refreshes.

### Compose And Send Email

The compose modal is in `components/dashboard/compose-email.tsx`.

- Opens from the sidebar using Zustand state.
- Validates recipient, subject, and body.
- Sends to `/api/email/messages/send`.
- Shows toast feedback through `react-hot-toast`.

The send service is in `lib/services/gmail/messages/service.ts`.

- Builds an RFC 2822 / MIME message.
- Encodes it to Base64.
- Converts Base64 to Base64URL.
- Sends through Corsair's tenant-scoped Gmail API.

### DayPilot AI Workspace

The AI workspace is the right-side chat panel in the dashboard.

- Component: `components/dashboard/ai-workspace.tsx`
- API route: `app/api/agent/route.ts`
- Agent runner: `lib/ai-layer/agent.ts`
- Tool provider: `lib/ai-layer/provider.ts`
- Prompt: `lib/ai-layer/prompt.ts`
- Parser: `lib/ai-layer/parser.ts`
- Response types: `lib/ai-layer/types.ts`

The agent uses:

- `@openai/agents`
- `@corsair-dev/mcp`
- Corsair tenant tools
- Model: `gpt-4o-mini`

The AI panel supports:

- Natural language prompts.
- Quick actions for latest emails, inbox summary, draft reply, and send email.
- Markdown rendering for assistant responses.
- Structured email-list responses.
- Integration status display.
- Gmail and Calendar disconnect buttons.
- Resizable panel width persisted in `localStorage`.

### State Management

Zustand is used for dashboard UI state in `stores/dashboard-ui-store.ts`.

It stores:

- Active sidebar item.
- Whether compose is open.
- Functions to open and close compose.

### Loading States

The project includes loading surfaces for:

- Dashboard route loading at `app/(dashboard)/dashboard/loading.tsx`.
- Onboarding route loading at `app/onboarding/loading.tsx`.
- Full-page onboarding loader at `components/full-page-loader/page.tsx`.

## Architecture

```mermaid
flowchart LR
  User[User] --> Landing[Landing Page]
  Landing --> Login[Google Login]
  Login --> Auth[Auth.js Session]
  Auth --> Onboarding[Onboarding]
  Onboarding --> GmailOAuth[Corsair Gmail OAuth]
  Onboarding --> CalendarOAuth[Corsair Calendar OAuth]
  GmailOAuth --> DB[(Postgres)]
  CalendarOAuth --> DB
  Auth --> Dashboard[Dashboard]
  Dashboard --> EmailAPI[/api/email/]
  EmailAPI --> DB
  Dashboard --> AgentAPI[/api/agent/]
  AgentAPI --> OpenAI[OpenAI Agents]
  OpenAI --> CorsairTools[Corsair MCP Tools]
  CorsairTools --> Gmail[Gmail API]
  CorsairTools --> Calendar[Google Calendar API]
  Gmail --> PubSub[Google Pub/Sub]
  PubSub --> Webhook[/api/webhooks/]
  Webhook --> CorsairWebhook[Corsair processWebhook]
  CorsairWebhook --> DB
  CorsairWebhook --> Redis[(Redis)]
  Redis --> SSE[/api/events/]
  SSE --> Dashboard
```

### Runtime Layout

```text
Browser
  -> Next.js App Router pages
  -> Route Handlers under app/api
  -> Auth.js session
  -> Postgres through Drizzle and Corsair
  -> Redis for realtime fanout
  -> OpenAI Agents for natural language orchestration
  -> Gmail and Google Calendar through Corsair plugins
```

## Tech Stack

| Area | Technology |
| --- | --- |
| Framework | Next.js 16 App Router |
| UI | React 19, Tailwind CSS 4, lucide-react |
| Auth | Auth.js / NextAuth v5 beta, Google provider |
| AI | OpenAI Agents SDK |
| Tooling layer | Corsair, Corsair Gmail plugin, Corsair Google Calendar plugin, Corsair MCP provider |
| Database | Postgres 17, Drizzle ORM, Drizzle Kit |
| Realtime | Redis 8, ioredis, Server-Sent Events |
| Data fetching | TanStack React Query |
| State | Zustand |
| Validation/types | TypeScript, Zod dependency available |
| Package manager | pnpm |
| Local services | Docker Compose |

## Project Structure

```text
app/
  (auth)/login/                 Google sign-in page
  (dashboard)/dashboard/         Authenticated dashboard route
  api/                           Next.js route handlers
  landingPage/                   Public landing page route
  onboarding/                    Integration onboarding route
  layout.tsx                     Root app layout and providers
  page.tsx                       Root redirect gate
components/
  dashboard/                     Dashboard, inbox, compose, AI workspace
  landing/                       Marketing page and interactive demos
  onBoarding/                    Gmail/Calendar setup UI
  full-page-loader/              Shared full-page loader
db/
  index.ts                       Drizzle database connection
  schema.ts                      Users, Corsair tables, Gmail webhook mappings
drizzle/
  0000_parallel_titania.sql      Initial migration
lib/
  ai-layer/                      DayPilot AI agent, prompt, parser, Corsair tool provider
  corsair/                       Connection status helper
  events/                        Redis publish/connection helpers
  services/gmail/                Inbox, webhook, message send/get services
  services/user/                 User creation and lookup service
  auth.ts                        Auth.js config
  corsair.ts                     Corsair plugin setup
stores/
  dashboard-ui-store.ts          Zustand dashboard UI state
test/
  sendEmail.ts                   Manual Gmail message test
  subscriber.ts                  Manual Redis subscription test
types/
  dashboard.ts                   Sidebar item union
  next-auth.d.ts                 NextAuth session and JWT augmentation
public/
  image.png                      README hero image and product screenshot
  DayPilot_logo.png              Brand asset
  gmail.png                      Gmail sidebar asset
```

## Environment Variables

Create a local `.env` file. Do not commit real secrets.

```env
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

AUTH_SECRET=
AUTH_TRUST_HOST=true

DATABASE_URL=postgresql://postgres:postgres@localhost:5432/daypilot
REDIS_URL=redis://localhost:6379

CORSAIR_KEK=
OPENAI_API_KEY=

APP_URL=http://localhost:3000
GMAIL_PUBSUB_TOPIC_NAME=projects/<project-id>/topics/<topic-name>
```

Notes:

- `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are used by Auth.js for Google sign-in.
- Corsair integration OAuth also redirects through `APP_URL/api/auth`.
- `AUTH_SECRET` is required by Auth.js.
- `DATABASE_URL` powers Drizzle, Auth user storage, and Corsair persistence.
- `REDIS_URL` is optional in local development because the code falls back to `redis://localhost:6379`.
- `CORSAIR_KEK` encrypts Corsair-managed integration keys.
- `OPENAI_API_KEY` is required by the OpenAI Agents SDK.
- `GMAIL_PUBSUB_TOPIC_NAME` can also be provided as `GMAIL_PUBSUB_TOPIC`, `GOOGLE_PUBSUB_TOPIC`, or `GOOGLE_PUBSUB_TOPIC_NAME`.

## Local Setup

### 1. Install dependencies

```bash
pnpm install
```

### 2. Start Postgres and Redis

```bash
docker compose up -d
```

This starts:

- Postgres on `localhost:5432`
- Redis on `localhost:6379`

### 3. Configure environment variables

Create `.env` using the variables listed above.

Google should allow these redirect URIs for local development:

```text
http://localhost:3000/api/auth/callback/google
http://localhost:3000/api/auth
```

The first one is for Auth.js Google sign-in. The second one is for Corsair integration OAuth callbacks.

### 4. Apply database migrations

```bash
pnpm exec drizzle-kit migrate
```

The migration file is in `drizzle/0000_parallel_titania.sql`.

### 5. Initialize Corsair integrations

Run Corsair setup after the database tables exist. This creates the Corsair integration records, provisions encryption keys, and stores the OAuth client credentials needed by the Gmail and Google Calendar plugins.

```bash
pnpm exec corsair setup --gmail client_id=<google-client-id> client_secret=<google-client-secret> --googlecalendar client_id=<google-client-id> client_secret=<google-client-secret>
```

You can also run the command without inline credentials to see what Corsair thinks is missing:

```bash
pnpm exec corsair setup
```

### 6. Run the development server

```bash
pnpm dev
```

Open:

```text
http://localhost:3000
```

The root route decides where the user belongs:

- Not signed in -> `/landingPage`
- Signed in but missing integrations -> `/onboarding`
- Signed in and connected -> `/dashboard`

## Database Model

The schema lives in `db/schema.ts`.

| Table | Purpose |
| --- | --- |
| `users` | App users created from Google sign-in |
| `corsair_integrations` | Corsair plugin integration records |
| `corsair_accounts` | Tenant-specific connected accounts |
| `corsair_entities` | Synced provider entities such as Gmail messages |
| `corsair_events` | Corsair event records |
| `gmail_webhook_tenants` | Maps Gmail email addresses to DayPilot tenant IDs and stores Gmail watch state |

### Tenant Model

The app tenant ID format is:

```text
user_<database-user-id>
```

Example:

```text
user_2
```

This tenant ID is used by:

- Corsair OAuth
- Corsair Gmail API calls
- Corsair Calendar API calls
- Gmail webhook mapping
- Redis inbox event channels
- OpenAI agent tool construction

## API Reference

| Route | Method | Purpose |
| --- | --- | --- |
| `/api/auth/[...nextauth]` | `GET`, `POST` | Auth.js handlers for Google sign-in |
| `/api/auth` | `GET` | Corsair OAuth callback for Gmail and Calendar integrations |
| `/api/connectToGmail?plugin=gmail` | `GET` | Starts Gmail OAuth through Corsair |
| `/api/connectToCalendar?plugin=googlecalendar` | `GET` | Starts Google Calendar OAuth through Corsair |
| `/api/onboarding/status` | `GET` | Returns Gmail and Calendar connection state |
| `/api/email` | `GET` | Returns paginated inbox emails for the signed-in user |
| `/api/email/messages/send` | `POST` | Sends an email through the tenant's Gmail account |
| `/api/agent` | `POST` | Runs DayPilot AI against tenant-scoped Corsair tools |
| `/api/events` | `GET` | Opens an SSE stream for inbox refresh events |
| `/api/webhooks` | `POST` | Receives provider webhook events and passes them into Corsair |
| `/api/disconnectGmail` | `POST` | Stops Gmail watch and deletes Gmail integration data for the tenant |
| `/api/disconnectCalendar` | `POST` | Deletes Calendar integration data for the tenant |

## Important Flows

### Root Redirect Flow

`app/page.tsx` is the app gatekeeper.

```text
No session
  -> /landingPage

Session exists, but connection status missing
  -> /

Gmail or Calendar missing
  -> /onboarding

Both connected
  -> /dashboard
```

### Google Sign-In Flow

```text
/login
  -> signIn("google")
  -> Auth.js callback
  -> createUserIfNotExists()
  -> JWT gets app user ID
  -> session.user.id is available everywhere
```

### Integration OAuth Flow

```text
/onboarding
  -> /api/connectToGmail?plugin=gmail
  -> Corsair generateOAuthUrl()
  -> oauth_state cookie
  -> Google consent
  -> /api/auth
  -> Corsair processOAuthCallback()
  -> setupGmailWebhookForTenant()
  -> /onboarding
```

Calendar follows the same flow, without Gmail watch setup.

### Agent Flow

```text
User prompt
  -> /api/agent
  -> runAgent(tenantId, prompt)
  -> buildCorsairTools(tenantId)
  -> OpenAI Agent runs with Corsair MCP tools
  -> parseAgentResult()
  -> AI workspace renders message, summary, draft, or email list
```

### Gmail Webhook Flow

```text
Gmail message change
  -> Google Pub/Sub
  -> /api/webhooks
  -> decode Gmail Pub/Sub payload
  -> resolve tenant ID
  -> processWebhook(corsair)
  -> update Gmail history ID
  -> publishInboxUpdate()
  -> Redis channel inbox:user_<id>
  -> /api/events SSE
  -> React Query invalidates inbox query
```

## Scripts

```bash
pnpm dev
pnpm build
pnpm start
pnpm lint
```

Useful Drizzle commands:

```bash
pnpm exec drizzle-kit migrate
pnpm exec drizzle-kit generate
pnpm exec drizzle-kit studio
```

Useful Corsair commands:

```bash
pnpm exec corsair setup
pnpm exec corsair auth --plugin=gmail --credentials
pnpm exec corsair auth --plugin=googlecalendar --credentials
pnpm exec corsair watch-renew
```

## Testing And Debugging

There is no full automated test suite yet, but the project includes manual helpers.

### Redis subscriber

```bash
pnpm exec tsx test/subscriber.ts
```

This listens to:

```text
inbox:user_2
```

Change the tenant in `test/subscriber.ts` if your local user has a different ID.

### Gmail message test

```bash
pnpm exec tsx test/sendEmail.ts
```

This currently calls `getMessage` for a hard-coded tenant and message ID. Update it before using it locally.

### Common checks

```bash
pnpm lint
pnpm build
```

Because this README is documentation-only, code checks are not required for this change, but these commands are the main project verification commands.

## Production Notes

- Use a production Postgres database and Redis instance.
- Set `APP_URL` to the exact deployed origin.
- Add production Google OAuth redirect URIs for both Auth.js and Corsair OAuth.
- Ensure `/api/webhooks` is reachable by Google Pub/Sub.
- Keep `CORSAIR_KEK`, `AUTH_SECRET`, and OAuth secrets stable and private.
- Rotate encryption keys carefully because Corsair account keys depend on the configured KEK.
- Gmail watches expire, so `renewDueGmailWebhookWatches()` exists in `lib/services/gmail/webhook.ts` and can be wired to a cron job.
- Server-Sent Events in `/api/events` require the Node.js runtime and a hosting environment that supports streaming responses.

## Current Scope

Implemented in the app:

- Google sign-in.
- Gmail and Google Calendar connection flow.
- Tenant-scoped Corsair persistence.
- Gmail webhook setup and processing.
- Realtime inbox refresh through Redis and SSE.
- Inbox listing with pagination.
- Manual email compose and send.
- AI workspace with Corsair MCP tools.
- Integration disconnect controls.

Partly static or future-facing:

- Some dashboard counts are currently hard-coded UI values.
- Folder tabs are presentational and do not yet filter the inbox.
- Landing-page pricing, testimonials, Drive, Meet, CRM sync, priority scoring, and pre-meeting brief claims are product-story sections, not all fully implemented backend features yet.
- The agent prompt is intentionally minimal and can be expanded with stricter response schemas, safety rules, and richer DayPilot behavior.

## Roadmap Ideas

- Add true folder filters for Inbox, Sent, Drafts, Starred, Spam, and Trash.
- Replace static dashboard counts with live Gmail and Calendar aggregates.
- Add Calendar event listing and creation UI.
- Add background cron for Gmail watch renewal.
- Add automated tests for OAuth callback, webhook parsing, email pagination, and agent response parsing.
- Add a structured agent output contract for sending email, drafting replies, summarizing threads, and scheduling meetings.
- Add deployment docs for Vercel or another Node streaming-capable platform.

---

DayPilot AI is built as a hackathon-grade but production-shaped assistant: a real Google-authenticated workspace, a real tenant model, real inbox sync, and an AI layer that can grow from simple chat into an actual executive assistant for email and calendar work.
