import test from 'node:test';
import assert from 'node:assert/strict';
import { browserName, summarizeSignatures } from '../src/lib/ads-report.ts';

const OPERA = 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Mobile Safari/537.36 OPR/103.0.0.0';
const CHROME = 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/156.0.0.0 Mobile Safari/537.36';
const SAFARI = 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.6 Mobile/15E148 Safari/604.1';

const row = (ts, clickId, ip, userAgent, country = 'RO') => ({ ts, click_id: clickId, ip, user_agent: userAgent, country });

test('browserName: names the browser and the system', () => {
  assert.equal(browserName(OPERA), 'Opera 103 / Android');
  assert.equal(browserName(CHROME), 'Chrome 156 / Android');
  assert.equal(browserName(SAFARI), 'Safari 26 / iOS');
  assert.equal(browserName('curl/8.0'), 'unknown / other');
});

test('summarizeSignatures: VPN pattern is flagged, ordinary browsers are not', () => {
  const rows = [
    // One signature, four IPs, three countries, three clicks in three minutes.
    row('2026-11-04T12:55:00Z', 'a1', '64.204.212.35', OPERA, 'DE'),
    row('2026-11-04T12:57:00Z', 'a2', '64.204.212.35', OPERA, 'DE'),
    row('2026-11-04T12:58:00Z', 'a3', '64.204.212.35', OPERA, 'DE'),
    row('2026-11-04T20:33:00Z', 'a4', '178.94.209.39', OPERA, 'CH'),
    row('2026-11-06T11:15:00Z', 'a5', '185.181.103.107', OPERA, 'RO'),
    row('2026-11-06T12:42:00Z', 'a6', '188.213.242.20', OPERA, 'RO'),
    // A common phone browser: many IPs, all in the home country, no bursts.
    row('2026-11-02T08:00:00Z', 'b1', '5.14.136.197', CHROME),
    row('2026-11-04T09:00:00Z', 'b2', '82.76.107.128', CHROME),
    row('2026-11-05T10:00:00Z', 'b3', '82.79.235.253', CHROME),
    row('2026-11-07T11:00:00Z', 'b4', '46.97.171.45', CHROME),
    // One visitor.
    row('2026-11-03T09:04:00Z', 'c1', '82.76.245.104', SAFARI),
  ];
  const result = summarizeSignatures(rows);
  assert.deepEqual(result.map((s) => s.browser), ['Opera 103 / Android', 'Chrome 156 / Android', 'Safari 26 / iOS']);

  const opera = result[0];
  assert.equal(opera.logged_requests, 6);
  assert.equal(opera.distinct_click_ids, 6);
  assert.equal(opera.distinct_ips, 4);
  assert.equal(opera.outside_home_requests, 4);
  assert.equal(opera.bursts, 1);
  assert.equal(opera.countries, 'DE=3, RO=2, CH=1');
  assert.equal(opera.first_ts, '2026-11-04T12:55:00.000Z');
  assert.equal(opera.last_ts, '2026-11-06T12:42:00.000Z');
  assert.deepEqual(opera.flags, ['4 requests from outside RO', '1 burst of 3+ click ids in 15 min']);

  assert.deepEqual(result[1].flags, [], 'common browser on many home IPs is not flagged');
  assert.deepEqual(result[2].flags, []);
});

test('summarizeSignatures: Google networks and incomplete rows are ignored', () => {
  const rows = [
    row('2026-11-12T05:58:00Z', 'g1', '162.120.187.209', OPERA, 'RO'),
    row('2026-11-12T10:28:00Z', 'g2', '66.249.92.205', OPERA, 'US'),
    row('2026-11-12T10:30:00Z', 'x1', null, OPERA, 'RO'),
    row('2026-11-12T10:31:00Z', 'x2', '1.2.3.4', null, 'RO'),
  ];
  assert.deepEqual(summarizeSignatures(rows), []);
});

test('summarizeSignatures: bursts on one IP alone do not flag a signature', () => {
  const rows = [
    row('2026-11-04T12:00:00Z', 'a1', '9.9.9.9', OPERA, 'DE'),
    row('2026-11-04T12:01:00Z', 'a2', '9.9.9.9', OPERA, 'DE'),
    row('2026-11-04T12:02:00Z', 'a3', '9.9.9.9', OPERA, 'DE'),
  ];
  const [summary] = summarizeSignatures(rows);
  assert.equal(summary.bursts, 1);
  assert.equal(summary.distinct_ips, 1);
  assert.deepEqual(summary.flags, [], 'one IP is the repeat-clicker list, not a signature');
});

test('summarizeSignatures: the same click id logged twice counts once', () => {
  const rows = [
    row('2026-11-04T12:00:00Z', 'a1', '9.9.9.1', OPERA, 'DE'),
    row('2026-11-04T12:00:30Z', 'a1', '9.9.9.1', OPERA, 'DE'),
    row('2026-11-04T12:05:00Z', 'a2', '9.9.9.2', OPERA, 'DE'),
    row('2026-11-04T12:09:00Z', 'a2', '9.9.9.3', OPERA, 'DE'),
  ];
  const [summary] = summarizeSignatures(rows);
  assert.equal(summary.logged_requests, 4);
  assert.equal(summary.distinct_click_ids, 2);
  assert.equal(summary.bursts, 0);
  assert.deepEqual(summary.flags, [], 'two click ids are below the default threshold of three');
});
