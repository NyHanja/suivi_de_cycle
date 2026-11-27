/*
 * Journal des symptômes, qui vient de l'API.
 * Même modèle que usePanier.ts.
 *
 * ÉTAPE 0 : signatures seulement.
 * PERSONNE B : remplir les TODO (tâche B6).
 */
import { ref } from 'vue';
import type { EntreeJournal, Flux, Humeur, NouvelleEntree, Symptome } from '@/types/cycle';
// import api from '@/services/api';   // B : à décommenter

// État partagé, déclaré EN DEHORS de la fonction.
const entrees = ref<EntreeJournal[]>([]);
const symptomes = ref<Symptome[]>([]);
const chargement = ref(false);
const erreur = ref<string | null>(null);

/** 'leger' -> 'Léger'  (switch exhaustif, comme libelleStatut) */
export function libelleFlux(flux: Flux): string {
  // TODO B
  return flux;
}

/** 'fatiguee' -> 'Fatiguée' */
export function libelleHumeur(humeur: Humeur): string {
  // TODO B
  return humeur;
}

export function useJournal() {
  /** GET /journal (toutes les entrées, la plus récente en premier). */
  async function charger(): Promise<void> {
    // TODO B
  }

  /** GET /symptomes : le catalogue pour les cases à cocher. */
  async function chargerSymptomes(): Promise<void> {
    // TODO B
  }

  /** POST /journal. Renvoie l'entrée créée. Laisse passer ErreurApi (422) pour la page. */
  async function ajouter(entree: NouvelleEntree): Promise<EntreeJournal> {
    // TODO B : const creee = await api.creerEntree(entree); ...
    throw new Error('ajouter : pas encore codé');
  }

  /** DELETE /journal/:id */
  async function supprimer(id: number): Promise<void> {
    // TODO B
  }

  return { entrees, symptomes, chargement, erreur, charger, chargerSymptomes, ajouter, supprimer };
}
