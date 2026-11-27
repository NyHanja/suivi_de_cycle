/*
 * Mini-API « Cycle » — même principe que l'API Gargote du TP.
 * Aucune dépendance : lancer avec   node server.js
 * Écoute sur http://localhost:3000/api
 *
 * Les données vivent en mémoire : un redémarrage remet les données d'exemple.
 * Toutes les dates sont des chaînes "AAAA-MM-JJ".
 *
 * ORGANISATION (pour travailler à deux sans conflit Git) :
 *   - Personne A ne modifie que les blocs marqués « CYCLES ».
 *   - Personne B ne modifie que les blocs marqués « JOURNAL ».
 *   - Le reste (outils, serveur) est commun : on n'y touche qu'à deux.
 */
const http = require('http');
const { URL } = require('url');

const PORT = process.env.PORT || 3000;
const LATENCE_MS = Number(process.env.LATENCE_MS || 300); // simule un réseau mobile

/* ------------------------------------------------------------------ */
/*  Outils communs                                                     */
/* ------------------------------------------------------------------ */

/** Date locale -> "2026-11-27" (pas toISOString, qui est en UTC) */
function versTexte(date) {
  const a = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const j = String(date.getDate()).padStart(2, '0');
  return `${a}-${m}-${j}`;
}

/** Il y a n jours -> "AAAA-MM-JJ"  (ilYa(0) = aujourd'hui) */
function ilYa(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return versTexte(d);
}

/** true si s est une vraie date "AAAA-MM-JJ" (refuse "2026-02-30") */
function estDate(s) {
  if (typeof s !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(s)) return false;
  const d = new Date(s + 'T00:00:00');
  return !Number.isNaN(d.getTime()) && versTexte(d) === s;
}

function aujourdhui() {
  return versTexte(new Date());
}

function envoyer(res, statut, donnees) {
  const corps = donnees === undefined ? '' : JSON.stringify(donnees);
  setTimeout(() => {
    res.writeHead(statut, {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
    res.end(corps);
  }, LATENCE_MS);
}

function lireCorps(req) {
  return new Promise((resolve) => {
    let brut = '';
    req.on('data', (morceau) => (brut += morceau));
    req.on('end', () => {
      if (!brut) return resolve({});
      try { resolve(JSON.parse(brut)); } catch { resolve(null); }
    });
  });
}

/* ------------------------------------------------------------------ */
/*  Données CYCLES (personne A)                                        */
/* ------------------------------------------------------------------ */
// Calculées à partir d'aujourd'hui pour que la démo soit toujours réaliste :
// 3 cycles de 29 jours, le dernier a commencé il y a 12 jours (=> « Jour 13 »).
let cycles = [
  { id: 1, debut: ilYa(70), fin: ilYa(66) },
  { id: 2, debut: ilYa(41), fin: ilYa(36) },
  { id: 3, debut: ilYa(12), fin: ilYa(7) },
];
let prochainIdCycle = cycles.length + 1;

// Personne A : ajouter ici ses fonctions d'aide (ex. validerDebut).

/* ------------------------------------------------------------------ */
/*  Données JOURNAL (personne B)                                       */
/* ------------------------------------------------------------------ */
const symptomes = [
  { id: 1, nom: 'Crampes' },
  { id: 2, nom: 'Maux de tête' },
  { id: 3, nom: 'Ballonnements' },
  { id: 4, nom: 'Fatigue' },
  { id: 5, nom: 'Acné' },
  { id: 6, nom: 'Seins sensibles' },
];

// Stocké avec des identifiants ; renvoyé avec les symptômes complets (voir avecSymptomes).
let journal = [
  { id: 1, date: ilYa(11), flux: 'abondant', humeur: 'fatiguee', symptome_ids: [1, 4], note: 'Grosse journée.' },
  { id: 2, date: ilYa(8), flux: 'leger', humeur: 'bien', symptome_ids: [], note: '' },
];
let prochainIdEntree = journal.length + 1;

/** Comme avecCategorie dans la gargote : remplace symptome_ids par les objets */
function avecSymptomes(entree) {
  const { symptome_ids, ...reste } = entree;
  return { ...reste, symptomes: symptomes.filter((s) => symptome_ids.includes(s.id)) };
}

// Personne B : ajouter ici ses fonctions d'aide (ex. validerEntree).

/* ------------------------------------------------------------------ */
/*  Routes                                                             */
/* ------------------------------------------------------------------ */
async function router(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const chemin = url.pathname.replace(/\/+$/, '');
  const m = req.method;
  let r;

  if (m === 'OPTIONS') return envoyer(res, 204);

  /* ===================== CYCLES (personne A) ===================== */

  // GET /api/cycles   -> du plus récent au plus ancien
  if (m === 'GET' && chemin === '/api/cycles') {
    const tries = [...cycles].sort((a, b) => b.debut.localeCompare(a.debut));
    return envoyer(res, 200, tries);
  }

  // TODO personne A : POST /api/cycles          { debut }
  // TODO personne A : PATCH /api/cycles/:id     { fin }
  // TODO personne A : DELETE /api/cycles/:id    -> 204
  //   (lire l'id avec : (r = chemin.match(/^\/api\/cycles\/(\d+)$/)) )

  /* ==================== JOURNAL (personne B) ===================== */

  // GET /api/symptomes
  if (m === 'GET' && chemin === '/api/symptomes') return envoyer(res, 200, symptomes);

  // GET /api/journal          ?date=2026-11-27   -> du plus récent au plus ancien
  if (m === 'GET' && chemin === '/api/journal') {
    const date = url.searchParams.get('date');
    const liste = date ? journal.filter((e) => e.date === date) : journal;
    const tries = [...liste].sort((a, b) => b.date.localeCompare(a.date) || b.id - a.id);
    return envoyer(res, 200, tries.map(avecSymptomes));
  }

  // TODO personne B : GET /api/journal/:id
  // TODO personne B : POST /api/journal         NouvelleEntree -> 201
  // TODO personne B : DELETE /api/journal/:id   -> 204

  /* =============================================================== */

  return envoyer(res, 404, { message: `Route inconnue : ${m} ${chemin}` });
}

http.createServer((req, res) => {
  router(req, res).catch((e) => {
    console.error(e);
    envoyer(res, 500, { message: 'Erreur interne.' });
  });
}).listen(PORT, () => {
  console.log(`API Cycle prête sur http://localhost:${PORT}/api (aujourd'hui : ${aujourdhui()})`);
  console.log('Routes : GET /api/cycles, GET /api/symptomes, GET /api/journal');
});