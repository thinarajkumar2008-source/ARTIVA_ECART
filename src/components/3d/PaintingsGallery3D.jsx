import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Eye, ShoppingBag, Sparkles, Heart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { useToast } from '../../context/ToastContext';
import { formatPrice } from '../../data/products';

const PaintingsGallery3D = ({ paintings = [] }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addToast } = useToast();

  if (!paintings || paintings.length === 0) return null;

  const currentPainting = paintings[selectedIndex] || paintings[0];
  const favorited = isFavorite(currentPainting.id);

  return (
    <div style={{ marginBottom: '3.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div>
          <span style={{ color: '#6C2BD9', fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Sparkles size={14} /> Virtual Canvas Exhibition
          </span>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#27213C' }}>
            Featured Masterpiece Showcase
          </h2>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            type="button"
            className="action-icon-btn"
            onClick={() => setSelectedIndex(prev => (prev === 0 ? paintings.length - 1 : prev - 1))}
            aria-label="Previous painting"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            className="action-icon-btn"
            onClick={() => setSelectedIndex(prev => (prev === paintings.length - 1 ? 0 : prev + 1))}
            aria-label="Next painting"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* 3D Exhibition Frame Stage */}
      <div
        style={{
          background: 'linear-gradient(135deg, #27213C 0%, #432080 100%)',
          borderRadius: '24px',
          padding: '3rem 2.5rem',
          color: '#FFFFFF',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          alignItems: 'center',
          gap: '3rem',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 20px 45px rgba(39, 33, 60, 0.25)'
        }}
      >
        {/* Subtle Ambient Light Wash */}
        <div
          style={{
            position: 'absolute',
            top: '-20%',
            left: '10%',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(255, 107, 154, 0.2) 0%, transparent 70%)',
            pointerEvents: 'none'
          }}
        />

        {/* 3D Gold Moulding Framed Canvas */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div
            style={{
              maxWidth: '360px',
              width: '100%',
              borderRadius: '12px',
              background: '#FFFFFF',
              padding: '12px',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4), 0 0 0 10px #D4AF37, 0 0 0 14px #5A3E28',
              transform: 'perspective(900px) rotateY(-4deg) rotateX(2deg)',
              transition: 'transform 0.4s ease',
              position: 'relative'
            }}
          >
            <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1', overflow: 'hidden', borderRadius: '6px' }}>
              <img
                src={currentPainting.image}
                alt={currentPainting.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <button
                type="button"
                className={`favorite-heart-btn ${favorited ? 'is-active' : ''}`}
                onClick={() => {
                  toggleFavorite(currentPainting);
                  addToast(favorited ? 'Removed from favorites' : 'Saved to favorites!', 'info');
                }}
                style={{ top: '0.6rem', right: '0.6rem' }}
                title="Save painting"
              >
                <Heart size={18} fill={favorited ? '#EF4444' : 'none'} color={favorited ? '#EF4444' : 'currentColor'} />
              </button>
            </div>
          </div>
        </div>

        {/* Painting Exhibition Details */}
        <div>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#FFD166', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            {currentPainting.subcategory || 'Original Canvas Painting'}
          </span>
          <h3 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#FFFFFF', margin: '0.4rem 0 0.8rem 0', lineHeight: 1.2 }}>
            {currentPainting.name}
          </h3>
          <p style={{ color: 'rgba(255, 255, 255, 0.88)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
            {currentPainting.description}
          </p>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.8rem', marginBottom: '1.8rem' }}>
            <span style={{ fontSize: '2rem', fontWeight: 800, color: '#8BE0C4' }}>
              {formatPrice(currentPainting.price)}
            </span>
            {currentPainting.originalPrice && (
              <span style={{ textDecoration: 'line-through', color: 'rgba(255,255,255,0.5)', fontSize: '1.1rem' }}>
                {formatPrice(currentPainting.originalPrice)}
              </span>
            )}
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Link to={`/product/${currentPainting.id}`} className="btn" style={{ background: '#FFD166', color: '#27213C', fontWeight: 800 }}>
              <Eye size={16} />
              <span>Inspect Painting Details</span>
            </Link>
            <button
              type="button"
              className="btn"
              onClick={() => {
                addToCart(currentPainting, 1);
                addToast(`Added "${currentPainting.name}" to cart!`, 'success');
              }}
              style={{ background: 'rgba(255, 255, 255, 0.15)', color: '#FFFFFF', border: '1px solid rgba(255, 255, 255, 0.3)' }}
            >
              <ShoppingBag size={16} />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaintingsGallery3D;
