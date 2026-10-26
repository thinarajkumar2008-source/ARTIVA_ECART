import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';

const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null); // { type: 'success' | 'error', message: '' }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setStatus({
        type: 'error',
        message: 'Please provide a valid email address (e.g., yourname@example.com).'
      });
      return;
    }

    // Success response in local mode
    setStatus({
      type: 'success',
      message: '✨ Welcome to the ARTIVA creative circle! You are subscribed for new art drops and secret discounts.'
    });
    setEmail('');
  };

  return (
    <div className="newsletter-section">
      <div className="newsletter-content">
        <span className="section-tag" style={{ color: '#FF6B9A' }}>Join Our Creative World</span>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.6rem' }}>
          Get 10% Off Your First Artisan Purchase
        </h2>
        <p>
          Receive inspiring artist spotlights, sneak previews of new clay miniatures, and limited edition original releases.
        </p>

        <form onSubmit={handleSubmit} className="newsletter-form" noValidate>
          <input
            type="email"
            className="newsletter-input"
            placeholder="Enter your email address..."
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status) setStatus(null);
            }}
            aria-label="Email address for newsletter"
            required
          />
          <button type="submit" className="btn btn-primary" style={{ padding: '0.85rem 1.75rem' }}>
            <span>Subscribe</span>
            <Send size={16} />
          </button>
        </form>

        {status && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem',
              marginTop: '1rem',
              fontSize: '0.88rem',
              fontWeight: 500,
              color: status.type === 'success' ? '#059669' : '#EF4444'
            }}
          >
            {status.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
            <span>{status.message}</span>
          </div>
        )}

        <div style={{ fontSize: '0.75rem', color: '#777386', marginTop: '0.75rem' }}>
          * Demonstration newsletter subscription. No spam, ever.
        </div>
      </div>
    </div>
  );
};

export default NewsletterForm;
