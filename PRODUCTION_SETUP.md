# Configurare producție

## 1. Variabile Vercel

Configurează în Vercel pentru mediul `Production`, apoi redeploy:

```env
NEXT_PUBLIC_SITE_URL=https://capitaleuropean.ro
CONTACT_WEBHOOK_URL=
RESEND_API_KEY=re_xxxxxxxxx
CONTACT_FROM_EMAIL=Capital European <contact@capitaleuropean.ro>
CONTACT_TO_EMAIL=capitaleuropean.ro@gmail.com
NEXT_PUBLIC_GA_ID=G-JJDLTV4VX9
NEXT_PUBLIC_GOOGLE_BUSINESS_URL=https://www.google.com/maps?cid=14253260384950460462
GOOGLE_PLACES_API_KEY=cheie-server-only-restrictionata-la-Places-API-New
GOOGLE_PLACE_ID=place-id-ul-profilului-Google
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_CLARITY_PROJECT_ID=xxxxxxxxxx
NEXT_PUBLIC_CONTACT_EMAIL=contact@capitaleuropean.ro
NEXT_PUBLIC_PHONE_DISPLAY=+40 753 527 110
NEXT_PUBLIC_PHONE_HREF=+40753527110
NEXT_PUBLIC_WHATSAPP_NUMBER=+40753527110
NEXT_PUBLIC_BUSINESS_ADDRESS=Satu Mare, Piața Soarelui, Bl. UU6, et. 3, ap. 9, 440221
NEXT_PUBLIC_WORKING_OFFICE=Seini, Piața Unirii nr. 2
NEXT_PUBLIC_SECONDARY_OFFICE=Cluj-Napoca, Strada Oltului nr. 1
NEXT_PUBLIC_BUSINESS_SCHEDULE=L-V · 10:00-18:00
NEXT_PUBLIC_FACEBOOK_URL=https://...
NEXT_PUBLIC_INSTAGRAM_URL=https://...
NEXT_PUBLIC_LINKEDIN_URL=https://...
NEXT_PUBLIC_LEGAL_ENTITY_NAME=1A BEST EVENTS SRL
NEXT_PUBLIC_REGISTRATION_NUMBER=J2017000108306
NEXT_PUBLIC_TAX_ID=RO37037033
NEXT_PUBLIC_REGISTERED_OFFICE=Satu Mare, Piața Soarelui, Bl. UU6, et. 3, ap. 9, 440221
```

Datele juridice și de contact de mai sus trebuie menținute identice cu informațiile oficiale ale companiei. `CONTACT_WEBHOOK_URL` este opțional, secret server-side și trebuie să fie HTTPS dacă este folosit. Pentru trimitere directă prin email, setează `RESEND_API_KEY`, `CONTACT_FROM_EMAIL` și `CONTACT_TO_EMAIL`.

## 2. Contact

Formularul poate livra mesajele prin `CONTACT_WEBHOOK_URL`, dacă ai un endpoint HTTPS extern, sau direct prin Resend, dacă setezi `RESEND_API_KEY`, `CONTACT_FROM_EMAIL` și `CONTACT_TO_EMAIL`.

Webhook-ul primește JSON validat cu: `name`, `email`, `phone`, `organization`, `taxId`, `category`, `service`, `fundingProgram`, `message` și `consent`. Câmpul honeypot nu este transmis. Endpoint-ul trebuie să răspundă cu status `2xx` în maximum 8 secunde.

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
