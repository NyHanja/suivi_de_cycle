// src/types/cycle.ts — toutes les dates sont des chaînes "AAAA-MM-JJ"
export type Phase = 'regles' | 'folliculaire' | 'ovulation' | 'luteale';
export type Flux = 'leger' | 'moyen' | 'abondant';
export type Humeur = 'bien' | 'fatiguee' | 'triste' | 'irritable' | 'anxieuse';

export interface Profil {          // stocké avec Preferences (comme les favoris)
  prenom: string;
  dureeCycle: number;              // 28 par défaut
  dureeRegles: number;             // 5 par défaut
  configure: boolean;              // false tant que l'accueil n'est pas fini
}

export interface Cycle {           // vient de l'API (comme Plat)
  id: number;
  debut: string;
  fin: string | null;              // null = règles en cours
}

export interface Symptome { id: number; nom: string; }   // comme Categorie

export interface EntreeJournal {   // comme Commande
  id: number;
  date: string;
  flux: Flux | null;
  humeur: Humeur | null;
  symptomes: Symptome[];
  note: string;
}

export interface NouvelleEntree {  // comme NouvelleCommande
  date: string;
  flux: Flux | null;
  humeur: Humeur | null;
  symptome_ids: number[];
  note: string;
}

export interface Prediction {
  jourDuCycle: number;
  phase: Phase;
  prochainesRegles: string;
  joursAvantRegles: number;
  fenetreFertile: { debut: string; fin: string };
}