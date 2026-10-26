import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { useToast } from '../context/ToastContext';
import { formatPrice } from '../data/products';
import QuickViewModal from './QuickViewModal';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addToast } = useToast();
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [imgSrc, setImgSrc] = useState(product.image);

  // 3D Tilt State
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, active: false });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(media.matches);
  }, []);

  const favorited = isFavorite(product.id);

  // Calculate discount percentage
  const discountPercent = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const handleMouseMove = (e) => {
    if (isReducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate clamped rotation between -7 and 7 degrees
    const rotateX = Math.max(-7, Math.min(7, ((y - centerY) / centerY) * -7));
    const rotateY = Math.max(-7, Math.min(7, ((x - centerX) / centerX) * 7));

    setTilt({ x: rotateX, y: rotateY, active: true });
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.14
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0, active: false });
    setGlare({ x: 50, y: 50, opacity: 0 });
  };

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product);
    if (!favorited) {
      addToast(`Added "${product.name}" to favorites!`, 'success');
    } else {
      addToast(`Removed "${product.name}" from favorites`, 'info');
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    addToast(`Added "${product.name}" to cart!`, 'success');
  };

  const handleOpenQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsQuickViewOpen(true);
  };

  return (
    <>
      <article
        ref={cardRef}
        className="product-card product-card-3d"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: tilt.active
            ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-8px) scale3d(1.02, 1.02, 1.02)`
            : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale3d(1, 1, 1)',
          transition: tilt.active ? 'transform 0.08s ease-out' : 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.45s ease',
          boxShadow: tilt.active
            ? `0 20px 38px rgba(108, 43, 217, 0.16), ${-tilt.y * 1.5}px ${tilt.x * 1.5}px 20px rgba(0, 0, 0, 0.05)`
            : '0 6px 18px rgba(108, 43, 217, 0.06)'
        }}
      >
        {/* Dynamic Light Sheen / Glare Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 'inherit',
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, ${glare.opacity}) 0%, transparent 60%)`,
            pointerEvents: 'none',
            zIndex: 10,
            transition: 'opacity 0.25s ease'
          }}
        />

        {/* Visual Container with Depth Translation */}
        <div
          className="product-image-container"
          style={{
            transform: tilt.active ? 'translateZ(18px)' : 'translateZ(0px)',
            transition: 'transform 0.25s ease'
          }}
        >
          <Link to={`/product/${product.id}`} aria-label={`View details for ${product.name}`}>
            <img
              src={imgSrc}
              alt={product.name}
              className="product-image"
              loading="lazy"
              onError={() => {
                setImgSrc('https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80');
              }}
            />
          </Link>

          {/* Badges: Discount, Bestseller */}
          <div className="product-badges" style={{ transform: tilt.active ? 'translateZ(24px)' : 'none' }}>
            {discountPercent && (
              <span className="badge badge-discount">{discountPercent}% OFF</span>
            )}
            {product.bestseller && (
              <span className="badge badge-bestseller">Bestseller</span>
            )}
          </div>

          {/* Favorite Toggle Button */}
          <button
            type="button"
            className={`favorite-heart-btn ${favorited ? 'is-active' : ''}`}
            onClick={handleFavoriteClick}
            aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
            title={favorited ? 'Remove from favorites' : 'Add to favorites'}
            style={{ transform: tilt.active ? 'translateZ(26px)' : 'none' }}
          >
            <Heart size={18} fill={favorited ? '#EF4444' : 'none'} color={favorited ? '#EF4444' : 'currentColor'} />
          </button>

          {/* Quick View Button */}
          <button
            type="button"
            className="quick-view-overlay-btn"
            onClick={handleOpenQuickView}
            aria-label={`Quick view ${product.name}`}
          >
            <Eye size={15} />
            <span>Quick View</span>
          </button>
        </div>

        {/* Product Details Body */}
        <div
          className="product-body"
          style={{
            transform: tilt.active ? 'translateZ(12px)' : 'translateZ(0px)',
            transition: 'transform 0.25s ease'
          }}
        >
          <div>
            <div className="product-category-text">{product.subcategory || product.category}</div>
            <Link to={`/product/${product.id}`} className="product-name-link" title={product.name}>
              {product.name}
            </Link>

            {/* Rating */}
            <div className="product-rating-row">
              <Star size={14} fill="#F59E0B" />
              <span style={{ fontWeight: 700 }}>{product.rating || 4.9}</span>
              <span className="count">({product.reviewsCount || 25})</span>
            </div>
          </div>

          {/* Price & Add to Cart Action */}
          <div className="product-footer-row">
            <div className="product-price-group">
              <span className="current-price">{formatPrice(product.price)}</span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="original-price">{formatPrice(product.originalPrice)}</span>
              )}
            </div>

            <button
              type="button"
              className="add-cart-mini-btn"
              onClick={handleAddToCart}
              aria-label={`Add ${product.name} to cart`}
              title="Add to cart"
            >
              <ShoppingBag size={18} />
            </button>
          </div>
        </div>
      </article>

      {/* Quick View Modal */}
      {isQuickViewOpen && (
        <QuickViewModal
          product={product}
          isOpen={isQuickViewOpen}
          onClose={() => setIsQuickViewOpen(false)}
        />
      )}
    </>
  );
};

export default ProductCard;
