/*
 * Tous les appels à l'API passent par ce fichier.
 * Les pages n'utilisent jamais fetch() directement.
 * (Même structure que l'api.ts de la gargote, fiche 07.)
 */
import type { Cycle, EntreeJournal, NouvelleEntree, Symptome } from '@/types/cycle';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export class ErreurApi extends Error {
  constructor(
    message: string,
    public statut: number,
    public details: Record<string, string> = {},
  ) {
    super(message);
  }
}

async function requete<T>(chemin: string, options: RequestInit = {}): Promise<T> {
  const reponse = await fetch(BASE_URL + chemin, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  const donnees = reponse.status === 204 ? null : await reponse.json();
  const message = donnees?.message ?? `Erreur HTTP ${reponse.status}`;

  if (!reponse.ok) {
    throw new ErreurApi(message, reponse.status, donnees?.erreurs ?? {});
  }
  return donnees as T;
}

export default {
  /* ---------------- CYCLES (personne A) ---------------- */

  /** GET /cycles : du plus récent au plus ancien */
  getCycles(): Promise<Cycle[]> {
    return requete('/cycles');
  },

  /** POST /cycles : les règles commencent ce jour-là ("2026-11-27") */
  commencerCycle(debut: string): Promise<Cycle> {
    return requete('/cycles', { method: 'POST', body: JSON.stringify({ debut }) });
  },

  /** PATCH /cycles/:id : les règles se terminent ce jour-là */
  terminerCycle(id: number, fin: string): Promise<Cycle> {
    return requete(`/cycles/${id}`, { method: 'PATCH', body: JSON.stringify({ fin }) });
  },

  /** DELETE /cycles/:id : réponse 204, sans contenu */
  supprimerCycle(id: number): Promise<void> {
    return requete(`/cycles/${id}`, { method: 'DELETE' });
  },

  /* ---------------- JOURNAL (personne B) ---------------- */

  /** GET /symptomes : le catalogue (comme getCategories) */
  getSymptomes(): Promise<Symptome[]> {
    return requete('/symptomes');
  },

  /** GET /journal ou /journal?date=2026-11-27 */
  getJournal(date?: string | null): Promise<EntreeJournal[]> {
    return requete(date ? `/journal?date=${date}` : '/journal');
  },

  /** GET /journal/:id */
  getEntree(id: number): Promise<EntreeJournal> {
    return requete(`/journal/${id}`);
  },

  /** POST /journal (comme creerCommande) */
  creerEntree(entree: NouvelleEntree): Promise<EntreeJournal> {
    return requete('/journal', { method: 'POST', body: JSON.stringify(entree) });
  },

  /** DELETE /journal/:id : réponse 204, sans contenu */
  supprimerEntree(id: number): Promise<void> {
    return requete(`/journal/${id}`, { method: 'DELETE' });
  },
};