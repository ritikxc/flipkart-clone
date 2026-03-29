import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
});

// Products
export const fetchProducts = (params) => API.get('/products', { params });
export const fetchProduct = (id) => API.get(`/products/${id}`);
export const fetchCategories = () => API.get('/products/categories');

// Cart
export const fetchCart = () => API.get('/cart');
export const addToCart = (product_id, quantity = 1) => API.post('/cart', { product_id, quantity });
export const updateCartItem = (id, quantity) => API.put(`/cart/${id}`, { quantity });
export const removeFromCart = (id) => API.delete(`/cart/${id}`);
export const clearCart = () => API.delete('/cart/clear');

// Orders
export const placeOrder = (data) => API.post('/orders', data);
export const fetchOrder = (id) => API.get(`/orders/${id}`);
export const fetchOrderHistory = () => API.get('/orders/history');

// Wishlist
export const fetchWishlist = () => API.get('/wishlist');
export const toggleWishlist = (product_id) => API.post('/wishlist/toggle', { product_id });
export const checkWishlist = (product_id) => API.get(`/wishlist/check/${product_id}`);
