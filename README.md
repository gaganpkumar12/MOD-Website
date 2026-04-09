# MOD Website (Househelp Landing)

This project is a Next.js app configured for static export and deployed on Hostinger with a PHP proxy for early-access form submissions.

Production domain: `https://househelp.cleanfanatics.in`

## Local Development

Install dependencies:

```bash
npm install
```

Start dev server:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Build for Static Hosting

Generate production static output:

```bash
npm run build
```

This project uses `output: "export"`, so static files are generated into `out/`.

## Early Access Form Flow

- In development, the form uses `http://localhost:3000/api/early-access`.
- In production, the form submits to `/early-access-proxy.php` with a retry to `https://househelp.cleanfanatics.in/early-access-proxy.php`.
- The PHP proxy forwards data to the Zoho webhook.

## Hostinger Deployment (Static + PHP)

Upload these items to `public_html`:

- Contents of the local `out/` folder
- `public/early-access-proxy.php` as `public_html/early-access-proxy.php`
- `public/early-access-config.php` as `public_html/early-access-config.php`

### Configure Webhook URL

Edit `early-access-config.php` on the server:

```php
<?php
define('EARLY_ACCESS_WEBHOOK_URL', 'https://flow.zoho.in/...your-full-webhook-url...');
```

Note: `EARLY_ACCESS_WEBHOOK_URL` can also be read from server env as fallback, but config file is recommended on Hostinger shared hosting.

## Post-Deploy Verification

1. Open `https://househelp.cleanfanatics.in/early-access-proxy.php`
2. Expected: JSON response confirming the proxy is running
3. Submit the early-access form from the website

If submission fails, verify:

- `early-access-proxy.php` and `early-access-config.php` are in `public_html`
- Webhook URL in config is not empty
- Hostinger cache/CDN is cleared after upload
- PHP is enabled on the hosting plan
