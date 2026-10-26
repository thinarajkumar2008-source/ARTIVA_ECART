import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare, Clock, HelpCircle } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { api } from '../services/api';

const FAQS = [
  {
    q: 'Are these creations truly handmade?',
    a: 'Yes, every drawing, painting, miniature figure, and keychain is sculpted or painted by hand using polymer clay, acrylics, and archival cotton papers.'
  },
  {
    q: 'How are fragile clay sculptures packaged for delivery?',
    a: 'Each piece is wrapped in moisture-resistant tissue paper, cushioned inside custom bubble cavities, and placed in a rigid protective cardboard box.'
  },
  {
    q: 'Can I request a custom clay charm or portrait?',
    a: 'Yes! Send us your ideas, reference pictures, and preferred color palette through the contact form, and we will follow up with custom possibilities.'
  },
  {
    q: 'What is the shipping timeframe across India?',
    a: 'Standard orders dispatch within 2-3 business days and arrive within 4-6 business days depending on your postal pin code.'
  }
];

const Contact = () => {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = 'Please provide your name (at least 2 characters).';
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Please provide a valid email address.';
    }
    if (!formData.subject.trim()) {
      errs.subject = 'Subject line is required.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = 'Please enter a message (at least 10 characters).';
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      addToast('Please correct the highlighted form errors.', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await api.submitContact(formData);
      setSubmitted(true);
      addToast(res.message || 'Message sent successfully!', 'success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      addToast('Failed to send message. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page container" style={{ padding: '2.5rem 1.5rem 5rem 1.5rem' }}>
      <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <span className="section-tag" style={{ color: '#FF6B9A' }}>We'd Love to Hear from You</span>
        <h1 style={{ fontSize: '2.6rem', fontWeight: 800, color: '#27213C' }}>
          Contact the ARTIVA Studio
        </h1>
        <p style={{ color: '#777386', fontSize: '1rem', maxWidth: '600px', margin: '0.4rem auto 0 auto' }}>
          Have a question about a painting, want to request a custom miniature figurine, or need assistance with your order? Our creative team is here to help!
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', marginBottom: '5rem', alignItems: 'start' }}>
        {/* Contact Form */}
        <div style={{ background: '#FFFFFF', padding: '2.5rem', borderRadius: '20px', border: '1px solid #EFE7E2', boxShadow: '0 8px 24px rgba(39, 33, 60, 0.05)' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#27213C', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <MessageSquare size={20} color="#6C2BD9" />
            <span>Send Us a Message</span>
          </h3>

          {submitted && (
            <div style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', color: '#065F46', padding: '1rem', borderRadius: '10px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem' }}>
              <CheckCircle2 size={18} color="#059669" />
              <span>Thank you! Your message has been received in demo mode. We will respond within 24 hours.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label className="form-label" htmlFor="contact-name">Your Name *</label>
              <input
                id="contact-name"
                name="name"
                type="text"
                className={`form-input ${errors.name ? 'is-invalid' : ''}`}
                placeholder="e.g. Maya Patel"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <div className="form-error-msg">{errors.name}</div>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="contact-email">Email Address *</label>
              <input
                id="contact-email"
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
              <label className="form-label" htmlFor="contact-subject">Subject *</label>
              <input
                id="contact-subject"
                name="subject"
                type="text"
                className={`form-input ${errors.subject ? 'is-invalid' : ''}`}
                placeholder="Custom commission / Order inquiry / General feedback"
                value={formData.subject}
                onChange={handleChange}
              />
              {errors.subject && <div className="form-error-msg">{errors.subject}</div>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="contact-message">Your Message *</label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                className={`form-textarea ${errors.message ? 'is-invalid' : ''}`}
                placeholder="Share your question or tell us about your custom project..."
                value={formData.message}
                onChange={handleChange}
              />
              {errors.message && <div className="form-error-msg">{errors.message}</div>}
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-full btn-lg"
              disabled={isSubmitting}
            >
              <Send size={18} />
              <span>{isSubmitting ? 'Sending Message...' : 'Send Message'}</span>
            </button>
          </form>
        </div>

        {/* Contact Info & Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ background: '#FFF9F5', padding: '2rem', borderRadius: '20px', border: '1px solid #EFE7E2' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#27213C', marginBottom: '1.25rem' }}>
              Studio & Working Hours
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', gap: '0.85rem' }}>
                <MapPin size={20} color="#FF6B9A" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ display: 'block', color: '#27213C', fontSize: '0.95rem' }}>Studio Location</strong>
                  <span style={{ color: '#777386', fontSize: '0.88rem' }}>Creative Studio 402, Arts District, Bengaluru, Karnataka, India</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.85rem' }}>
                <Mail size={20} color="#6C2BD9" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ display: 'block', color: '#27213C', fontSize: '0.95rem' }}>Direct Email</strong>
                  <a href="mailto:thinarajkumar2008@gmail.com" style={{ color: '#777386', fontSize: '0.88rem' }}>
                    thinarajkumar2008@gmail.com
                  </a>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.85rem' }}>
                <Phone size={20} color="#FFD166" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ display: 'block', color: '#27213C', fontSize: '0.95rem' }}>Phone & WhatsApp</strong>
                  <a href="tel:9344183833" style={{ color: '#777386', fontSize: '0.88rem' }}>
                    +91 9344183833
                  </a>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.85rem' }}>
                <Clock size={20} color="#059669" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ display: 'block', color: '#27213C', fontSize: '0.95rem' }}>Artisan Studio Hours</strong>
                  <span style={{ color: '#777386', fontSize: '0.88rem' }}>Monday – Saturday: 10:00 AM – 7:00 PM IST</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick FAQ List */}
          <div style={{ background: '#FFFFFF', padding: '2rem', borderRadius: '20px', border: '1px solid #EFE7E2' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#27213C', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <HelpCircle size={18} color="#6C2BD9" />
              <span>Frequently Asked Questions</span>
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {FAQS.map((faq, i) => (
                <div key={i} style={{ borderBottom: i < FAQS.length - 1 ? '1px solid #F6EDE8' : 'none', paddingBottom: i < FAQS.length - 1 ? '0.75rem' : '0' }}>
                  <h5 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#27213C', marginBottom: '0.25rem' }}>
                    {faq.q}
                  </h5>
                  <p style={{ fontSize: '0.85rem', color: '#777386', lineHeight: 1.5 }}>
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
