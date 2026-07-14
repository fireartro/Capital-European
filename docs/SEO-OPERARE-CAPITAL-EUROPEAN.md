# Operare SEO - Capital European

Acest document separă configurarea tehnică de activitățile recurente. Nu include rețele sociale.

## Pagina potrivită pentru fiecare intenție

| Intenție principală | URL canonic |
| --- | --- |
| consultanță fonduri europene | `/consultanta-fonduri-europene` |
| fonduri europene, programe și oportunități | `/fonduri-europene` |
| fonduri europene pentru firme / IMM | `/fonduri-europene-pentru-firme` |
| fonduri europene pentru ONG | `/fonduri-europene-pentru-ong` |
| fonduri europene pentru startup | `/fonduri-europene-pentru-startup` |
| servicii administrative | `/servicii-administrative` |
| înființare firmă / PFA sau SRL | `/servicii-administrative/infiintare-firma` |
| înființare PFA | `/servicii-administrative/infiintare-pfa` |
| înființare SRL | `/servicii-administrative/infiintare-srl` |
| administrare documente | `/servicii-administrative/administrare-documente` |
| secretariat externalizat | `/servicii-administrative/secretariat` |

Nu se creează pagini aproape identice doar pentru inversarea cuvintelor. Sinonimele și variantele locale se folosesc natural în titluri secundare, întrebări, răspunsuri și anunțuri reale.

## Google Search Console

1. Păstrează proprietatea Domain `capitaleuropean.ro`, verificată prin DNS.
2. Trimite exact `https://capitaleuropean.ro/sitemap.xml` în secțiunea Sitemaps.
3. Verifică să fie `Success`, fără pagini blocate sau URL-uri redirecționate în sitemap.
4. Folosește URL Inspection pentru pagina principală și paginile din tabel. Solicită indexarea numai după modificări importante.
5. În Page indexing, urmărește separat: duplicate fără canonic ales, pagini crawled/discovered dar neindexate, soft 404 și server errors.
6. În Links, verifică dacă paginile comerciale primesc linkuri interne și backlinkuri reale.
7. Leagă proprietatea Search Console de proprietatea GA4 folosită de site.

## Google Analytics 4

Fluxul web trebuie să folosească domeniul `capitaleuropean.ro` și ID-ul configurat în `NEXT_PUBLIC_GA_ID`.

Evenimente implementate în site:

- `select_service` - alegerea direcției principale;
- `generate_lead` - formular trimis cu succes;
- `click_phone`, `click_email`, `click_whatsapp` - contact direct;
- `select_program`, `program_view`, `program_source_click` - interes pentru finanțări;
- `review_click`, `google_business_click`, `location_click` - interacțiuni locale și de încredere.

În GA4 Admin > Events/Key events, marchează `generate_lead` ca eveniment-cheie. Nu marca toate clickurile drept conversii. Verifică în Realtime și DebugView numai după acordul Analytics din bannerul de cookies.

## Google Business Profile

1. Folosește numele real al afacerii, fără cuvinte-cheie adăugate artificial.
2. Categoria principală trebuie să descrie activitatea dominantă de consultanță pentru fonduri europene; serviciile administrative rămân categorie/servicii secundare.
3. Publică numai adrese la care afacerea este eligibilă, semnalizată și poate primi clienți în programul afișat. Altfel, setează zona de servicii și ascunde adresa.
4. Păstrează identice telefonul, site-ul, programul și denumirea în profil și pe site.
5. URL site recomandat: `https://capitaleuropean.ro/?utm_source=google&utm_medium=organic&utm_campaign=google_business_profile`.
6. Completează serviciile separat: consultanță fonduri europene, verificare eligibilitate, pregătire documentație, implementare, servicii administrative, înființare PFA, înființare SRL, administrare documente și secretariat.
7. Adaugă fotografii reale ale locației, echipei și activității. Nu publica imagini care pot induce în eroare asupra sediului.
8. Cere recenzii numai clienților reali și răspunde factual. Nu oferi stimulente și nu introduce recenzii false.

## Date obligatorii încă lipsă

Completează în Vercel, fără a le inventa:

- `NEXT_PUBLIC_LEGAL_ENTITY_NAME` - denumirea juridică exactă;
- `NEXT_PUBLIC_REGISTRATION_NUMBER` - numărul Registrului Comerțului;
- `NEXT_PUBLIC_TAX_ID` - CUI/CIF.

După salvarea variabilelor, este necesar un deployment nou. Aceste date apar în footer și întăresc transparența, dar nu garantează clasarea.

## Autoritate și conținut recurent

- Publică anunțuri numai pentru programe reale, cu dată, stare, beneficiari, regiune și link la sursa oficială.
- Actualizează sau retrage informațiile când ghidul se schimbă; păstrează data ultimei verificări.
- Obține mențiuni și linkuri editoriale reale de la parteneri, organizații profesionale, publicații economice și directoare locale relevante. Evită pachetele de linkuri și directoarele fără valoare.
- Construiește studii de caz doar cu acordul clientului și date verificabile; nu publica rezultate, recenzii sau certificări inventate.
- Verifică lunar Search Console: interogări, CTR, pagini în scădere, erori de indexare și linkuri.

## Criteriu de succes

Poziția nu poate fi garantată din cod. Succesul se măsoară prin creșterea impresiilor relevante, a CTR-ului, a numărului de pagini indexate corect, a acțiunilor din Google Business Profile și a solicitărilor reale. Pentru expresii naționale competitive, autoritatea domeniului, istoricul și backlinkurile editoriale sunt decisive după ce baza tehnică este corectă.
