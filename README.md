# KasiRewards MVP 🇿🇦

**Slogan:** Do More. Earn More. Get Rewarded.

This is a low-cost, full-stack MVP starter for validating the KasiRewards concept before investing in native apps or paid infrastructure.

## What is included

- Public landing page and how-it-works page
- Email/password registration and login
- Session cookie authentication
- User dashboard
- Earn activities
- Demo activity completion and wallet ledger
- R50 minimum withdrawal flow
- Bank payout details capture (no live payment provider is connected)
- Withdrawal queue and admin review states
- Referral codes and referral list
- Admin dashboard
- Activity creation
- User/withdrawal/activity stats
- PostgreSQL + Prisma schema
- Terms/privacy placeholders
- Responsive mobile-first styling

## Important before advertising

This MVP includes **demo activities**. They are not real advertiser offers. Do not advertise that users can earn real cash from these demo activities. Before public launch, replace the demo activity flow with legitimate survey/offer partners and server-to-server completion verification, then connect a South African payout provider after its onboarding/compliance review.

The app intentionally does **not** implement cash-for-Google-ad-view rewards. If Google rewarded ads are later integrated, keep them separate and use only rewards permitted by the applicable ad-network policies.

## Run locally

1. Install Node.js 20+.
2. Copy `.env.example` to `.env`.
3. Set `DATABASE_URL` to a PostgreSQL database and set a strong `AUTH_SECRET`.
4. Install dependencies:

```bash
npm install
```

5. Create the database schema:

```bash
npx prisma db push
```

6. Seed demo data:

```bash
npm run db:seed
```

7. Start:

```bash
npm run dev
```

Open `http://localhost:3000`.

### Demo admin

- Email: `admin@kasirewards.local`
- Password: `Admin123!change`

**Change/remove this demo credential before any deployment.**

## Production checklist

- Replace demo activities with real provider integrations.
- Implement server-to-server postbacks/webhooks and idempotency.
- Add rate limiting, bot protection, email/phone verification and stronger fraud detection.
- Add proper audit logs for admin actions.
- Connect a vetted South African payout provider and implement payout reconciliation.
- Have Terms, Privacy/POPIA notice, reward rules and payout policy reviewed by qualified South African professionals.
- Configure production PostgreSQL, backups, monitoring and error tracking.
- Add age/eligibility controls appropriate to each activity.
- Add real transactional email/SMS.
- Add a support/contact workflow.
- Add analytics and acquisition attribution.
- Run a closed beta before public advertising.

## Architecture

`Next.js + TypeScript + PostgreSQL + Prisma + signed HTTP-only session cookie`.

The wallet is ledger-based: rewards and withdrawals are transaction records rather than a single mutable balance field.
