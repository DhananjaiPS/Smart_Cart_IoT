import React from 'react';
import { Plus, Star } from 'lucide-react';
import { Product } from '../types/product.d';
import { TOASTER } from '../data/productData';

/**
 * ProductCard component
 */
const ProductCard: React.FC<{ 
    product: Product, 
    onSelectProduct: (p: Product) => void, 
    updateCartItem: (p: Product, qty?: number) => void 
}> = ({ product, onSelectProduct, updateCartItem }) => {
  return (
    <div 
        className={`p-4 sm:p-5 rounded-xl shadow-lg transform hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 relative cursor-pointer ${product.isFeatured ? 'bg-amber-50 border-2 border-amber-300' : 'bg-white border border-gray-100'}`}
        onClick={() => onSelectProduct(product)} // Card click handler 1
    >
        
        {product.isFeatured && (
            <div className="absolute top-0 right-0 z-10 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-xl flex items-center">
                <Star className='w-3 h-3 mr-1 fill-yellow-900'/> Featured
            </div>
        )}
        
        <div className="text-center mb-3 h-32 sm:h-40 flex items-center justify-center">
          {product.image.startsWith('http') ? (
              <img src={product.image} alt={product.name} className="max-w-full max-h-32 sm:max-h-40 object-contain" />
          ) : (
              <span className="text-5xl sm:text-6xl">{product.image}</span>
          )}
        </div>
        
        <h3 className="text-base sm:text-lg font-semibold mb-1 truncate" title={product.name}>{product.name}</h3>
        
        <div className='flex justify-between items-center mb-3 text-xs sm:text-sm'>
          {product.rating && <p className="text-yellow-500 font-bold">⭐ {product.rating}</p>}
          <p className="text-gray-500">{product.category}</p>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <span className="text-lg sm:text-xl font-bold text-blue-600">₹{product.price.toFixed(2)}</span>
            
            <button 
                onClick={(e) => {
                    // FIX: Stop the event from bubbling up to the card's outer onClick handler
                    e.stopPropagation(); 
                    updateCartItem(product, 1); // Button click handler 2
                    TOASTER.successful(`${product.name} added successfully`);
                }} 
                className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition shadow-md"
                title="Add to Cart Online"
            >
                <Plus className="w-5 h-5" />
            </button>
        </div>
    </div>
  );
};

export default ProductCard;