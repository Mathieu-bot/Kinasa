// Types pour le profil fermier
// Ces types reflètent la structure attendue des données provenant de prisma

export interface Cooperative {
  id: string;
  nom: string;
  description: string;
  region: string;
  pays: string;
  annee_fondation: number;
  nombre_familles: number;
  note_moyenne: number;
  photo_profil?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Certification {
  id: string;
  nom_certification: string;
  organisme_verification: string;
  date_validite: Date;
  description?: string;
  cooperativeId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface StructurePrix {
  id: string;
  produitId: string;
  prix_producteur: number;
  couts_certification: number;
  frais_logistique: number;
  frais_plateforme: number;
  details_producteur?: string;
  details_certification?: string;
  details_logistique?: string;
  details_plateforme?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Produit {
  id: string;
  nom: string;
  variete: string;
  description: string;
  prix_plancher: number;
  altitude_culture?: number;
  periode_disponibilite: string;
  commande_minimum: number;
  photo_produit?: string;
  cooperativeId: string;
  structure_prix?: StructurePrix;
  createdAt: Date;
  updatedAt: Date;
}

export interface MethodeProduction {
  id: string;
  type: string;
  description: string;
  icone: string;
  cooperativeId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CapaciteProduction {
  id: string;
  type: string;
  description: string;
  valeur: string;
  cooperativeId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Avis {
  id: string;
  nom_acheteur: string;
  pays_acheteur: string;
  note: number;
  commentaire: string;
  photo_profil?: string;
  date_avis: Date;
  cooperativeId: string;
  createdAt: Date;
  updatedAt: Date;
}
