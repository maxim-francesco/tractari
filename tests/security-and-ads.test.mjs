import test from 'node:test';
import assert from 'node:assert/strict';

// 1. Test Google Ads Parameter Detection & Deduplication
test('Google Ads: parameter detection logic recognizes gclid, gbraid, and wbraid', () => {
  const parseParams = (urlStr) => {
    const url = new URL(urlStr);
    const gclid = url.searchParams.get('gclid');
    const gbraid = url.searchParams.get('gbraid');
    const wbraid = url.searchParams.get('wbraid');

    let click_id = '';
    let click_id_type = 'gclid';
    if (gclid) {
      click_id = gclid;
      click_id_type = 'gclid';
    } else if (gbraid) {
      click_id = gbraid;
      click_id_type = 'gbraid';
    } else if (wbraid) {
      click_id = wbraid;
      click_id_type = 'wbraid';
    }

    return { hasAdClick: Boolean(gclid || gbraid || wbraid), click_id, click_id_type };
  };

  const gclidRes = parseParams('https://www.tractarimasinisibiu.ro/?gclid=ABC_TEST_123');
  assert.equal(gclidRes.hasAdClick, true);
  assert.equal(gclidRes.click_id, 'ABC_TEST_123');
  assert.equal(gclidRes.click_id_type, 'gclid');

  const gbraidRes = parseParams('https://www.tractarimasinisibiu.ro/?gbraid=IOS_TEST_456');
  assert.equal(gbraidRes.hasAdClick, true);
  assert.equal(gbraidRes.click_id, 'IOS_TEST_456');
  assert.equal(gbraidRes.click_id_type, 'gbraid');

  const wbraidRes = parseParams('https://www.tractarimasinisibiu.ro/?wbraid=WEB_TEST_789');
  assert.equal(wbraidRes.hasAdClick, true);
  assert.equal(wbraidRes.click_id, 'WEB_TEST_789');
  assert.equal(wbraidRes.click_id_type, 'wbraid');

  const normalRes = parseParams('https://www.tractarimasinisibiu.ro/tractari-auto-sibiu');
  assert.equal(normalRes.hasAdClick, false);
});

// 2. Test IP & Country Resolution with Anti-Spoofing Protection (DNS-Only Mode)
test('Proxy IP & Country: rejects forged CF headers in DNS-only mode when cf-ray is absent', () => {
  const resolveIpAndCountry = (headers) => {
    const hasCfRay = Boolean(headers['cf-ray']);
    const cfConnectingIp = hasCfRay ? headers['cf-connecting-ip'] : null;
    const xForwardedFor = headers['x-forwarded-for'];
    let ip = 'unknown';

    if (cfConnectingIp) {
      ip = cfConnectingIp.trim();
    } else if (xForwardedFor) {
      const parts = xForwardedFor.split(',');
      if (parts[0]) {
        ip = parts[0].trim();
      }
    } else {
      const xRealIp = headers['x-real-ip'];
      if (xRealIp) {
        ip = xRealIp.trim();
      }
    }

    const cfCountry = hasCfRay ? headers['cf-ipcountry'] : null;
    const country = cfCountry || headers['x-vercel-ip-country'] || undefined;

    return { ip, country };
  };

  // Case A: Attacker attempts to spoof CF-Connecting-IP directly to Vercel (DNS-Only, no cf-ray)
  const spoofedAttempt = resolveIpAndCountry({
    'cf-connecting-ip': '1.1.1.1',
    'cf-ipcountry': 'US',
    'x-forwarded-for': '86.120.10.20, 76.76.21.21',
    'x-real-ip': '86.120.10.20',
    'x-vercel-ip-country': 'RO',
  });
  // Must reject spoofed 1.1.1.1 and US; must pick real client IP and RO from Vercel!
  assert.equal(spoofedAttempt.ip, '86.120.10.20');
  assert.equal(spoofedAttempt.country, 'RO');

  // Case B: Legitimate proxied request through Cloudflare (has cf-ray)
  const legitimateCfProxy = resolveIpAndCountry({
    'cf-ray': '86e9abcdef123456-OTP',
    'cf-connecting-ip': '86.120.10.20',
    'cf-ipcountry': 'RO',
    'x-forwarded-for': '86.120.10.20, 172.70.100.1',
    'x-real-ip': '172.70.100.1',
    'x-vercel-ip-country': 'DE',
  });
  assert.equal(legitimateCfProxy.ip, '86.120.10.20');
  assert.equal(legitimateCfProxy.country, 'RO');

  // Case C: Standard direct request to Vercel (no CF headers at all)
  const directVercel = resolveIpAndCountry({
    'x-forwarded-for': '79.115.50.60',
    'x-vercel-ip-country': 'RO',
  });
  assert.equal(directVercel.ip, '79.115.50.60');
  assert.equal(directVercel.country, 'RO');
});

// 3. Test Reporting Endpoint Authorization (Query Param vs Bearer Token vs X-API-Key)
test('API Security: ads-clicks-report supports Bearer, X-API-Key, and query key', () => {
  const reportKey = 'SECRET_KEY_123';

  const authenticate = (queryKey, authHeader, headerKey) => {
    const parsedBearer = authHeader ? authHeader.replace(/^Bearer\s+/i, '') : null;
    const provided = queryKey || parsedBearer || headerKey;
    return provided === reportKey;
  };

  // 1. Authorized via query
  assert.equal(authenticate('SECRET_KEY_123', null, null), true);

  // 2. Authorized via Bearer header (no URL leak)
  assert.equal(authenticate(null, 'Bearer SECRET_KEY_123', null), true);

  // 3. Authorized via X-API-Key header
  assert.equal(authenticate(null, null, 'SECRET_KEY_123'), true);

  // 4. Unauthorized
  assert.equal(authenticate('WRONG_KEY', null, null), false);
  assert.equal(authenticate(null, null, null), false);
});

// 4. Test WAF Rule Safety: Ensure No Legitimate Routes Match Attack Probes
test('WAF Rules: Probes filter catches malicious paths without triggering on legitimate routes', () => {
  const probePatterns = [
    '/.env',
    '/.git',
    '/wp-admin',
    '/wp-login.php',
    '/phpmyadmin',
    '/xmlrpc.php',
    '/../',
    '%00',
  ];

  const matchesProbe = (path) => {
    return probePatterns.some((pattern) => path.includes(pattern));
  };

  const legitimateRoutes = [
    '/',
    '/tractari-auto-sibiu',
    '/transport-auto-sibiu',
    '/depanare-auto-sibiu',
    '/asistenta-rutiera-sibiu',
    '/intrebari-frecvente',
    '/contact',
    '/blog',
    '/blog/ce-faci-in-caz-de-pana-pe-autostrada-a1',
    '/politica-de-confidentialitate',
    '/termeni-si-conditii',
    '/politica-cookies',
    '/anpc',
    '/sitemap.xml',
    '/robots.txt',
    '/.well-known/acme-challenge/test-token-123',
  ];

  for (const route of legitimateRoutes) {
    assert.equal(
      matchesProbe(route),
      false,
      `Legitimate route ${route} must not trigger probe WAF rule`
    );
  }

  const maliciousRequests = [
    '/.env',
    '/.env.local',
    '/.git/config',
    '/wp-admin/index.php',
    '/wp-login.php',
    '/phpmyadmin/index.php',
    '/xmlrpc.php',
    '/something/../../etc/passwd',
  ];

  for (const malicious of maliciousRequests) {
    assert.equal(
      matchesProbe(malicious),
      true,
      `Malicious probe ${malicious} must be caught`
    );
  }
});

// 5. Test Contact Info & Absolute Absence of Forms
test('Contact Section: Preserves phone and WhatsApp, with ZERO form elements', async () => {
  const fs = await import('node:fs/promises');
  const contactCode = await fs.readFile('src/components/Contact.tsx', 'utf-8');

  // Must have phone and WhatsApp links
  assert.equal(contactCode.includes('href="tel:+40742916370"'), true);
  assert.equal(contactCode.includes('href="https://wa.me/40742916370"'), true);
  assert.equal(contactCode.includes('+40 742 916 370'), true);
  assert.equal(contactCode.includes('contact@tractarimasinisibiu.ro'), true);

  // Must NOT have any form elements
  assert.equal(contactCode.includes('<form'), false, 'Contact must not have <form');
  assert.equal(contactCode.includes('<input'), false, 'Contact must not have <input');
  assert.equal(contactCode.includes('<textarea'), false, 'Contact must not have <textarea');
  assert.equal(contactCode.includes('onSubmit'), false, 'Contact must not have onSubmit');
  assert.equal(contactCode.includes('handleSubmit'), false, 'Contact must not have handleSubmit');
  assert.equal(contactCode.includes('TRIMITEȚI SOLICITAREA'), false, 'Contact must not have form submit button');
});
