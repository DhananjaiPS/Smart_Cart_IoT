import { useState, useCallback } from 'react';
import { Product } from '../types/product.d';

export interface CartControls {
    cartItems: Product[];
    updateCartItem: (product: Product, quantityToAdd?: number) => void;
    updateQuantity: (id: string, delta: number) => void;
    totalPrice: number;
    totalItems: number;
}

export const useCartState = (): CartControls => {
    const [cartItems, setCartItems] = useState<Product[]>([]);

    const updateCartItem = useCallback((product: Product, quantityToAdd: number = 1) => {
        setCartItems(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                // If existing, update quantity
                return prev.map(item => 
                    item.id === product.id ? { ...item, quantity: (item.quantity || 1) + quantityToAdd } : item
                );
            }
            // If new, add the item to the top of the cart list
            return [{ ...product, quantity: quantityToAdd }, ...prev];
        });
    }, []);

    /**
     * Logic for manually incrementing/decrementing quantity in the cart display.
     */
    const updateQuantity = useCallback((id: string, delta: number) => {
        setCartItems(prev => 
            // 1. Map: find the item and update its quantity, ensuring it's not negative.
            prev.map(item => 
                item.id === id ? { ...item, quantity: Math.max(0, (item.quantity || 1) + delta) } : item
            )
            // 2. Filter: remove any item whose quantity is 0 or less.
            .filter(item => (item.quantity || 0) > 0) 
        );
    }, []);

    const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 0)), 0);
    const totalItems = cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0);

    return {
        cartItems,
        updateCartItem,
        updateQuantity,
        totalPrice,
        totalItems,
    };
};