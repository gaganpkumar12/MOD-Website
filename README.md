This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

Create a local env file from [.env.example](.env.example):

```bash
cp .env.example .env.local
```

For static hosting, the app exports into the `out` folder and submits early-access requests to `/early-access-proxy.php` by default.

Optional: override submit endpoint in env if needed:

```env
NEXT_PUBLIC_EARLY_ACCESS_ENDPOINT=https://your-domain.com/early-access-proxy.php
```

If you leave it empty, the default `/early-access-proxy.php` is used.

The file `public/early-access-proxy.php` must have the webhook URL configured on your host:

```php
$webhookUrl = getenv('EARLY_ACCESS_WEBHOOK_URL');
```

On Hostinger, set `EARLY_ACCESS_WEBHOOK_URL` in your PHP hosting environment (or replace `getenv(...)` with your webhook URL in that PHP file if env injection is not available).

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
