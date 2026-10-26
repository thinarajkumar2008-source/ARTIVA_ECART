import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null); // { type: 'success' | 'error', message: '' }
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus({
        type: 'error',
        message: 'Please enter a valid email address (e.g., yourname@domain.com).'
      });
      return;
    }

    setIsSubmitting(true);
    // Simulated subscription feedback clearly labeled
    setTimeout(() => {
      setIsSubmitting(false);
      setStatus({
        type: 'success',
        message: '✨ Thank you for joining! (Demo verification: Your subscription preference has been recorded).'
      });
      setEmail('');
    }, 400);
  };

  return (
    <div className="newsletter-section">
      <div className="newsletter-content">
        <span className="section-tag" style={{ color: 'var(--champagne-gold)', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
          <Sparkles size={14} /> The Collector's Dispatch
        </span>
        <h2 className="font-editorial" style={{ fontSize: '2.4rem', fontWeight: 700, marginBottom: '0.75rem', color: '#FFFFFF' }}>
          A Little More Art in Your Inbox
        </h2>
        <p style={{ color: '#D6D0E0', fontSize: '1.05rem', lineHeight: 1.6, maxWidth: '520px', margin: '0 auto 1.5rem auto' }}>
          Be the first to discover new gallery releases, behind-the-scenes artisan studio stories, and seasonal art offers.
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
            aria-label="Email address for art updates"
            required
          />
          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ padding: '0.85rem 1.85rem', flexShrink: 0 }}
            disabled={isSubmitting}
          >
            <span>{isSubmitting ? 'Joining...' : 'Subscribe'}</span>
            <Send size={15} />
          </button>
        </form>

        {status && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              marginTop: '1.1rem',
              fontSize: '0.9rem',
              fontWeight: 500,
              color: status.type === 'success' ? '#8BE0C4' : '#FF6B9A'
            }}
          >
            {status.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
            <span>{status.message}</span>
          </div>
        )}

        <div style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.45)', marginTop: '0.85rem' }}>
          Thoughtfully curated. No spam, ever. Unsubscribe anytime with one click.
        </div>
      </div>
    </div>
  );
};

export default NewsletterForm;
