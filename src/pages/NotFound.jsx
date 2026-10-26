import React from 'react';
import { Link } from 'react-router-dom';
import { Palette, Home, Search, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
      <div className="empty-state" style={{ maxWidth: '580px', padding: '3.5rem 2rem' }}>
        <div className="empty-state-icon" style={{ background: 'rgba(108, 43, 217, 0.1)', color: '#6C2BD9', width: '90px', height: '90px' }}>
          <Palette size={46} />
        </div>
        <h1 style={{ fontSize: '3rem', fontWeight: 800, color: '#27213C', lineHeight: 1 }}>404</h1>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, margin: '0.75rem 0' }}>Canvas Blank — Page Not Found</h2>
        <p style={{ color: '#777386', marginBottom: '2rem' }}>
          It seems the page or artwork you're searching for hasn't been painted yet. Let's head back to our active collection of handmade treasures!
        </p>

        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/" className="btn btn-primary">
            <Home size={16} />
            <span>Return to Home</span>
          </Link>
          <Link to="/shop" className="btn btn-secondary">
            <Search size={16} />
            <span>Browse All Art</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
