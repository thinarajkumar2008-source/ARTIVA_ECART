import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  Search, 
  Heart, 
  ShoppingBag, 
  MoreVertical, 
  X,
  Palette,
  User,
  LogOut
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { useAuth } from '../context/AuthContext';
import ThreeDotMenu from './ThreeDotMenu';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalItems, openCart } = useCart();
  const { favoritesCount } = useFavorites();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate('/shop');
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
    <>
      {/* Top Promotional Announcement Bar */}
      <div className="announcement-bar">
        <Sparkles size={16} color="#FFD166" />
        <span>Celebrate creativity — discover something handmade and unique.</span>
        <span className="pill">Code: ARTIVA10 for 10% OFF</span>
      </div>

      <header className="site-header">
        <div className="container header-container">
          {/* Brand Logo */}
          <Link to="/" className="brand-logo" aria-label="ARTIVA Home">
            <img 
              src="/logo.png" 
              alt="ARTIVA Logo" 
              className="brand-logo-img" 
            />
            <div className="logo-text-group">
              <span className="logo-title">ARTIVA</span>
              <span className="logo-subtitle">Art Beyond Imagination</span>
            </div>
          </Link>

          {/* Primary Desktop Nav */}
          <nav className="header-nav" aria-label="Main Navigation">
            <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} end>
              Home
            </NavLink>
            <NavLink to="/art" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Art & Drawings
            </NavLink>
            <NavLink to="/paintings" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Paintings
            </NavLink>
            <NavLink to="/clay" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Clay Art
            </NavLink>
            <NavLink to="/shop" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Shop All
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              About Us
            </NavLink>
          </nav>

          {/* Global Search Bar */}
          <form className="header-search" onSubmit={handleSearchSubmit} role="search">
            <div className="search-input-wrapper">
              <Search className="search-icon-left" size={17} />
              <input
                type="text"
                placeholder="Search art, clay, keychains..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search products"
              />
              {searchTerm && (
                <button
                  type="button"
                  className="search-clear-btn"
                  onClick={clearSearch}
                  aria-label="Clear search input"
                >
                  <X size={15} />
                </button>
              )}
            </div>
          </form>

          {/* Action Buttons: Favorites, Cart, Account, 3-Dot Drawer */}
          <div className="header-actions">
            {/* Favorites Icon */}
            <Link 
              to="/favorites" 
              className="action-icon-btn" 
              aria-label={`Favorites, ${favoritesCount} items`}
              title="View Favorites"
            >
              <Heart size={20} />
              {favoritesCount > 0 && (
                <span className="action-badge">{favoritesCount}</span>
              )}
            </Link>

            {/* Shopping Cart Icon */}
            <button 
              type="button" 
              className="action-icon-btn" 
              onClick={openCart}
              aria-label={`Cart, ${totalItems} items`}
              title="Open Shopping Cart"
            >
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="action-badge">{totalItems}</span>
              )}
            </button>

            {/* User Account / Login State */}
            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Link
                  to="/orders"
                  className="action-icon-btn"
                  title={`Signed in as ${user.name}`}
                  style={{ overflow: 'hidden' }}
                >
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                </Link>
                <button
                  type="button"
                  className="action-icon-btn"
                  onClick={logout}
                  title="Sign Out"
                  aria-label="Sign out"
                >
                  <LogOut size={17} />
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="action-icon-btn" 
                title="Account Login / Register"
                aria-label="Sign In"
              >
                <User size={19} />
              </Link>
            )}

            {/* Three-Dot Navigation Trigger */}
            <button
              type="button"
              className="three-dot-trigger"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open complete menu navigation"
              title="All Pages & Categories"
            >
              <MoreVertical size={18} />
              <span style={{ fontSize: '0.85rem' }}>Menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* Expandable 3-Dot Navigation Drawer */}
      <ThreeDotMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};

export default Header;
