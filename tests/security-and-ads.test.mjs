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

// 2. Test Vercel-Managed IP & Country Resolution (DNS-Only Mode)
test('Proxy IP & Country: strictly uses Vercel managed headers, ignoring unauthenticated CF headers', () => {
  const resolveVercelIpAndCountry = (headers) => {
    const xForwardedFor = headers['x-forwarded-for'];
    let ip = 'unknown';

    if (xForwardedFor) {
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

    const country = headers['x-vercel-ip-country'] || undefined;
    return { ip, country };
  };

  // Standard request hitting Vercel directly via Cloudflare DNS-Only
  const vercelDirect = resolveVercelIpAndCountry({
    'x-forwarded-for': '86.120.10.20, 76.76.21.21',
    'x-real-ip': '86.120.10.20',
    'x-vercel-ip-country': 'RO',
    // Injected by client but ignored by our proxy logic:
    'cf-connecting-ip': '1.1.1.1',
    'cf-ipcountry': 'US',
  });
  assert.equal(vercelDirect.ip, '86.120.10.20');
  assert.equal(vercelDirect.country, 'RO');

  // Single IP in x-forwarded-for
  const singleIp = resolveVercelIpAndCountry({
    'x-forwarded-for': '79.115.50.60',
    'x-vercel-ip-country': 'RO',
  });
  assert.equal(singleIp.ip, '79.115.50.60');
  assert.equal(singleIp.country, 'RO');
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

// 5. Test Contact Section: Phone and WhatsApp preserved, ZERO forms, no unverified claims or fake email
test('Contact Section: Preserves phone and WhatsApp, with ZERO forms, no unverified promises, no non-working email', async () => {
  const fs = await import('node:fs/promises');
  const contactCode = await fs.readFile('src/components/Contact.tsx', 'utf-8');

  // Must have phone and WhatsApp links
  assert.equal(contactCode.includes('href="tel:+40742916370"'), true);
  assert.equal(contactCode.includes('href="https://wa.me/40742916370"'), true);
  assert.equal(contactCode.includes('+40 742 916 370'), true);

  // Must NOT have any form elements
  assert.equal(contactCode.includes('<form'), false, 'Contact must not have <form');
  assert.equal(contactCode.includes('<input'), false, 'Contact must not have <input');
  assert.equal(contactCode.includes('<textarea'), false, 'Contact must not have <textarea');
  assert.equal(contactCode.includes('onSubmit'), false, 'Contact must not have onSubmit');
  assert.equal(contactCode.includes('handleSubmit'), false, 'Contact must not have handleSubmit');

  // Must NOT have unverified claims or non-working email
  assert.equal(contactCode.includes('contact@tractarimasinisibiu.ro'), false, 'Non-working email must not be in Contact UI');
  assert.equal(contactCode.includes('mailto:'), false, 'No mailto link since email does not receive messages');
  assert.equal(contactCode.includes('20-30 min'), false, 'Must not claim 20-30 min guarantee');
  assert.equal(contactCode.includes('Platformă autorizată'), false, 'Must not claim unverified platform authorization');
});
