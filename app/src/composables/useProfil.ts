/*
 * Profil de l'utilisatrice, stocké sur le téléphone avec Preferences.
 * Même modèle que useFavoris.ts (fiche 08).
 *
 * ÉTAPE 0 : signatures seulement. Le profil par défaut marche tout de suite,
 * donc la personne A peut déjà appeler useProfil() dans ses pages.
 * PERSONNE B : remplir les TODO (tâche B3).
 */
import { ref } from 'vue';
import type { Profil } from '@/types/cycle';
// import { lire, ecrire } from '@/services/stockage';   // B : à décommenter

export const PROFIL_DEFAUT: Profil = {
  prenom: '',
  dureeCycle: 28,
  dureeRegles: 5,
  configure: false,
};

// État déclaré EN DEHORS de la fonction : toutes les pages partagent le même profil.
const profil = ref<Profil>({ ...PROFIL_DEFAUT });

/** Garde de type, comme estPanier : la donnée lue est-elle bien un Profil ? */
export function estProfil(x: unknown): x is Profil {
  // TODO B : vérifier les 4 champs et leurs types
  return false;
}

/** Appelée dans main.ts avant d'afficher l'application. */
export async function restaurerProfil(): Promise<void> {
  // TODO B : profil.value = await lire('profil', PROFIL_DEFAUT, estProfil);
}

export function useProfil() {
  /** Remplace le profil et l'enregistre sur le téléphone. */
  async function enregistrerProfil(nouveau: Profil): Promise<void> {
    profil.value = nouveau;
    // TODO B : await ecrire('profil', profil.value);
  }

  /** « Effacer mes données » : retour au profil par défaut (configure = false). */
  async function reinitialiser(): Promise<void> {
    profil.value = { ...PROFIL_DEFAUT };
    // TODO B : await ecrire('profil', profil.value);
  }

  return { profil, enregistrerProfil, reinitialiser };
}
