import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Heart, ShoppingBag, ArrowRight, ShieldCheck, Truck, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { useToast } from '../context/ToastContext';
import { formatPrice } from '../data/products';
import QuantitySelector from './QuantitySelector';

const QuickViewModal = ({ product, isOpen, onClose }) => {
  const [selectedQty, setSelectedQty] = useState(1);
  const [activeImg, setActiveImg] = useState(product?.image);
  const { addToCart, openCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    setActiveImg(product?.image);
    setSelectedQty(1);
  }, [product]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen || !product) return null;

  const favorited = isFavorite(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedQty);
    addToast(`Added ${selectedQty} × "${product.name}" to cart!`, 'success');
  };

  const handleBuyNow = () => {
    addToCart(product, selectedQty);
    onClose();
    navigate('/checkout');
  };

  return (
    <div 
      className="modal-backdrop" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Quick view: ${product.name}`}
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', padding: '2rem' }}>
          {/* Images */}
          <div>
            <div style={{ width: '100%', aspectRatio: '1/1', borderRadius: '14px', overflow: 'hidden', background: '#F8F5F2', marginBottom: '0.75rem', border: '1px solid #EFE7E2' }}>
              <img
                src={activeImg || product.image}
                alt={product.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            {product.galleryImages && product.galleryImages.length > 1 && (
              <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto' }}>
                {product.galleryImages.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveImg(img)}
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      border: activeImg === img ? '2px solid #6C2BD9' : '1px solid #EFE7E2',
                      flexShrink: 0
                    }}
                  >
                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#FF6B9A', textTransform: 'uppercase' }}>
                {product.subcategory || product.category}
              </span>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0.3rem 0 0.6rem 0', color: '#27213C' }}>
                {product.name}
              </h2>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: '#F59E0B' }}>
                  <Star size={15} fill="#F59E0B" />
                  <span style={{ fontWeight: 700, fontSize: '0.88rem' }}>{product.rating || 4.9}</span>
                </div>
                <span style={{ color: '#777386', fontSize: '0.82rem' }}>• {product.reviewsCount || 30} verified reviews</span>
                <span className={`badge ${product.stock > 3 ? 'badge-stock-in' : 'badge-stock-low'}`}>
                  {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <span style={{ fontSize: '1.75rem', fontWeight: 800, color: '#6C2BD9' }}>
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span style={{ textDecoration: 'line-through', color: '#A09DAE', fontSize: '1.05rem' }}>
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              <p style={{ fontSize: '0.92rem', color: '#777386', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                {product.description}
              </p>

              {/* Material & Dimensions */}
              <div style={{ background: '#FFF9F5', padding: '0.85rem 1rem', borderRadius: '10px', fontSize: '0.82rem', marginBottom: '1.5rem', border: '1px solid #EFE7E2' }}>
                <div style={{ marginBottom: '0.25rem' }}>
                  <strong style={{ color: '#27213C' }}>Material: </strong>
                  <span>{product.material || 'Artisan handmade medium'}</span>
                </div>
                <div>
                  <strong style={{ color: '#27213C' }}>Dimensions: </strong>
                  <span>{product.dimensions || 'Custom crafted dimensions'}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <QuantitySelector
                  quantity={selectedQty}
                  maxStock={product.stock || 20}
                  onIncrease={() => setSelectedQty(q => Math.min(product.stock || 20, q + 1))}
                  onDecrease={() => setSelectedQty(q => Math.max(1, q - 1))}
                />

                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => toggleFavorite(product)}
                  style={{ borderRadius: '50%', width: '42px', height: '42px', padding: 0 }}
                  aria-label="Toggle favorite"
                >
                  <Heart size={18} fill={favorited ? '#EF4444' : 'none'} color={favorited ? '#EF4444' : 'currentColor'} />
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleAddToCart}
                >
                  <ShoppingBag size={18} />
                  <span>Add to Cart</span>
                </button>

                <button
                  type="button"
                  className="btn btn-accent"
                  onClick={handleBuyNow}
                >
                  <span>Buy Now</span>
                  <ArrowRight size={18} />
                </button>
              </div>

              <Link
                to={`/product/${product.id}`}
                onClick={onClose}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  color: '#6C2BD9'
                }}
              >
                <span>View Full Product Page & Specifications</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
