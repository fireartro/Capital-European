# Configurare producție

## 1. Variabile Vercel

Configurează în Vercel pentru mediul `Production`, apoi redeploy:

```env
NEXT_PUBLIC_SITE_URL=https://capitaleuropean.ro
CONTACT_WEBHOOK_URL=
RESEND_API_KEY=re_xxxxxxxxx
CONTACT_FROM_EMAIL=Capital European <noreply@capitaleuropean.ro>
CONTACT_TO_EMAIL=contact@capitaleuropean.ro
NEXT_PUBLIC_GA_ID=G-JJDLTV4VX9
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_CLARITY_PROJECT_ID=xxxxxxxxxx
NEXT_PUBLIC_CONTACT_EMAIL=contact@domeniul-real.ro
NEXT_PUBLIC_PHONE_DISPLAY=+40 xxx xxx xxx
NEXT_PUBLIC_PHONE_HREF=+40xxxxxxxxx
NEXT_PUBLIC_WHATSAPP_NUMBER=40xxxxxxxxx
NEXT_PUBLIC_BUSINESS_ADDRESS=adresa reală
NEXT_PUBLIC_BUSINESS_SCHEDULE=L-V · 08:00-18:00
NEXT_PUBLIC_FACEBOOK_URL=https://...
NEXT_PUBLIC_INSTAGRAM_URL=https://...
NEXT_PUBLIC_LINKEDIN_URL=https://...
NEXT_PUBLIC_LEGAL_ENTITY_NAME=denumirea juridică reală
NEXT_PUBLIC_REGISTRATION_NUMBER=numărul real
NEXT_PUBLIC_TAX_ID=CUI real
NEXT_PUBLIC_REGISTERED_OFFICE=sediul real
NEXT_PUBLIC_ESTIMATOR_BASE_PRICE_RON=prețul de bază aprobat
```

Nu publica date juridice, numere de contact sau prețuri aproximative fără confirmarea companiei. `CONTACT_WEBHOOK_URL` este opțional, secret server-side și trebuie să fie HTTPS dacă este folosit. Pentru trimitere directă prin email, setează `RESEND_API_KEY`, `CONTACT_FROM_EMAIL` și `CONTACT_TO_EMAIL`.

## 2. Contact

Formularul poate livra mesajele prin `CONTACT_WEBHOOK_URL`, dacă ai un endpoint HTTPS extern, sau direct prin Resend, dacă setezi `RESEND_API_KEY`, `CONTACT_FROM_EMAIL` și `CONTACT_TO_EMAIL`.

Webhook-ul primește JSON validat cu: `name`, `email`, `phone`, `category`, `service`, `fundingProgram`, `message` și `consent`. Câmpul honeypot nu este transmis. Endpoint-ul trebuie să răspundă cu status `2xx` în maximum 8 secunde.

## 3. Indexare

- Google Search Console: adaugă proprietatea pentru `NEXT_PUBLIC_SITE_URL`, apoi trimite `https://capitaleuropean.ro/sitemap.xml`.
- Bing Webmaster Tools: adaugă același domeniu și același sitemap.
- Verifică `https://domeniul-real.ro/robots.txt` și `https://domeniul-real.ro/sitemap.xml` după deploy.
- Testează paginile importante în Rich Results Test și PageSpeed Insights.

Documentație oficială:

- Search Console: https://support.google.com/webmasters/answer/34592
- Trimitere sitemap Google: https://support.google.com/webmasters/answer/7451001
- Bing sitemap: https://www.bing.com/webmasters/help/sitemaps-3b5cf6ed
- Rich Results Test: https://developers.google.com/search/docs/appearance/structured-data
- PageSpeed Insights: https://developers.google.com/speed/docs/insights/v5/about

## 4. Măsurare și consimțământ

- GA4: creează un flux Web și setează ID-ul în `NEXT_PUBLIC_GA_ID`.
- GTM: setează ID-ul containerului în `NEXT_PUBLIC_GTM_ID`; fiecare tag publicat trebuie să respecte Consent Mode. Nu publica încă o etichetă GA4 în GTM dacă GA4 este deja încărcat direct prin `NEXT_PUBLIC_GA_ID`.
- Microsoft Clarity: setează project ID-ul în `NEXT_PUBLIC_CLARITY_PROJECT_ID`.
- Scripturile nu se încarcă până când vizitatorul acceptă categoria corespunzătoare.

Documentație oficială:

- GA4 measurement ID: https://support.google.com/analytics/answer/12270356
- Google Tag Manager: https://support.google.com/tagmanager/answer/6103696
- Google Consent Mode: https://support.google.com/analytics/answer/10000067
- Microsoft Clarity: https://learn.microsoft.com/clarity/setup-and-installation/clarity-setup
- Clarity Consent API v2: https://learn.microsoft.com/clarity/setup-and-installation/clarity-consent-api-v2

## 5. Prezență locală

Creează sau revendică Google Business Profile numai cu date reale și verificabile. Folosește aceeași denumire, adresă, telefon și adresă web ca pe site.

Documentație: https://support.google.com/business/answer/2911778
