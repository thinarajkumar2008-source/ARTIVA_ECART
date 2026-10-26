import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

// Providers
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import ToastNotification from './components/ToastNotification';
import CustomCursor from './components/3d/CustomCursor';

// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import ArtDrawings from './pages/ArtDrawings';
import Paintings from './pages/Paintings';
import ClayArt from './pages/ClayArt';
import ClayCategory from './pages/ClayCategory';
import ProductDetails from './pages/ProductDetails';
import Favorites from './pages/Favorites';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';

// Scroll to top helper on navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
};

function App() {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <CartProvider>
          <ToastProvider>
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
              <CustomCursor />
              <ScrollToTop />
              <Header />

              <main style={{ flex: 1 }}>
                <Routes>
                  {/* Core Navigation Routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/art" element={<ArtDrawings />} />
                  <Route path="/paintings" element={<Paintings />} />

                  {/* Clay Art Studio and Dedicated Subcategories */}
                  <Route path="/clay" element={<ClayArt />} />
                  <Route path="/clay/small" element={<ClayCategory type="small" />} />
                  <Route path="/clay/anime" element={<ClayCategory type="anime" />} />
                  <Route path="/clay/cartoon" element={<ClayCategory type="cartoon" />} />
                  <Route path="/clay/keychain" element={<ClayCategory type="keychain" />} />
                  <Route path="/clay/pen-pencil" element={<ClayCategory type="pen-pencil" />} />

                  {/* Product Details, User Actions, and Commerce */}
                  <Route path="/product/:id" element={<ProductDetails />} />
                  <Route path="/favorites" element={<Favorites />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/orders" element={<Orders />} />

                  {/* Institutional & Auth */}
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />

                  {/* 404 Catch-All */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>

              {/* Global Sliding Cart Drawer */}
              <CartDrawer />

              {/* Toast Notification Stack */}
              <ToastNotification />

              {/* Professional Footer */}
              <Footer />
            </div>
          </ToastProvider>
        </CartProvider>
      </FavoritesProvider>
    </AuthProvider>
  );
}

export default App;
