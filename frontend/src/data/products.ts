export interface Product {
  id: string;
  name: string;
  price: string;
  shortDescription: string;
  description: string;
}

export const products: Product[] = [
  {
    id: 'professional-loupe-magnifier',
    name: 'Professional Loupe Magnifier',
    price: '49.99',
    shortDescription: 'High-precision 10x loupe with anti-reflective coated optics.',
    description:
      'A high-precision 10x loupe with anti-reflective coated optics, crafted for professionals who demand clarity. Ideal for jewelers, watchmakers, and stamp collectors. The foldable metal frame protects the scratch-resistant lens when not in use, and the compact design fits easily in a pocket or tool pouch.',
  },
  {
    id: 'classic-hand-magnifier',
    name: 'Classic Hand Magnifier',
    price: '24.99',
    shortDescription: 'Timeless 5x hand magnifier with a comfortable grip handle.',
    description:
      'A timeless 5x hand magnifier built for everyday use. The ergonomic handle provides a comfortable, fatigue-free grip during extended sessions. Perfect for reading fine print, examining maps, or hobbyist use. Features a 75mm optical-grade glass lens that delivers wide, distortion-free magnification.',
  },
  {
    id: 'illuminated-led-loupe',
    name: 'Illuminated LED Loupe',
    price: '79.99',
    shortDescription: 'Powerful 30x loupe with built-in LED and UV illumination.',
    description:
      'A powerful 30x loupe with built-in LED illumination for crisp, bright magnification in any lighting condition. The UV light mode lets you authenticate documents, inspect gemstones, and detect counterfeit currency. Runs on a single AAA battery and features a durable ABS housing resistant to daily wear.',
  },
  {
    id: 'pocket-magnifier-set',
    name: 'Pocket Magnifier Set',
    price: '14.99',
    shortDescription: 'Set of three folding pocket loupes (5x, 10x, 20x) in a carry pouch.',
    description:
      'A versatile set of three folding pocket loupes — 5x, 10x, and 20x — each in a slim metal frame that folds flat for safe storage. Supplied in a compact canvas carrying pouch, this set is perfect for fieldwork, coin collecting, philately, and on-the-go inspection. An excellent starter kit or travel companion.',
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductByName(name: string): Product | undefined {
  return products.find((p) => p.name === name);
}
