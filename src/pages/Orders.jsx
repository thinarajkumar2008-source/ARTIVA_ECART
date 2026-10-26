import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, Clock, CheckCircle2, ChevronRight, ArrowRight, ShieldCheck, ShoppingBag } from 'lucide-react';
import { api } from '../services/api';
import { formatPrice } from '../data/products';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const loadOrders = async () => {
      const data = await api.getOrders();
      setOrders(data);
    };
    loadOrders();
  }, []);

  return (
    <div className="orders-page container" style={{ padding: '2.5rem 1.5rem 5rem 1.5rem' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <span className="section-tag text-gold">Purchase History</span>
        <h1 className="font-editorial" style={{ fontSize: '2.8rem', fontWeight: 700, color: 'var(--midnight-plum)' }}>
          My Orders ({orders.length})
        </h1>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: '#FEF3C7', color: '#92400E', padding: '0.25rem 0.65rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600, marginTop: '0.4rem' }}>
          <span>Showing simulated demonstration orders recorded in this browser session.</span>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">
            <Package size={40} />
          </div>
          <h2>No Orders Yet</h2>
          <p>You haven't placed any demo orders yet. When you complete checkout, your order will appear here.</p>
          <Link to="/shop" className="btn btn-primary">
            <span>Explore Collection</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '850px' }}>
          {orders.map((order) => (
            <div
              key={order.orderId}
              style={{
                background: '#FFFFFF',
                borderRadius: '16px',
                border: '1px solid #EFE7E2',
                padding: '1.5rem',
                boxShadow: '0 4px 16px rgba(39, 33, 60, 0.05)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: '1px solid #EFE7E2', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div>
                  <div style={{ fontSize: '0.8rem', color: '#777386' }}>ORDER REFERENCE</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#6C2BD9' }}>{order.orderId}</div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.8rem', color: '#777386' }}>PLACED ON</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{new Date(order.orderDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                  </div>
                  <span className="badge badge-stock-in" style={{ padding: '0.4rem 0.8rem' }}>
                    <CheckCircle2 size={13} />
                    <span>{order.status}</span>
                  </span>
                </div>
              </div>

              {/* Order Items */}
              <div style={{ padding: '1.25rem 0', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {order.items.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: '60px', height: '60px', borderRadius: '10px', objectFit: 'cover', border: '1px solid #EFE7E2' }}
                    />
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#27213C' }}>{item.name}</h4>
                      <div style={{ fontSize: '0.8rem', color: '#777386' }}>Qty: {item.quantity} × {formatPrice(item.price)}</div>
                    </div>
                    <div style={{ fontWeight: 700, color: '#27213C' }}>
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Footer */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid #EFE7E2', flexWrap: 'wrap', gap: '0.75rem', fontSize: '0.88rem' }}>
                <div style={{ color: '#777386' }}>
                  Shipped to: <strong style={{ color: '#27213C' }}>{order.customer.fullName}</strong>, {order.customer.city}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span>Grand Total: <strong style={{ fontSize: '1.15rem', color: '#6C2BD9' }}>{formatPrice(order.totalAmount)}</strong></span>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => setSelectedOrder(order)}
                  >
                    View Receipt
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Order Receipt Modal */}
      {selectedOrder && (
        <div className="modal-backdrop" onClick={() => setSelectedOrder(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '550px', padding: '2rem' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#27213C', marginBottom: '0.5rem' }}>
              Order Receipt: {selectedOrder.orderId}
            </h3>
            <p style={{ color: '#777386', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
              Simulated demonstration order confirmed on {new Date(selectedOrder.orderDate).toLocaleString()}.
            </p>

            <div style={{ background: '#FFF9F5', borderRadius: '12px', padding: '1rem', marginBottom: '1.5rem', fontSize: '0.88rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <div><strong>Recipient:</strong> {selectedOrder.customer.fullName} ({selectedOrder.customer.phone})</div>
              <div><strong>Address:</strong> {selectedOrder.customer.address}, {selectedOrder.customer.city} - {selectedOrder.customer.postalCode}</div>
              <div><strong>Delivery Instructions:</strong> {selectedOrder.customer.instructions || 'Standard door delivery'}</div>
              <div><strong>Payment Method:</strong> {selectedOrder.paymentMethod}</div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.15rem', fontWeight: 800, paddingTop: '1rem', borderTop: '1px dashed #EFE7E2' }}>
              <span>Total Paid:</span>
              <span style={{ color: '#6C2BD9' }}>{formatPrice(selectedOrder.totalAmount)}</span>
            </div>

            <button
              type="button"
              className="btn btn-primary btn-full"
              style={{ marginTop: '1.5rem' }}
              onClick={() => setSelectedOrder(null)}
            >
              Close Receipt
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
