import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Mail, MapPin, Phone, Sparkles } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="site-footer" role="contentinfo" aria-label="Site Footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand info with editorial identity */}
          <div className="footer-col brand-col">
            <Link to="/" className="brand-logo footer-brand-logo" aria-label="ARTIVA Home">
              <div className="brand-logo-frame">
                <img 
                  src="/logo.png" 
                  alt="ARTIVA Logo" 
                  className="brand-logo-img"
                />
              </div>
              <div className="logo-text-group">
                <span className="logo-title font-editorial" style={{ color: '#FFFFFF', WebkitTextFillColor: '#FFFFFF' }}>ARTIVA</span>
                <span className="logo-subtitle" style={{ color: 'var(--champagne-gold)', letterSpacing: '0.16em' }}>ART BEYOND IMAGINATION</span>
              </div>
            </Link>
            <p className="footer-desc">
              ARTIVA brings together original handmade artwork, expressive paintings, polymer clay miniatures, custom charms, and creative stationery crafted with imagination and heart.
            </p>
            <div className="footer-social-links" aria-label="Social media channels">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="ARTIVA on Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="ARTIVA on Twitter">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="ARTIVA on Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="ARTIVA on YouTube">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor"></polygon>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/shop">Shop All Products</Link></li>
              <li><Link to="/favorites">My Wishlist</Link></li>
              <li><Link to="/orders">Order Tracking</Link></li>
              <li><Link to="/about">About Our Story</Link></li>
              <li><Link to="/contact">Customer Support</Link></li>
              <li><Link to="/login">Account Portal</Link></li>
            </ul>
          </div>

          {/* Art Collections */}
          <div className="footer-col">
            <h4 className="footer-heading">Art Collections</h4>
            <ul className="footer-links">
              <li><Link to="/art">Art & Drawings</Link></li>
              <li><Link to="/paintings">Canvas Paintings</Link></li>
              <li><Link to="/clay">Clay Art Studio</Link></li>
              <li><Link to="/clay/small">Small Clay Figurines</Link></li>
              <li><Link to="/clay/anime">Anime Miniatures</Link></li>
              <li><Link to="/clay/cartoon">Cartoon Friends</Link></li>
              <li><Link to="/clay/keychain">Handmade Keychains</Link></li>
              <li><Link to="/clay/pen-pencil">Creative Pens & Pencils</Link></li>
            </ul>
          </div>

          {/* Studio & Support Contact */}
          <div className="footer-col">
            <h4 className="footer-heading">Studio & Support</h4>
            <div className="footer-contact-list">
              <div className="contact-item">
                <MapPin size={17} className="contact-icon text-gold" />
                <span>Creative Studio 402, Arts District, Bengaluru, Karnataka, India</span>
              </div>
              <div className="contact-item">
                <Mail size={17} className="contact-icon text-lavender" />
                <a href="mailto:thinarajkumar2008@gmail.com" title="Send email">
                  thinarajkumar2008@gmail.com
                </a>
              </div>
              <div className="contact-item">
                <Phone size={17} className="contact-icon text-gold" />
                <a href="tel:9344183833" title="Call support">
                  +91 9344183833
                </a>
              </div>
              <div className="footer-demo-pill">
                <Sparkles size={13} color="var(--champagne-gold)" />
                <span>Original Art Marketplace · Direct Studio Dispatch</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom with Policies & Copyright */}
        <div className="footer-bottom">
          <div className="footer-copy">
            © {new Date().getFullYear()} ARTIVA Inc. All rights reserved. Thoughtfully crafted with <Heart size={13} fill="#FF6B9A" color="#FF6B9A" style={{ display: 'inline', verticalAlign: 'baseline', margin: '0 2px' }} /> for art enthusiasts.
          </div>
          <nav className="footer-policies" aria-label="Legal & Policies">
            <Link to="/about">Privacy Policy</Link>
            <span className="policy-divider">·</span>
            <Link to="/about">Terms of Service</Link>
            <span className="policy-divider">·</span>
            <Link to="/contact">Shipping Policy</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
