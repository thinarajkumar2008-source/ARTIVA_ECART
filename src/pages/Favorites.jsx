import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { formatPrice } from '../data/products';

const Favorites = () => {
  const { favorites, removeFromFavorites, clearFavorites } = useFavorites();
  const { addToCart } = useCart();
  const { addToast } = useToast();

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    addToast(`Added "${product.name}" to cart!`, 'success');
  };

  const handleAddAllToCart = () => {
    favorites.forEach(item => addToCart(item, 1));
    addToast(`Added all ${favorites.length} items to your cart!`, 'success');
  };

  return (
    <div className="favorites-page container" style={{ padding: '2.5rem 1.5rem 5rem 1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span className="section-tag" style={{ color: '#FF6B9A' }}>Your Wishlist</span>
          <h1 style={{ fontSize: '2.4rem', fontWeight: 800, color: '#27213C' }}>
            Saved Favorites ({favorites.length})
          </h1>
          <p style={{ color: '#777386', fontSize: '0.95rem', marginTop: '0.25rem' }}>
            Artworks and clay creations you've earmarked for later inspiration or gift-giving.
          </p>
        </div>

        {favorites.length > 0 && (
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={clearFavorites}
              style={{ color: '#EF4444' }}
            >
              <Trash2 size={15} />
              <span>Clear All</span>
            </button>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={handleAddAllToCart}
            >
              <ShoppingBag size={15} />
              <span>Move All to Cart</span>
            </button>
          </div>
        )}
      </div>

      {favorites.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon" style={{ background: 'rgba(255, 107, 154, 0.1)', color: '#FF6B9A' }}>
            <Heart size={40} />
          </div>
          <h2>Your Wishlist is Empty</h2>
          <p>You haven't saved any creations yet. Tap the heart icon on any artwork or figurine to save it here!</p>
          <Link to="/shop" className="btn btn-primary">
            <span>Browse Products</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      ) : (
        <div className="product-grid">
          {favorites.map((product) => (
            <article key={product.id} className="product-card">
              <div className="product-image-container">
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80';
                    }}
                  />
                </Link>
                <button
                  type="button"
                  className="favorite-heart-btn is-active"
                  onClick={() => {
                    removeFromFavorites(product.id);
                    addToast(`Removed "${product.name}" from favorites`, 'info');
                  }}
                  title="Remove from favorites"
                >
                  <Heart size={18} fill="#EF4444" color="#EF4444" />
                </button>
              </div>

              <div className="product-body">
                <div>
                  <div className="product-category-text">{product.subcategory || product.category}</div>
                  <Link to={`/product/${product.id}`} className="product-name-link">
                    {product.name}
                  </Link>
                </div>

                <div className="product-footer-row">
                  <div className="product-price-group">
                    <span className="current-price">{formatPrice(product.price)}</span>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span className="original-price">{formatPrice(product.originalPrice)}</span>
                    )}
                  </div>

                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => handleAddToCart(product)}
                  >
                    <ShoppingBag size={15} />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
