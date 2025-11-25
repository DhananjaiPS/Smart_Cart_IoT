// // lib/recommendations.ts
// // IMPORTANT: This file simulates the server-side call.
// // In a real Next.js app, this logic belongs in an API route (/api/recommendations)

// // --- A. SIMULATED GEMINI RESPONSE MAPPING ---
// // This map simulates what DummyJSON product titles Gemini might recommend based on a cart query.
// // Key: Product name in cart (lowercase)
// // Value: Array of recommended search terms for DummyJSON
// const RECOMMENDATION_MAP: Record<string, string[]> = {
//     "multi-grain bread": ["jam", "butter", "egg", "cheese"],
//     "maggi 2-minute instant noodles": ["sauce", "vegetable", "chicken", "soup"],
//     "iphonex 12": ["case", "charger", "headphones"],
//     "fire-boltt brillia smart watch": ["charger", "sport", "headphone"],
//     "cookieman choco chunk cookies": ["milk", "coffee", "tea"],
//     "cadbury dairy milk silk 60g": ["coffee", "tea", "biscuit"],
// };


// // --- B. THE CORE RECOMMENDATION LOGIC ---
// // In production, this function would call your Next.js API route, which then calls Gemini.
// export async function getRecommendations(cartNames: string[]): Promise<Product[]> {
//     if (cartNames.length === 0) {
//         return [];
//     }

//     // 1. Determine the relevant product to get recommendations for (e.g., the last added item)
//     const lastItemName = cartNames[0].toLowerCase();
    
//     // 2. Simulate the Gemini output (e.g., the model recommends 'butter', 'jam')
//     // In a real app, you'd prompt Gemini with the cartNames and ask it to return a JSON array of 3 related keywords.
//     const searchTerms = RECOMMENDATION_MAP[lastItemName] || ["snack", "drink", "daily"];

//     // 3. Select one term randomly to search DummyJSON
//     const searchTerm = searchTerms[Math.floor(Math.random() * searchTerms.length)];

//     console.log(`🤖 Gemini Prompt Simulated: Cart contains [${cartNames.join(', ')}]. Recommending products related to: ${searchTerm}`);

//     // 4. Fetch products from DummyJSON based on the suggested term
//     const DUMMY_API_URL = `https://dummyjson.com/products/search?q=${searchTerm}`;
    
//     try {
//         const response = await fetch(DUMMY_API_URL);
//         const data = await response.json();
        
//         // Map and filter results to ensure they don't include the item already in the cart
//         // const mappedProducts: Product[] = data.products
//             .slice(0, 4) // Limit to 4 recommendations
//             .filter((p: any) => !cartNames.includes(p.title))
//             .map((p: any) => ({
//                 id: `gem-${p.id}`, 
//                 name: p.title,
//                 price: p.price, 
//                 category: p.category,
//                 image: p.thumbnail, 
//                 rating: p.rating ? p.rating.toFixed(1) : null,
//                 url: `https://dummyjson.com/products/${p.id}`, 
//                 description: p.description,
//                 isFeatured: false,
//             }));

//         return mappedProducts;

//     } catch (error) {
//         console.error("Failed to fetch recommendations from DummyJSON:", error);
//         return [];
//     }
// }