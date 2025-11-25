import { Product } from '../types/product.d';

// --- 1. CLEANED AND STANDARDIZED PRODUCT DATABASE ---
export const PRODUCT_DATA: Record<string, {
  name: string;
  img: string;
  description: string;
  price: string; 
  qty: string;
  seller: string;
}> = {
  // UID: D3:D4:54:FB -> D3D454FB
  "D3D454FB": {
    name: "iPhone 12",
    img: "https://pub-520691edc5cf45b79c26de5e1a3c9c78.r2.dev/images/iphone-12-green-1-removebg-preview.png",
    description: `DYNAMIC ISLAND COMES TO IPHONE 12. INNOVATIVE DESIGN. 48MP MAIN CAMERA.`,
    price: "40000",
    qty: "1",
    seller: "Dhananjai"
  },
  // UID: A3:B4:49:FB -> A3B449FB
  "A3B449FB": {
    name: "Fire-Boltt Brillia Smart Watch",
    img: "https://m.media-amazon.com/images/I/71ubhSeYD0L._AC_UY436_FMwebp_QL65_.jpg",
    description: `2.02” AMOLED DISPLAY, 120+ Sports Modes, Bluetooth Calling.`,
    price: "2000",
    qty: "1",
    seller: "Simra"
  },
  // UID: E3:53:23:31 -> E3532331
  "E3532331": {
    name: "Multi-Grain Bread",
    img: "🥖", 
    description: `Freshly baked gluten-free bread, vegan, super soft, rich in Magnesium. 300g.`,
    price: "50",
    qty: "300g",
    seller: "Rachi Bakers"
  },
  // UID: B3:D7:F0:30 -> B3D7F030
  "B3D7F030": {
    name: "MAGGI 2-Minute Instant Noodles",
    img: "https://m.media-amazon.com/images/I/812ujEPZcML._AC_UL640_FMwebp_QL65_.jpg",
    description: `Relish your favorite masala taste with MAGGI 2-Minute Instant Noodles.`,
    price: "14",
    qty: "1",
    seller: "Shivi"
  },
  // UID: 07:6B:BA:03 -> 076BBA03
  "076BBA03": {
    name: "CookieMan Choco Chunk Cookies",
    img: "https://m.media-amazon.com/images/I/71K8GzRUcXL._SX679_.jpg",
    description: `Rich & chewy Australian chocolate chunk cookies.`,
    price: "700",
    qty: "1 box",
    seller: "Rachi Baker"
  },
  // UID: 1A:79:BB:03 -> 1A79BB03
  "1A79BB03": {
    name: "Alpenliebe Butter Toffee (40 pieces)",
    img: "https://m.media-amazon.com/images/I/519h1Jro5wL._AC_UL640_FMwebp_QL65_.jpg",
    description: `Butter flavour, 40 pieces, vegetarian. Price is ₹2 per piece.`,
    price: "2", 
    qty: "40 pieces",
    seller: "Shivi"
  },
  // UID: 53:16:3D:FB -> 53163DFB
  "53163DFB": {
    name: "Amul School Pack Butter Chips (100 pcs)",
    img: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcR7a5Tz_4SK3I-03kgTqfJlXC0sJV3THtRkRxAvCWdXmLHxu-2HZkyuH5eOJezlYiCncrTMm5a5WG20UBB1GY3rUuDRWu7F0g",
    description: `Salted butter chiplets. Perfect portion packs. 100 count.`,
    price: "46",
    qty: "1 pack",
    seller: "Rachi Baker"
  },
  // UID: 73:F2:50:FB -> 73F250FB
  "73F250FB": {
    name: "Cadbury Dairy Milk Silk 60g",
    img: "https://m.media-amazon.com/images/I/71w7ppkACUL._AC_UL640_FMwebp_QL65_.jpg",
    description: `Smooth, creamy chocolate bar. Made with sustainable cocoa. 60g.`,
    price: "100",
    qty: "1",
    seller: "Rachi Baker"
  }
};

// --- 3. HELPER TO CONVERT DB DATA TO CART DATA ---
export const mapDbProductToCart = (uid: string, dbProduct: typeof PRODUCT_DATA[string], time: string): Product => {
    // Safely parse the price string into a number
    const numericPrice = parseFloat(dbProduct.price.replace(/[^0-9.]/g, '') || '0'); 
    
    return {
        id: uid,
        name: dbProduct.name,
        price: numericPrice,
        category: "RFID Scan", 
        image: dbProduct.img || '📦', 
        time: time,
        description: dbProduct.description,
        qtyLabel: dbProduct.qty,
        seller: dbProduct.seller,
        quantity: 1,
    };
};

export const TOASTER = {
    successful: (message: string) => {
        console.log(`[SUCCESS TOAST]: ${message}`);
        // In a real app, this would be: toast.success(message);
    }
};