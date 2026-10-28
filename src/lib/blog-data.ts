export type BlogPost = {
  slug: string;
  title: string;
  seoTitle: string; // 50-60 characters, used for <title>
  excerpt: string; // 120-155 characters, used as meta description
  date: string;
  readTime: string;
  keywords: string[];
  content: string[]; // Array of paragraphs or HTML strings
};

// Dates: the articles were created in the repository on 2026-02-19 (commit b8b9b05);
// the earlier 2025 dates predated the site. TODO(confirmare operator): real publish date.
// TODO(confirmare operator): tarife, asigurare și servicii la fața locului menționate mai jos.
export const blogPosts: BlogPost[] = [
  {
    slug: `ce-faci-cand-ramai-in-pana-pe-autostrada`,
    seoTitle: `Pană pe Autostrada A1 lângă Sibiu: Ce Faci, Pas cu Pas`,
    title: `Ce Faci Când Rămâi în Pană pe Autostrada A1 lângă Sibiu?`,
    date: `2026-02-19`,
    readTime: `5 min`,
    keywords: [`pană autostradă Sibiu`, `tractare A1 Sibiu`],
    excerpt: `Ai rămas în pană pe Autostrada A1 lângă Sibiu? Pașii de siguranță, ce informații pregătești și cum ceri tractare rapid, fără să te pui în pericol.`,
    content: [
      `O defecțiune la viteză de autostradă cere o reacție calmă și corectă. Pe A1, în zona Sibiu, traficul este rapid, iar banda de urgență nu este un loc sigur pentru staționare îndelungată.`,
      `Primul pas este siguranța pasagerilor. Scoateți mașina cât mai mult pe banda de urgență și porniți luminile de avarie. Toți pasagerii coboară prin partea dreaptă, opusă traficului, și așteaptă în spatele parapetului de protecție, nu lângă mașină.`,
      `Montați triunghiul reflectorizant doar dacă o puteți face în siguranță. Pe autostradă, triunghiul se pune mult mai departe în spatele mașinii decât în oraș, ca șoferii să aibă timp să reacționeze. Purtați vesta reflectorizantă.`,
      `Când sunați pentru tractare, spuneți sensul de mers (spre Sibiu sau dinspre Sibiu), cel mai apropiat reper (kilometru, ieșire sau nod rutier), marca și modelul mașinii și ce s-a întâmplat. Așa vi se poate spune corect timpul estimat de sosire și prețul.`,
      `Pe autostradă, de cele mai multe ori mașina este încărcată pe platformă și dusă la un service sau la adresa indicată, nu reparată pe banda de urgență.`,
      `Pentru tractări autostrada A1 în zona Sibiu, sunați la +40 742 916 370. Preluăm apeluri non-stop.`
    ]
  },
  {
    slug: `cat-costa-o-tractare-auto-in-sibiu`,
    seoTitle: `Cât Costă o Tractare Auto în Sibiu? Preț Tractare pe Km`,
    title: `Cât Costă o Tractare Auto în Sibiu? De Ce Depinde Prețul`,
    date: `2026-02-19`,
    readTime: `4 min`,
    keywords: [`preț tractare Sibiu`, `tarif tractare auto Sibiu`],
    excerpt: `Tractări auto Sibiu, preț: ce influențează costul, cum se calculează prețul tractării pe km și ce să întrebați înainte de plecarea platformei.`,
    content: [
      `Când aveți nevoie de o platformă auto, una dintre primele întrebări este: „Cât mă va costa?”. Un preț corect se poate spune doar după ce se știu câteva detalii despre situația dumneavoastră.`,
      `Prețul depinde în principal de distanța de la locul preluării până la destinație, de tipul și masa vehiculului și de starea lui: o mașină care rulează se încarcă mai simplu decât una cu roți blocate, cutie de viteze blocată sau avarii după un accident.`,
      `Pentru transporturile în afara orașului, prețul unei tractări se calculează de obicei pe kilometru și contează și distanța pe care o parcurge platforma până la dumneavoastră și înapoi. De aceea, la telefon vi se cere locația exactă și destinația.`,
      `Înainte să acceptați, întrebați: care este prețul total până la destinație, ce include, dacă se plătește ceva în plus noaptea sau pentru încărcare dificilă și cum puteți plăti.`,
      `La noi, prețul vi-l spunem la telefon, înainte de plecarea platformei, după ce ne spuneți locația, destinația și ce vehicul aveți. Sunați la +40 742 916 370.`
    ]
  },
  {
    slug: `alimentare-gresita-ce-sa-faci`,
    seoTitle: `Am Alimentat Greșit Mașina: Ce Faci? Benzină vs. Motorină`,
    title: `Am Alimentat Greșit Mașina — Ce Fac Acum?`,
    date: `2026-02-19`,
    readTime: `4 min`,
    keywords: [`alimentare greșită Sibiu`, `benzină în loc de motorină`],
    excerpt: `Ai pus benzină în loc de motorină sau invers? Nu porni motorul. Află de ce, ce riști și ce pași urmezi ca reparația să coste cât mai puțin.`,
    content: [
      `Se întâmplă și șoferilor cu experiență: oboseala sau graba duc la alegerea pompei greșite. Dacă ați observat greșeala înainte să porniți motorul, situația este mult mai ușor de rezolvat.`,
      `Regula de bază: NU PORNIȚI MOTORUL și nu puneți contactul. Cât timp motorul nu a pornit, combustibilul greșit a rămas în rezervor. La pornire, pompa trimite amestecul în sistemul de alimentare, iar reparația poate deveni mult mai scumpă.`,
      `Dacă ați pornit deja și mașina merge greu, scoate fum sau se oprește, opriți în siguranță cât mai repede și nu mai încercați să o porniți.`,
      `De obicei, mașina trebuie dusă la un service care poate goli rezervorul și verifica sistemul de alimentare. Spuneți-ne la telefon ce combustibil ați pus, cât și dacă ați pornit motorul.`,
      `Pentru tractare la service în Sibiu și împrejurimi, sunați la +40 742 916 370. Vă spunem prețul și timpul estimat înainte de plecare.`
    ]
  },
  {
    slug: `cum-alegi-un-serviciu-de-tractare-de-incredere`,
    seoTitle: `Cum Alegi o Firmă de Tractări de Încredere în Sibiu`,
    title: `Cum Alegi un Serviciu de Tractare de Încredere în Sibiu?`,
    date: `2026-02-19`,
    readTime: `4 min`,
    keywords: [`tractare auto Sibiu`, `serviciu tractare Sibiu`],
    excerpt: `Întrebările simple care vă ajută să alegeți o firmă de tractări serioasă în Sibiu și să evitați surprizele la preț sau la predarea mașinii.`,
    content: [
      `Când sunteți blocat pe marginea drumului, tentația este să sunați la primul număr găsit. Câteva întrebări puse la telefon vă pot scuti de costuri neașteptate și de probleme la predarea mașinii.`,
      `Întrebați cine prestează serviciul: o firmă identificabilă are datele de identificare (denumire, CUI) afișate pe site sau le poate spune la telefon.`,
      `Cereți prețul total înainte de plecarea platformei. Un serviciu serios vă spune prețul după ce află locația, destinația și tipul vehiculului, nu „vedem la fața locului”.`,
      `Întrebați ce se întâmplă dacă mașina se deteriorează în timpul transportului și ce asigurare are transportatorul. Notați răspunsul.`,
      `Cereți un timp estimat de sosire și sunați înapoi dacă se depășește mult. La predare, verificați mașina împreună cu șoferul și fotografiați eventualele daune existente înainte de încărcare.`,
      `Pentru tractări în Sibiu, împrejurimi și pe A1, ne găsiți la +40 742 916 370. Vă spunem la telefon prețul și condițiile, înainte de plecare.`
    ]
  }
];
