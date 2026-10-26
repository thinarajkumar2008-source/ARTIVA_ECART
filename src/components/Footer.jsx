import React from 'react';
import { Link } from 'react-router-dom';
import { Palette, Heart, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand info */}
          <div className="footer-col">
            <Link to="/" className="brand-logo" style={{ marginBottom: '1rem' }}>
              <img 
                src="/logo.png" 
                alt="ARTIVA Logo" 
                className="brand-logo-img"
                style={{ border: '2px solid rgba(255, 255, 255, 0.2)' }}
              />
              <div className="logo-text-group">
                <span className="logo-title" style={{ color: '#FFFFFF', WebkitTextFillColor: '#FFFFFF' }}>ARTIVA</span>
                <span className="logo-subtitle" style={{ color: '#A09DAE' }}>Art Beyond Imagination</span>
              </div>
            </Link>
            <p className="footer-desc">
              ARTIVA is a dedicated marketplace connecting art lovers with unique handmade artwork, expressive paintings, polymer clay miniatures, custom charms, and creative stationery crafted with imagination and heart.
            </p>
            <div className="footer-social-links">
              <a href="#instagram" className="social-icon-btn" aria-label="ARTIVA on Instagram" onClick={(e) => e.preventDefault()}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#twitter" className="social-icon-btn" aria-label="ARTIVA on Twitter" onClick={(e) => e.preventDefault()}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a href="#facebook" className="social-icon-btn" aria-label="ARTIVA on Facebook" onClick={(e) => e.preventDefault()}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#youtube" className="social-icon-btn" aria-label="ARTIVA on YouTube" onClick={(e) => e.preventDefault()}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor"></polygon>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/shop">All Products</Link></li>
              <li><Link to="/favorites">My Favorites</Link></li>
              <li><Link to="/orders">Order Tracking</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact Support</Link></li>
              <li><Link to="/login">Account Portal</Link></li>
            </ul>
          </div>

          {/* Product Categories */}
          <div className="footer-col">
            <h4>Art Collections</h4>
            <ul className="footer-links">
              <li><Link to="/art">Art & Drawings</Link></li>
              <li><Link to="/paintings">Canvas Paintings</Link></li>
              <li><Link to="/clay">Clay Art Studio</Link></li>
              <li><Link to="/clay/small">Small Clay Figurines</Link></li>
              <li><Link to="/clay/anime">Anime Miniatures</Link></li>
              <li><Link to="/clay/cartoon">Cartoon Friends</Link></li>
              <li><Link to="/clay/keychain">Handmade Keychains</Link></li>
              <li><Link to="/clay/pen-pencil">Pen & Pencil Designer</Link></li>
            </ul>
          </div>

          {/* Contact Details (Demo Mode) */}
          <div className="footer-col">
            <h4>Studio & Support</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', color: '#A09DAE', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                <MapPin size={18} color="#FF6B9A" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>Creative Studio 402, Arts District, Bengaluru, Karnataka, India</span>
              </div>
              <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
                <Mail size={18} color="#8BE0C4" style={{ flexShrink: 0 }} />
                <a href="mailto:thinarajkumar2008@gmail.com" style={{ color: 'inherit' }} title="Send email">
                  thinarajkumar2008@gmail.com
                </a>
              </div>
              <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
                <Phone size={18} color="#FFD166" style={{ flexShrink: 0 }} />
                <a href="tel:9344183833" style={{ color: 'inherit' }} title="Call support">
                  +91 9344183833
                </a>
              </div>
              <div style={{ marginTop: '0.5rem', padding: '0.75rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px', border: '1px dashed rgba(255, 255, 255, 0.15)', fontSize: '0.78rem' }}>
                <strong>Note:</strong> Demonstration e-commerce store built with React, Vite & Node.js.
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} ARTIVA Inc. All rights reserved. Made with <Heart size={14} color="#FF6B9A" style={{ display: 'inline', verticalAlign: 'middle' }} /> for art enthusiasts.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <Link to="/about" style={{ color: '#777386' }}>Privacy Policy</Link>
            <Link to="/about" style={{ color: '#777386' }}>Terms of Service</Link>
            <Link to="/contact" style={{ color: '#777386' }}>Shipping Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
