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

Fără un ID explicit valid, layout-ul nu activează GA4; nu mai există un ID implicit. Inițializarea directă GA și pornirea GTM se fac o singură dată pe document. Schimbarea unei categorii sau repetarea unui efect React nu trebuie să producă un nou `page_view`; navigarea la altă rută publică poate produce unul.

URL-urile trimise explicit de cod sunt reduse la origine și pathname public cunoscut. Allowlist-ul parametrilor query este gol: nici UTM, nici `email`, telefon, token, fragment sau scor de eligibilitate nu sunt transmise. Rutele dinamice/necunoscute și referrer-ele externe sunt reduse la rădăcină, iar titlul trimis este fix. Nu introduce date personale în hostname, rute, titluri CMS sau parametri de evenimente.

În proprietatea GA4, verifică și dezactivează colectarea automată Enhanced measurement care poate citi URL-ul real (istoric, clickuri externe, căutări, formulare). Configurația acestui cont nu este verificabilă din repo. În GTM, nu publica încă un GA4 pentru aceeași proprietate, nu citi URL-ul/query/referrer-ul brut și configurează fiecare tag cu propriile verificări de consimțământ. Pentru container, Google recomandă API-urile specifice de consimțământ din template; simplul mesaj `gtag` al paginii nu certifică setările tuturor tagurilor.

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

## Identitate și verificări juridice

În cod există deja valori pentru identitatea operatorului. Proprietarul trebuie să confirme că sunt exacte, actuale și corespunzătoare acestei afaceri, nu doar că variabilele sunt completate:

- `NEXT_PUBLIC_LEGAL_ENTITY_NAME` - denumirea juridică exactă;
- `NEXT_PUBLIC_REGISTRATION_NUMBER` - numărul Registrului Comerțului;
- `NEXT_PUBLIC_TAX_ID` - CUI/CIF.

Confirmă și sediul social, punctele de lucru, telefonul, emailul și eligibilitatea adreselor din Google Business Profile. Nu modifica platformele în baza acestui document fără aprobarea proprietarului.

Checkboxul formularului confirmă citirea informării pentru cerere/răspuns, nu acordul de marketing. Politica enumeră și organizația, CUI/CIF, categoria și programul opțional. Pentru solicitarea unei persoane în nume propriu poate fi aplicabil art. 6(1)(b); pentru contactul profesional al reprezentantului unei persoane juridice trebuie confirmată analiza art. 6(1)(f), nu presupus că reprezentantul este parte la contract.

Necesită confirmare operațională: termenul de păstrare în inbox/Resend/webhook și backupuri, destinatarii reali, DPA/roluri, țările și mecanismele transferurilor, setările GA/GTM/Clarity și procedura pentru drepturile persoanelor. Website-ul nu implementează retenție sau ștergere automată a mesajelor livrate. Nu există în repo o evidență centrală a acordurilor; starea locală cu versiune și dată nu reprezintă singură certificare de conformitate. Nu se pretinde finalizarea acestor verificări juridice.

## Consimțământ și hartă

- Starea curentă este `ce_cookie_consent_v4`, maximum 180 de zile; cookie-ul este folosit numai dacă localStorage este indisponibil.
- Versiunile v2/v3 sunt invalidate. `externalContent` este implicit refuzat; un vechi accept-all nu acordă permisiune pentru noul scop.
- Analiza, marketingul și conținutul extern sunt opțiuni independente. Refuzul tuturor păstrează adresa locală și linkul extern; harta nu face cereri Google înainte de acord și se încarcă lazy după acordul extern.
- Lipsa, coruperea sau expirarea stării înseamnă revocare. Evenimentele proprii verifică acordul înainte de fiecare trimitere. `storage`, BroadcastChannel unde este disponibil, focus/visibility și timerul de expirare sincronizează consumatorii.
- Revocarea hărții oprește documentul extern și demontează iframe-ul. Revocarea trackingului dezactivează GA, elimină scripturile și cookie-urile first-party accesibile și reîncarcă documentul dacă un runtime a fost inițializat. Nu poate anula date deja trimise sau șterge cookie-uri pe domeniile terților.
- În browsere care blochează simultan storage, cookie-uri și BroadcastChannel, acordul nu poate fi memorat/sincronizat; comportamentul este refuz implicit. Modificările directe fără eveniment sunt reverificate la focus/visibility și cel mult 60 de secunde, iar expirarea cunoscută are timer propriu.

Verifică într-un mediu de test, cu cererile terțe interceptate: vizită nouă/refuz, v2/v3 acceptate, stare lipsă/invalidă/expirată, cookie fallback blocat, activare extern-only, revocare în aceeași filă și din altă filă, navigare repetată/Strict Mode, acord după expirare și URL-uri cu email/token în query/fragment. Nu trimite date reale către Google, Microsoft sau formular pentru QA.

### CSS de integrat de main, nu aplicat aici

Componenta folosește clasele existente `footer-map-frame`, `footer-map-skeleton`, `footer-map-placeholder`, `footer-map-open` și clasele existente ale categoriei cookie. Nu este necesar un stylesheet nou pentru noul toggle. `globals.css` rămâne în ownership-ul main.

Integrează aceste ajustări strict pentru hartă, după verificarea cascadei desktop/mobile; păstrează min-height-urile existente 330/300/260px. Iframe-ul absolut nu schimbă înălțimea la activare, iar spațiul inferior separă placeholderul de linkul extern:

```css
.footer-map-frame iframe { position: absolute; inset: 0; }
.footer-map-skeleton.footer-map-placeholder { padding: 16px 20px 64px; gap: 10px; }
.footer-map-skeleton.footer-map-placeholder > svg { width: 32px; height: 32px; padding: 6px; }
.footer-map-skeleton.footer-map-placeholder strong { font-size: .875rem; }
.footer-map-skeleton.footer-map-placeholder p { margin-top: 4px; overflow-wrap: anywhere; }
.footer-map-skeleton.footer-map-placeholder button { flex-shrink: 0; }
```

Verifică apoi la 320/390px și desktop: adresă lizibilă, CTA și link fără suprapuneri, focus vizibil și modal de preferințe cu scroll după adăugarea celei de-a treia categorii. Integrarea CSS și QA vizual final sunt în afara acestei livrări de logică.

## Sitemap și date reale

Paginile statice fără o dată editorială verificabilă nu primesc `lastModified`. Paginile CMS `/fonduri-europene`, `/anunturi` și `/contact` folosesc `content.updatedAt`; anunțurile publicate folosesc propriul `updatedAt`. Datele invalide sau viitoare sunt omise. Nu înlocui datele cu data build-ului și nu folosi un `siteConfig.lastUpdated` comun ca dovadă a unei schimbări reale. Timestampul CMS este global, nu un jurnal separat pe pagină; pentru precizie mai mare ar fi necesare date editoriale dedicate, fără a le inventa acum.

## Surse oficiale și limite

- [Google: ordinea și actualizarea acordului](https://developers.google.com/tag-platform/security/guides/consent)
- [Google Analytics: evitarea datelor personale, inclusiv URL-uri](https://support.google.com/analytics/answer/6366371?hl=en)
- [Google Search: lastmod semnificativ și corect](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [EDPB: acord specific, demonstrare și retragere](https://www.edpb.europa.eu/system/files/documents/files/file1/edpb_guidelines_202005_consent_en.pdf)
- [ANSPDCP: acord prealabil și informare pentru cookie-uri nenecesare](https://www.dataprotection.ro/?page=Comunicat_Presa_26.06.2026)
- [GDPR: temeiuri și obligații de informare](https://eur-lex.europa.eu/eli/reg/2016/679/oj)

Aceste surse fundamentează remedierile tehnice și lista de confirmări; nu sunt aviz juridic sau certificare a operațiunilor companiei.

## Autoritate și conținut recurent

- Publică anunțuri numai pentru programe reale, cu dată, stare, beneficiari, regiune și link la sursa oficială.
- Actualizează sau retrage informațiile când ghidul se schimbă; păstrează data ultimei verificări.
- Obține mențiuni și linkuri editoriale reale de la parteneri, organizații profesionale, publicații economice și directoare locale relevante. Evită pachetele de linkuri și directoarele fără valoare.
- Construiește studii de caz doar cu acordul clientului și date verificabile; nu publica rezultate, recenzii sau certificări inventate.
- Verifică lunar Search Console: interogări, CTR, pagini în scădere, erori de indexare și linkuri.

## Criteriu de succes

Poziția nu poate fi garantată din cod. Succesul se măsoară prin creșterea impresiilor relevante, a CTR-ului, a numărului de pagini indexate corect, a acțiunilor din Google Business Profile și a solicitărilor reale. Pentru expresii naționale competitive, autoritatea domeniului, istoricul și backlinkurile editoriale sunt decisive după ce baza tehnică este corectă.
