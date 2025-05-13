"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  Award,
  Calendar,
  Check,
  Droplet,
  Globe,
  Info,
  Leaf,
  MapPin,
  MessageSquare,
  Star,
  Truck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import PriceBreakdownChart from "@/components/price-breakdown-chart";
import {
  Cooperative,
  Produit,
  Certification,
  MethodeProduction,
  CapaciteProduction,
  Avis,
} from "@/lib/prisma-types";

export default function FarmerProfile() {
  const { data: session } = useSession();
  const [cooperative, setCooperative] = useState<Cooperative | null>(null);
  const [produits, setProduits] = useState<Produit[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [methodesProduction, setMethodesProduction] = useState<
    MethodeProduction[]
  >([]);
  const [capacites, setCapacites] = useState<CapaciteProduction[]>([]);
  const [avis, setAvis] = useState<Avis[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fonction pour charger les données de la coopérative
    const fetchCooperativeData = async () => {
      if (session?.user && "cooperativeId" in session.user) {
        try {
          // Récupération des données de la coopérative
          const coopResponse = await fetch(
            `/api/cooperatives/${session.user.cooperativeId}`
          );
          const coopData = await coopResponse.json();
          setCooperative(coopData);

          // Récupération des produits
          const produitsResponse = await fetch(
            `/api/cooperatives/${session.user.cooperativeId}/produits`
          );
          const produitsData = await produitsResponse.json();
          setProduits(produitsData);

          // Récupération des certifications
          const certifResponse = await fetch(
            `/api/cooperatives/${session.user.cooperativeId}/certifications`
          );
          const certifData = await certifResponse.json();
          setCertifications(certifData);

          // Récupération des méthodes de production
          const methodesResponse = await fetch(
            `/api/cooperatives/${session.user.cooperativeId}/methodes-production`
          );
          const methodesData = await methodesResponse.json();
          setMethodesProduction(methodesData);

          // Récupération des capacités de production
          const capacitesResponse = await fetch(
            `/api/cooperatives/${session.user.cooperativeId}/capacites-production`
          );
          const capacitesData = await capacitesResponse.json();
          setCapacites(capacitesData);

          // Récupération des avis
          const avisResponse = await fetch(
            `/api/cooperatives/${session.user.cooperativeId}/avis`
          );
          const avisData = await avisResponse.json();
          setAvis(avisData);
        } catch (error) {
          console.error("Erreur lors de la récupération des données:", error);
        } finally {
          setLoading(false);
        }
      } else {
        // Pour le développement, charger des données de démonstration
        import("@/lib/dummy-data")
          .then(({ dummyData }) => {
            setCooperative(dummyData.cooperative);
            setProduits(dummyData.produits);
            setCertifications(dummyData.certifications);
            setMethodesProduction(dummyData.methodesProduction);
            setCapacites(dummyData.capacites);
            setAvis(dummyData.avis);
            setLoading(false);
          })
          .catch((error) => {
            console.error(
              "Erreur lors du chargement des données de démonstration:",
              error
            );
            setLoading(false);
          });
      }
    };

    fetchCooperativeData();
  }, [session]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-xl">Chargement des informations...</p>
      </div>
    );
  }

  if (!cooperative) {
    return (
      <div className="flex h-screen flex-col items-center justify-center space-y-4">
        <p className="text-xl">Aucune coopérative associée à votre compte.</p>
        <Button className="bg-green-700 hover:bg-green-800">
          Créer votre profil
        </Button>
      </div>
    );
  }

  // Formatter les étoiles pour la note moyenne
  const renderStars = (note: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < note
              ? "fill-yellow-400 text-yellow-400"
              : "fill-muted stroke-muted-foreground"
          }`}
        />
      );
    }
    return stars;
  };

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Sidebar with farmer info */}
        <div className="space-y-6">
          <div className="flex flex-col items-center space-y-4 rounded-lg border bg-white p-6 text-center shadow-sm">
            <div className="relative h-32 w-32 overflow-hidden rounded-full">
              <Image
                src={
                  cooperative.photo_profil ||
                  "/placeholder.svg?height=128&width=128"
                }
                alt="Photo de profil"
                width={128}
                height={128}
                className="object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{cooperative.nom}</h1>
              <p className="text-gray-600">{cooperative.description}</p>
              <div className="mt-2 flex items-center justify-center space-x-1">
                {renderStars(cooperative.note_moyenne)}
                <span className="ml-1 text-sm font-medium">
                  ({cooperative.note_moyenne.toFixed(1)})
                </span>
              </div>
            </div>
            <div className="flex w-full items-center justify-center space-x-2">
              <MapPin className="h-4 w-4 text-gray-600" />
              <span className="text-sm text-gray-600">
                {cooperative.region}, {cooperative.pays}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {certifications.map((certification) => (
                <Badge
                  key={certification.id}
                  variant="outline"
                  className="flex items-center gap-1 border-green-200 bg-green-50"
                >
                  <Check className="h-3 w-3 text-green-600" />
                  <span className="text-green-700">
                    {certification.nom_certification}
                  </span>
                </Badge>
              ))}
            </div>
            <Button className="w-full bg-green-700 hover:bg-green-800">
              <MessageSquare className="mr-2 h-4 w-4" />
              Contacter
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Certifications</CardTitle>
              <CardDescription>
                Vérifiées par des organismes indépendants
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {certifications.map((certification) => (
                <div
                  key={certification.id}
                  className="flex items-start space-x-3"
                >
                  <Award className="mt-0.5 h-5 w-5 text-green-600" />
                  <div>
                    <h3 className="font-medium">
                      {certification.nom_certification}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Vérifié par {certification.organisme_verification} -
                      Valide jusqu'au{" "}
                      {new Date(certification.date_validite).toLocaleDateString(
                        "fr",
                        { month: "numeric", year: "numeric" }
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Main content */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="about">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="about">À propos</TabsTrigger>
              <TabsTrigger value="products">Produits</TabsTrigger>
              <TabsTrigger value="pricing">Tarification</TabsTrigger>
              <TabsTrigger value="reviews">Avis</TabsTrigger>
            </TabsList>

            {/* About Tab */}
            <TabsContent value="about" className="space-y-6 pt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notre histoire</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Fondée en {cooperative.annee_fondation}, la{" "}
                    {cooperative.nom} regroupe {cooperative.nombre_familles}{" "}
                    familles d'agriculteurs de la région de {cooperative.region}{" "}
                    en {cooperative.pays}. Notre mission est de produire un café
                    de haute qualité tout en préservant notre environnement et
                    en améliorant les conditions de vie de nos membres.
                  </p>
                  <p className="mt-4 text-gray-600">
                    Nous cultivons notre café à des altitudes variées, ce qui
                    lui confère des caractéristiques aromatiques
                    exceptionnelles. Notre engagement envers des pratiques
                    agricoles durables nous a valu plusieurs certifications
                    internationales.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Méthodes de production</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {methodesProduction.map((methode) => (
                    <div
                      key={methode.id}
                      className="flex items-start space-x-3"
                    >
                      <div className="mt-0.5 h-5 w-5 text-green-600">
                        {methode.type.includes("biologique") ? (
                          <Leaf />
                        ) : methode.type.includes("eau") ? (
                          <Droplet />
                        ) : (
                          <Calendar />
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium">{methode.type}</h3>
                        <p className="text-sm text-gray-600">
                          {methode.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Capacités de production</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {capacites.map((capacite) => (
                    <div
                      key={capacite.id}
                      className="flex items-start space-x-3"
                    >
                      <div className="mt-0.5 h-5 w-5 text-green-600">
                        {capacite.type.includes("Volume") ? (
                          <Info />
                        ) : capacite.type.includes("Logistique") ? (
                          <Truck />
                        ) : (
                          <Globe />
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium">{capacite.type}</h3>
                        <p className="text-sm text-gray-600">
                          {capacite.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Products Tab */}
            <TabsContent value="products" className="space-y-6 pt-6">
              <div className="grid gap-6 sm:grid-cols-2">
                {produits.map((produit) => (
                  <Card key={produit.id}>
                    <CardHeader className="pb-4">
                      <div className="aspect-square overflow-hidden rounded-md">
                        <Image
                          src={
                            produit.photo_produit ||
                            "/placeholder.svg?height=300&width=300"
                          }
                          alt={produit.nom}
                          width={300}
                          height={300}
                          className="h-full w-full object-cover transition-all hover:scale-105"
                        />
                      </div>
                      <CardTitle className="mt-4">{produit.nom}</CardTitle>
                      <CardDescription>
                        Variété: {produit.variete}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600">
                          {produit.description}
                        </p>
                        <div className="flex justify-between">
                          <span className="font-medium">Prix plancher:</span>
                          <span className="font-bold text-green-700">
                            {produit.prix_plancher.toFixed(2)} € / kg
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Disponibilité:</span>
                          <span>{produit.periode_disponibilite}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Commande minimum:</span>
                          <span>{produit.commande_minimum} kg</span>
                        </div>
                      </div>
                      <Button className="mt-4 w-full bg-green-700 hover:bg-green-800">
                        Demander un devis
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Pricing Tab */}
            <TabsContent value="pricing" className="space-y-6 pt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Transparence des prix</CardTitle>
                  <CardDescription>
                    Comprendre comment le prix final est réparti entre les
                    différents acteurs de la chaîne
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 w-full">
                    <PriceBreakdownChart />
                  </div>
                  <div className="mt-6 space-y-4">
                    {produits.length > 0 && produits[0].structure_prix && (
                      <>
                        <div className="rounded-lg bg-gray-50 p-4">
                          <h3 className="font-medium">
                            Prix payé au producteur:{" "}
                            {produits[0].structure_prix.prix_producteur.toFixed(
                              2
                            )}{" "}
                            € / kg
                          </h3>
                          <p className="text-sm text-gray-600">
                            {produits[0].structure_prix.details_producteur}
                          </p>
                        </div>
                        <div className="rounded-lg bg-gray-50 p-4">
                          <h3 className="font-medium">
                            Coûts de certification et contrôle qualité:{" "}
                            {produits[0].structure_prix.couts_certification.toFixed(
                              2
                            )}{" "}
                            € / kg
                          </h3>
                          <p className="text-sm text-gray-600">
                            {produits[0].structure_prix.details_certification}
                          </p>
                        </div>
                        <div className="rounded-lg bg-gray-50 p-4">
                          <h3 className="font-medium">
                            Frais de logistique et transport:{" "}
                            {produits[0].structure_prix.frais_logistique.toFixed(
                              2
                            )}{" "}
                            € / kg
                          </h3>
                          <p className="text-sm text-gray-600">
                            {produits[0].structure_prix.details_logistique}
                          </p>
                        </div>
                        <div className="rounded-lg bg-gray-50 p-4">
                          <h3 className="font-medium">
                            Frais de la plateforme:{" "}
                            {produits[0].structure_prix.frais_plateforme.toFixed(
                              2
                            )}{" "}
                            € / kg
                          </h3>
                          <p className="text-sm text-gray-600">
                            {produits[0].structure_prix.details_plateforme}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Reviews Tab */}
            <TabsContent value="reviews" className="space-y-6 pt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Avis des acheteurs</CardTitle>
                  <CardDescription>
                    Évaluations basées sur les transactions précédentes
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    {avis.map((avis) => (
                      <div key={avis.id} className="flex items-start space-x-4">
                        <Image
                          src={
                            avis.photo_profil ||
                            "/placeholder.svg?height=40&width=40"
                          }
                          alt="Photo de profil"
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium">
                              {avis.nom_acheteur}, {avis.pays_acheteur}
                            </h3>
                            <span className="text-sm text-gray-600">
                              {new Date(avis.date_avis).toLocaleDateString(
                                "fr",
                                {
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                                }
                              )}
                            </span>
                          </div>
                          <div className="mt-1 flex">
                            {renderStars(avis.note)}
                          </div>
                          <p className="mt-2 text-sm text-gray-600">
                            {avis.commentaire}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {avis.length > 3 && (
                    <Button variant="outline" className="w-full">
                      Voir plus d'avis
                    </Button>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
