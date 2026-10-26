import React, { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  X,
  Home,
  Palette,
  Image as ImageIcon,
  Sparkles,
  Smile,
  Zap,
  KeyRound,
  PenTool,
  Grid,
  Heart,
  Package,
  Info,
  Mail,
  ChevronRight
} from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';

const NAV_ITEMS = [
  { label: 'Home', path: '/', icon: Home, section: 'Main' },
  { label: 'Art & Drawings', path: '/art', icon: Palette, section: 'Collections' },
  { label: 'Paintings', path: '/paintings', icon: ImageIcon, section: 'Collections' },
  { label: 'Clay Art', path: '/clay', icon: Sparkles, section: 'Clay World' },
  { label: 'Small Clay Art', path: '/clay/small', icon: Smile, section: 'Clay World' },
  { label: 'Anime Clay Art', path: '/clay/anime', icon: Zap, section: 'Clay World' },
  { label: 'Cartoon Clay Art', path: '/clay/cartoon', icon: Smile, section: 'Clay World' },
  { label: 'Keychains', path: '/clay/keychain', icon: KeyRound, section: 'Clay World' },
  { label: 'Pen & Pencil Designer', path: '/clay/pen-pencil', icon: PenTool, section: 'Clay World' },
  { label: 'All Products', path: '/shop', icon: Grid, section: 'Shopping' },
  { label: 'Favorites', path: '/favorites', icon: Heart, section: 'Account & Orders' },
  { label: 'My Orders', path: '/orders', icon: Package, section: 'Account & Orders' },
  { label: 'About Us', path: '/about', icon: Info, section: 'Company' },
  { label: 'Contact Us', path: '/contact', icon: Mail, section: 'Company' }
];

const ThreeDotMenu = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { favoritesCount } = useFavorites();

  // Close drawer when route changes
  useEffect(() => {
    if (isOpen) {
      onClose();
    }
  }, [location.pathname]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="drawer-backdrop" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Menu"
    >
      <div 
        className="drawer-panel" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="drawer-header">
          <div className="drawer-title">
            <img 
              src="/logo.png" 
              alt="ARTIVA" 
              style={{ width: '32px', height: '32px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #EFE7E2' }}
            />
            <span>ARTIVA Navigation</span>
          </div>
          <button 
            type="button" 
            className="drawer-close-btn" 
            onClick={onClose}
            aria-label="Close navigation menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation items list */}
        <div className="drawer-content">
          <div className="menu-section-label">Explore Catalog</div>
          {NAV_ITEMS.map((item, index) => {
            const Icon = item.icon;
            const isFav = item.path === '/favorites';
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) => `drawer-nav-item ${isActive ? 'active' : ''}`}
                onClick={onClose}
              >
                <Icon className="nav-item-icon" size={18} />
                <span>{item.label}</span>
                {isFav && favoritesCount > 0 && (
                  <span className="badge-pill">{favoritesCount}</span>
                )}
                <ChevronRight size={15} style={{ marginLeft: 'auto', opacity: 0.6 }} />
              </NavLink>
            );
          })}
        </div>

        {/* Drawer Footer Info */}
        <div style={{ padding: '1rem 1.25rem', background: '#FFF9F5', borderTop: '1px solid #EFE7E2', fontSize: '0.8rem', color: '#777386' }}>
          <p style={{ fontWeight: 600, color: '#27213C', marginBottom: '2px' }}>ARTIVA E-Cart</p>
          <p>Discover Art. Collect Creativity. Share Happiness.</p>
        </div>
      </div>
    </div>
  );
};

export default ThreeDotMenu;
