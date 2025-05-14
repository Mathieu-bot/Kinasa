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
    name: "Vanille Bourbon de Madagascar",
    price: 24.99,
    oldPrice: 29.99,
    image:
      "https://madamgascar-vanille.com/WebRoot/Store29/Shops/8e379a9c-764a-4f28-be1c-7f88d5a2b738/5573/6CD6/CFA9/A149/8BC5/0A48/3572/9EF6/101700366_2655908648012578_8362907499816288256_n_m.jpg",
    category: "Épices",
    isNew: false,
    rating: 5,
    producer: "Cooperative Tsara Tantely",
    region: "Région SAVA",
  },
  {
    id: 2,
    name: "Clous de Girofle Premium",
    price: 12.49,
    oldPrice: 15.99,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy-4DscJlel7kl5xpAkWteUqx-EhzmATRS2Q&s",
    category: "Épices",
    isNew: false,
    rating: 5,
    producer: "Association des Agriculteurs d'Analanjirofo",
    region: "Analanjirofo",
  },
  {
    id: 3,
    name: "Chocolat Noir de Madagascar",
    price: 9.99,
    oldPrice: 12.49,
    image:
      "https://chocolaterierobert.fr/web/image/product.template/517/image_1920",
    category: "Chocolat",
    isNew: false,
    rating: 5,
    producer: "Coopérative Cacaoyère du Sambirano",
    region: "Vallée du Sambirano",
  },
  {
    id: 4,
    name: "Poivre Sauvage de Madagascar",
    price: 13.99,
    image:
      "https://www.abacai.fr/wp-content/uploads/2021/06/Comment-bien-utiliser-le-poivre-sauvage-de-Madagascar-800x800.jpg",
    category: "Épices",
    isNew: true,
    rating: 5,
    producer: "Cultivateurs de Fianarantsoa",
    region: "Fianarantsoa",
  },
  {
    id: 5,
    name: "Huile Essentielle d'Ylang-Ylang",
    price: 21.99,
    oldPrice: 24.99,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSc_7_oSPIgciHiduiZcOxQ99qdHo5kTJFHcQ&s",
    category: "Huiles Essentielles",
    isNew: false,
    rating: 4,
    producer: "Distillateurs de Nosy Be",
    region: "Nosy Be",
  },
  {
    id: 6,
    name: "Cannelle de Madagascar",
    price: 12.99,
    image:
      "https://www.ca-le-dou.com/50-large_default/cannelle-en-poudre-de-madagascar.jpg",
    category: "Épices",
    isNew: false,
    rating: 4,
    producer: "Coopérative de la Forêt Tropicale",
    region: "Madagascar Orientale",
  },
  {
    id: 7,
    name: "Panier en Raphia Artisanal",
    price: 45.99,
    image:
      "https://moramoravenue.com/cdn/shop/products/sacponpon5_400x.png?v=1629890286",
    category: "Artisanat",
    isNew: true,
    rating: 5,
    producer: "Artisans de Tuléar",
    region: "Sud-Ouest",
  },
  {
    id: 8,
    name: "Café Arabica de Madagascar",
    price: 15.99,
    oldPrice: 18.99,
    image:
      "https://cadeauxdailleurs.com/cdn/shop/files/cafe_864a9b3d-278d-492d-8a10-70354d377aa4.jpg?v=1699902081&width=3840",
    category: "Café",
    isNew: true,
    rating: 5,
    producer: "Coopérative des Hauts Plateaux",
    region: "Hauts Plateaux",
  },
  {
    id: 9,
    name: "Miel Sauvage de Madagascar",
    price: 19.99,
    oldPrice: 22.99,
    image:
      "https://i0.wp.com/mespremieresruches.com/wp-content/uploads/2023/05/Miel-Mokarana-Madagascar.jpeg?resize=1024%2C1024&ssl=1",
    category: "Miel",
    isNew: false,
    rating: 5,
    producer: "Apiculteurs d'Andasibe",
    region: "Andasibe",
  },
  {
    id: 10,
    name: "Litchis Séchés de Madagascar",
    price: 14.99,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2Ss-mjIQnUt_R1khG-O_M834UMdIPE7cGbA&s",
    category: "Fruits",
    isNew: false,
    rating: 4,
    producer: "Cultivateurs de Toamasina",
    region: "Côte Est",
  },
  {
    id: 11,
    name: "Bijou Artisanal en Corne de Zébu",
    price: 29.99,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpl-oltJihLLL6e9aofOzmcrP10qyogAP6PA&s",
    category: "Artisanat",
    isNew: true,
    rating: 4,
    producer: "Artisans d'Antananarivo",
    region: "Antananarivo",
  },
  {
    id: 12,
    name: "Tablette de Chocolat au Baobab",
    price: 8.99,
    image:
      "https://i0.wp.com/www.cocolodgemajunga-madagascar.com/wp-content/uploads/2016/06/chocolat-redim-1.jpg?fit=800%2C556&ssl=1",
    category: "Chocolat",
    isNew: true,
    rating: 4,
    producer: "Chocolaterie de Tananarive",
    region: "Antananarivo",
  },
];

export const getAllCategories = (): string[] => {
  const categories = new Set(products.map((product) => product.category));
  return ["Tous", ...Array.from(categories)];
};

export const getAllRegions = (): string[] => {
  const regions = new Set(
    products
      .map((product) => product.region)
      .filter((region): region is string => region !== undefined)
  );
  return Array.from(regions);
};
