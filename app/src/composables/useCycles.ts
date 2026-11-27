/*
 * Les cycles viennent de l'API ; les prédictions sont calculées à partir
 * des cycles et du profil. Même modèle que usePanier.ts.
 *
 * ÉTAPE 0 : signatures seulement.
 * PERSONNE A : remplir les TODO (tâche A3), avec utils/calculs.ts (tâche A2).
 */
import { ref, computed } from 'vue';
import type { Cycle, Prediction } from '@/types/cycle';
import { useProfil } from '@/composables/useProfil';
// import api from '@/services/api';           // A : à décommenter
// import { predire } from '@/utils/calculs';  // A : à décommenter quand calculs.ts existe

// État partagé, déclaré EN DEHORS de la fonction.
const cycles = ref<Cycle[]>([]);
const chargement = ref(false);
const erreur = ref<string | null>(null);

export function useCycles() {
  const { profil } = useProfil();

  /** GET /cycles -> remplit cycles (spinner + message d'erreur comme MenuPage). */
  async function charger(): Promise<void> {
    // TODO A
  }

  /** POST /cycles : les règles commencent à cette date ("AAAA-MM-JJ"). */
  async function commencerRegles(date: string): Promise<void> {
    // TODO A : api.commencerCycle(date), puis mettre à jour cycles
  }

  /** PATCH /cycles/:id : les règles se terminent à cette date. */
  async function terminerRegles(id: number, date: string): Promise<void> {
    // TODO A : api.terminerCycle(id, date), puis mettre à jour cycles
  }

  /** DELETE /cycles/:id */
  async function supprimer(id: number): Promise<void> {
    // TODO A : api.supprimerCycle(id), puis retirer de cycles
  }

  /** Le cycle dont les règles sont en cours (fin === null), ou null. */
  const cycleEnCours = computed<Cycle | null>(() => {
    return cycles.value.find((c) => c.fin === null) ?? null;
  });

  /** Prédiction du jour, ou null s'il n'y a aucun cycle. */
  const prediction = computed<Prediction | null>(() => {
    // TODO A : return predire(cycles.value, profil.value, aujourdhui);
    void profil;
    return null;
  });

  return {
    cycles, chargement, erreur,
    charger, commencerRegles, terminerRegles, supprimer,
    cycleEnCours, prediction,
  };
}
