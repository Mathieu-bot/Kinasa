import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, LineChart, ShoppingCart, Truck, MessageSquare, FileText } from "lucide-react"

export function PlatformPreview() {
  return (
    <div className="container max-w-screen-xl pb-20">
      <Tabs defaultValue="marketplace" className="w-full">
        <div className="border-b border-border/40 pb-2">
          <TabsList className="bg-transparent border-b-0">
            <TabsTrigger
              value="marketplace"
              className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
            >
              Marketplace
            </TabsTrigger>
            <TabsTrigger
              value="producer-profile"
              className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
            >
              Producer Profile
            </TabsTrigger>
            <TabsTrigger
              value="price-transparency"
              className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
            >
              Price Transparency
            </TabsTrigger>
            <TabsTrigger
              value="messaging"
              className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
            >
              Messaging
            </TabsTrigger>
            <TabsTrigger
              value="logistics"
              className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
            >
              Logistics
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="marketplace" className="mt-6 border border-border/40 rounded-md bg-card/20 p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold mb-4">Product Marketplace</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <Card key={i} className="overflow-hidden">
                    <div className="h-40 bg-gray-100 flex items-center justify-center">
                      <ShoppingCart className="h-10 w-10 text-gray-400" />
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">Premium Coffee Beans</h4>
                          <p className="text-sm text-gray-500">Ethiopia, Grade A</p>
                        </div>
                        <Badge className="bg-primary/10 text-primary border-primary/30 hover:bg-primary/20">
                          Verified
                        </Badge>
                      </div>
                      <div className="mt-2 text-sm text-gray-600">$4.20 / kg</div>
                      <div className="mt-1 text-xs text-gray-500">Min order: 200kg</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Advanced Filters</h3>
              <div className="space-y-4">
                <div className="border border-border/40 rounded-md p-4">
                  <h4 className="text-sm font-medium mb-2">Product Type</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <input type="checkbox" id="coffee" className="mr-2" />
                      <label htmlFor="coffee">Coffee (56)</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="cocoa" className="mr-2" />
                      <label htmlFor="cocoa">Cocoa (34)</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="fruits" className="mr-2" />
                      <label htmlFor="fruits">Tropical Fruits (48)</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="spices" className="mr-2" />
                      <label htmlFor="spices">Spices (29)</label>
                    </div>
                  </div>
                </div>
                <div className="border border-border/40 rounded-md p-4">
                  <h4 className="text-sm font-medium mb-2">Certification</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <input type="checkbox" id="organic" className="mr-2" />
                      <label htmlFor="organic">Organic (87)</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="fairtrade" className="mr-2" />
                      <label htmlFor="fairtrade">Fair Trade (62)</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="rainforest" className="mr-2" />
                      <label htmlFor="rainforest">Rainforest Alliance (41)</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="producer-profile" className="mt-6 border border-border/40 rounded-md bg-card/20 p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <Users className="h-12 w-12 text-gray-400" />
              </div>
              <div className="mt-4 text-center">
                <h3 className="font-semibold text-lg">Abera Coffee Cooperative</h3>
                <p className="text-sm text-gray-500">Sidama Region, Ethiopia</p>
                <div className="flex justify-center mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="h-4 w-4 text-yellow-500 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                    </svg>
                  ))}
                  <span className="text-xs text-gray-500 ml-1">(28 reviews)</span>
                </div>
              </div>
            </div>
            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold mb-4">Producer Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="border border-border/40 rounded-md p-4">
                  <h4 className="text-sm font-medium mb-2">Cooperative Information</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between">
                      <span className="text-gray-500">Founded:</span>
                      <span>2008</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-500">Members:</span>
                      <span>248 farmers</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-500">Total area:</span>
                      <span>560 hectares</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-500">Altitude:</span>
                      <span>1,800-2,200m</span>
                    </li>
                  </ul>
                </div>
                <div className="border border-border/40 rounded-md p-4">
                  <h4 className="text-sm font-medium mb-2">Farming Practices</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-50 text-green-700 border-green-200">Organic</Badge>
                      <Badge className="bg-blue-50 text-blue-700 border-blue-200">Shade Grown</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      All members practice organic farming methods with traditional shade growing techniques that help
                      preserve local biodiversity.
                    </p>
                  </div>
                </div>
              </div>

              <h4 className="text-sm font-medium mb-3">Cooperative Story</h4>
              <p className="text-sm text-gray-600 mb-4">
                Founded by 12 families in 2008, the Abera Coffee Cooperative has grown to include over 240 member
                farmers. They specialize in high-altitude Arabica varieties cultivated using traditional methods passed
                down through generations. The cooperative has invested in community education programs and a central
                washing station to improve quality control.
              </p>

              <div className="flex items-center justify-between">
                <Button size="sm">Contact Producer</Button>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline">
                    View Products
                  </Button>
                  <Button size="sm" variant="outline">
                    View Certifications
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="price-transparency" className="mt-6 border border-border/40 rounded-md bg-card/20 p-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Price Breakdown - Ethiopian Sidama Coffee</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="h-64 bg-gray-50 rounded-lg p-4 flex items-center justify-center">
                  <LineChart className="h-40 w-40 text-gray-400" />
                </div>
                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2">Market Price Comparison</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="bg-gray-50 p-3 rounded-md">
                      <div className="text-gray-500">ICO Indicator Price</div>
                      <div className="font-medium">$3.45 / kg</div>
                    </div>
                    <div className="bg-primary/10 p-3 rounded-md">
                      <div className="text-primary">Kinasa Fair Price</div>
                      <div className="font-medium">$4.20 / kg</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md">
                      <div className="text-gray-500">Local Middleman Price</div>
                      <div className="font-medium">$2.75 / kg</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md">
                      <div className="text-gray-500">Price Advantage</div>
                      <div className="font-medium text-primary">+35%</div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-3">Value Chain Breakdown</h4>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Farmer Income</span>
                      <span className="text-sm font-medium">$2.90 / kg (69%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "69%" }}></div>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Processing & Quality Control</span>
                      <span className="text-sm font-medium">$0.45 / kg (11%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: "11%" }}></div>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Logistics & Export</span>
                      <span className="text-sm font-medium">$0.55 / kg (13%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "13%" }}></div>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Kinasa Platform Fee</span>
                      <span className="text-sm font-medium">$0.30 / kg (7%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: "7%" }}></div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-sm text-gray-600">
                  <p>Traditional supply chains often give farmers less than 40% of the final export price.</p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="messaging" className="mt-6 border border-border/40 rounded-md bg-card/20 p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border-r border-border/40 pr-4">
              <h3 className="text-sm font-medium mb-3">Recent Conversations</h3>
              <div className="space-y-2">
                {[
                  { name: "Abera Coffee", new: true },
                  { name: "Togo Cocoa Farmers", new: false },
                  { name: "Kenyan Tea Association", new: false },
                  { name: "Peruvian Quinoa Co-op", new: false },
                ].map((convo, i) => (
                  <div
                    key={i}
                    className={`p-3 rounded-md flex items-center justify-between cursor-pointer ${
                      i === 0 ? "bg-primary/10" : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                        {convo.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-medium">{convo.name}</div>
                        <div className="text-xs text-gray-500">Last message: 2h ago</div>
                      </div>
                    </div>
                    {convo.new && <div className="w-2 h-2 rounded-full bg-primary"></div>}
                  </div>
                ))}
              </div>
            </div>
            <div className="md:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">A</div>
                  <div>
                    <h3 className="font-medium">Abera Coffee Cooperative</h3>
                    <div className="text-xs text-gray-500">Online now</div>
                  </div>
                </div>
                <div>
                  <Button size="sm" variant="outline">
                    View Profile
                  </Button>
                </div>
              </div>

              <div className="border border-border/40 rounded-md h-64 overflow-y-auto p-4 mb-4">
                <div className="flex flex-col space-y-3">
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-lg rounded-tl-none p-3 max-w-[80%]">
                      <p className="text-sm">
                        Hello, I'm interested in your Sidama coffee beans. What quantities can you provide for a test
                        order?
                      </p>
                      <span className="text-xs text-gray-500 mt-1">10:30 AM</span>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <div className="bg-primary/10 text-gray-800 rounded-lg rounded-tr-none p-3 max-w-[80%]">
                      <p className="text-sm">
                        Hello! Thank you for your interest. We can provide a minimum test order of 200kg. Our current
                        harvest is available now with cupping notes of berries and chocolate.
                      </p>
                      <span className="text-xs text-gray-500 mt-1">10:45 AM</span>
                    </div>
                  </div>

                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-lg rounded-tl-none p-3 max-w-[80%]">
                      <p className="text-sm">
                        That sounds perfect. What's the price per kg for the test order? And do you have any samples
                        available?
                      </p>
                      <span className="text-xs text-gray-500 mt-1">11:02 AM</span>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <div className="bg-primary/10 text-gray-800 rounded-lg rounded-tr-none p-3 max-w-[80%]">
                      <p className="text-sm">
                        The price is $4.20/kg for the test order. We can send you a 100g sample for evaluation, you only
                        pay shipping. Would you like me to arrange that?
                      </p>
                      <span className="text-xs text-gray-500 mt-1">11:15 AM</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 border border-border/40 rounded-l-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <Button className="rounded-l-none">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Send
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="logistics" className="mt-6 border border-border/40 rounded-md bg-card/20 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Order #KIN-1872</h3>
              <div className="border border-border/40 rounded-md p-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium">Order Details</h4>
                  <Badge className="bg-yellow-50 text-yellow-700 border-yellow-200">Processing</Badge>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Product:</span>
                    <span>Sidama Coffee Beans (Grade A)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Quantity:</span>
                    <span>500 kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Unit Price:</span>
                    <span>$4.20 / kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Total Value:</span>
                    <span className="font-medium">$2,100.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Payment Status:</span>
                    <span className="text-green-600">50% Paid</span>
                  </div>
                </div>
              </div>

              <div className="border border-border/40 rounded-md p-4">
                <h4 className="text-sm font-medium mb-2">Shipping Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Origin:</span>
                    <span>Sidama, Ethiopia</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Destination:</span>
                    <span>Rotterdam, Netherlands</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Shipping Method:</span>
                    <span>Sea Freight</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Estimated Arrival:</span>
                    <span>June 15, 2024</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Shipment Tracking</h3>
              <div className="border border-border/40 rounded-md p-4">
                <div className="flex items-center mb-4">
                  <div className="w-full">
                    <div className="relative">
                      <div className="flex items-center justify-between mb-2">
                        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center z-10 relative">
                          1
                        </div>
                        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center z-10 relative">
                          2
                        </div>
                        <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center z-10 relative">
                          3
                        </div>
                        <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center z-10 relative">
                          4
                        </div>
                      </div>
                      <div className="absolute top-4 left-0 right-0 h-1 bg-gray-200 -z-0">
                        <div className="h-1 bg-primary" style={{ width: "40%" }}></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs mt-1">
                      <span>
                        Order
                        <br />
                        Confirmed
                      </span>
                      <span>
                        Processing
                        <br />& Quality Check
                      </span>
                      <span>
                        Shipping
                        <br />& Transit
                      </span>
                      <span>
                        Delivery
                        <br />
                        Complete
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mt-6">
                  <div className="flex items-start">
                    <div className="min-w-8 mr-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-1.5"></div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Order Confirmed</div>
                      <div className="text-xs text-gray-500">May 12, 2024 - 10:23 AM</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="min-w-8 mr-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-1.5"></div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Processing Started</div>
                      <div className="text-xs text-gray-500">May 14, 2024 - 09:45 AM</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="min-w-8 mr-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-1.5"></div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Quality Check Complete</div>
                      <div className="text-xs text-gray-500">May 16, 2024 - 02:30 PM</div>
                    </div>
                  </div>
                  <div className="flex items-start opacity-50">
                    <div className="min-w-8 mr-3">
                      <div className="w-2 h-2 rounded-full bg-gray-400 mt-1.5"></div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Shipping Documents Prepared</div>
                      <div className="text-xs text-gray-500">Pending</div>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <Button size="sm" className="mr-2">
                    <FileText className="h-4 w-4 mr-2" />
                    View Documents
                  </Button>
                  <Button size="sm" variant="outline">
                    <Truck className="h-4 w-4 mr-2" />
                    Track Shipment
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
