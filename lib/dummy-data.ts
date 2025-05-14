import {
  Cooperative,
  Produit,
  Certification,
  MethodeProduction,
  CapaciteProduction,
  Avis,
  StructurePrix,
} from "./prisma-types";

// Données statiques pour le développement et les tests
export const dummyData = {
  cooperative: {
    id: "1",
    nom: "Coopérative Café Altura",
    description: "Producteur de café biologique",
    region: "Sierra Madre",
    pays: "Colombie",
    annee_fondation: 1997,
    nombre_familles: 120,
    note_moyenne: 4.9,
    photo_profil: "/placeholder_farmer.jpg",
    createdAt: new Date("2020-01-01"),
    updatedAt: new Date("2023-05-10"),
  } as Cooperative,

  certifications: [
    {
      id: "1",
      nom_certification: "Fair Trade Certified",
      organisme_verification: "FLO-CERT",
      date_validite: new Date("2024-12-31"),
      description:
        "Cette certification garantit des prix équitables pour les producteurs",
      cooperativeId: "1",
      createdAt: new Date("2021-01-15"),
      updatedAt: new Date("2021-01-15"),
    },
    {
      id: "2",
      nom_certification: "Certification Biologique",
      organisme_verification: "Ecocert",
      date_validite: new Date("2024-06-30"),
      description:
        "Cette certification garantit des méthodes de production biologiques",
      cooperativeId: "1",
      createdAt: new Date("2021-02-01"),
      updatedAt: new Date("2021-02-01"),
    },
  ] as Certification[],

  structurePrix: {
    id: "1",
    produitId: "1",
    prix_producteur: 4.5,
    couts_certification: 0.3,
    frais_logistique: 1.2,
    frais_plateforme: 0.25,
    details_producteur:
      "Coûts de production: 2.80€, prime qualité: 0.70€, marge coopérative: 1.00€",
    details_certification:
      "Frais annuels de certification et contrôles qualité",
    details_logistique:
      "Transport maritime et terrestre, frais de douane, stockage",
    details_plateforme:
      "Frais de service pour la mise en relation et gestion des transactions",
    createdAt: new Date("2022-01-01"),
    updatedAt: new Date("2022-01-01"),
  } as StructurePrix,

  produits: [
    {
      id: "1",
      nom: "Café Arabica Premium",
      variete: "Caturra & Typica",
      description:
        "Notre café phare, cultivé à 1 900m d'altitude. Notes de caramel, chocolat et agrumes.",
      prix_plancher: 6.25,
      altitude_culture: 1900,
      periode_disponibilite: "Avril à Juillet",
      commande_minimum: 500,
      photo_produit: "/placeholder_coffee.jpg",
      cooperativeId: "1",
      structure_prix: {
        id: "1",
        produitId: "1",
        prix_producteur: 4.5,
        couts_certification: 0.3,
        frais_logistique: 1.2,
        frais_plateforme: 0.25,
        details_producteur:
          "Coûts de production: 2.80€, prime qualité: 0.70€, marge coopérative: 1.00€",
        details_certification:
          "Frais annuels de certification et contrôles qualité",
        details_logistique:
          "Transport maritime et terrestre, frais de douane, stockage",
        details_plateforme:
          "Frais de service pour la mise en relation et gestion des transactions",
        createdAt: new Date("2022-01-01"),
        updatedAt: new Date("2022-01-01"),
      },
      createdAt: new Date("2022-01-01"),
      updatedAt: new Date("2023-03-15"),
    },
    {
      id: "2",
      nom: "Café Geisha",
      variete: "Geisha",
      description:
        "Variété rare aux arômes floraux et notes de jasmin, bergamote et miel.",
      prix_plancher: 12.0,
      altitude_culture: 2100,
      periode_disponibilite: "Mai à Août",
      commande_minimum: 250,
      photo_produit: "/placeholder_coffee2.jpg",
      cooperativeId: "1",
      createdAt: new Date("2022-02-15"),
      updatedAt: new Date("2023-03-15"),
    },
  ] as Produit[],

  methodesProduction: [
    {
      id: "1",
      type: "Agriculture biologique",
      description:
        "Nous n'utilisons aucun pesticide ou engrais chimique. Tout est 100% naturel.",
      icone: "leaf",
      cooperativeId: "1",
      createdAt: new Date("2022-01-01"),
      updatedAt: new Date("2022-01-01"),
    },
    {
      id: "2",
      type: "Gestion de l'eau",
      description:
        "Système de filtration pour réutiliser l'eau du traitement du café.",
      icone: "droplet",
      cooperativeId: "1",
      createdAt: new Date("2022-01-01"),
      updatedAt: new Date("2022-01-01"),
    },
    {
      id: "3",
      type: "Récolte sélective",
      description:
        "Cueillette à la main des cerises à pleine maturité uniquement.",
      icone: "calendar",
      cooperativeId: "1",
      createdAt: new Date("2022-01-01"),
      updatedAt: new Date("2022-01-01"),
    },
  ] as MethodeProduction[],

  capacites: [
    {
      id: "1",
      type: "Volume annuel",
      description: "Nous produisons environ 80 tonnes de café vert par an.",
      valeur: "80 tonnes",
      cooperativeId: "1",
      createdAt: new Date("2022-01-01"),
      updatedAt: new Date("2022-01-01"),
    },
    {
      id: "2",
      type: "Logistique",
      description:
        "Expédition en conteneurs FCL ou LCL depuis le port de Carthagène.",
      valeur: "Export direct",
      cooperativeId: "1",
      createdAt: new Date("2022-01-01"),
      updatedAt: new Date("2022-01-01"),
    },
    {
      id: "3",
      type: "Marchés desservis",
      description:
        "Nous exportons principalement vers l'Europe et l'Amérique du Nord.",
      valeur: "Europe, USA, Canada",
      cooperativeId: "1",
      createdAt: new Date("2022-01-01"),
      updatedAt: new Date("2022-01-01"),
    },
  ] as CapaciteProduction[],

  avis: [
    {
      id: "1",
      nom_acheteur: "Café Artisan",
      pays_acheteur: "France",
      note: 5,
      commentaire:
        "Excellent café avec des notes fruitées exceptionnelles. La coopérative est très professionnelle et transparente.",
      photo_profil: "/placeholder_buyer1.jpg",
      date_avis: new Date("2023-02-15"),
      cooperativeId: "1",
      createdAt: new Date("2023-02-15"),
      updatedAt: new Date("2023-02-15"),
    },
    {
      id: "2",
      nom_acheteur: "Bean Brothers",
      pays_acheteur: "Allemagne",
      note: 5,
      commentaire:
        "Partenaire fiable depuis 3 ans. Qualité constante et excellente communication.",
      photo_profil: "/placeholder_buyer2.jpg",
      date_avis: new Date("2022-11-20"),
      cooperativeId: "1",
      createdAt: new Date("2022-11-20"),
      updatedAt: new Date("2022-11-20"),
    },
    {
      id: "3",
      nom_acheteur: "Coffeehouse Nordic",
      pays_acheteur: "Suède",
      note: 4,
      commentaire:
        "Très bon café, légèrement différent du lot précédent mais toujours de grande qualité.",
      photo_profil: "/placeholder_buyer3.jpg",
      date_avis: new Date("2023-04-05"),
      cooperativeId: "1",
      createdAt: new Date("2023-04-05"),
      updatedAt: new Date("2023-04-05"),
    },
  ] as Avis[],
};
