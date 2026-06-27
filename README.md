# Capital European

Website Next.js pentru Capital European: consultanta fonduri europene, servicii administrative, calculator orientativ si formular de contact.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- React Hook Form + Zod
- Vercel deploy

## Comenzi locale

```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm run build
```

Pentru verificarea completa inainte de deploy:

```bash
npm run ci
```

## Variabile de mediu

Copiaza `.env.example` in `.env.local` pentru local sau seteaza aceleasi valori in Vercel.

### Obligatorii pentru lansare

```bash
NEXT_PUBLIC_SITE_URL=https://capitaleuropean.ro
CONTACT_WEBHOOK_URL=https://...
NEXT_PUBLIC_CONTACT_EMAIL=contact@capitaleuropean.ro
NEXT_PUBLIC_PHONE_DISPLAY=0753 527 110
NEXT_PUBLIC_PHONE_HREF=+40753527110
NEXT_PUBLIC_WHATSAPP_NUMBER=+40753527110
NEXT_PUBLIC_BUSINESS_SCHEDULE=L-V · 10:00-18:00
```

### Tracking optional, incarcat doar dupa consimtamant

```bash
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_GTM_ID=
NEXT_PUBLIC_CLARITY_PROJECT_ID=
```

### Date legale de completat inainte de productie reala

```bash
NEXT_PUBLIC_LEGAL_ENTITY_NAME=
NEXT_PUBLIC_REGISTRATION_NUMBER=
NEXT_PUBLIC_TAX_ID=
NEXT_PUBLIC_REGISTERED_OFFICE=
```

Nu publica site-ul comercial final fara date legale reale si verificate.

## Contact form

Formularul trimite solicitari catre `CONTACT_WEBHOOK_URL`.

Reguli importante:

- webhook-ul trebuie sa fie HTTPS;
- fara webhook in productie, API-ul afiseaza fallback catre email;
- campul `website` este honeypot si nu trebuie afisat utilizatorilor;
- validarea este in `lib/contact-schema.ts`;
- endpoint-ul este in `app/api/contact/route.ts`.

## SEO si indexare

Proiectul include:

- metadata pe pagini;
- OpenGraph/Twitter metadata;
- `sitemap.xml` generat din `app/sitemap.ts`;
- `robots.txt` generat din `app/robots.ts`;
- JSON-LD pentru Organization, Website, Service, FAQ si Breadcrumb.

Dupa lansare:

1. seteaza domeniul final in `NEXT_PUBLIC_SITE_URL`;
2. verifica `/sitemap.xml` si `/robots.txt`;
3. adauga proprietatea in Google Search Console;
4. trimite sitemap-ul;
5. testeaza paginile principale in Rich Results Test;
6. ruleaza PageSpeed Insights pe mobil si desktop.

## Deploy Vercel

Deploy-ul porneste automat la push pe `main`, daca GitHub Integration este activa.

Deploy manual:

```bash
vercel deploy
```

Productie:

```bash
vercel deploy --prod
```

## Checklist lansare

- [ ] Domeniul `capitaleuropean.ro` este conectat corect in Vercel.
- [ ] DNS root `@` si `www` sunt verificate.
- [ ] `NEXT_PUBLIC_SITE_URL` este domeniul final, fara slash la final.
- [ ] `CONTACT_WEBHOOK_URL` este configurat si testat.
- [ ] Emailul `contact@capitaleuropean.ro` functioneaza.
- [ ] Telefonul si WhatsApp-ul deschid corect aplicatiile.
- [ ] Datele legale sunt completate cu informatii reale.
- [ ] Cookie banner: accept, refuz, preferinte si persistenta dupa refresh.
- [ ] Header mobile: deschidere, inchidere, click pe link, fara scroll orizontal.
- [ ] Calculator: mod fonduri + mod consultanta/administrare.
- [ ] Contact form: categorie, serviciu, validare, submit, mesaj succes/eroare.
- [ ] Lighthouse/PageSpeed mobil si desktop.
- [ ] Rich Results Test pentru paginile principale.
- [ ] Sitemap trimis in Google Search Console si Bing Webmaster Tools.

## Observatii tehnice

- Service worker-ul vechi este curatat de `components/service-worker-cleanup.tsx`, ca sa evite cache vechi pe Vercel.
- Cookie-urile de tracking se incarca doar dupa consimtamant.
- Nu comite `.env.local`, `.next`, `.next-dev`, `node_modules`, loguri sau output-uri generate.
