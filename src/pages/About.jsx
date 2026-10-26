import React from 'react';
import { Link } from 'react-router-dom';
import { Palette, Sparkles, Heart, ShieldCheck, ArrowRight, Eye, Brush, Flame, Gift } from 'lucide-react';

const About = () => {
  return (
    <div className="about-page container" style={{ padding: '2.5rem 1.5rem 5rem 1.5rem' }}>
      {/* Brand Hero */}
      <div 
        style={{
          background: 'radial-gradient(circle at 10% 20%, rgba(255, 209, 102, 0.2) 0%, transparent 40%), linear-gradient(135deg, #432080 0%, #6C2BD9 100%)',
          borderRadius: '24px',
          padding: '4rem 2.5rem',
          color: '#FFFFFF',
          marginBottom: '4rem',
          textAlign: 'center',
          boxShadow: '0 16px 36px rgba(67, 32, 128, 0.2)'
        }}
      >
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(255, 255, 255, 0.2)', padding: '0.35rem 0.9rem', borderRadius: '999px', fontSize: '0.85rem', fontWeight: 700, marginBottom: '1.25rem' }}>
            <Sparkles size={16} color="#FFD166" />
            <span>Art Beyond Imagination</span>
          </div>
          <h1 style={{ fontSize: '3rem', fontWeight: 800, color: '#FFFFFF', lineHeight: 1.15, marginBottom: '1.25rem' }}>
            The Story Behind ARTIVA
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'rgba(255, 255, 255, 0.95)', lineHeight: 1.7 }}>
            Discover Art. Collect Creativity. Share Happiness. <br />
            ARTIVA was born out of a genuine love for handmade craftsmanship—the tactile warmth of clay, the bold strokes of acrylic paints, and the delicate nuance of graphite sketching.
          </p>
        </div>
      </div>

      {/* Mission & Vision Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
        <div style={{ background: '#FFFFFF', padding: '2.5rem', borderRadius: '20px', border: '1px solid #EFE7E2', boxShadow: '0 4px 16px rgba(39, 33, 60, 0.05)' }}>
          <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(108, 43, 217, 0.1)', color: '#6C2BD9', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
            <Eye size={24} />
          </div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#27213C', marginBottom: '0.75rem' }}>
            Our Mission
          </h3>
          <p style={{ color: '#777386', lineHeight: 1.7, fontSize: '0.95rem' }}>
            To bring imagination into daily life by creating tangible, colorful, and soulful art pieces. We believe that art shouldn't just hang silently in prestigious galleries—it belongs on your work desk, on your keys, and in gifts given to those who matter most.
          </p>
        </div>

        <div style={{ background: '#FFFFFF', padding: '2.5rem', borderRadius: '20px', border: '1px solid #EFE7E2', boxShadow: '0 4px 16px rgba(39, 33, 60, 0.05)' }}>
          <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(255, 107, 154, 0.12)', color: '#FF6B9A', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
            <Heart size={24} />
          </div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#27213C', marginBottom: '0.75rem' }}>
            Our Vision
          </h3>
          <p style={{ color: '#777386', lineHeight: 1.7, fontSize: '0.95rem' }}>
            To foster a thriving celebration of authentic artisanal work where each purchase supports dedicated creativity, deliberate slow craft, and joyful original artistic expression over mass factory manufacturing.
          </p>
        </div>
      </div>

      {/* The 4-Step Artistic Process */}
      <div style={{ marginBottom: '4rem' }}>
        <div className="section-header" style={{ textAlign: 'center', display: 'block', marginBottom: '2.5rem' }}>
          <span className="section-tag" style={{ color: '#FF6B9A' }}>Behind the Scenes</span>
          <h2 className="section-title">Our Handcrafting Process</h2>
          <p className="section-desc" style={{ maxWidth: '600px', margin: '0.5rem auto 0 auto' }}>
            How raw pigments, cotton canvases, and flexible polymer clay are transformed into durable keepsakes.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '1.5rem' }}>
          <div style={{ background: '#FFFFFF', padding: '1.8rem', borderRadius: '16px', border: '1px solid #EFE7E2', textAlign: 'center' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#FFF9F5', color: '#6C2BD9', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto', fontWeight: 800, fontSize: '1.1rem' }}>
              1
            </div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.5rem' }}>Ideation & Sketching</h4>
            <p style={{ fontSize: '0.85rem', color: '#777386', lineHeight: 1.5 }}>
              Original concept sketches explored in fine graphite and color studies to determine harmony, proportions, and emotion.
            </p>
          </div>

          <div style={{ background: '#FFFFFF', padding: '1.8rem', borderRadius: '16px', border: '1px solid #EFE7E2', textAlign: 'center' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#FFF9F5', color: '#FF6B9A', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto', fontWeight: 800, fontSize: '1.1rem' }}>
              2
            </div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.5rem' }}>Sculpting & Painting</h4>
            <p style={{ fontSize: '0.85rem', color: '#777386', lineHeight: 1.5 }}>
              Clay is conditioned and shaped under magnification; canvas paintings receive layered impasto glazes and palette textures.
            </p>
          </div>

          <div style={{ background: '#FFFFFF', padding: '1.8rem', borderRadius: '16px', border: '1px solid #EFE7E2', textAlign: 'center' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#FFF9F5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto', fontWeight: 800, fontSize: '1.1rem' }}>
              3
            </div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.5rem' }}>Baking & Curing</h4>
            <p style={{ fontSize: '0.85rem', color: '#777386', lineHeight: 1.5 }}>
              Temperature-controlled baking gives clay pieces durable structural strength, followed by slow cooling to avoid cracks.
            </p>
          </div>

          <div style={{ background: '#FFFFFF', padding: '1.8rem', borderRadius: '16px', border: '1px solid #EFE7E2', textAlign: 'center' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#FFF9F5', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto', fontWeight: 800, fontSize: '1.1rem' }}>
              4
            </div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.5rem' }}>Resin Glaze & Pack</h4>
            <p style={{ fontSize: '0.85rem', color: '#777386', lineHeight: 1.5 }}>
              Gloss or satin coats provide water-resistant scratch protection before items are wrapped in shock-absorbent archival boxes.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action Banner */}
      <div style={{ background: 'linear-gradient(135deg, rgba(108, 43, 217, 0.08) 0%, rgba(255, 107, 154, 0.1) 100%)', borderRadius: '20px', padding: '3.5rem 2rem', textAlign: 'center', border: '1px solid #EFE7E2' }}>
        <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#27213C', marginBottom: '0.75rem' }}>
          Ready to Discover Your Next Favorite Artwork?
        </h2>
        <p style={{ color: '#777386', fontSize: '1rem', maxWidth: '580px', margin: '0 auto 1.75rem auto' }}>
          Explore our collection of over 40 original designs, each created to inspire and bring genuine happiness into your space.
        </p>
        <Link to="/shop" className="btn btn-primary btn-lg">
          <span>Explore ARTIVA Collection</span>
          <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
};

export default About;
