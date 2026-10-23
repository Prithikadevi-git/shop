import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'abstract-face-tee',
    name: 'Abstract Face Oversized Tee',
    slug: 'abstract-face-oversized-tee',
    price: 1899,
    originalPrice: 2499,
    category: 'Abstract',
    colors: [
      { name: 'Pitch Black', hex: '#0A0A0A', inStock: true },
      { name: 'Washed Charcoal', hex: '#1C1C1E', inStock: true },
      { name: 'Acid Lime Accents', hex: '#D6FF3F', inStock: true },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    image: '/images/abstract-face.jpg',
    gallery: [
      '/images/abstract-face.jpg',
      '/images/fabric-detail.jpg',
      '/images/hero.jpg',
    ],
    badge: 'NEW DROP',
    description:
      'The Abstract Face Oversized Tee deconstructs identity through glitch cyber-portraiture and electric acid lime accents. Tailored from 280 GSM luxury combed cotton with an intentional exaggerated boxy drape, dropped shoulders, and ribbed collar.',
    details: [
      '280 GSM 100% Super-Combed French Terry Cotton',
      'High-density screenprint with acid-lime typography',
      'Signature boxy drop-shoulder streetwear silhouette',
      'Pre-shrunk fabric to preserve drape after wash',
      'Reinforced ribbed neckband that resists sagging',
      'Handcrafted screenprint in limited runs',
    ],
    fabricWeight: '280 GSM Heavyweight French Terry',
    fit: 'Exaggerated Boxy Oversized Drop-Shoulder',
    isNewDrop: true,
    isFeatured: true,
    inStock: true,
  },
  {
    id: 'bad-choices-tee',
    name: 'Bad Choices Graphic Tee',
    slug: 'bad-choices-graphic-tee',
    price: 1999,
    originalPrice: 2699,
    category: 'Streetwear',
    colors: [
      { name: 'Washed Charcoal', hex: '#262626', inStock: true },
      { name: 'Deep Onyx', hex: '#0F0F0F', inStock: true },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    image: '/images/bad-choices.jpg',
    gallery: [
      '/images/bad-choices.jpg',
      '/images/fabric-detail.jpg',
      '/images/insta-3.jpg',
    ],
    badge: 'LIMITED DROP',
    description:
      'A raw manifestation of reckless freedom. Featuring bold distressed typography and abstract expressionist doodles, this washed charcoal statement tee is designed for the nonconformist mind.',
    details: [
      '300 GSM Heavyweight Vintage Washed Cotton',
      'Distressed punk-inspired typography and line art',
      'Custom stone-wash treatment for unique patina',
      'Relaxed unisex streetwear cut',
      'Double-needle stitching at hem and cuffs',
      'Raw vintage aesthetic with soft hand-feel',
    ],
    fabricWeight: '300 GSM Heavyweight Vintage Cotton',
    fit: 'Relaxed Streetwear Drop-Shoulder Fit',
    isNewDrop: true,
    isFeatured: true,
    inStock: true,
  },
  {
    id: 'tribal-distortion-tee',
    name: 'Tribal Distortion Tee',
    slug: 'tribal-distortion-tee',
    price: 2199,
    originalPrice: 2899,
    category: 'Tribal',
    colors: [
      { name: 'Obsidian Black', hex: '#080808', inStock: true },
      { name: 'Dark Carbon', hex: '#181818', inStock: true },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    image: '/images/tribal-distortion.jpg',
    gallery: [
      '/images/tribal-distortion.jpg',
      '/images/fabric-detail.jpg',
      '/images/campaign-editorial.jpg',
    ],
    badge: 'NEW DROP',
    description:
      'Ancient tribal glyphs morphed through digital distortion. Cyber-sigilism motifs wrap over the shoulders and across the torso, evoking an underground cybernetic streetwear ritual.',
    details: [
      '290 GSM Luxury Cotton Compact Knit',
      'Sleeve-to-chest continuous cyber-tribal print',
      'Fade-resistant discharge screenprinting',
      'Structured collar with interior herringbone tape',
      'Engineered oversized drop-shoulder cut',
      'Limited batch production',
    ],
    fabricWeight: '290 GSM Luxury Compact Cotton',
    fit: 'Structured Heavyweight Oversized Fit',
    isNewDrop: true,
    isFeatured: true,
    inStock: true,
  },
  {
    id: 'endloop-signature-tee',
    name: 'ENDLOOP Signature Loop Tee',
    slug: 'endloop-signature-tee',
    price: 1799,
    originalPrice: 2299,
    category: 'Streetwear',
    colors: [
      { name: 'Jet Black', hex: '#050505', inStock: true },
      { name: 'Acid Contrast', hex: '#D6FF3F', inStock: true },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    image: '/images/endloop-signature.jpg',
    gallery: [
      '/images/endloop-signature.jpg',
      '/images/fabric-detail.jpg',
      '/images/hero.jpg',
    ],
    badge: 'NEW DROP',
    description:
      'The foundational staple of the ENDLOOP DRIPS movement. Engineered with the iconic infinity loop insignia and bold clean typography. Minimalist, brutalist, and unmistakable.',
    details: [
      '280 GSM 100% Super-Combed Cotton',
      '3D puff screenprint signature emblem',
      'Signature ENDLOOP hem tag',
      'Deep black reactive dye treatment',
      'Everyday heavyweight streetwear fit',
      'Designed to pair with baggy cargos and chunky footwear',
    ],
    fabricWeight: '280 GSM Heavyweight Cotton',
    fit: 'Classic Boxy Streetwear Silhouette',
    isNewDrop: true,
    isFeatured: true,
    inStock: true,
  },
  {
    id: 'psychedelic-mind-tee',
    name: 'Psychedelic Mind Acid Tee',
    slug: 'psychedelic-mind-acid-tee',
    price: 2299,
    originalPrice: 2999,
    category: 'Psychedelic',
    colors: [
      { name: 'Washed Charcoal', hex: '#1A1A1A', inStock: true },
      { name: 'Deep Slate', hex: '#121212', inStock: true },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    image: '/images/psychedelic-mind.jpg',
    gallery: [
      '/images/psychedelic-mind.jpg',
      '/images/fabric-detail.jpg',
    ],
    badge: 'LIMITED DROP',
    description:
      'Hypnotic vortex graphics depicting altered perception and neural loops. High-saturation polychromatic optical illusion panel on deep washed charcoal heavyweight cotton.',
    details: [
      '310 GSM French Terry Cotton Blend',
      'Full-spectrum archival photographic print technique',
      'Drop shoulder with extended sleeve length',
      'Resistant to cracking, peeling, or fading',
      'Limited to 150 pieces worldwide',
    ],
    fabricWeight: '310 GSM French Terry Heavyweight',
    fit: 'Ultra-Relaxed Slouchy Oversized Fit',
    isNewDrop: true,
    isFeatured: true,
    inStock: true,
  },
  {
    id: 'awakened-frequency-tee',
    name: 'Awakened Frequency Boxy Tee',
    slug: 'awakened-frequency-tee',
    price: 2099,
    originalPrice: 2799,
    category: 'Abstract',
    colors: [
      { name: 'Industrial Black', hex: '#0B0B0B', inStock: true },
      { name: 'Cement Grey', hex: '#2A2A2A', inStock: true },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    image: '/images/awakened-tee.jpg',
    gallery: [
      '/images/awakened-tee.jpg',
      '/images/fabric-detail.jpg',
      '/images/campaign-editorial.jpg',
    ],
    badge: 'NEW DROP',
    description:
      'Carrying the brand philosophy manifesto: “DESIGNED FOR THE AWAKENED”. Bold constructivist geometric collage with monochrome halftones on deep industrial black canvas.',
    details: [
      '285 GSM 100% Combed Cotton Single Jersey',
      'Oversized constructivist architectural print',
      'Thick 1.25" ribbed crewneck collar',
      'Relaxed sleeve drape',
      'Side-split hem for mobility',
    ],
    fabricWeight: '285 GSM 100% Combed Cotton',
    fit: 'Architectural Boxy Streetwear Cut',
    isNewDrop: true,
    isFeatured: true,
    inStock: true,
  },
  {
    id: 'obsidian-archives-tee',
    name: 'Obsidian Archives Graphic Tee',
    slug: 'obsidian-archives-graphic-tee',
    price: 1999,
    originalPrice: 2599,
    category: 'Streetwear',
    colors: [
      { name: 'Faded Black', hex: '#1E1E1E', inStock: true },
      { name: 'Concrete Grey', hex: '#333333', inStock: true },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    image: '/images/category-tees.jpg',
    gallery: [
      '/images/category-tees.jpg',
      '/images/fabric-detail.jpg',
    ],
    badge: 'SELLING FAST',
    description:
      'Inspired by brutalist concrete monoliths and urban architectural decay. Features bold back-graphic typography and geometric architectural blueprints.',
    details: [
      '280 GSM Premium Ringspun Cotton',
      'Large back graphic screenprint with front pocket print',
      'Washed vintage treatment',
      'Wide cut with heavy drape',
    ],
    fabricWeight: '280 GSM Ringspun Heavy Cotton',
    fit: 'Wide Boxy Streetwear Drape',
    isNewDrop: true,
    isFeatured: false,
    inStock: true,
  },
  {
    id: 'urban-resistance-tee',
    name: 'Urban Resistance Statement Tee',
    slug: 'urban-resistance-statement-tee',
    price: 1899,
    originalPrice: 2499,
    category: 'Streetwear',
    colors: [
      { name: 'Pitch Black', hex: '#0C0C0C', inStock: true },
      { name: 'Acid Stencil', hex: '#D6FF3F', inStock: true },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    image: '/images/insta-2.jpg',
    gallery: [
      '/images/insta-2.jpg',
      '/images/fabric-detail.jpg',
    ],
    badge: 'LIMITED DROP',
    description:
      'Graphic stencil typography influenced by industrial warnings, caution signage, and underground Tokyo subculture movements.',
    details: [
      '290 GSM 100% Combed Cotton',
      'Industrial warning typography screenprint',
      'Ribbed collar with double stitching',
      'Unisex oversized cut',
    ],
    fabricWeight: '290 GSM Combed Cotton',
    fit: 'Oversized Street Silhouette',
    isNewDrop: false,
    isFeatured: false,
    inStock: true,
  },
];

export const CATEGORIES = [
  'All',
  'Abstract',
  'Tribal',
  'Streetwear',
  'Psychedelic',
  'Limited Drop',
] as const;

export const SIZE_CHART = [
  { size: 'S', chest: '44 in', length: '28.5 in', shoulder: '21.5 in' },
  { size: 'M', chest: '46 in', length: '29.5 in', shoulder: '22.5 in' },
  { size: 'L', chest: '48 in', length: '30.5 in', shoulder: '23.5 in' },
  { size: 'XL', chest: '50 in', length: '31.5 in', shoulder: '24.5 in' },
  { size: 'XXL', chest: '52 in', length: '32.5 in', shoulder: '25.5 in' },
];

export const FAQ_ITEMS = [
  {
    category: 'Fit & Sizing',
    question: 'How do ENDLOOP DRIPS t-shirts fit?',
    answer:
      'All our t-shirts feature an intentional oversized, drop-shoulder, boxy streetwear fit with heavyweight 280–310 GSM cotton. We recommend picking your true size for the intended relaxed streetwear silhouette. If you prefer a regular or fitted look, consider sizing down one size.',
  },
  {
    category: 'Fit & Sizing',
    question: 'Where can I find exact measurements?',
    answer:
      'Every product page features an interactive Size Guide with exact chest, length, and shoulder measurements in both inches and centimeters. Feel free to measure your favorite oversized tee at home to compare.',
  },
  {
    category: 'Orders & Payments',
    question: 'What payment methods do you accept in India?',
    answer:
      'We support all major Indian payment methods through secure payment gateways: UPI (Google Pay, PhonePe, Paytm), Credit & Debit Cards (Visa, Mastercard, RuPay), Net Banking across 50+ Indian banks, and Cash on Delivery (COD) for eligible pincodes.',
  },
  {
    category: 'Shipping & Delivery',
    question: 'How long will my order take to arrive?',
    answer:
      'Orders are dispatched from our warehouse within 24–48 hours. Metro cities (Mumbai, Delhi NCR, Bengaluru, Hyderabad, Chennai, Kolkata) typically receive delivery in 2–4 business days. Other regions across India take 4–6 business days.',
  },
  {
    category: 'Shipping & Delivery',
    question: 'Is shipping free?',
    answer:
      'Yes! We offer FREE standard express shipping across India on all orders over ₹1,999. For orders under ₹1,999, a flat shipping fee of ₹99 is applied at checkout.',
  },
  {
    category: 'Returns & Exchanges',
    question: 'What is your exchange and return policy?',
    answer:
      'We offer a 7-day hassle-free exchange policy from the date of delivery. If you need a different size, we will arrange a reverse pickup and ship your replacement at no additional charge. Items must be unwashed, unworn, and retain all original tags.',
  },
  {
    category: 'Care Instructions',
    question: 'How do I wash and maintain my graphic tees?',
    answer:
      'Machine wash cold (30°C or below) inside out with like colors using a mild detergent. Do not bleach. Air dry in shade away from direct intense sunlight. Never iron directly onto the screenprinted graphics; iron inside out on low heat.',
  },
];
