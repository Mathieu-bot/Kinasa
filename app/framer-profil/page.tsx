import Image from "next/image"
import { Award, Calendar, Check, Droplet, Globe, Info, Leaf, MapPin, MessageSquare, Star, Truck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import PriceBreakdownChart from "@/components/price-breakdown-chart"

export default function FarmerProfile() {
  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Sidebar with farmer info */}
        <div className="space-y-6">
          <div className="flex flex-col items-center space-y-4 rounded-lg border bg-white p-6 text-center shadow-sm">
            <div className="relative h-32 w-32 overflow-hidden rounded-full">
              <Image
                src="/placeholder.svg?height=128&width=128"
                alt="Photo de profil"
                width={128}
                height={128}
                className="object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Coopérative Café Altura</h1>
              <p className="text-gray-600">Producteur de café biologique</p>
              <div className="mt-2 flex items-center justify-center space-x-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="ml-1 text-sm font-medium">(4.9)</span>
              </div>
            </div>
            <div className="flex w-full items-center justify-center space-x-2">
              <MapPin className="h-4 w-4 text-gray-600" />
              <span className="text-sm text-gray-600">Région de Huila, Colombie</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="flex items-center gap-1 border-green-200 bg-green-50">
                <Check className="h-3 w-3 text-green-600" />
                <span className="text-green-700">Commerce Équitable</span>
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1 border-green-200 bg-green-50">
                <Leaf className="h-3 w-3 text-green-600" />
                <span className="text-green-700">Agriculture Biologique</span>
              </Badge>
            </div>
            <Button className="w-full bg-green-700 hover:bg-green-800">
              <MessageSquare className="mr-2 h-4 w-4" />
              Contacter
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Certifications</CardTitle>
              <CardDescription>Vérifiées par des organismes indépendants</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <Award className="mt-0.5 h-5 w-5 text-green-600" />
                <div>
                  <h3 className="font-medium">Fair Trade Certified</h3>
                  <p className="text-sm text-gray-600">Vérifié par FLO-CERT - Valide jusqu'au 12/2025</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Award className="mt-0.5 h-5 w-5 text-green-600" />
                <div>
                  <h3 className="font-medium">Certification Biologique</h3>
                  <p className="text-sm text-gray-600">Vérifié par Ecocert - Valide jusqu'au 06/2025</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Award className="mt-0.5 h-5 w-5 text-green-600" />
                <div>
                  <h3 className="font-medium">Rainforest Alliance</h3>
                  <p className="text-sm text-gray-600">Vérifié par RA - Valide jusqu'au 09/2024</p>
                </div>
              </div>
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
                    Fondée en 1997, la Coopérative Café Altura regroupe 120 familles d'agriculteurs de la région de
                    Huila en Colombie. Notre mission est de produire un café de haute qualité tout en préservant notre
                    environnement et en améliorant les conditions de vie de nos membres.
                  </p>
                  <p className="mt-4 text-gray-600">
                    Nous cultivons notre café à des altitudes comprises entre 1 700 et 2 100 mètres, ce qui lui confère
                    des caractéristiques aromatiques exceptionnelles. Notre engagement envers des pratiques agricoles
                    durables nous a valu plusieurs certifications internationales.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Méthodes de production</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Leaf className="mt-0.5 h-5 w-5 text-green-600" />
                    <div>
                      <h3 className="font-medium">Agriculture biologique</h3>
                      <p className="text-sm text-gray-600">
                        Nous n'utilisons aucun pesticide ou engrais chimique. Notre café est cultivé à l'ombre d'arbres
                        indigènes qui préservent la biodiversité locale.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Droplet className="mt-0.5 h-5 w-5 text-green-600" />
                    <div>
                      <h3 className="font-medium">Gestion de l'eau</h3>
                      <p className="text-sm text-gray-600">
                        Nous avons mis en place un système de traitement des eaux usées et de récupération des eaux de
                        pluie pour minimiser notre impact environnemental.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Calendar className="mt-0.5 h-5 w-5 text-green-600" />
                    <div>
                      <h3 className="font-medium">Récolte sélective</h3>
                      <p className="text-sm text-gray-600">
                        Chaque cerise de café est cueillie à la main au moment optimal de maturité, garantissant ainsi
                        une qualité constante.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Capacités de production</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Info className="mt-0.5 h-5 w-5 text-green-600" />
                    <div>
                      <h3 className="font-medium">Volume annuel</h3>
                      <p className="text-sm text-gray-600">
                        Environ 80 tonnes de café vert par an, avec possibilité d'augmentation selon la demande.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Truck className="mt-0.5 h-5 w-5 text-green-600" />
                    <div>
                      <h3 className="font-medium">Logistique</h3>
                      <p className="text-sm text-gray-600">
                        Capacité d'exportation directe via le port de Buenaventura. Emballage en sacs de jute de 60 kg
                        ou selon les spécifications de l'acheteur.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Globe className="mt-0.5 h-5 w-5 text-green-600" />
                    <div>
                      <h3 className="font-medium">Marchés desservis</h3>
                      <p className="text-sm text-gray-600">
                        Nous exportons actuellement vers l'Europe, l'Amérique du Nord et l'Asie, avec une capacité à
                        répondre aux exigences spécifiques de chaque marché.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Products Tab */}
            <TabsContent value="products" className="space-y-6 pt-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <Card>
                  <CardHeader className="pb-4">
                    <div className="aspect-square overflow-hidden rounded-md">
                      <Image
                        src="/placeholder.svg?height=300&width=300"
                        alt="Café Arabica Premium"
                        width={300}
                        height={300}
                        className="h-full w-full object-cover transition-all hover:scale-105"
                      />
                    </div>
                    <CardTitle className="mt-4">Café Arabica Premium</CardTitle>
                    <CardDescription>Variété: Caturra & Typica</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">
                        Notre café phare, cultivé à 1 900m d'altitude. Notes de caramel, d'agrumes et de chocolat noir.
                      </p>
                      <div className="flex justify-between">
                        <span className="font-medium">Prix plancher:</span>
                        <span className="font-bold text-green-700">4,50 € / kg</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Disponibilité:</span>
                        <span>Avril à Juillet</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Commande minimum:</span>
                        <span>500 kg</span>
                      </div>
                    </div>
                    <Button className="mt-4 w-full bg-green-700 hover:bg-green-800">Demander un devis</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-4">
                    <div className="aspect-square overflow-hidden rounded-md">
                      <Image
                        src="/placeholder.svg?height=300&width=300"
                        alt="Café Arabica Spécial"
                        width={300}
                        height={300}
                        className="h-full w-full object-cover transition-all hover:scale-105"
                      />
                    </div>
                    <CardTitle className="mt-4">Café Arabica Spécial</CardTitle>
                    <CardDescription>Variété: Geisha</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">
                        Notre variété la plus exclusive, aux notes florales et fruitées exceptionnelles. Cultivé à 2
                        100m d'altitude.
                      </p>
                      <div className="flex justify-between">
                        <span className="font-medium">Prix plancher:</span>
                        <span className="font-bold text-green-700">7,80 € / kg</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Disponibilité:</span>
                        <span>Mai à Août</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Commande minimum:</span>
                        <span>300 kg</span>
                      </div>
                    </div>
                    <Button className="mt-4 w-full bg-green-700 hover:bg-green-800">Demander un devis</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Pricing Tab */}
            <TabsContent value="pricing" className="space-y-6 pt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Transparence des prix</CardTitle>
                  <CardDescription>
                    Comprendre comment le prix final est réparti entre les différents acteurs de la chaîne
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 w-full">
                    <PriceBreakdownChart />
                  </div>
                  <div className="mt-6 space-y-4">
                    <div className="rounded-lg bg-gray-50 p-4">
                      <h3 className="font-medium">Prix payé au producteur: 4,50 € / kg</h3>
                      <p className="text-sm text-gray-600">
                        Ce prix inclut les coûts de production (2,80 €), une prime de qualité (0,70 €) et une marge pour
                        la coopérative (1,00 €).
                      </p>
                    </div>
                    <div className="rounded-lg bg-gray-50 p-4">
                      <h3 className="font-medium">Coûts de certification et contrôle qualité: 0,30 € / kg</h3>
                      <p className="text-sm text-gray-600">
                        Inclut les frais d'audit pour les certifications Fair Trade et Bio, ainsi que les tests de
                        qualité.
                      </p>
                    </div>
                    <div className="rounded-lg bg-gray-50 p-4">
                      <h3 className="font-medium">Frais de logistique et transport: 1,20 € / kg</h3>
                      <p className="text-sm text-gray-600">
                        Transport local, frais de douane, assurance, transport maritime et manutention.
                      </p>
                    </div>
                    <div className="rounded-lg bg-gray-50 p-4">
                      <h3 className="font-medium">Frais de la plateforme: 0,25 € / kg</h3>
                      <p className="text-sm text-gray-600">
                        Commission prélevée par FairTrade Connect pour maintenir la plateforme et ses services.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Reviews Tab */}
            <TabsContent value="reviews" className="space-y-6 pt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Avis des acheteurs</CardTitle>
                  <CardDescription>Évaluations basées sur les transactions précédentes</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4">
                      <Image
                        src="/placeholder.svg?height=40&width=40"
                        alt="Photo de profil"
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">Café Artisan, France</h3>
                          <span className="text-sm text-gray-600">Il y a 2 mois</span>
                        </div>
                        <div className="mt-1 flex">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        </div>
                        <p className="mt-2 text-sm text-gray-600">
                          Excellente qualité constante. La livraison a été effectuée dans les délais prévus et la
                          communication a été fluide tout au long du processus. Nos clients apprécient l'histoire
                          derrière ce café et sa qualité exceptionnelle.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <Image
                        src="/placeholder.svg?height=40&width=40"
                        alt="Photo de profil"
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">Nordic Roasters, Suède</h3>
                          <span className="text-sm text-gray-600">Il y a 4 mois</span>
                        </div>
                        <div className="mt-1 flex">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <Star className="h-4 w-4 fill-muted stroke-muted-foreground" />
                        </div>
                        <p className="mt-2 text-sm text-gray-600">
                          Très bon café avec un profil aromatique intéressant. La documentation fournie sur les méthodes
                          de production était très détaillée, ce qui nous a permis de raconter l'histoire de ce café à
                          nos clients. Un léger retard dans la livraison, mais la communication a été bonne.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <Image
                        src="/placeholder.svg?height=40&width=40"
                        alt="Photo de profil"
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">Bean Lovers, Canada</h3>
                          <span className="text-sm text-gray-600">Il y a 6 mois</span>
                        </div>
                        <div className="mt-1 flex">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        </div>
                        <p className="mt-2 text-sm text-gray-600">
                          Partenariat exceptionnel. La qualité du café est remarquable et constante. La coopérative est
                          très réactive et s'adapte à nos besoins spécifiques. Nous apprécions particulièrement la
                          transparence sur les prix et les conditions de travail des producteurs.
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full">
                    Voir plus d'avis
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
