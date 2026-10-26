import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  ShoppingBag, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle, 
  Truck, 
  Sparkles,
  CreditCard,
  Lock
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { api } from '../services/api';
import { formatPrice } from '../data/products';

const Checkout = () => {
  const { cartItems, subtotal, shipping, couponCode, couponDiscount, grandTotal, clearCart } = useCart();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: 'Karnataka',
    postalCode: '',
    instructions: '',
    paymentMethod: 'cod' // Demo cash on delivery or demo upi
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [placedOrder, setPlacedOrder] = useState(null);

  // If cart is empty and no order just placed
  if (cartItems.length === 0 && !placedOrder) {
    return (
      <div className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
        <div className="empty-state">
          <div className="empty-state-icon">
            <ShoppingBag size={40} />
          </div>
          <h2>Your Cart is Empty</h2>
          <p>Please add artwork or clay items to your shopping cart before proceeding to checkout.</p>
          <Link to="/shop" className="btn btn-primary">
            <ArrowLeft size={16} />
            <span>Return to Shop</span>
          </Link>
        </div>
      </div>
    );
  }

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim() || formData.fullName.trim().length < 3) {
      errs.fullName = 'Please enter your full name (minimum 3 characters).';
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Please provide a valid email address for order confirmation.';
    }
    if (!formData.phone.trim() || !/^[0-9]{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      errs.phone = 'Please enter a valid 10-digit mobile number.';
    }
    if (!formData.address.trim() || formData.address.trim().length < 6) {
      errs.address = 'Please specify your street address and house/flat number.';
    }
    if (!formData.city.trim()) {
      errs.city = 'City is required.';
    }
    if (!formData.postalCode.trim() || !/^[0-9]{6}$/.test(formData.postalCode.trim())) {
      errs.postalCode = 'Please enter a valid 6-digit Indian PIN code.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!validate()) {
      addToast('Please complete all required fields correctly.', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      const orderPayload = {
        customer: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode,
          instructions: formData.instructions
        },
        items: cartItems.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
          category: item.category
        })),
        discount: couponDiscount,
        couponCode: couponCode,
        paymentMethod: formData.paymentMethod === 'cod' ? 'Cash on Delivery (Demo)' : 'Demo UPI / Card'
      };

      const orderResult = await api.createOrder(orderPayload);
      setPlacedOrder(orderResult);
      clearCart();

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // Confetti fallback
      }

      addToast('🎉 Demo order placed successfully!', 'success');
    } catch (err) {
      console.error('Order placement failed', err);
      addToast('Could not place order. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // SUCCESS SCREEN
  if (placedOrder) {
    return (
      <div className="container" style={{ padding: '4rem 1.5rem 6rem 1.5rem', maxWidth: '720px' }}>
        <div style={{ background: '#FFFFFF', borderRadius: '24px', padding: '3rem 2.5rem', border: '1px solid #EFE7E2', boxShadow: '0 20px 45px rgba(108, 43, 217, 0.08)', textAlign: 'center' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.12)', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
            <CheckCircle2 size={44} />
          </div>

          <span className="badge badge-demo" style={{ marginBottom: '1rem' }}>
            Demonstration Order Mode
          </span>

          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#27213C', marginBottom: '0.5rem' }}>
            Thank You for Your Order!
          </h1>
          <p style={{ color: '#777386', fontSize: '1rem', marginBottom: '2rem' }}>
            Your simulated order confirmation reference is <strong style={{ color: '#6C2BD9' }}>{placedOrder.orderId}</strong>. A copy of your details has been saved to your local browser session.
          </p>

          {/* Order Details summary */}
          <div style={{ background: '#FFF9F5', borderRadius: '16px', padding: '1.5rem', textAlign: 'left', marginBottom: '2rem', border: '1px solid #EFE7E2' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', color: '#27213C' }}>
              Order Snapshot
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#777386' }}>Recipient:</span>
                <span style={{ fontWeight: 600 }}>{placedOrder.customer.fullName} ({placedOrder.customer.phone})</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#777386' }}>Deliver to:</span>
                <span style={{ fontWeight: 600 }}>{placedOrder.customer.address}, {placedOrder.customer.city} - {placedOrder.customer.postalCode}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#777386' }}>Payment Method:</span>
                <span style={{ fontWeight: 600 }}>{placedOrder.paymentMethod}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.5rem', borderTop: '1px dashed #EFE7E2' }}>
                <span style={{ fontWeight: 700, color: '#27213C' }}>Total Amount:</span>
                <span style={{ fontWeight: 800, color: '#6C2BD9', fontSize: '1.1rem' }}>{formatPrice(placedOrder.totalAmount)}</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/orders" className="btn btn-primary">
              <span>View in My Orders</span>
            </Link>
            <Link to="/shop" className="btn btn-secondary">
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // REGULAR CHECKOUT FORM
  return (
    <div className="checkout-page container" style={{ padding: '2.5rem 1.5rem 5rem 1.5rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <Link to="/shop" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', color: 'var(--royal-violet)', fontWeight: 600, fontSize: '0.88rem' }}>
          <ArrowLeft size={15} /> Back to Catalog
        </Link>
        <h1 className="font-editorial" style={{ fontSize: '2.8rem', fontWeight: 700, color: 'var(--midnight-plum)', marginTop: '0.4rem' }}>
          Secure Checkout
        </h1>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#059669', fontSize: '0.85rem', fontWeight: 600, marginTop: '0.2rem' }}>
          <Lock size={14} />
          <span>Demo Checkout Mode — No real payment required. Simulated order generation.</span>
        </div>
      </div>

      <div className="checkout-grid">
        {/* Left: Shipping Form */}
        <div className="checkout-card">
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Truck size={20} color="#6C2BD9" />
            <span>Shipping & Customer Details</span>
          </h3>

          <form onSubmit={handlePlaceOrder} noValidate>
            <div className="form-group">
              <label className="form-label" htmlFor="fullName">Full Name *</label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                className={`form-input ${errors.fullName ? 'is-invalid' : ''}`}
                placeholder="e.g. Diya Sen"
                value={formData.fullName}
                onChange={handleChange}
              />
              {errors.fullName && <div className="form-error-msg">{errors.fullName}</div>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="email">Email Address *</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className={`form-input ${errors.email ? 'is-invalid' : ''}`}
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <div className="form-error-msg">{errors.email}</div>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="phone">Phone Number *</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  className={`form-input ${errors.phone ? 'is-invalid' : ''}`}
                  placeholder="10-digit number"
                  value={formData.phone}
                  onChange={handleChange}
                />
                {errors.phone && <div className="form-error-msg">{errors.phone}</div>}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="address">Street Address & House/Flat *</label>
              <input
                id="address"
                name="address"
                type="text"
                className={`form-input ${errors.address ? 'is-invalid' : ''}`}
                placeholder="e.g. Flat 304, Sunflower Residency, 5th Cross Road"
                value={formData.address}
                onChange={handleChange}
              />
              {errors.address && <div className="form-error-msg">{errors.address}</div>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="city">City *</label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  className={`form-input ${errors.city ? 'is-invalid' : ''}`}
                  placeholder="e.g. Bengaluru, Mumbai, Delhi"
                  value={formData.city}
                  onChange={handleChange}
                />
                {errors.city && <div className="form-error-msg">{errors.city}</div>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="state">State</label>
                <select
                  id="state"
                  name="state"
                  className="form-select"
                  value={formData.state}
                  onChange={handleChange}
                >
                  <option value="Karnataka">Karnataka</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Telangana">Telangana</option>
                  <option value="West Bengal">West Bengal</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Kerala">Kerala</option>
                  <option value="Other">Other State/UT</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="postalCode">Postal PIN Code *</label>
              <input
                id="postalCode"
                name="postalCode"
                type="text"
                className={`form-input ${errors.postalCode ? 'is-invalid' : ''}`}
                placeholder="e.g. 560001"
                value={formData.postalCode}
                onChange={handleChange}
                maxLength={6}
              />
              {errors.postalCode && <div className="form-error-msg">{errors.postalCode}</div>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="instructions">Delivery Notes (Optional)</label>
              <textarea
                id="instructions"
                name="instructions"
                className="form-textarea"
                rows={2}
                placeholder="Leave with security, landmark details, gift packaging request..."
                value={formData.instructions}
                onChange={handleChange}
              />
            </div>

            {/* Payment Method Selection */}
            <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid #EFE7E2' }}>
              <label className="form-label">Payment Method (Simulated)</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.75rem 1rem', border: '1.5px solid #EFE7E2', borderRadius: '10px', cursor: 'pointer', background: formData.paymentMethod === 'cod' ? '#FFF9F5' : '#FFFFFF' }}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={handleChange}
                  />
                  <div>
                    <strong>Cash on Delivery (Demo)</strong>
                    <div style={{ fontSize: '0.75rem', color: '#777386' }}>Pay upon receipt of your art parcel.</div>
                  </div>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.75rem 1rem', border: '1.5px solid #EFE7E2', borderRadius: '10px', cursor: 'pointer', background: formData.paymentMethod === 'upi' ? '#FFF9F5' : '#FFFFFF' }}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="upi"
                    checked={formData.paymentMethod === 'upi'}
                    onChange={handleChange}
                  />
                  <div>
                    <strong>Simulated UPI / Net Banking</strong>
                    <div style={{ fontSize: '0.75rem', color: '#777386' }}>Instant simulated order verification.</div>
                  </div>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-full btn-lg"
              style={{ marginTop: '2rem' }}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span>Generating Order...</span>
              ) : (
                <>
                  <span>Place Demo Order ({formatPrice(grandTotal)})</span>
                  <Sparkles size={18} />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right: Order Summary */}
        <div className="checkout-card" style={{ background: '#FFF9F5' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.25rem' }}>
            Order Summary ({cartItems.length} items)
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.5rem', maxHeight: '340px', overflowY: 'auto' }}>
            {cartItems.map((item) => (
              <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', background: '#FFFFFF', padding: '0.6rem', borderRadius: '10px', border: '1px solid #EFE7E2' }}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: '56px', height: '56px', borderRadius: '8px', objectFit: 'cover' }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#27213C' }}>{item.name}</div>
                  <div style={{ fontSize: '0.75rem', color: '#777386' }}>Qty: {item.quantity} × {formatPrice(item.price)}</div>
                </div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#6C2BD9' }}>
                  {formatPrice(item.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1px solid #EFE7E2', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#777386' }}>
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#777386' }}>
              <span>Delivery Fee</span>
              <span>{shipping === 0 ? <strong style={{ color: '#059669' }}>FREE</strong> : formatPrice(shipping)}</span>
            </div>
            {couponDiscount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#059669', fontWeight: 600 }}>
                <span>Discount ({couponCode})</span>
                <span>-{formatPrice(couponDiscount)}</span>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 800, color: '#27213C', borderTop: '1px dashed #EFE7E2', paddingTop: '0.75rem', marginTop: '0.5rem' }}>
              <span>Total Payable</span>
              <span style={{ color: '#6C2BD9' }}>{formatPrice(grandTotal)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
