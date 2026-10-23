export type ProductCategory = 'Abstract' | 'Tribal' | 'Streetwear' | 'Psychedelic' | 'Limited Drop';

export type ProductSize = 'S' | 'M' | 'L' | 'XL' | 'XXL';

export interface ProductColor {
  name: string;
  hex: string;
  inStock: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice: number;
  category: ProductCategory;
  colors: ProductColor[];
  sizes: ProductSize[];
  image: string;
  gallery: string[];
  badge?: 'NEW DROP' | 'LIMITED DROP' | 'SELLING FAST' | 'ARCHIVE';
  description: string;
  details: string[];
  fabricWeight: string;
  fit: string;
  isNewDrop?: boolean;
  isFeatured?: boolean;
  inStock: boolean;
}

export interface CartItem {
  id: string; // unique item id: product.id + size + color
  product: Product;
  selectedSize: ProductSize;
  selectedColor: string;
  quantity: number;
}

export type PageView =
  | 'home'
  | 'shop'
  | 'new-drops'
  | 'product-detail'
  | 'about'
  | 'cart'
  | 'checkout'
  | 'contact'
  | 'faq'
  | 'shipping-returns'
  | 'privacy'
  | 'terms'
  | 'not-found';

export interface OrderDetails {
  orderNumber: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  paymentMethod: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  createdAt: string;
}
