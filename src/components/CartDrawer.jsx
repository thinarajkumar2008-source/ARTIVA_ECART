import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  Tag, 
  ShieldCheck, 
  CheckCircle, 
  AlertCircle 
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';
import QuantitySelector from './QuantitySelector';

const CartDrawer = () => {
  const {
    cartItems,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    shipping,
    couponCode,
    couponDiscount,
    applyCoupon,
    removeCoupon,
    grandTotal
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState('');
  const [couponFeedback, setCouponFeedback] = useState(null);
  const navigate = useNavigate();

  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isCartOpen) {
        closeCart();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, closeCart]);

  // Lock body scroll
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    const res = applyCoupon(inputCoupon);
    setCouponFeedback(res);
    if (res.success) {
      setInputCoupon('');
    }
  };

  const handleProceedToCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  return (
    <div 
      className="drawer-backdrop" 
      onClick={closeCart}
      role="dialog"
      aria-modal="true"
      aria-label="Your Shopping Cart"
    >
      <div 
        className="cart-drawer-panel" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cart Header */}
        <div className="drawer-header">
          <div className="drawer-title">
            <ShoppingBag size={20} color="#6C2BD9" />
            <span>Shopping Cart ({cartItems.length})</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {cartItems.length > 0 && (
              <button 
                type="button" 
                onClick={clearCart}
                style={{ fontSize: '0.8rem', color: '#EF4444', fontWeight: 600 }}
                title="Clear all items"
              >
                Clear
              </button>
            )}
            <button 
              type="button" 
              className="drawer-close-btn" 
              onClick={closeCart}
              aria-label="Close cart drawer"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Cart Body */}
        {cartItems.length === 0 ? (
          <div className="empty-state" style={{ margin: 'auto 1.5rem', border: 'none' }}>
            <div className="empty-state-icon">
              <ShoppingBag size={38} />
            </div>
            <h3>Your Cart is Empty</h3>
            <p>Looks like you haven't added any creative handmade treasures yet!</p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                closeCart();
                navigate('/shop');
              }}
            >
              Start Exploring Products
            </button>
          </div>
        ) : (
          <>
            {/* Scrollable list of cart items */}
            <div className="cart-items-scroll">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item-card">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="cart-item-thumb"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=300&auto=format&fit=crop&q=80';
                    }} 
                  />
                  <div className="cart-item-info">
                    <div>
                      <span className="cart-item-category">{item.category}</span>
                      <h4 className="cart-item-title">{item.name}</h4>
                      <div className="cart-item-price">{formatPrice(item.price)}</div>
                    </div>
                    <div style={{ marginTop: '0.4rem' }}>
                      <QuantitySelector
                        quantity={item.quantity}
                        maxStock={item.stock || 20}
                        onIncrease={() => updateQuantity(item.id, item.quantity + 1)}
                        onDecrease={() => updateQuantity(item.id, item.quantity - 1)}
                      />
                    </div>
                  </div>
                  <div className="cart-item-actions">
                    <button
                      type="button"
                      className="cart-remove-btn"
                      onClick={() => removeFromCart(item.id)}
                      aria-label={`Remove ${item.name}`}
                      title="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#27213C' }}>
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Footer & Financial Summary */}
            <div className="cart-footer-summary">
              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="coupon-box">
                <input
                  type="text"
                  placeholder="Coupon code (ARTIVA10)"
                  value={inputCoupon}
                  onChange={(e) => setInputCoupon(e.target.value)}
                  aria-label="Enter promo code"
                />
                <button type="submit" className="btn btn-secondary btn-sm">
                  Apply
                </button>
              </form>

              {couponFeedback && (
                <div 
                  style={{ 
                    fontSize: '0.8rem', 
                    marginBottom: '0.75rem',
                    color: couponFeedback.success ? '#059669' : '#EF4444',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem'
                  }}
                >
                  {couponFeedback.success ? <CheckCircle size={14} /> : <AlertCircle size={14} />}
                  <span>{couponFeedback.message}</span>
                </div>
              )}

              {couponCode && (
                <div 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.4rem 0.6rem',
                    background: '#ECFDF5',
                    borderRadius: '6px',
                    fontSize: '0.8rem',
                    color: '#065F46',
                    marginBottom: '0.75rem'
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Tag size={13} />
                    <strong>{couponCode}</strong> applied (-{formatPrice(couponDiscount)})
                  </span>
                  <button 
                    type="button" 
                    onClick={removeCoupon} 
                    style={{ color: '#EF4444', fontSize: '0.75rem', fontWeight: 700 }}
                  >
                    Remove
                  </button>
                </div>
              )}

              {/* Summary Rows */}
              <div className="summary-row">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>

              <div className="summary-row">
                <span>Estimated Shipping</span>
                <span>
                  {shipping === 0 ? (
                    <span style={{ color: '#059669', fontWeight: 600 }}>FREE (Orders &gt; ₹999)</span>
                  ) : (
                    formatPrice(shipping)
                  )}
                </span>
              </div>

              {couponDiscount > 0 && (
                <div className="summary-row" style={{ color: '#059669' }}>
                  <span>Coupon Discount</span>
                  <span>-{formatPrice(couponDiscount)}</span>
                </div>
              )}

              <div className="summary-row total-row">
                <span>Grand Total</span>
                <span>{formatPrice(grandTotal)}</span>
              </div>

              {/* Action buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginTop: '1rem' }}>
                <button
                  type="button"
                  className="btn btn-primary btn-full btn-lg"
                  onClick={handleProceedToCheckout}
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight size={18} />
                </button>
                <button
                  type="button"
                  className="btn btn-secondary btn-full btn-sm"
                  onClick={() => {
                    closeCart();
                    navigate('/shop');
                  }}
                >
                  Continue Shopping
                </button>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', marginTop: '0.85rem', fontSize: '0.75rem', color: '#777386' }}>
                <ShieldCheck size={14} color="#059669" />
                <span>Simulated Secure Demo Checkout</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
