export interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  category: string;
  isNew?: boolean;
  rating: number;
  producer?: string;
  region?: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Premium Vanilla Beans",
    price: 24.99,
    oldPrice: 29.99,
    image:
      "https://images.unsplash.com/photo-1611088427350-2a1a8c1f0420?q=80&w=2940&auto=format&fit=crop",
    category: "Spices",
    isNew: false,
    rating: 5,
    producer: "Cooperative Tsara Tantely",
    region: "SAVA Region",
  },
  {
    id: 2,
    name: "Organic Arabica Coffee",
    price: 12.49,
    image:
      "https://images.unsplash.com/photo-1580933073521-dc51f22c5c31?q=80&w=2942&auto=format&fit=crop",
    category: "Coffee",
    isNew: true,
    rating: 5,
    producer: "Aroma Highlands Cooperative",
    region: "Central Highlands",
  },
  {
    id: 3,
    name: "Artisanal Cocoa Beans",
    price: 9.99,
    oldPrice: 11.99,
    image:
      "https://images.unsplash.com/photo-1606663889134-b1dedb5ed8b7?q=80&w=2787&auto=format&fit=crop",
    category: "Cocoa",
    isNew: false,
    rating: 4,
    producer: "Sambirano Valley Farmers",
    region: "Ambanja",
  },
  {
    id: 4,
    name: "Pink Peppercorns",
    price: 13.99,
    image:
      "https://images.unsplash.com/photo-1599900554895-5e0fc7aeef19?q=80&w=2940&auto=format&fit=crop",
    category: "Spices",
    isNew: false,
    rating: 5,
    producer: "East Coast Spice Growers",
    region: "Toamasina",
  },
  {
    id: 5,
    name: "Organic Cloves",
    price: 11.99,
    oldPrice: 14.99,
    image:
      "https://images.unsplash.com/photo-1638275963839-0ede3c6d458a?q=80&w=2787&auto=format&fit=crop",
    category: "Spices",
    isNew: false,
    rating: 4,
    producer: "Analanjirofo Farmers Association",
    region: "Analanjirofo",
  },
  {
    id: 6,
    name: "Sustainable Cinnamon",
    price: 12.99,
    image:
      "https://images.unsplash.com/photo-1587131782738-de30ea91a542?q=80&w=2880&auto=format&fit=crop",
    category: "Spices",
    isNew: true,
    rating: 4,
    producer: "Rainforest Cooperative",
    region: "Eastern Madagascar",
  },
  {
    id: 7,
    name: "Black Pepper",
    price: 15.49,
    image:
      "https://images.unsplash.com/photo-1596043643119-81e9cc745a56?q=80&w=2787&auto=format&fit=crop",
    category: "Spices",
    isNew: false,
    rating: 5,
    producer: "Fianarantsoa Spice Collective",
    region: "Fianarantsoa",
  },
  {
    id: 8,
    name: "Wild Honey",
    price: 13.99,
    oldPrice: 16.99,
    image:
      "https://images.unsplash.com/photo-1587049352851-8d4e89133924?q=80&w=2787&auto=format&fit=crop",
    category: "Natural Products",
    isNew: false,
    rating: 5,
    producer: "Forest Edge Beekeepers",
    region: "Andasibe",
  },
];

export const getAllCategories = (): string[] => {
  const categories = new Set(products.map((product) => product.category));
  return ["All", ...Array.from(categories)];
};
