import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Heart, 
  ShoppingBag, 
  ArrowRight, 
  Truck, 
  ShieldCheck, 
  Star, 
  CheckCircle2, 
  Share2, 
  ArrowLeft,
  Package,
  Layers,
  Ruler,
  Sparkles,
  Camera
} from 'lucide-react';
import { PRODUCTS, formatPrice } from '../data/products';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { useToast } from '../context/ToastContext';
import QuantitySelector from '../components/QuantitySelector';
import ProductCard from '../components/ProductCard';
import ProductViewer3D from '../components/3d/ProductViewer3D';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addToast } = useToast();

  const product = PRODUCTS.find(p => p.id === id || p.slug === id);

  const [selectedImage, setSelectedImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [viewMode, setViewMode] = useState('photos'); // 'photos' | '3d'

  useEffect(() => {
    if (product) {
      setSelectedImage(product.image);
      setQuantity(1);
      window.scrollTo(0, 0);
    }
  }, [product, id]);

  // Product not found state
  if (!product) {
    return (
      <div className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
        <div className="empty-state">
          <div className="empty-state-icon">
            <Package size={40} />
          </div>
          <h2>Product Not Found</h2>
          <p>The artwork or miniature creation you are looking for may have been moved or is no longer listed.</p>
          <Link to="/shop" className="btn btn-primary">
            <ArrowLeft size={16} />
            <span>Browse All Artworks</span>
          </Link>
        </div>
      </div>
    );
  }

  const favorited = isFavorite(product.id);
  const discountPercent = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  // Related products
  const relatedProducts = PRODUCTS
    .filter(p => p.id !== product.id && (p.category === product.category || p.subcategory === product.subcategory))
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    addToast(`Added ${quantity} × "${product.name}" to your cart!`, 'success');
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/checkout');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      addToast('Product link copied to clipboard!', 'info');
    }
  };

  return (
    <div className="product-details-page container" style={{ padding: '2.5rem 1.5rem 5rem 1.5rem' }}>
      {/* Back button & Breadcrumbs */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.88rem', color: '#777386', marginBottom: '2rem' }}>
        <Link to="/shop" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', color: '#6C2BD9', fontWeight: 600 }}>
          <ArrowLeft size={15} /> Back to Catalog
        </Link>
        <span>/</span>
        <span>{product.category}</span>
        <span>/</span>
        <span style={{ color: '#27213C', fontWeight: 600 }}>{product.name}</span>
      </div>

      {/* Main Product Layout */}
      <div className="product-details-grid">
        {/* Left: Gallery & 3D Interactive View */}
        <div className="product-gallery">
          {/* Mode Switcher Pills */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
            <button
              type="button"
              className={`btn btn-sm ${viewMode === 'photos' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setViewMode('photos')}
              style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}
            >
              <Camera size={14} />
              <span>Studio Photos</span>
            </button>
            <button
              type="button"
              className={`btn btn-sm ${viewMode === '3d' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setViewMode('3d')}
              style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}
            >
              <Sparkles size={14} />
              <span>Interactive 3D Preview</span>
            </button>
          </div>

          {viewMode === '3d' ? (
            <ProductViewer3D product={product} />
          ) : (
            <>
              <div className="gallery-main-img-box">
                <img
                  src={selectedImage || product.image}
                  alt={product.name}
                  className="gallery-main-img"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80';
                  }}
                />
              </div>

              {/* Thumbnails */}
              {product.galleryImages && product.galleryImages.length > 0 && (
                <div className="gallery-thumbs">
                  {product.galleryImages.map((img, i) => (
                    <button
                      key={i}
                      type="button"
                      className={`gallery-thumb-btn ${selectedImage === img ? 'active' : ''}`}
                      onClick={() => setSelectedImage(img)}
                      aria-label={`View photo ${i + 1}`}
                    >
                      <img src={img} alt="" className="gallery-thumb-img" />
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Right: Info, Price, Actions */}
        <div className="product-info-panel">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#FF6B9A', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              {product.subcategory || product.category}
            </span>
            <button
              type="button"
              onClick={handleShare}
              style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#777386', fontSize: '0.8rem', padding: '0.3rem 0.6rem', borderRadius: '6px', border: '1px solid #EFE7E2' }}
              title="Share product"
            >
              <Share2 size={14} />
              <span>Share</span>
            </button>
          </div>

          <h1 className="font-editorial" style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--midnight-plum)', lineHeight: 1.15, marginBottom: '0.85rem' }}>
            {product.name}
          </h1>

          {/* Ratings & Stock */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--champagne-gold)' }}>
              <Star size={16} fill="var(--champagne-gold)" />
              <span style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--midnight-plum)' }}>{product.rating || 4.9}</span>
            </div>
            <span style={{ color: 'var(--muted-slate)', fontSize: '0.85rem' }}>• {product.reviewsCount || 34} customer reviews</span>
            <span className={`badge ${product.stock > 3 ? 'badge-stock-in' : 'badge-stock-low'}`}>
              <CheckCircle2 size={13} />
              {product.stock > 0 ? `${product.stock} units available` : 'Out of stock'}
            </span>
          </div>

          {/* Price & Discounts */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '1.5rem', paddingBottom: '1.25rem', borderBottom: '1px solid var(--border-color)' }}>
            <span style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--royal-violet)' }}>
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <>
                <span style={{ textDecoration: 'line-through', color: 'var(--text-muted)', fontSize: '1.2rem' }}>
                  {formatPrice(product.originalPrice)}
                </span>
                <span className="badge badge-discount" style={{ fontSize: '0.85rem' }}>
                  Save {discountPercent}%
                </span>
              </>
            )}
            <span style={{ fontSize: '0.8rem', color: 'var(--muted-slate)' }}>(Inclusive of all taxes)</span>
          </div>

          {/* Description */}
          <p style={{ fontSize: '1rem', color: '#777386', lineHeight: 1.7, marginBottom: '1.5rem' }}>
            {product.description}
          </p>

          {/* Specifications Box */}
          <div className="product-spec-list">
            <div className="spec-item">
              <span className="spec-label">
                <Layers size={12} style={{ display: 'inline', marginRight: '4px' }} /> Material & Medium
              </span>
              <span className="spec-val">{product.material || 'Artisan handmade formulation'}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">
                <Ruler size={12} style={{ display: 'inline', marginRight: '4px' }} /> Dimensions
              </span>
              <span className="spec-val">{product.dimensions || 'Handcrafted custom size'}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Category Group</span>
              <span className="spec-val">{product.category}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Packaging</span>
              <span className="spec-val">Shock-proof archival gift box</span>
            </div>
          </div>

          {/* Quantity & Actions */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#27213C', marginBottom: '0.5rem' }}>
              Select Quantity:
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <QuantitySelector
                quantity={quantity}
                maxStock={product.stock || 20}
                onIncrease={() => setQuantity(q => Math.min(product.stock || 20, q + 1))}
                onDecrease={() => setQuantity(q => Math.max(1, q - 1))}
              />
              <span style={{ fontSize: '0.82rem', color: '#777386' }}>
                Max {product.stock || 20} per order
              </span>
            </div>
          </div>

          {/* Buttons: Add to Cart, Buy Now, Favorite */}
          <div style={{ display: 'flex', gap: '0.85rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={handleAddToCart}
              style={{ flex: 1, minWidth: '180px' }}
            >
              <ShoppingBag size={19} />
              <span>Add to Cart</span>
            </button>

            <button
              type="button"
              className="btn btn-accent btn-lg"
              onClick={handleBuyNow}
              style={{ flex: 1, minWidth: '180px' }}
            >
              <span>Buy Now</span>
              <ArrowRight size={19} />
            </button>

            <button
              type="button"
              className={`btn btn-secondary ${favorited ? 'is-active' : ''}`}
              onClick={() => {
                toggleFavorite(product);
                addToast(favorited ? 'Removed from favorites' : 'Added to favorites!', 'info');
              }}
              style={{ width: '52px', height: '52px', padding: 0, borderRadius: '50%' }}
              aria-label="Save to favorites"
              title={favorited ? 'Favorited' : 'Save to favorites'}
            >
              <Heart size={20} fill={favorited ? '#EF4444' : 'none'} color={favorited ? '#EF4444' : 'currentColor'} />
            </button>
          </div>

          {/* Delivery & Assurance Guarantees */}
          <div style={{ background: '#FFFFFF', border: '1px solid #EFE7E2', borderRadius: '14px', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.88rem' }}>
              <Truck size={20} color="#6C2BD9" style={{ flexShrink: 0 }} />
              <div>
                <strong>Estimated Delivery: </strong>
                <span>4-6 business days across India. Free delivery on orders above ₹999.</span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.88rem' }}>
              <ShieldCheck size={20} color="#059669" style={{ flexShrink: 0 }} />
              <div>
                <strong>Craftsmanship Guarantee: </strong>
                <span>100% handmade authentic artisan item. Safely packed with bubble padding.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div style={{ marginTop: '5rem', paddingTop: '3rem', borderTop: '1px solid #EFE7E2' }}>
          <div className="section-header">
            <div className="section-title-wrap">
              <span className="section-tag" style={{ color: '#FF6B9A' }}>More Like This</span>
              <h2 className="section-title">Related Handcrafted Treasures</h2>
            </div>
          </div>

          <div className="product-grid">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
