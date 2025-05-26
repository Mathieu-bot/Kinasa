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
  const [products, setProducts] = useState<Produit[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [productionMethods, setProductionMethods] = useState<MethodeProduction[]>([]);
  const [capacities, setCapacities] = useState<CapaciteProduction[]>([]);
  const [reviews, setReviews] = useState<Avis[]>([]);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    // Create a user profile from session data
    if (session?.user) {
      setUserProfile({
        name: session.user.name || 'Farmer',
        email: session.user.email || '',
        role: session.user.role || 'FARMER',
        image: session.user.image || '/placeholder.svg?height=128&width=128',
        id: session.user.id || ''
      });
    }
    
    // Function to load cooperative data
    const fetchCooperativeData = async () => {
      if (session?.user && "cooperativeId" in session.user) {
        try {
          // Fetch cooperative data
          const coopResponse = await fetch(
            `/api/cooperatives/${session.user.cooperativeId}`
          );
          const coopData = await coopResponse.json();
          setCooperative(coopData);

          // Fetch products
          const productsResponse = await fetch(
            `/api/cooperatives/${session.user.cooperativeId}/produits`
          );
          const productsData = await productsResponse.json();
          setProducts(productsData);

          // Fetch certifications
          const certifResponse = await fetch(
            `/api/cooperatives/${session.user.cooperativeId}/certifications`
          );
          const certifData = await certifResponse.json();
          setCertifications(certifData);

          // Fetch production methods
          const methodsResponse = await fetch(
            `/api/cooperatives/${session.user.cooperativeId}/methodes-production`
          );
          const methodsData = await methodsResponse.json();
          setProductionMethods(methodsData);

          // Fetch production capacities
          const capacitiesResponse = await fetch(
            `/api/cooperatives/${session.user.cooperativeId}/capacites-production`
          );
          const capacitiesData = await capacitiesResponse.json();
          setCapacities(capacitiesData);

          // Fetch reviews
          const reviewsResponse = await fetch(
            `/api/cooperatives/${session.user.cooperativeId}/avis`
          );
          const reviewsData = await reviewsResponse.json();
          setReviews(reviewsData);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      } else {
        // For development, load dummy data
        import("@/lib/dummy-data")
          .then(({ dummyData }) => {
            setCooperative(dummyData.cooperative);
            setProducts(dummyData.produits);
            setCertifications(dummyData.certifications);
            setProductionMethods(dummyData.methodesProduction);
            setCapacities(dummyData.capacites);
            setReviews(dummyData.avis);
            setLoading(false);
          })
          .catch((error) => {
            console.error(
              "Error loading demo data:",
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
        <p className="text-xl">Loading information...</p>
      </div>
    );
  }

  if (!cooperative) {
    return (
      <div className="flex h-screen flex-col items-center justify-center space-y-4">
        <p className="text-xl">No cooperative associated with your account.</p>
        <Button className="bg-green-700 hover:bg-green-800">
          Create your profile
        </Button>
      </div>
    );
  }

  // Format stars for average rating
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
                  cooperative?.photo_profil ||
                  "/placeholder.svg?height=128&width=128"
                }
                alt="Photo de profil"
                width={128}
                height={128}
                className="object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold">
                {loading
                  ? "Loading..."
                  : cooperative?.nom || userProfile?.name || "Coffee Cooperative"}
              </h1>
              <p className="text-gray-600">{cooperative?.description}</p>
              <div className="mt-2 flex items-center justify-center space-x-1">
                {renderStars(cooperative?.note_moyenne || 0)}
              </div>
              <div className="flex w-full items-center justify-center space-x-2">
                <MapPin className="h-4 w-4 text-gray-600" />
                <span className="text-sm text-gray-600">
                  {cooperative?.localisation || "Antananarivo, Madagascar"}
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
                Contact
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Certifications</CardTitle>
                <CardDescription>
                  Verified by independent organizations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">
                  {products.length > 0 ? products[0]?.description : ""}
                </p>
                <div className="flex justify-between">
                  <span className="font-medium">Floor price:</span>
                  <span className="font-bold text-green-700">
                    {products.length > 0 ? products[0]?.prix_plancher?.toFixed(2) : "0.00"} € / kg
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Availability:</span>
                  <span>{products.length > 0 ? products[0]?.periode_disponibilite : ""}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Minimum order:</span>
                  <span>{products.length > 0 ? products[0]?.commande_minimum : "0"} kg</span>
                </div>
              </CardContent>
              <Button className="mt-4 w-full bg-green-700 hover:bg-green-800">
                Request a quote
              </Button>
            </Card>
          </div>

          <Tabs>
            <TabsList>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="pricing">Pricing</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="products" className="space-y-6 pt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Products</CardTitle>
                  <CardDescription>
                    List of products offered by the cooperative
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {products.map((produit) => (
                    <div key={produit.id} className="flex flex-col space-y-2">
                      <h2 className="font-medium">{produit.nom}</h2>
                      <p className="text-sm text-gray-600">
                        {produit.description}
                      </p>
                      <div className="flex justify-between">
                        <span className="font-medium">Floor price:</span>
                        <span className="font-bold text-green-700">
                          {produit.prix_plancher?.toFixed(2)} € / kg
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Availability:</span>
                        <span>{produit.periode_disponibilite}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Minimum order:</span>
                        <span>{produit.commande_minimum} kg</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Pricing Tab */}
            <TabsContent value="pricing" className="space-y-6 pt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Price Transparency</CardTitle>
                  <CardDescription>
                    Understand how the final price is distributed among
                    different actors in the supply chain
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 w-full">
                    <PriceBreakdownChart />
                  </div>
                  <div className="mt-6 space-y-4">
                    {products.length > 0 && products[0]?.structure_prix && (
                      <>
                        <div className="rounded-lg bg-gray-50 p-4">
                          <h3 className="font-medium">
                            Price paid to producer:{" "}
                            {products[0]?.structure_prix?.prix_producteur?.toFixed(
                              2
                            ) || "0.00"}{" "}
                            € / kg
                          </h3>
                          <p className="text-sm text-gray-600">
                            {products[0]?.structure_prix?.details_producteur || ""}
                          </p>
                        </div>
                        <div className="rounded-lg bg-gray-50 p-4">
                          <h3 className="font-medium">
                            Certification costs and quality control:{" "}
                            {products[0]?.structure_prix?.couts_certification?.toFixed(
                              2
                            ) || "0.00"}{" "}
                            € / kg
                          </h3>
                          <p className="text-sm text-gray-600">
                            {products[0]?.structure_prix?.details_certification || ""}
                          </p>
                        </div>
                        <div className="rounded-lg bg-gray-50 p-4">
                          <h3 className="font-medium">
                            Logistics and transport fees:{" "}
                            {products[0]?.structure_prix?.frais_logistique?.toFixed(
                              2
                            ) || "0.00"}{" "}
                            € / kg
                          </h3>
                          <p className="text-sm text-gray-600">
                            {products[0]?.structure_prix?.details_logistique || ""}
                          </p>
                        </div>
                        <div className="rounded-lg bg-gray-50 p-4">
                          <h3 className="font-medium">
                            Platform fees:{" "}
                            {products[0]?.structure_prix?.frais_plateforme?.toFixed(
                              2
                            ) || "0.00"}{" "}
                            € / kg
                          </h3>
                          <p className="text-sm text-gray-600">
                            {products[0]?.structure_prix?.details_plateforme || ""}
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
                  <CardTitle>Buyer Reviews</CardTitle>
                  <CardDescription>
                    Ratings based on previous transactions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    {reviews.map((avis) => (
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
                              {avis.nom_acheteur || "Buyer"}, {avis.pays_acheteur || "Unknown"}
                            </h3>
                            <span className="text-sm text-gray-600">
                              {new Date(avis.date_avis).toLocaleDateString(
                                "en-US",
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

                  {reviews.length > 3 && (
                    <Button variant="outline" className="w-full">
                      See more reviews
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
