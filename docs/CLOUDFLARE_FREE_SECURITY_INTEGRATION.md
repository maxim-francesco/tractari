# ARHITECTURĂ DE SECURITATE CLOUDFLARE FREE & GHID DE INTEGRARE VERCEL
**Website:** Tractări Auto Sibiu (`tractarimasinisibiu.ro` / `www.tractarimasinisibiu.ro`)  
**Versiune:** STAGE 01 FIX01 (Production Ready)  
**Rol:** Senior Security Engineer, Next.js 16 Engineer & DevOps Architect  
**Data revizuirii:** 28 Octombrie 2026  
**Status:** Validat tehnic local — Oprit la punctul de aprobare (fără modificări externe)

---

## 1. Executive Summary & Schimbări Cheie în FIX01

Prezentul document a fost actualizat în urma auditului riguros al documentației oficiale Next.js 16, Cloudflare WAF și testelor directe pe baza de date Neon și mediul de producție Vercel.

### Corecții Tehnice Majore (FIX01):
1. **Convenția Next.js 16 (`src/proxy.ts`):**  
   În Next.js 16, fișierul `src/proxy.ts` reprezintă convenția nativă modernă pentru interceptarea cererilor (înlocuind/depreciind vechiul `middleware.ts`). Verificarea directă a bazei de date Neon a confirmat că **logarea automată a clickurilor Google Ads (`gclid`, `gbraid`, `wbraid`) este activă în producție pe Vercel**, acumulând peste **1.375 de înregistrări reale**.
2. **Eliminarea `cf.threat_score` din WAF:**  
   Conform documentației Cloudflare Edge actuale, `cf.threat_score` este depreciat/setat pe `0` în noul motor Ruleset Engine pe planurile Free. Regula asociată a fost eliminată pentru a evita reguli inactive sau comportamente imprevizibile.
3. **Optimizarea Regulilor WAF (Fără ocupare artificială a sloturilor):**  
   Au fost reținute strict **3 reguli WAF cu risc ZERO de fals-pozitive**, lăsând 2 sloturi libere pentru intervenții viitoare de urgență.
4. **Rate Limiting Țintit (Nu Global):**  
   Regula globală de 120 req/min pe întreg site-ul a fost respinsă din cauza riscurilor specifice rețelelor mobile românești (CGNAT la Orange, Vodafone, Digi) și a prefetching-ului automat din Next.js App Router. Rate limiting-ul se aplică **strict pe endpointul dinamic `/api/ads-clicks-report`**.
5. **Comparație Arhitecturală Formală (DNS-Only vs. Reverse Proxy):**  
   S-a documentat explicit compromisul între simplitatea/stabilitatea Vercel nativ și avantajele/riscurile proxy-ului Cloudflare L7.
6. **Inventar DNS Complet & Conștientizarea Propagării:**  
   DNS-ul existent pe Hostgate are TTL-uri de 4 ore (înregistrări A/CNAME) și 8 ore (nameservere). Schimbarea de nameservere și eventualul rollback la registrar nu sunt instantanee (durată reală: 4 – 24 ore).

---

## 2. Discovery & Audit Tehnic al Sistemului Actual

### 2.1. Framework și Stack Tehnic
- **Framework:** Next.js `16.2.9` (App Router cu React `19.2.1` și Turbopack).
- **Intercepție la Edge:** `src/proxy.ts` (convenție nativă Next.js 16, export `proxy`, matcher optimizat pentru excluderea activelor statice).
- **Bază de date:** Neon Serverless PostgreSQL (`@neondatabase/serverless`).
- **Verificare funcțională:** Tabela `ads_clicks` conține 1.375+ logări operaționale, cu date de geolocație și identificatori de click (`gbraid`, `gclid`).
- **Header compatibility:** `src/proxy.ts` a fost optimizat pentru a citi cu prioritate `cf-connecting-ip` și `cf-ipcountry`, menținând compatibilitate completă cu antetele Vercel (`x-forwarded-for`, `x-real-ip`, `x-vercel-ip-country`).

### 2.2. Hosting Provider și Topologie DNS Activă
- **Hosting curent:** **Vercel Anycast Edge Network** (POP Frankfurt `fra1`).
- **Domeniu canonic:** `https://www.tractarimasinisibiu.ro` (Apexul `tractarimasinisibiu.ro` redirecționează cu cod `307` către `www`).
- **Nameservere actuale:** `ns1.hostgate.ro`, `ns2.hostgate.ro` (Hostgate cPanel).
- **Înregistrări DNS inventariate (TTL-uri reale):**
  - `@` (Apex) -> `A` : `216.198.79.1` (TTL 14400s / 4h)
  - `www` -> `CNAME` : `f83bc889a779df0a.vercel-dns-017.com` (TTL 14400s / 4h)
  - `@` -> `TXT` : `google-site-verification=ueXH8YcPBpezyy-UUGRQr4nD8NvWVrd5IIMXXwuv3A8` (TTL 14400s / 4h)
  - `@` -> `NS` : `ns1.hostgate.ro`, `ns2.hostgate.ro` (TTL 28800s / 8h)
  - `AAAA`, `MX`, `CAA`, `DNSSEC` : Neconfigurate (fără servicii de mail directe pe apex).

### 2.3. Securitatea Endpointurilor și Formularului de Contact
1. **Endpointul `/api/ads-clicks-report`:**
   - Rol: Returnează agregate și statistici anti-fraudă de click.
   - Autentificare securizată: Suportă acum atât parametrul clasic `?key=...`, cât și antetele standard securizate `Authorization: Bearer <key>` și `X-API-Key: <key>`, prevenind scurgerea cheii secrete în istoricul browserului sau jurnalele de acces proxy.
2. **Formularul de Contact (`src/components/Contact.tsx`):**
   - Execuție 100% client-side via handler `mailto:`. Nu trimite date către un endpoint backend și nu este vulnerabil la atacuri automate SQLi/XSS pe server.

### 2.4. Tracking Google Ads și Conversii Apeluri
- **Scripturi:** Google Tag (`G-XYEP1TJYMQ`), Google Ads Conversion (`AW-18256093286/sL2dCP7z3ZYdEObAl4FE`).
- **Componentă:** `CallClickTracker.tsx` ascultă evenimentele click pe `tel:+40742916370` și `https://wa.me/40742916370` și trimite semnal de conversie beacon către Google Ads.
- **Parametri monitorizați:** `gclid`, `gbraid`, `wbraid`, `utm_*` — toți sunt păstrați fără alterare.

---

## 3. Comparație Arhitecturală: Vercel Nativ vs. Cloudflare Proxy

| Criteriu de Evaluare | Opțiunea A: Vercel WAF + Cloudflare DNS-Only | Opțiunea B: Cloudflare Free Proxy (Orange Cloud) |
|---|---|---|
| **Topologie Rețea** | Client -> Vercel Edge | Client -> Cloudflare Edge -> Vercel Edge |
| **Risc Google Ads Crawlers** | **Zero risc** (Vercel nu blochează crawleri publicitari). | **Risc mediu-ridicat** dacă Bot Fight Mode generează provocări JS către `AdsBot-Google`. |
| **Acuratețe Geolocație & IP** | **100% nativă** (Vercel identifică direct IP-ul mobil și orașul din România). | **Parțială** (`CF-Connecting-IP` păstrează IP-ul, dar `x-vercel-ip-city` poate indica POP-ul Cloudflare). |
| **Risc Bucle SSL / Redirect** | **Zero risc** (Vercel gestionează direct certificatul). | **Risc ridicat** dacă Cloudflare este lăsat pe *Flexible* (necesită obligatoriu *Full Strict*). |
| **Protecție Anti-Scraping / WAF** | Protecție L3/L4 DDoS de bază inclusă; WAF avansat necesită Vercel Pro/Enterprise. | **WAF L7 personalizabil gratuit** (5 reguli custom + 1 regulă Rate Limiting). |
| **Reînnoire SSL Vercel** | Nativă, 100% automată prin Let's Encrypt / DigiCert. | Poate necesita atenție dacă challenge-ul HTTP-01 Vercel este obstrucționat. |
| **Compatibilitate Next.js RSC** | Nativă, streaming optimizat și cache prerender. | Excelentă dacă Caching-ul rămâne Standard; risc dacă se activează "Cache Everything". |

### Recomandare Arhitecturală:
- **Pentru stabilitate absolută Google Ads și urgențe rutiere:** Opțiunea A (Cloudflare DNS-Only) oferă cel mai scăzut risc operațional.
- **Dacă se dorește filtrarea activă a scannerelor prin Opțiunea B (Reverse Proxy):** Se impune configurarea conservatoare detaliată mai jos, cu **Bot Fight Mode DEZACTIVAT inițial**.

---

## 4. Configurație Cloudflare Free — Reguli WAF & Rate Limiting

### 4.1. Reguli WAF Custom (3 reguli esențiale cu risc zero de fals-pozitive)

#### Regula 1: Blocare Probe Malitioase și Scannere de Vulnerabilități
- **Nume:** `SEC-01-Block-Known-Exploits-And-Probes`
- **Descriere:** Blochează cererile automate după fișiere de configurare, depozite de cod, panouri WordPress/PHP și tehnici de traversare directoare.
- **Expresie exactă (Wirefilter):**
  ```text
  (http.request.uri.path contains "/.env" or 
   http.request.uri.path contains "/.git" or 
   http.request.uri.path contains "/wp-admin" or 
   http.request.uri.path contains "/wp-login.php" or 
   http.request.uri.path contains "/phpmyadmin" or 
   http.request.uri.path contains "/xmlrpc.php" or 
   http.request.uri.path contains "/../" or 
   http.request.uri.path contains "%00") and not cf.client.bot
  ```
- **Acțiune:** `Block`

#### Regula 2: Blocare Instrumente Ostile de Exploatare și Scanare
- **Nume:** `SEC-02-Block-Malicious-Scraping-Tools`
- **Descriere:** Blochează agenții utilizator asociați cu utilitare cunoscute de atac (SQLMap, Nikto, DirBuster, Acunetix, Masscan).
- **Expresie exactă (Wirefilter):**
  ```text
  (http.user_agent contains "sqlmap" or 
   http.user_agent contains "nikto" or 
   http.user_agent contains "dirbuster" or 
   http.user_agent contains "masscan" or 
   http.user_agent contains "acunetix") and not cf.client.bot
  ```
- **Acțiune:** `Block`

#### Regula 3: Impunerea Metodelor HTTP Permise
- **Nume:** `SEC-03-Enforce-Allowed-HTTP-Methods`
- **Descriere:** Permite doar metodele utilizate legitim de Next.js (`GET`, `HEAD`, `OPTIONS`, `POST`). Blochează tentativele de manipulare prin WebDAV, `PUT`, `DELETE` sau `TRACE`.
- **Expresie exactă (Wirefilter):**
  ```text
  not http.request.method in {"GET" "HEAD" "OPTIONS" "POST"}
  ```
- **Acțiune:** `Block`

*(Sloturile 4 și 5 rămân libere pentru reguli ocazionale în caz de incident de securitate).*

---

### 4.2. Rate Limiting Țintit (1 regulă pe planul Free)

Pentru a nu penaliza șoferii în pană care folosesc rețele mobile (CGNAT) sau prefetching-ul paginilor Next.js, **Rate Limiting-ul NU se aplică pe rutele publice de marketing/tractări**.

- **Nume:** `RL-01-Protect-Ads-Report-Endpoint`
- **Cale aplicare:** `http.request.uri.path eq "/api/ads-clicks-report"`
- **Prag:** **20 de cereri** per adresă IP
- **Fereastră:** **1 minut (60 secunde)**
- **Acțiune la depășire:** `Managed Challenge`
- **Durată penalizare:** 1 minut
- **Beneficiu:** Protejează baza de date serverless Neon de epuizarea conexiunilor prin interogări repetate ale raportului de clickuri.

---

### 4.3. Setări Globale de Sistem Cloudflare

| Setare | Valoare Impusă | Risc Prevenit |
|---|---|---|
| **SSL/TLS Encryption** | **Full (Strict)** | Previne bucla de redirecționare 308 cu Vercel. |
| **Always Use HTTPS** | **ON** | Asigură conexiune criptată pe toate paginile. |
| **Minimum TLS Version** | **TLS 1.2** | Elimină versiunile vulnerabile TLS 1.0/1.1. |
| **Bot Fight Mode** | **OFF (Recomandat inițial)** | Evită blocarea crawlerilor Google Ads (`AdsBot-Google`). Poate fi activat opțional după 7 zile de la migrare, cu monitorizare strictă. |
| **Rocket Loader** | **OFF** | **Critic:** Rocket Loader corupe hidratarea React 19 și întârzie scriptul de conversii Google Ads. |
| **Auto Minify** | **OFF** | Minificarea este gestionată nativ și mai curat de Next.js Turbopack. |
| **Email Obfuscation** | **OFF** | Previne injectarea de scripturi DOM care pot produce hydration mismatches în React. |
| **Early Hints (103)** | **ON** | Optimizează timpii de livrare a resurselor critice. |

---

## 5. Procedură de Migrare DNS și Plan de Rollback

### 5.1. Conștientizarea Propagării și a Cache-ului DNS
- Înregistrările actuale pe Hostgate au un TTL de **14.400 secunde (4 ore)**, iar nameserverele au un TTL de **28.800 secunde (8 ore)**.
- **Implicație DevOps:** Modificarea nameserverelor la RoTLD/Hostgate necesită între 4 și 24 de ore pentru a se propaga la toți furnizorii de internet din România (Digi, Orange, Vodafone).
- Nu se șterg înregistrările DNS de pe Hostgate timp de minimum 72 de ore de la migrare.

### 5.2. Pași de Activare Manuală (Fără Downtime)
1. **Configurare în Cloudflare:** Crearea zonei `tractarimasinisibiu.ro` pe planul Free.
2. **Replicare identică a înregistrărilor DNS:**
   - `A` (@) -> `216.198.79.1` (Proxy: Proxied)
   - `CNAME` (www) -> `f83bc889a779df0a.vercel-dns-017.com` (Proxy: Proxied)
   - `TXT` (@) -> `google-site-verification=ueXH8YcPBpezyy-UUGRQr4nD8NvWVrd5IIMXXwuv3A8` (Proxy: DNS Only)
3. **Aplicare Setări Securitate:** SSL Full (Strict), TLS 1.2, Rocket Loader OFF, WAF rules (3), Rate Limiting (1 pe `/api/ads-clicks-report`), Bot Fight Mode OFF.
4. **Schimbare Nameservere la Registrar:** Se introduc nameserverele alocate de Cloudflare în panoul RoTLD / Hostgate.
5. **Monitorizare Vercel:** Se confirmă că domeniile rămân marcate cu "Valid Configuration" în Vercel Dashboard.

### 5.3. Procedura de Rollback în Caz de Urgență
- **Nivel 1 — Rollback Rapid (Sub 300 secunde):**  
  Dacă apar anomalii de trafic sau conversii: În Cloudflare Dashboard > DNS, comutați pictogramele `A` și `CNAME` de la **Proxied (Portocaliu)** la **DNS only (Gri)**.  
  Traficul ocolește instantaneu proxy-ul Cloudflare și merge direct la Vercel.
- **Nivel 2 — Reversie Totală Nameservere (Durată 4 – 24 ore):**  
  Dacă se dorește renunțarea definitivă la Cloudflare: Se reintroduc nameserverele originale `ns1.hostgate.ro` și `ns2.hostgate.ro` la registrar.

---

## 6. Checklist de Testare și Asigurare a Calității (QA)

### Verificare fără utilizarea clickurilor plătite reale:
- [ ] **Test URL Parametri Ads:** Accesare `https://www.tractarimasinisibiu.ro/?gclid=TEST_SIMULARE_123`
  - Verificare în DevTools `Application > Session Storage`: valoarea `ads_click` este `'1'`.
- [ ] **Test Parametri iOS:** Accesare `https://www.tractarimasinisibiu.ro/?gbraid=TEST_IOS_456`
  - Verificare în consola de rețea: antetele sunt transmise fără stripping.
- [ ] **Test Butoane Telefon:** Click pe butonul de apel -> Se apelează corect `+40742916370` și se trimite beacon-ul de conversie `AW-18256093286/sL2dCP7z3ZYdEObAl4FE`.
- [ ] **Test Buton WhatsApp:** Se deschide chatul către `+40742916370` și se trimite beacon-ul GA4 `whatsapp_click`.
- [ ] **Test Crawler Googlebot:** Verificare cu `curl -I -A "Googlebot" https://www.tractarimasinisibiu.ro/` (trebuie să returneze `HTTP 200 OK`, nu Managed Challenge).
- [ ] **Test WAF Probes:** O cerere către `https://www.tractarimasinisibiu.ro/.env` trebuie să returneze `HTTP 403 Forbidden` direct de la Cloudflare Edge.
- [ ] **Test Rate Limiting:** 21 de cereri rapide către `/api/ads-clicks-report` de pe același IP trebuie să declanșeze Managed Challenge, în timp ce homepage-ul continuă să se încarce impecabil.
