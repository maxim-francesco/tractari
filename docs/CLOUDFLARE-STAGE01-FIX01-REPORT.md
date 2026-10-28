# RAPORT TEHNIC — STAGE 01 FIX01
## Verificare Tehnică, Corecții de Arhitectură și Pregătire de Producție

**Website:** Tractări Auto Sibiu (`tractarimasinisibiu.ro` / `www.tractarimasinisibiu.ro`)  
**Data:** 28 Octombrie 2026  
**Rol:** Senior Security Engineer, Next.js 16 Engineer & DevOps Architect  
**Status:** Verificări locale 100% finalizate — Oprit la punctul de aprobare (fără modificări externe)

---

## 1. Rezultatele Verificărilor Tehnice Locale

### 1.1. Verificare Next.js 16 Proxy & Jurnalizare Google Ads (Neon DB)
- **Confirmare Next.js 16 Convention:** În codul sursă al Next.js 16 (`node_modules/next/dist/lib/constants.js`), `PROXY_FILENAME = 'proxy'` este constanta oficială pentru intercepția cererilor (`src/proxy.ts`), înlocuind vechiul `middleware.ts`.
- **Verificare Bază de Date Neon:** Interogarea directă a bazei de date Neon Serverless a certificat faptul că **sistemul de logging funcționează activ în producție**:
  - Total înregistrări în `ads_clicks`: **1.375 clickuri reale stocate**.
  - Clickuri recente confirmate cu identificatori `gbraid` (iOS) și `gclid` (Desktop/Android) provenind din România (București, Sibiu) și din diaspora (München, Londra).
- **Îmbunătățiri Aplicate în Cod (`src/proxy.ts`):**
  - Adăugată rezolvarea cu prioritate a antetelor `cf-connecting-ip` și `cf-ipcountry` pentru precizie maximă în cazul trecerii prin Cloudflare.
  - Păstrat fallback-ul nativ pe `x-forwarded-for`, `x-real-ip` și `x-vercel-ip-country` pentru compatibilitate cu Vercel direct.

### 1.2. Securizare Endpoint `/api/ads-clicks-report`
- **Audit de Securitate:** Transmiterea cheii de raportare prin parametrul URL `?key=...` prezintă riscul de a fi salvată în istoricul browserelor și în jurnalele de acces (access logs).
- **Îmbunătățire Aplicată (`src/app/api/ads-clicks-report/route.ts`):**
  - Endpointul suportă acum autentificarea standard prin antet HTTP:
    - `Authorization: Bearer <ADS_REPORT_KEY>`
    - `X-API-Key: <ADS_REPORT_KEY>`
  - Păstrat suportul pentru parametrul `?key=` pentru compatibilitate retroactivă.

### 1.3. Teste Automate de Regresie
A fost creată suita de teste automate `tests/security-and-ads.test.mjs` rulată nativ cu `node --test`:
```text
✔ Google Ads: parameter detection logic recognizes gclid, gbraid, and wbraid (1.43ms)
✔ Proxy IP resolution: prioritizes cf-connecting-ip then x-forwarded-for first IP (0.17ms)
✔ API Security: ads-clicks-report supports Bearer, X-API-Key, and query key (0.16ms)
✔ WAF Rules: Probes filter catches malicious paths without triggering on legitimate routes (0.17ms)
✔ Contact Info: Phone numbers and WhatsApp links match verified business info (0.73ms)

5 tests passed, 0 failed.
```
Comanda `npm run typecheck` (`tsc --noEmit`) trece cu **0 erori**.

---

## 2. Configurația Finală Recomandată (Cloudflare Free)

### 2.1. Reguli WAF Custom (3 din 5 sloturi utilizate)

Nu ocupăm artificial toate cele 5 sloturi. Se păstrează strict cele 3 reguli esențiale cu **zero risc de fals-pozitive**:

1. **`SEC-01-Block-Known-Exploits-And-Probes`**  
   - **Expresie:**
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

2. **`SEC-02-Block-Malicious-Scraping-Tools`**  
   - **Expresie:**
     ```text
     (http.user_agent contains "sqlmap" or 
      http.user_agent contains "nikto" or 
      http.user_agent contains "dirbuster" or 
      http.user_agent contains "masscan" or 
      http.user_agent contains "acunetix") and not cf.client.bot
     ```
   - **Acțiune:** `Block`

3. **`SEC-03-Enforce-Allowed-HTTP-Methods`**  
   - **Expresie:**
     ```text
     not http.request.method in {"GET" "HEAD" "OPTIONS" "POST"}
     ```
   - **Acțiune:** `Block`

*(Regula bazată pe `cf.threat_score` a fost eliminată definitiv, fiind depreciată/setată pe 0 în Cloudflare).*

### 2.2. Rate Limiting Țintit (1 regulă permisă pe Free)
Pentru a elimina riscul blocării șoferilor aflați pe rețele mobile (CGNAT la Orange, Digi, Vodafone) sau a prefetching-ului din Next.js, **Rate Limiting-ul NU se aplică pe rutele de prezentare/urgență**.

- **Nume:** `RL-01-Protect-Ads-Report-Endpoint`
- **Criteriu:** `http.request.uri.path eq "/api/ads-clicks-report"`
- **Prag:** 20 cereri / 1 minut per IP
- **Acțiune:** `Managed Challenge`
- **Durată penalizare:** 60 secunde

### 2.3. Setări de Sistem Globale
- **SSL/TLS Mode:** **Full (Strict)** (Obligatoriu pentru a preveni bucla 308 cu Vercel).
- **Always Use HTTPS:** **ON**
- **Minimum TLS:** **TLS 1.2**
- **Bot Fight Mode:** **OFF** la activarea inițială (pentru a proteja 100% crawlerii Google Ads `AdsBot-Google`).
- **Rocket Loader:** **OFF** (prevenire corupere hidratare React 19 și întârziere `gtag.js`).
- **Auto Minify:** **OFF** (gestionat nativ de Turbopack).
- **Email Obfuscation:** **OFF** (previne erori de hidratare DOM).

---

## 3. Analiza Comparativă a Arhitecturilor și Recomandare

### Arhitectura A: Cloudflare DNS-Only (Grey Cloud) + Vercel Nativ
- **Flux:** Client -> Vercel Edge. Cloudflare este doar server DNS de mare viteză.
- **Avantaje:** Zero riscuri de bucle SSL, zero risc de blocare Google Ads, geolocație nativă la nivel de oraș din România în `src/proxy.ts`, mentenanță zero.
- **Dezavantaje:** Nu include WAF L7 gratuit (WAF avansat este doar pe planurile plătite Vercel).

### Arhitectura B: Cloudflare Reverse Proxy (Orange Cloud) în fața Vercel
- **Flux:** Client -> Cloudflare Edge -> Vercel Edge.
- **Avantaje:** WAF L7 gratuit, filtrare scannere ostile înainte de a atinge Vercel, Rate Limiting pe endpointuri API.
- **Dezavantaje:** Necesită configurare strictă a SSL-ului Full Strict, monitorizare pentru boții Google Ads dacă se dorește Bot Fight Mode, geolocația orașului poate indica uneori nodul Cloudflare.

### RECOMANDARE STRATEGICĂ DEVOPS:
- **Dacă obiectivul principal este stabilitatea absolută a campaniilor Google Ads și a apelurilor de urgență:**  
  Se recomandă începerea cu **Arhitectura A (Cloudflare DNS-Only)**, beneficiind de un DNS Anycast extrem de rapid și zero riscuri de compatibilitate.
- **Dacă se dorește protecția activă împotriva scannerelor:**  
  Se poate activa **Arhitectura B (Orange Cloud)** respectând cu strictețe configurația conservatoare din Secțiunea 2 (BFM oprit inițial, SSL Full Strict, Rocket Loader oprit).

---

## 4. Riscuri Rămase și Măsuri de Atenuare

| Risc Rămas | Probabilitate | Impact | Măsură de Atenuare / Plan |
|---|---|---|---|
| **Propagare DNS Latență** (TTL 8h la Hostgate) | Sigură | Mediu | Nu se șterg înregistrările de pe Hostgate 72 de ore. Propagarea se face treptat fără downtime dacă înregistrările sunt identice. |
| **Alertă Vercel "Invalid Configuration"** | Scăzută | Scăzut | Dacă Vercel solicită revalidarea CNAME-ului din cauza proxy-ului Cloudflare, se adaugă înregistrarea TXT `_vercel` indicată de Vercel. |
| **Activare prematură a Bot Fight Mode** | Medie | Ridicat | BFM rămâne **DEZACTIVAT** la migrare. Dacă se dorește activarea sa ulterioară, se face doar într-o fereastră de testare cu monitorizare Google Ads. |
| **Epuizare memorie / conexiuni Neon DB** | Foarte scăzută | Scăzut | Endpointul `/api/ads-clicks-report` este securizat prin cheie și limitat la 20 cereri/minut per IP. |

---

## 5. Procedura Exactă de Activare Manuală

> [!NOTE]
> Toate operațiunile se realizează manual în interfețele web [Cloudflare Dashboard](https://dash.cloudflare.com) și panoul registrarului de domenii. Nu se folosesc scripturi automate.

1. **Adăugare Zonă în Cloudflare:** Introduceți `tractarimasinisibiu.ro` și selectați planul **Free**.
2. **Configurare Înregistrări DNS în Cloudflare:**
   - Tip `A` | Nume `@` | Țintă `216.198.79.1` | Proxy: **Proxied (Portocaliu)** sau **DNS only (Gri)** conform arhitecturii alese.
   - Tip `CNAME` | Nume `www` | Țintă `f83bc889a779df0a.vercel-dns-017.com` | Proxy: Identic cu Apex-ul.
   - Tip `TXT` | Nume `@` | Țintă `google-site-verification=ueXH8YcPBpezyy-UUGRQr4nD8NvWVrd5IIMXXwuv3A8` | Proxy: DNS only.
3. **Setare Securitate în Cloudflare:**
   - Navigați la **SSL/TLS** -> Selectați **Full (Strict)**.
   - Navigați la **Speed > Optimization** -> Asigurați-vă că **Rocket Loader** este **OFF**.
   - Navigați la **Scrape Shield** -> Asigurați-vă că **Email Obfuscation** este **OFF**.
   - Navigați la **Security > WAF > Custom Rules** -> Adăugați cele 3 reguli din Secțiunea 2.1.
   - Navigați la **Security > WAF > Rate Limiting** -> Adăugați regula din Secțiunea 2.2.
   - Navigați la **Security > Bots** -> Asigurați-vă că **Bot Fight Mode** este **OFF**.
4. **Actualizare Nameservere la Registrar:**
   - Accesați panoul unde este înregistrat domeniul (Hostgate / RoTLD).
   - Schimbați `ns1.hostgate.ro` și `ns2.hostgate.ro` cu cele două nameservere Cloudflare alocate contului dvs.
5. **Verificare Vercel Domains:**
   - În Vercel Dashboard -> Project Settings -> Domains, confirmați că ambele domenii au status verde ("Valid Configuration").

---

## 6. Checklist de Testare Manuală pentru Etapa de Producție

Efectuați aceste teste imediat după finalizarea propagării DNS, fără a consuma buget pe clickuri reale Google Ads:

### A. Testare Desktop & Mobil
- [ ] Deschidere `https://www.tractarimasinisibiu.ro/` pe browser Desktop (Chrome/Firefox/Safari) — se încarcă în < 1.5s fără erori în consolă.
- [ ] Deschidere de pe telefon mobil (pe conexiune de date 4G/5G, nu Wi-Fi).
- [ ] Verificare redirect: `http://tractarimasinisibiu.ro` se redirecționează către `https://www.tractarimasinisibiu.ro/`.
- [ ] Verificare bară plutitoare de urgență pe mobil ("SUNĂ ACUM") — este vizibilă și stabilă.

### B. Testare Butoane Apel & WhatsApp
- [ ] Click pe butonul de apel de pe telefon fizic -> Deschide dialer-ul nativ cu `+40742916370`.
- [ ] În DevTools Network (cu emulare mobilă): la click pe telefon, se observă trimiterea cererii beacon către Google Ads (`AW-18256093286/sL2dCP7z3ZYdEObAl4FE`).
- [ ] Click pe butonul WhatsApp -> Deschide aplicația WhatsApp cu destinatar `+40742916370`.

### C. Testare Parametri Google Ads (Simulare Fără Cost)
- [ ] Deschideți într-un tab Incognito:  
  `https://www.tractarimasinisibiu.ro/?gclid=SIM_TEST_QA_01&utm_source=google&utm_medium=cpc`
- [ ] Deschideți DevTools -> `Application` -> `Session Storage`:  
  Verificați că este prezentă cheia `ads_click` cu valoarea `'1'`.
- [ ] Deschideți un link cu parametru iOS:  
  `https://www.tractarimasinisibiu.ro/?gbraid=SIM_TEST_IOS_02`
- [ ] Interogați endpointul de raportare (cu cheia secretă):  
  Verificați că clickul de test a fost jurnatizat în Neon DB cu tipul corespunzător.

### D. Testare Crawler & WAF
- [ ] Rulare din terminal:  
  `curl -I -A "Googlebot" https://www.tractarimasinisibiu.ro/`  
  *Rezultat așteptat:* `HTTP/2 200 OK` (Googlebot nu este blocat sau provocat).
- [ ] Rulare din terminal a unei cereri suspecte:  
  `curl -I https://www.tractarimasinisibiu.ro/.env`  
  *Rezultat așteptat:* `HTTP/2 403 Forbidden` (blocat direct la Edge de WAF).

---

## 7. Punct de Aprobare

> [!IMPORTANT]
> **OPRIRE PENTRU APROBARE EXPLICITĂ:**  
> Toate corecțiile locale, investigațiile de framework, verificările bazei de date Neon și testele automate au fost finalizate cu succes.  
> 
> **Nu s-a efectuat și nu se va efectua nicio modificare în infrastructura externă (DNS Hostgate, cont Cloudflare, Google Ads sau Vercel Production) fără aprobarea dumneavoastră explicită.**
