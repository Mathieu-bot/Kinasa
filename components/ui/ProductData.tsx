export interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  category: string;
  isNew?: boolean;
  rating: number;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Fresh Organic Apples",
    price: 4.99,
    oldPrice: 6.99,
    image:
      "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?q=80&w=2940&auto=format&fit=crop",
    category: "Fruits",
    isNew: false,
    rating: 4,
  },
  {
    id: 2,
    name: "Red Bell Peppers",
    price: 2.49,
    image:
      "https://images.unsplash.com/photo-1576181256399-834e3b3a49bf?q=80&w=2835&auto=format&fit=crop",
    category: "Vegetables",
    isNew: true,
    rating: 5,
  },
  {
    id: 3,
    name: "Whole Wheat Bread",
    price: 3.29,
    oldPrice: 4.29,
    image:
      "https://images.unsplash.com/photo-1598373182133-52452f7691ef?q=80&w=2940&auto=format&fit=crop",
    category: "Bakery",
    isNew: false,
    rating: 4,
  },
  {
    id: 4,
    name: "Farm Fresh Milk",
    price: 2.99,
    image:
      "https://images.unsplash.com/photo-1563636619-e9143da7973b?q=80&w=2865&auto=format&fit=crop",
    category: "Dairy",
    isNew: false,
    rating: 5,
  },
  {
    id: 5,
    name: "Organic Strawberries",
    price: 5.99,
    oldPrice: 7.99,
    image:
      "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?q=80&w=2940&auto=format&fit=crop",
    category: "Fruits",
    isNew: false,
    rating: 4,
  },
  {
    id: 6,
    name: "Fresh Broccoli",
    price: 1.99,
    image:
      "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?q=80&w=2831&auto=format&fit=crop",
    category: "Vegetables",
    isNew: true,
    rating: 3,
  },
  {
    id: 7,
    name: "Honey Oat Granola",
    price: 6.49,
    image:
      "https://images.unsplash.com/photo-1514946581097-7b88e012de6a?q=80&w=2940&auto=format&fit=crop",
    category: "Breakfast",
    isNew: false,
    rating: 4,
  },
  {
    id: 8,
    name: "Fresh Avocados",
    price: 2.99,
    oldPrice: 3.99,
    image:
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?q=80&w=2775&auto=format&fit=crop",
    category: "Fruits",
    isNew: false,
    rating: 5,
  },
];

export const getAllCategories = (): string[] => {
  const categories = new Set(products.map((product) => product.category));
  return ["All", ...Array.from(categories)];
};
