import axios from 'axios';

// API Base URL from environment or local default
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

console.log('📡 API Base URL:', API_URL.replace(/\/api$/, '') + '/api'); // Log for debugging

const API = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  withCredentials: true, // Include cookies for sessions
});

// Request interceptor for debugging
API.interceptors.request.use(
  (config) => {
    console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('[API Error] Request failed:', error.message);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
API.interceptors.response.use(
  (response) => {
    console.log(`[API Response] ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    if (error.response) {
      console.error(`[API Error] ${error.response.status} ${error.config.url}:`, error.response.data?.error || error.message);
    } else if (error.request) {
      console.error('[API Error] No response from server:', error.message);
    } else {
      console.error('[API Error]', error.message);
    }
    return Promise.reject(error);
  }
);

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

// Health check for deployment verification
export const healthCheck = () => API.get('/health');
