import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CartProvider } from './context/CartContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import HomePage from './pages/HomePage';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import WishlistPage from './pages/WishlistPage';
import AccountLayout from './components/account/AccountLayout';
import ProfilePage from './pages/account/ProfilePage';
import AddressesPage from './pages/account/AddressesPage';
import SavedCardsPage from './pages/account/SavedCardsPage';
import GiftCardsPage from './pages/account/GiftCardsPage';
import SuperCoinPage from './pages/account/SuperCoinPage';
import PlusZonePage from './pages/account/PlusZonePage';
import CouponsPage from './pages/account/CouponsPage';
import NotificationsPage from './pages/account/NotificationsPage';
import './styles/global.css';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductListPage />} />
              <Route path="/products/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/order-confirmation/:id" element={<OrderConfirmationPage />} />
              <Route path="/account" element={<AccountLayout />}>
                <Route path="profile" element={<ProfilePage />} />
                <Route path="addresses" element={<AddressesPage />} />
                <Route path="saved-cards" element={<SavedCardsPage />} />
                <Route path="giftcards" element={<GiftCardsPage />} />
                <Route path="supercoin" element={<SuperCoinPage />} />
                <Route path="plus" element={<PlusZonePage />} />
                <Route path="coupons" element={<CouponsPage />} />
                <Route path="notifications" element={<NotificationsPage />} />
                <Route path="orders" element={<OrderHistoryPage />} />
                <Route path="wishlist" element={<WishlistPage />} />
              </Route>
            </Routes>
          </main>
          <Footer />
          <ToastContainer position="bottom-right" autoClose={3000} />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
