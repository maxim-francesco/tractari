import test from 'node:test';
import assert from 'node:assert/strict';
import { googleNetworkLabel, parseIpList, parseMinClicks, toCsv } from '../src/lib/ads-report.ts';

test('googleNetworkLabel: Google networks are recognised, subscriber lines are not', () => {
  assert.equal(googleNetworkLabel('162.120.188.209'), 'Chrome private prefetch proxy');
  assert.equal(googleNetworkLabel('162.120.184.0'), 'Chrome private prefetch proxy');
  assert.equal(googleNetworkLabel('162.120.191.255'), 'Chrome private prefetch proxy');
  assert.equal(googleNetworkLabel('162.120.192.0'), null);
  assert.equal(googleNetworkLabel('162.120.183.255'), null);
  assert.equal(googleNetworkLabel('72.14.201.94'), 'Google');
  assert.equal(googleNetworkLabel('72.14.191.255'), null);
  assert.equal(googleNetworkLabel('66.249.92.205'), 'Google');
  assert.equal(googleNetworkLabel('193.186.4.94'), 'Google Ireland');
  assert.equal(googleNetworkLabel('193.186.5.1'), null);
  assert.equal(googleNetworkLabel('82.76.153.146'), null);
});

test('googleNetworkLabel: malformed and IPv6 input returns null', () => {
  for (const ip of ['', 'unknown', '1.2.3', '1.2.3.4.5', '999.1.1.1', '2a02:2f0e::1', '1.2.3.x']) {
    assert.equal(googleNetworkLabel(ip), null, ip);
  }
});

test('parseMinClicks: default 3, clamped to 2..1000', () => {
  assert.equal(parseMinClicks(null), 3);
  assert.equal(parseMinClicks('abc'), 3);
  assert.equal(parseMinClicks('5'), 5);
  assert.equal(parseMinClicks('1'), 2);
  assert.equal(parseMinClicks('-4'), 2);
  assert.equal(parseMinClicks('999999'), 1000);
});

test('parseIpList: keeps IPs, drops anything else', () => {
  assert.deepEqual(parseIpList(null), []);
  assert.deepEqual(parseIpList('82.76.153.146, 86.123.229.219'), ['82.76.153.146', '86.123.229.219']);
  assert.deepEqual(parseIpList("1.2.3.4,' OR 1=1 --,2a02:2f0e::1"), ['1.2.3.4', '2a02:2f0e::1']);
  assert.equal(parseIpList(Array.from({ length: 80 }, (_, i) => `10.0.0.${i}`).join(',')).length, 50);
});

test('toCsv: quoting, empty values, formula guard, BOM and CRLF', () => {
  const csv = toCsv(['ip', 'city', 'ua', 'note'], [
    { ip: '82.76.153.146', city: 'Sibiu', ua: 'Mozilla/5.0 (iPhone; CPU, like "Mac")', note: null },
    { ip: '1.2.3.4', city: 'Râmnicu Vâlcea', ua: 'line1\nline2', note: '=HYPERLINK("x")' },
  ]);
  assert.ok(csv.startsWith('﻿ip,city,ua,note\r\n'));
  const lines = csv.slice(1).split('\r\n');
  assert.equal(lines[1], '82.76.153.146,Sibiu,"Mozilla/5.0 (iPhone; CPU, like ""Mac"")",');
  // The line break inside a quoted cell is kept as is; only rows end with CRLF.
  assert.equal(lines[2], '1.2.3.4,Râmnicu Vâlcea,"line1\nline2","\'=HYPERLINK(""x"")"');
  assert.equal(lines.length, 4);
  assert.ok(csv.endsWith('\r\n'));
});

test('toCsv: header only when there are no rows', () => {
  assert.equal(toCsv(['a', 'b'], []), '﻿a,b\r\n');
});
