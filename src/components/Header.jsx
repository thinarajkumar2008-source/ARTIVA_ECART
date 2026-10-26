import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  Sparkles, 
  Search, 
  Heart, 
  ShoppingBag, 
  MoreVertical, 
  X,
  Palette,
  User,
  LogOut,
  ArrowRight
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { useAuth } from '../context/AuthContext';
import { PRODUCTS } from '../data/products';
import ThreeDotMenu from './ThreeDotMenu';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const { totalItems, openCart } = useCart();
  const { favoritesCount } = useFavorites();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const searchContainerRef = useRef(null);

  // Track scroll position for smooth background transition
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close search suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filtered live search suggestions
  const searchSuggestions = searchTerm.trim().length > 1
    ? PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 5)
    : [];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setIsSearchFocused(false);
    if (searchTerm.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate('/shop');
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    setIsSearchFocused(false);
    setSearchTerm('');
    navigate(`/product/${suggestion.id}`);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
    <>
      {/* A. Elegant Top Promotional Announcement Bar */}
      <aside className="announcement-bar" role="banner" aria-label="Special promotion">
        <div className="announcement-inner">
          <Sparkles size={14} className="announcement-sparkle" />
          <span className="announcement-text">Celebrate Creativity — Discover Something Handmade and Unique.</span>
          <span className="announcement-badge">ARTIVA10 · 10% OFF</span>
        </div>
      </aside>

      {/* B. Refined Sticky Navigation Header */}
      <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container header-container">
          {/* Brand Logo & Editorial Typography */}
          <Link to="/" className="brand-logo" aria-label="ARTIVA Home">
            <div className="brand-logo-frame">
              <img 
                src="/logo.png" 
                alt="ARTIVA Logo" 
                className="brand-logo-img" 
              />
            </div>
            <div className="logo-text-group">
              <span className="logo-title font-editorial">ARTIVA</span>
              <span className="logo-subtitle">ART BEYOND IMAGINATION</span>
            </div>
          </Link>

          {/* Primary Desktop Nav with Active Violet Indicator */}
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

          {/* Functional Search Bar with Suggestions */}
          <div className="header-search-container" ref={searchContainerRef}>
            <form className="header-search" onSubmit={handleSearchSubmit} role="search">
              <div className="search-input-wrapper">
                <Search className="search-icon-left" size={16} />
                <input
                  type="text"
                  placeholder="Search art, clay, keychains..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setIsSearchFocused(true);
                  }}
                  onFocus={() => setIsSearchFocused(true)}
                  aria-label="Search artworks and creations"
                />
                {searchTerm && (
                  <button
                    type="button"
                    className="search-clear-btn"
                    onClick={clearSearch}
                    aria-label="Clear search input"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </form>

            {/* Live Search Suggestions Dropdown */}
            {isSearchFocused && searchSuggestions.length > 0 && (
              <div className="search-suggestions-dropdown">
                <div className="suggestion-header">Suggested Artworks</div>
                {searchSuggestions.map((item) => (
                  <div
                    key={item.id}
                    className="suggestion-item"
                    onClick={() => handleSelectSuggestion(item)}
                  >
                    <img src={item.image} alt={item.name} className="suggestion-thumb" />
                    <div className="suggestion-info">
                      <span className="suggestion-title">{item.name}</span>
                      <span className="suggestion-cat">{item.category} • ₹{item.price}</span>
                    </div>
                    <ArrowRight size={14} className="suggestion-arrow" />
                  </div>
                ))}
                <div 
                  className="suggestion-view-all"
                  onClick={handleSearchSubmit}
                >
                  View all results for "{searchTerm}"
                </div>
              </div>
            )}
          </div>

          {/* Header Actions: Wishlist, Shopping Bag, Account & Navigation Menu */}
          <div className="header-actions">
            {/* Wishlist */}
            <Link 
              to="/favorites" 
              className="action-icon-btn" 
              aria-label={`Wishlist, ${favoritesCount} items`}
              title="View Wishlist"
            >
              <Heart size={19} />
              {favoritesCount > 0 && (
                <span className="action-badge" aria-label={`${favoritesCount} favorites`}>{favoritesCount}</span>
              )}
            </Link>

            {/* Shopping Bag with Reactive Count */}
            <button 
              type="button" 
              className="action-icon-btn cart-btn-interactive" 
              onClick={openCart}
              aria-label={`Shopping bag, ${totalItems} items`}
              title="Open Shopping Bag"
            >
              <ShoppingBag size={19} />
              {totalItems > 0 && (
                <span className="action-badge" aria-label={`${totalItems} items in bag`}>{totalItems}</span>
              )}
            </button>

            {/* User Account Portal */}
            {user ? (
              <div className="user-profile-badge">
                <Link
                  to="/orders"
                  className="action-icon-btn user-avatar-btn"
                  title={`Signed in as ${user.name}`}
                >
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="user-avatar-img"
                  />
                </Link>
                <button
                  type="button"
                  className="action-icon-btn logout-btn"
                  onClick={logout}
                  title="Sign Out"
                  aria-label="Sign out"
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="action-icon-btn" 
                title="Account Login / Sign In"
                aria-label="Sign In"
              >
                <User size={19} />
              </Link>
            )}

            {/* Expandable Menu Trigger */}
            <button
              type="button"
              className="three-dot-trigger"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open complete menu navigation"
              title="All Pages & Categories"
            >
              <MoreVertical size={17} />
              <span className="menu-btn-label">Menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* Expandable Navigation Drawer */}
      <ThreeDotMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};

export default Header;
