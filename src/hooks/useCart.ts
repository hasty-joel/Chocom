import { useState, useEffect } from 'react';
import { CartItem, Product } from '../types';

const CART_STORAGE_KEY = 'choco_m_cart';

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
  }, []);

  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newCart));
  };

  const addToCart = (product: Product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      saveCart(cart.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      saveCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId: number) => {
    saveCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      saveCart(cart.map(item => 
        item.id === productId ? { ...item, quantity } : item
      ));
    }
  };

  const clearCart = () => {
    saveCart([]);
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return { cart, addToCart, removeFromCart, updateQuantity, clearCart, total };
}
