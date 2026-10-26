import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Eye, ShoppingBag, Heart, Star, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { useToast } from '../../context/ToastContext';
import { formatPrice } from '../../data/products';

const ArtGallery3D = ({ products = [] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addToast } = useToast();

  useEffect(() => {
    if (activeIndex >= products.length && products.length > 0) {
      setActiveIndex(0);
    }
  }, [products, activeIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        setActiveIndex(prev => (prev === 0 ? products.length - 1 : prev - 1));
      } else if (e.key === 'ArrowRight') {
        setActiveIndex(prev => (prev === products.length - 1 ? 0 : prev + 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [products.length]);

  if (!products || products.length === 0) return null;

  const currentProduct = products[activeIndex] || products[0];
  const favorited = isFavorite(currentProduct.id);

  const handleNext = () => {
    setActiveIndex(prev => (prev === products.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setActiveIndex(prev => (prev === 0 ? products.length - 1 : prev - 1));
  };

  return (
    <div className="art-gallery-3d-wrapper" style={{ margin: '2rem 0 3.5rem 0' }}>
      {/* 3D Exhibition Stage Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: '#6C2BD9', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            <Sparkles size={15} /> Virtual 3D Exhibition Hall
          </span>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#27213C', marginTop: '0.2rem' }}>
            Interactive Gallery Promenade
          </h2>
        </div>

        {/* Carousel Arrow Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            type="button"
            className="action-icon-btn"
            onClick={handlePrev}
            aria-label="Previous artwork"
            title="Previous Artwork"
          >
            <ChevronLeft size={20} />
          </button>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#777386' }}>
            {activeIndex + 1} / {products.length}
          </span>
          <button
            type="button"
            className="action-icon-btn"
            onClick={handleNext}
            aria-label="Next artwork"
            title="Next Artwork"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Virtual Gallery Exhibition Wall */}
      <div
        style={{
          background: 'radial-gradient(ellipse at 50% 20%, rgba(255, 255, 255, 0.95) 0%, #F5EFEB 100%)',
          borderRadius: '28px',
          padding: '3rem 2rem',
          border: '1px solid #EFE7E2',
          boxShadow: '0 20px 50px rgba(67, 32, 128, 0.08), inset 0 2px 10px rgba(255, 255, 255, 0.8)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Gallery Overhead Spotlight Effect */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '60%',
            height: '140px',
            background: 'radial-gradient(ellipse at top, rgba(255, 255, 255, 0.9) 0%, transparent 70%)',
            pointerEvents: 'none'
          }}
        />

        {/* Perspective Gallery Carousel Stage */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '380px',
            perspective: '1200px',
            position: 'relative'
          }}
        >
          {/* Main Focused Framed Artwork */}
          <div
            style={{
              position: 'relative',
              zIndex: 5,
              maxWidth: '380px',
              width: '100%',
              borderRadius: '16px',
              background: '#FFFFFF',
              padding: '16px',
              boxShadow: '0 25px 50px rgba(39, 33, 60, 0.22), 0 0 0 10px #4A2E18, 0 0 0 14px #D4AF37',
              transform: 'scale(1)',
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            {/* Canvas Image Container */}
            <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1', overflow: 'hidden', borderRadius: '8px', background: '#F8F5F2' }}>
              <img
                src={currentProduct.image}
                alt={currentProduct.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80';
                }}
              />
              <button
                type="button"
                className={`favorite-heart-btn ${favorited ? 'is-active' : ''}`}
                onClick={() => {
                  toggleFavorite(currentProduct);
                  addToast(favorited ? 'Removed from favorites' : 'Saved to favorites!', 'info');
                }}
                style={{ top: '0.75rem', right: '0.75rem' }}
                title="Toggle Wishlist"
              >
                <Heart size={18} fill={favorited ? '#EF4444' : 'none'} color={favorited ? '#EF4444' : 'currentColor'} />
              </button>
            </div>

            {/* Museum Plaque Information */}
            <div style={{ marginTop: '1.25rem', textAlign: 'center' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#FF6B9A', textTransform: 'uppercase' }}>
                {currentProduct.subcategory || currentProduct.category}
              </span>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#27213C', margin: '0.2rem 0 0.4rem 0' }}>
                {currentProduct.name}
              </h3>
              <div style={{ fontSize: '0.85rem', color: '#777386', marginBottom: '0.8rem' }}>
                {currentProduct.material || 'Original handmade medium'}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem', marginBottom: '1.2rem' }}>
                <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#6C2BD9' }}>
                  {formatPrice(currentProduct.price)}
                </span>
                {currentProduct.originalPrice && (
                  <span style={{ fontSize: '0.9rem', color: '#A09DAE', textDecoration: 'line-through' }}>
                    {formatPrice(currentProduct.originalPrice)}
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '0.6rem', justifyContent: 'center' }}>
                <Link to={`/product/${currentProduct.id}`} className="btn btn-secondary btn-sm">
                  <Eye size={15} />
                  <span>View Artwork</span>
                </Link>
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    addToCart(currentProduct, 1);
                    addToast(`Added "${currentProduct.name}" to cart!`, 'success');
                  }}
                >
                  <ShoppingBag size={15} />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Thumbnail Navigation Track */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.6rem', marginTop: '2rem', overflowX: 'auto', padding: '0.5rem 0' }}>
          {products.map((p, idx) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setActiveIndex(idx)}
              style={{
                width: '54px',
                height: '54px',
                borderRadius: '8px',
                overflow: 'hidden',
                border: activeIndex === idx ? '3px solid #6C2BD9' : '1px solid #EFE7E2',
                opacity: activeIndex === idx ? 1 : 0.6,
                transform: activeIndex === idx ? 'scale(1.1)' : 'scale(1)',
                transition: 'all 0.25s ease',
                flexShrink: 0
              }}
              title={p.name}
            >
              <img src={p.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtGallery3D;
