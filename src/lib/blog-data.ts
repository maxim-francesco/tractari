// A block is a paragraph (string), a section heading or a list.
export type BlogBlock = string | { h2: string } | { list: string[]; ordered?: boolean };

export type BlogPost = {
  slug: string;
  title: string;
  seoTitle: string; // 50-60 characters, used for <title>
  excerpt: string; // 120-155 characters, used as meta description
  date: string; // first published
  updated?: string; // last substantial content change
  keywords: string[];
  // The short answer, shown first on the page (answer-first for readers and AI search).
  summary: string;
  content: BlogBlock[];
};

function blockText(block: BlogBlock): string {
  if (typeof block === 'string') return block;
  return 'h2' in block ? block.h2 : block.list.join(' ');
}

export function postWordCount(post: BlogPost): number {
  return [post.summary, ...post.content.map(blockText)].join(' ').split(/\s+/).filter(Boolean).length;
}

// Reading time from the real word count (about 200 words per minute), never below 1.
export function postReadMinutes(post: BlogPost): number {
  return Math.max(1, Math.round(postWordCount(post) / 200));
}

const RO_DATE = new Intl.DateTimeFormat('ro-RO', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

export function formatPostDate(isoDate: string): string {
  return RO_DATE.format(new Date(`${isoDate}T00:00:00Z`));
}

// Dates: the articles were created in the repository on 2026-02-19 (commit b8b9b05);
// the earlier 2025 dates predated the site. TODO(confirmare operator): real publish date.
// TODO(confirmare operator): tarife, asigurare și servicii la fața locului menționate mai jos.
// Conținutul nu include cifre (tarife, minute, distanțe legale) care nu au fost confirmate.
export const blogPosts: BlogPost[] = [
  {
    slug: `ce-faci-cand-ramai-in-pana-pe-autostrada`,
    seoTitle: `Pană pe Autostrada A1 lângă Sibiu: Ce Faci, Pas cu Pas`,
    title: `Ce Faci Când Rămâi în Pană pe Autostrada A1 lângă Sibiu?`,
    date: `2026-02-19`,
    updated: `2026-11-13`,
    keywords: [`pană autostradă Sibiu`, `tractare A1 Sibiu`],
    excerpt: `Ai rămas în pană pe Autostrada A1 lângă Sibiu? Pașii de siguranță, ce informații pregătești și cum ceri tractare rapid, fără să te pui în pericol.`,
    summary: `Trageți pe banda de urgență, porniți avariile, coborâți toți prin dreapta și așteptați în spatele parapetului. Apoi sunați pentru tractare și spuneți sensul de mers și cel mai apropiat reper. Dacă sunt răniți sau mașina a rămas pe o bandă de circulație, sunați întâi la 112.`,
    content: [
      `O defecțiune la viteză de autostradă cere o reacție calmă și corectă. Pe A1, în zona Sibiu, traficul este rapid, iar banda de urgență nu este un loc sigur pentru staționare îndelungată.`,
      { h2: `Primii pași: siguranța oamenilor, apoi mașina` },
      {
        ordered: true,
        list: [
          `Scoateți mașina cât mai mult pe banda de urgență și porniți luminile de avarie.`,
          `Îmbrăcați vesta reflectorizantă înainte să coborâți, dacă o aveți la îndemână.`,
          `Toți pasagerii coboară prin partea dreaptă, opusă traficului.`,
          `Așteptați în spatele parapetului de protecție, nu în mașină și nu lângă ea.`,
          `Montați triunghiul reflectorizant doar dacă o puteți face în siguranță, mergând pe lângă parapet.`,
        ],
      },
      `Pe autostradă, triunghiul se pune mult mai departe în spatele mașinii decât în oraș, ca șoferii să aibă timp să reacționeze. Dacă nu puteți ajunge acolo fără să mergeți pe carosabil, renunțați: avariile și distanța față de trafic contează mai mult.`,
      { h2: `Când sunați la 112` },
      `Sunați la 112 dacă există persoane rănite, dacă mașina a rămas pe o bandă de circulație și nu poate fi mutată, dacă vedeți fum sau foc ori dacă pe carosabil au rămas resturi care pun în pericol alți șoferi. Pentru o defecțiune fără pericol, cu mașina oprită pe banda de urgență, sunați direct firma de tractări.`,
      { h2: `Ce spuneți la telefon când cereți tractare pe A1` },
      {
        list: [
          `Sensul de mers: spre Sibiu sau dinspre Sibiu, și către ce oraș mergeați.`,
          `Cel mai apropiat reper: borna kilometrică, o ieșire, un nod rutier sau o parcare.`,
          `Marca și modelul mașinii și dacă este autoturism sau dubă.`,
          `Ce s-a întâmplat: motor oprit, pană, roți blocate, accident.`,
          `Unde trebuie dusă mașina: service, acasă sau altă adresă.`,
        ],
      },
      `Dacă nu știți kilometrul, deschideți aplicația de hărți din telefon și citiți poziția sau trimiteți locația pe WhatsApp. Cu aceste informații vi se poate spune corect timpul estimat de sosire și prețul.`,
      { h2: `De ce pe autostradă se tractează, nu se repară` },
      `Pe banda de urgență, orice intervenție lungă este riscantă pentru dumneavoastră și pentru cel care lucrează la mașină. De aceea, de cele mai multe ori mașina este încărcată pe platformă și dusă la un service sau la adresa indicată, nu reparată pe loc. Schimbarea unei roți pe partea dinspre trafic este un exemplu de operațiune pe care e mai sigur să nu o faceți singur pe autostradă.`,
      { h2: `Ce să nu faceți` },
      {
        list: [
          `Nu rămâneți în mașină și nu stați între mașină și parapet.`,
          `Nu traversați autostrada și nu mergeți pe jos pe banda de urgență mai mult decât este necesar.`,
          `Nu încercați să împingeți mașina pe carosabil.`,
          `Nu acceptați tractarea cu o altă mașină, pe sufă: pe autostradă este periculoasă.`,
        ],
      },
      `Pentru tractări pe Autostrada A1 în zona Sibiu, sunați la +40 742 916 370. Preluăm apeluri non-stop și tractăm autoturisme și dube.`,
    ],
  },
  {
    slug: `cat-costa-o-tractare-auto-in-sibiu`,
    seoTitle: `Cât Costă o Tractare Auto în Sibiu? Preț Tractare pe Km`,
    title: `Cât Costă o Tractare Auto în Sibiu? De Ce Depinde Prețul`,
    date: `2026-02-19`,
    updated: `2026-11-13`,
    keywords: [`preț tractare Sibiu`, `tarif tractare auto Sibiu`],
    excerpt: `Tractări auto Sibiu, preț: ce influențează costul, cum se calculează prețul tractării pe km și ce să întrebați înainte de plecarea platformei.`,
    summary: `Prețul unei tractări în Sibiu depinde de distanță, de tipul și starea vehiculului și de locul preluării. În afara orașului se calculează de obicei pe kilometru. Cereți prețul total la telefon, înainte să plece platforma.`,
    content: [
      `Când aveți nevoie de o platformă auto, una dintre primele întrebări este: „Cât mă va costa?”. Un preț corect se poate spune doar după ce se știu câteva detalii despre situația dumneavoastră.`,
      { h2: `De ce depinde prețul unei tractări` },
      {
        list: [
          `Distanța de la locul preluării până la destinație.`,
          `Distanța pe care o parcurge platforma până la dumneavoastră și înapoi, mai ales în afara orașului.`,
          `Tipul și masa vehiculului: un autoturism mic se încarcă altfel decât o dubă.`,
          `Starea vehiculului: o mașină care rulează se încarcă mai simplu decât una cu roți blocate, cutie de viteze blocată sau avarii după un accident.`,
          `Locul preluării: parcare subterană, șanț, drum îngust sau autostradă.`,
        ],
      },
      { h2: `Cum se calculează prețul tractării pe km` },
      `Pentru transporturile în afara orașului, prețul unei tractări se calculează de obicei pe kilometru. Întrebați dacă se taxează doar kilometrii cu mașina încărcată sau și drumul platformei până la dumneavoastră și înapoi: diferența poate fi mare la distanțe lungi. De aceea, la telefon vi se cere locația exactă și destinația.`,
      { h2: `Ce să întrebați înainte să acceptați` },
      {
        ordered: true,
        list: [
          `Care este prețul total până la destinație?`,
          `Ce include prețul: încărcare, descărcare, taxe de drum?`,
          `Se plătește ceva în plus noaptea, în weekend sau pentru o încărcare dificilă?`,
          `Cum pot plăti și primesc bon sau factură?`,
          `Cine prestează serviciul (denumire, CUI)?`,
        ],
      },
      `Un răspuns de tipul „vedem la fața locului” este un semnal că prețul poate crește după ce mașina este deja pe platformă.`,
      { h2: `Tractarea este decontată de asigurare?` },
      `Depinde de polița dumneavoastră. Unele polițe CASCO și unele pachete de asistență rutieră atașate asigurării includ tractarea, în anumite limite. După un accident în care nu sunteți vinovat, întrebați asigurătorul RCA al vinovatului dacă și în ce condiții decontează tractarea. Păstrați bonul sau factura și întrebați ce acte sunt necesare.`,
      { h2: `Cum aflați prețul la noi` },
      `La noi, prețul vi-l spunem la telefon, înainte de plecarea platformei, după ce ne spuneți locația, destinația și ce vehicul aveți. Tractăm autoturisme și dube în Sibiu, în județ, pe A1 și pe Valea Oltului. Sunați la +40 742 916 370.`,
    ],
  },
  {
    slug: `alimentare-gresita-ce-sa-faci`,
    seoTitle: `Am Alimentat Greșit Mașina: Ce Faci? Benzină vs. Motorină`,
    title: `Am Alimentat Greșit Mașina — Ce Fac Acum?`,
    date: `2026-02-19`,
    updated: `2026-11-13`,
    keywords: [`alimentare greșită Sibiu`, `benzină în loc de motorină`],
    excerpt: `Ai pus benzină în loc de motorină sau invers? Nu porni motorul. Află de ce, ce riști și ce pași urmezi ca reparația să coste cât mai puțin.`,
    summary: `Nu porniți motorul și nu puneți contactul. Cât timp motorul nu a pornit, combustibilul greșit rămâne în rezervor, iar mașina trebuie dusă pe platformă la un service care golește rezervorul. Dacă ați pornit deja, opriți în siguranță cât mai repede.`,
    content: [
      `Se întâmplă și șoferilor cu experiență: oboseala sau graba duc la alegerea pompei greșite. Dacă ați observat greșeala înainte să porniți motorul, situația este mult mai ușor de rezolvat.`,
      { h2: `Regula de bază: nu porniți motorul` },
      `Nu porniți motorul și nu puneți contactul. La multe mașini, pompa de combustibil pornește imediat ce puneți contactul și trimite amestecul din rezervor în sistemul de alimentare. Cât timp motorul nu a pornit, combustibilul greșit a rămas în rezervor, iar reparația poate fi mult mai simplă.`,
      { h2: `Dacă ați observat la pompă` },
      {
        ordered: true,
        list: [
          `Lăsați cheia scoasă din contact.`,
          `Anunțați personalul benzinăriei și mutați mașina de la pompă doar împinsă, cu motorul oprit.`,
          `Notați ce combustibil ați pus și aproximativ câți litri.`,
          `Sunați pentru o platformă care să ducă mașina la service.`,
        ],
      },
      { h2: `Dacă ați pornit deja` },
      `Dacă ați pornit și mașina merge greu, scoate fum sau se oprește, opriți în siguranță cât mai repede și nu mai încercați să o porniți. Fiecare repornire trimite combustibil greșit mai departe în sistem.`,
      { h2: `Benzină în motorină sau motorină în benzină` },
      `Benzina pusă într-un motor diesel este de obicei situația mai gravă: motorina unge pompa de înaltă presiune și injectoarele, iar benzina nu, așa că mersul cu amestec le poate uza. Motorina pusă într-un motor pe benzină duce de regulă la mers neregulat, fum și oprirea motorului. În ambele cazuri, decizia despre ce trebuie curățat sau înlocuit o ia service-ul, după ce vede mașina.`,
      { h2: `Ce urmează` },
      `De obicei, mașina trebuie dusă la un service care poate goli rezervorul și verifica sistemul de alimentare. Spuneți-ne la telefon ce combustibil ați pus, cât și dacă ați pornit motorul, ca service-ul să știe la ce să se aștepte.`,
      `Pentru tractare la service în Sibiu și împrejurimi, sunați la +40 742 916 370. Vă spunem prețul și timpul estimat înainte de plecare.`,
    ],
  },
  {
    slug: `cum-alegi-un-serviciu-de-tractare-de-incredere`,
    seoTitle: `Cum Alegi o Firmă de Tractări de Încredere în Sibiu`,
    title: `Cum Alegi un Serviciu de Tractare de Încredere în Sibiu?`,
    date: `2026-02-19`,
    updated: `2026-11-13`,
    keywords: [`tractare auto Sibiu`, `serviciu tractare Sibiu`],
    excerpt: `Întrebările simple care vă ajută să alegeți o firmă de tractări serioasă în Sibiu și să evitați surprizele la preț sau la predarea mașinii.`,
    summary: `Alegeți o firmă care se identifică (denumire și CUI), vă spune prețul total înainte de plecarea platformei, vă dă un timp estimat de sosire și vă explică ce se întâmplă dacă mașina este avariată în timpul transportului.`,
    content: [
      `Când sunteți blocat pe marginea drumului, tentația este să sunați la primul număr găsit. Câteva întrebări puse la telefon vă pot scuti de costuri neașteptate și de probleme la predarea mașinii.`,
      { h2: `Cinci lucruri de verificat la telefon` },
      {
        ordered: true,
        list: [
          `Cine prestează serviciul: o firmă identificabilă are denumirea și CUI-ul afișate pe site sau le poate spune la telefon.`,
          `Prețul total, înainte de plecarea platformei. Un serviciu serios vă spune prețul după ce află locația, destinația și tipul vehiculului, nu „vedem la fața locului”.`,
          `Timpul estimat de sosire pentru locația dumneavoastră, nu o promisiune generală.`,
          `Ce se întâmplă dacă mașina se deteriorează în timpul transportului și ce asigurare are transportatorul.`,
          `Dacă pot prelua vehiculul dumneavoastră: spuneți marca, modelul și starea lui (roți blocate, avarii, gardă la sol joasă).`,
        ],
      },
      { h2: `Cum verificați firma` },
      `Datele unei firme (denumire, CUI, stare) se pot verifica gratuit pe site-ul Ministerului Finanțelor sau la Registrul Comerțului. Uitați-vă și la profilul din Google Maps: recenziile recente, cu detalii concrete despre intervenție, spun mai mult decât nota generală.`,
      { h2: `La încărcare și la predare` },
      {
        list: [
          `Fotografiați mașina înainte de încărcare, din toate părțile, inclusiv daunele existente.`,
          `Luați cu dumneavoastră actele și obiectele de valoare.`,
          `La predare, verificați mașina împreună cu șoferul platformei.`,
          `Cereți bon sau factură: vă trebuie și dacă cereți decontarea de la asigurător.`,
        ],
      },
      { h2: `Semnale de alarmă` },
      `Fiți atent dacă nu vi se spune prețul la telefon, dacă firma nu își spune denumirea, dacă prețul se schimbă după ce mașina este pe platformă sau dacă vi se cere să plătiți fără niciun document. Sunați înapoi dacă timpul estimat este depășit cu mult.`,
      `Pentru tractări în Sibiu, împrejurimi și pe A1, ne găsiți la +40 742 916 370. Serviciul este operat de PISALTU MIHAI-ILIE P.F.A., CUI 53773945. Vă spunem la telefon prețul și condițiile, înainte de plecare.`,
    ],
  },
];
