# 🛒 Flipkart Clone — Full-Stack E-Commerce Application

A fully functional e-commerce web application that replicates Flipkart's design and user experience, built as an SDE Intern Full-Stack Assignment.

---

## 🚀 Tech Stack

| Layer      | Technology                   |
|------------|------------------------------|
| Frontend   | React.js (CRA), React Router v6, Axios, React Toastify |
| Backend    | Node.js, Express.js          |
| Database   | MySQL 8+                     |
| Styling    | CSS Modules (custom, no UI framework) |

---

## 📐 Database Schema

### Tables

```
users             — Default logged-in user (no auth required)
categories        — Product categories (Electronics, Fashion, etc.)
products          — Product listings with price, stock, rating
product_images    — Multiple images per product (carousel support)
cart              — Shopping cart items per user
addresses         — Shipping addresses saved at checkout
orders            — Placed orders with pricing breakdown
order_items       — Individual items within each order
wishlist          — Saved/wishlisted products per user
```

### Entity Relationships
- `products` → `categories` (many-to-one)
- `product_images` → `products` (many-to-one)
- `cart` → `users`, `products` (many-to-many via junction)
- `orders` → `users`, `addresses` (many-to-one each)
- `order_items` → `orders`, `products` (many-to-one each)
- `wishlist` → `users`, `products` (many-to-many via junction)

---

## ✅ Core Features Implemented

### Product Listing Page
- Grid layout matching Flipkart's card design
- Search by product name or brand
- Filter by category (sidebar + category bar)
- Filter by price range (min/max)
- Sort by: Relevance, Price, Rating, Popularity
- Pagination (20 products per page)
- Quick "Add to Cart" on hover

### Product Detail Page
- Image carousel with thumbnail selector
- Product description, highlights (tabbed)
- Specifications table
- Price with discount percentage
- Add to Cart / Buy Now buttons
- Wishlist toggle
- Stock status (In Stock / Low Stock / Out of Stock)
- Related products section
- Seller information
- Offers section

### Shopping Cart
- View all cart items with images
- Quantity increment / decrement (validates stock)
- Remove individual items
- Real-time price summary (subtotal, discount, delivery, total)
- Free delivery above ₹500 logic
- Empty cart state

### Checkout
- Shipping address form with full validation
- State dropdown (all Indian states/UTs)
- Address type (Home / Work / Other)
- Payment method selection (COD, UPI, Card, Net Banking)
- Order summary panel with item preview
- Atomic order placement (transaction-based)

### Order Confirmation
- Success banner with order ID
- Delivery tracking steps UI
- Full order breakdown
- Address display

### Bonus Features
- ✅ Wishlist (add/remove/move to cart)
- ✅ Order history with status badges
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Toast notifications for cart/wishlist actions
- ✅ Image carousel with hover-thumbnail navigation

---

## 🗄️ Setup Instructions

### Prerequisites
- Node.js v18+
- MySQL 8+
- npm

### 1. Clone & Setup

```bash
git clone <your-repo-url>
cd flipkart-clone
```

### 2. Database Setup

```sql
-- In MySQL client:
CREATE DATABASE flipkart_clone CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 3. Backend Setup

```bash
cd backend
npm install

# Copy and configure environment
cp .env.example .env
# Edit .env with your MySQL credentials

# Run schema + seed (creates tables & inserts 20 sample products)
npm run seed

# Start dev server
npm run dev
# Server runs at http://localhost:5000
```

### 4. Frontend Setup

```bash
cd ../frontend
npm install

# Create .env (optional, defaults to localhost:5000)
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env

# Start React app
npm start
# App opens at http://localhost:3000
```

---

## 🌱 Sample Data

The seed script (`npm run seed`) populates:
- **8 categories**: Electronics, Fashion, Home & Furniture, Beauty, Books, Sports, Toys, Grocery
- **20 products** across all categories with:
  - Real brand names (Samsung, Apple, Nike, LEGO, Levi's, etc.)
  - Multiple images per product
  - Realistic prices and discounts
  - Ratings and review counts
  - Highlights and specifications
- **1 default user** (no login required — Rahul Sharma)

---

## 📁 Project Structure

```
flipkart-clone/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js     # MySQL connection pool
│   │   │   ├── schema.js       # Table creation (init on startup)
│   │   │   └── seed.js         # Sample data seeder
│   │   ├── controllers/
│   │   │   ├── productController.js
│   │   │   ├── cartController.js
│   │   │   ├── orderController.js
│   │   │   └── wishlistController.js
│   │   ├── routes/
│   │   │   ├── products.js
│   │   │   ├── cart.js
│   │   │   ├── orders.js
│   │   │   └── wishlist.js
│   │   └── server.js           # Express app entry point
│   ├── .env.example
│   └── package.json
│
└── frontend/
    ├── public/
    │   └── index.html
    └── src/
        ├── components/
        │   ├── common/
        │   │   ├── Navbar.js + .css
        │   │   └── Footer.js + .css
        │   └── product/
        │       └── ProductCard.js + .css
        ├── context/
        │   └── CartContext.js   # Global cart state
        ├── pages/
        │   ├── HomePage.js
        │   ├── ProductListPage.js
        │   ├── ProductDetailPage.js
        │   ├── CartPage.js
        │   ├── CheckoutPage.js
        │   ├── OrderConfirmationPage.js
        │   ├── OrderHistoryPage.js
        │   └── WishlistPage.js
        ├── styles/
        │   └── global.css
        ├── utils/
        │   └── api.js           # Axios API helpers
        ├── App.js
        └── index.js
```

---

## 🔌 API Endpoints

```
GET    /api/products              — List products (query: category, search, sort, page, minPrice, maxPrice)
GET    /api/products/:id          — Product detail + images + related
GET    /api/products/categories   — All categories with count

GET    /api/cart                  — Get cart with summary
POST   /api/cart                  — Add item { product_id, quantity }
PUT    /api/cart/:id              — Update quantity { quantity }
DELETE /api/cart/:id              — Remove item
DELETE /api/cart/clear            — Clear cart

POST   /api/orders                — Place order { address, payment_method }
GET    /api/orders/:id            — Get order detail
GET    /api/orders/history        — Order history list

GET    /api/wishlist              — Get wishlist items
POST   /api/wishlist/toggle       — Toggle wishlist { product_id }
GET    /api/wishlist/check/:id    — Check if wishlisted
```

---

## 💡 Design Decisions & Assumptions

1. **No Authentication**: A default user (ID=1) is pre-seeded. All cart/wishlist/order operations use this user.
2. **Atomic Order Placement**: Orders use MySQL transactions — stock is decremented and cart is cleared atomically. If any step fails, everything rolls back.
3. **Schema on Startup**: Tables are auto-created when the server starts (via `schema.js`), so no manual migration step is needed.
4. **Connection Pooling**: MySQL2 connection pool with `connectionLimit: 10` for performance.
5. **Price Precision**: `DECIMAL(10,2)` used throughout for accurate monetary calculations.
6. **Images**: Product images use Unsplash URLs. The `product_images` table supports multiple images per product with a `is_primary` flag for card thumbnails.
7. **Responsive**: Mobile-first media queries; sidebar filters hidden on small screens.
8. **Free Delivery**: Applied automatically when subtotal ≥ ₹500.

---

## 🚢 Deployment

### Backend (Render / Railway)
1. Set environment variables matching `.env.example`
2. Build command: `npm install`
3. Start command: `node src/server.js`
4. Run seed: `node src/config/seed.js` (once)

### Frontend (Vercel / Netlify)
1. Set `REACT_APP_API_URL=https://your-backend-url.com/api`
2. Build command: `npm run build`
3. Publish directory: `build`

---

## 👤 Author

Built for SDE Intern Full-Stack Assignment  
Stack: React.js · Node.js · Express.js · MySQL
