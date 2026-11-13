// Submits the live sitemap URLs to IndexNow (Bing, Yandex, Seznam, Naver; Bing also feeds
// Copilot). Run it after a deploy that changed content: `npm run indexnow`.
// `npm run indexnow -- --dry` only prints what would be sent.
//
// The key is public by design: it is the name of the key file in /public, which proves
// ownership of the host. Google does not use IndexNow.
const HOST = 'www.tractarimasinisibiu.ro';
const KEY = '7fe8075f199d40969716ff75709eb334';
const ORIGIN = `https://${HOST}`;
const dryRun = process.argv.includes('--dry');

const keyFile = await fetch(`${ORIGIN}/${KEY}.txt`);
if (!keyFile.ok || (await keyFile.text()).trim() !== KEY) {
  console.error(`Fișierul cheie ${ORIGIN}/${KEY}.txt lipsește sau nu conține cheia.`);
  process.exit(1);
}

const sitemap = await (await fetch(`${ORIGIN}/sitemap.xml`)).text();
const urlList = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
if (urlList.length === 0) {
  console.error('Sitemap-ul nu conține niciun URL.');
  process.exit(1);
}

console.log(`${urlList.length} URL-uri din sitemap:`);
for (const url of urlList) console.log(`  ${url}`);

if (dryRun) {
  console.log('Rulare de probă: nu s-a trimis nimic.');
  process.exit(0);
}

const response = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `${ORIGIN}/${KEY}.txt`, urlList }),
});

// 200 = accepted, 202 = accepted, key validation pending.
console.log(`IndexNow: HTTP ${response.status} ${response.statusText}`);
if (!response.ok) process.exit(1);
