# Quick Reference - Frontend API Configuration

## Environment Variables

```bash
# .env (Production/Vercel)
REACT_APP_API_URL=https://flipkart-clone2-az4c.onrender.com/api

# .env.local (Local Development)
REACT_APP_API_URL=https://flipkart-clone2-az4c.onrender.com/api
```

## All API Endpoints Reference

```javascript
import { 
  fetchProducts, 
  fetchProduct, 
  fetchCategories,
  fetchCart, 
  addToCart, 
  updateCartItem, 
  removeFromCart, 
  clearCart,
  placeOrder, 
  fetchOrder, 
  fetchOrderHistory,
  fetchWishlist, 
  toggleWishlist, 
  checkWishlist,
  healthCheck 
} from './utils/api';

// Products
const products = await fetchProducts({ category, search, page });
const product = await fetchProduct(id);
const categories = await fetchCategories();

// Cart
const cart = await fetchCart();
await addToCart(productId, quantity);
await updateCartItem(cartItemId, newQuantity);
await removeFromCart(cartItemId);
await clearCart();

// Orders
await placeOrder({ address_id, items });
const order = await fetchOrder(orderId);
const orders = await fetchOrderHistory();

// Wishlist
const wishlist = await fetchWishlist();
await toggleWishlist(productId);
const isInWishlist = await checkWishlist(productId);

// Health
await healthCheck();
```

## API Base URL (Automatic)

All endpoints automatically use:
```
https://flipkart-clone2-az4c.onrender.com/api

Examples:
GET  https://flipkart-clone2-az4c.onrender.com/api/products
POST https://flipkart-clone2-az4c.onrender.com/api/cart
DELETE https://flipkart-clone2-az4c.onrender.com/api/cart/1
```

## Key Configuration

| Setting | Value |
|---------|-------|
| API Module | `src/utils/api.js` |
| Base URL | `process.env.REACT_APP_API_URL` |
| Fallback | `http://localhost:5000/api` |
| Credentials | `withCredentials: true` |
| Timeout | 10 seconds |
| Logging | Enabled (check console) |

## Development vs Production

**Development** (npm start):
- Uses `.env.local`
- URL: `https://flipkart-clone2-az4c.onrender.com/api`
- Console logs: All requests/responses

**Production** (Vercel):
- Uses `.env`
- URL: `https://flipkart-clone2-az4c.onrender.com/api`
- Console logs: All requests/responses

## Browser Console Output

```
📡 API Base URL: https://flipkart-clone2-az4c.onrender.com/api
✅ Backend is available
[API Request] GET /products
[API Response] 200 /products
```

## Common Operations

```javascript
// GET all products with filters
const { data } = await fetchProducts({ 
  category: 'electronics', 
  search: 'iPhone',
  page: 1,
  limit: 20
});

// Add to cart
await addToCart(123, 1); // productId, quantity

// Checkout
const orderId = await placeOrder({
  address_id: 45,
  items: cart.items
});

// Check wishlist
const isLiked = await checkWishlist(productId);
if (isLiked) await toggleWishlist(productId); // Remove
else await toggleWishlist(productId); // Add
```

## Debugging

Check browser DevTools → Console:
```javascript
// View API base URL
console.log(process.env.REACT_APP_API_URL);

// Make manual request
fetch('https://flipkart-clone2-az4c.onrender.com/api/health')
  .then(r => r.json())
  .then(d => console.log(d))
```

## Error Handling

All API calls reject with detailed error info:
```javascript
try {
  await fetchProducts();
} catch (error) {
  // error.response.status - HTTP status code
  // error.response.data - Server error response
  // error.message - Error message
}
```

## Deployment Checklist

- ✅ `.env` has Render backend URL
- ✅ All API calls use environment variable
- ✅ No hardcoded URLs in source
- ✅ Credentials configured
- ✅ Build successful
- ✅ Browser console shows correct URL

## Ready for Vercel! 🚀

```bash
npm run build     # Verify build
vercel --prod     # Deploy
```
