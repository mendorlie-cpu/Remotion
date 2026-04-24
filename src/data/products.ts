export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  emoji: string;
  category: string;
  badge?: string;
  accentColor: string;
}

// Edit these to match your real Shopify store
export const STORE_NAME = "My Shopify Store";
export const STORE_URL = "mystore.myshopify.com";

export const PRODUCTS: Product[] = [
  {
    id: "1",
    title: "Wireless Headphones Pro",
    description:
      "Premium audio with 40-hour battery life and active noise cancellation.",
    price: 79.99,
    compareAtPrice: 99.99,
    emoji: "🎧",
    category: "Electronics",
    badge: "Sale",
    accentColor: "#3B82F6",
  },
  {
    id: "2",
    title: "Classic Cotton Tee",
    description:
      "Ultra-soft 100% organic cotton. Available in 12 colors and all sizes.",
    price: 29.99,
    emoji: "👕",
    category: "Clothing",
    badge: "New",
    accentColor: "#8B5CF6",
  },
  {
    id: "3",
    title: "Minimalist Desk Lamp",
    description:
      "LED lamp with adjustable brightness and built-in USB charging port.",
    price: 49.99,
    emoji: "💡",
    category: "Home & Office",
    badge: "Best Seller",
    accentColor: "#10B981",
  },
  {
    id: "4",
    title: "Vitamin C Face Serum",
    description:
      "Brightening serum with 20% Vitamin C. Dermatologist tested and approved.",
    price: 34.99,
    compareAtPrice: 49.99,
    emoji: "✨",
    category: "Beauty",
    badge: "Sale",
    accentColor: "#F472B6",
  },
  {
    id: "5",
    title: "Yoga Mat Pro",
    description:
      "Non-slip surface, 6mm thickness. Perfect for all yoga styles.",
    price: 59.99,
    emoji: "🧘",
    category: "Sports & Fitness",
    accentColor: "#F59E0B",
  },
];
