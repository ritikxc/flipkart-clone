import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { fetchCart, addToCart as apiAddToCart, updateCartItem as apiUpdateCartItem, removeFromCart as apiRemoveFromCart } from '../utils/api';
import { toast } from 'react-toastify';

const CartContext = createContext();

const emptyCart = {
  items: [],
  subtotal: 0,
  discount: 0,
  deliveryCharge: 0,
  total: 0,
  itemCount: 0,
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(emptyCart);
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);

  const loadCart = useCallback(async () => {
    try {
      const { data } = await fetchCart();
      setCart(data);
    } catch (err) {
      console.error('Cart load error:', err);
      setCart(emptyCart);
    } finally {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  const addToCart = async (product_id, quantity = 1) => {
    setLoading(true);
    try {
      await apiAddToCart(product_id, quantity);
      await loadCart();
      toast.success('Added to cart!', { position: 'bottom-right', autoClose: 2000 });
      return true;
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to add to cart', { position: 'bottom-right' });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (id, quantity) => {
    try {
      await apiUpdateCartItem(id, quantity);
      await loadCart();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to update cart');
    }
  };

  const removeItem = async (id) => {
    try {
      await apiRemoveFromCart(id);
      await loadCart();
      toast.info('Item removed from cart', { position: 'bottom-right', autoClose: 2000 });
    } catch (err) {
      toast.error('Failed to remove item');
    }
  };

  return (
    <CartContext.Provider value={{ cart, loading, ready, addToCart, updateQuantity, removeItem, reloadCart: loadCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
};
