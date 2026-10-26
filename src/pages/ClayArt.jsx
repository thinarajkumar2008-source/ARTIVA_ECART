import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Heart } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import ProductCard from '../components/ProductCard';
import ClayStudioScene from '../components/3d/ClayStudioScene';

const CLAY_CATEGORIES = [
  {
    title: 'Small Clay Art',
    path: '/clay/small',
    count: 8,
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop&q=80',
    description: 'Charming miniature animals, realistic food platters, tiny mushrooms, and sweet desk planters.'
  },
  {
    title: 'Anime Clay Art',
    path: '/clay/anime',
    count: 7,
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&auto=format&fit=crop&q=80',
    description: 'Original anime chibi characters, magical school students, and fantasy warriors sculpted by hand.'
  },
  {
    title: 'Cartoon Clay Art',
    path: '/clay/cartoon',
    count: 8,
    image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=800&auto=format&fit=crop&q=80',
    description: 'Joyful cartoon critters, cheerful blob friends, smiling clouds, and lovable little robots.'
  },
  {
    title: 'Handmade Keychains',
    path: '/clay/keychain',
    count: 8,
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&auto=format&fit=crop&q=80',
    description: 'Resin-sealed durable clay charms, lucky four-leaf clovers, initial monograms, and donut keychains.'
  },
  {
    title: 'Pen & Pencil Designer',
    path: '/clay/pen-pencil',
    count: 8,
    image: 'https://images.unsplash.com/photo-1585336261026-7756f71694f9?w=800&auto=format&fit=crop&q=80',
    description: 'Creative clay pencil toppers, bear gel pens, and artistic palette writing instruments.'
  }
];

const ClayArt = () => {
  const clayProducts = PRODUCTS.filter(p => p.category === 'Clay Art');
  const highlightedClay = clayProducts.slice(0, 8);

  return (
    <div className="clay-art-page container" style={{ padding: '2.5rem 1.5rem 5rem 1.5rem' }}>
      {/* Visual Clay Art Banner with 3D Studio Canvas */}
      <div 
        style={{
          background: 'linear-gradient(135deg, #251638 0%, #432080 50%, #6428D9 100%)',
          borderRadius: '24px',
          padding: '3.5rem 2.5rem',
          color: '#FFFFFF',
          marginBottom: '3.5rem',
          boxShadow: '0 18px 45px rgba(37, 22, 56, 0.25)',
          border: '1px solid rgba(217, 183, 121, 0.35)',
          position: 'relative',
          overflow: 'hidden',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          alignItems: 'center',
          gap: '2.5rem'
        }}
      >
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', background: 'rgba(217, 183, 121, 0.18)', border: '1px solid rgba(217, 183, 121, 0.45)', color: '#FFF2D1', padding: '0.35rem 0.95rem', borderRadius: '999px', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
            <Sparkles size={14} color="#D9B779" />
            <span>Handmade Studio · {clayProducts.length} Clay Creations</span>
          </div>
          <h1 className="font-editorial" style={{ fontSize: '2.8rem', fontWeight: 700, color: '#FFFFFF', lineHeight: 1.15, marginBottom: '0.9rem' }}>
            Handmade Clay Art — Tiny Pieces of Joy
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#E2DFE9', lineHeight: 1.65 }}>
            Explore adorable miniature creations, playful characters, cute accessories, and handmade clay treasures. Each piece is hand-kneaded, sculpted with precision, oven-baked to durability, and lovingly hand-painted.
          </p>
        </div>

        {/* 3D Clay Scene */}
        <div style={{ minHeight: '320px', position: 'relative' }}>
          <ClayStudioScene />
        </div>
      </div>

      {/* 5 Major Clay Categories */}
      <div style={{ marginBottom: '4rem' }}>
        <div className="section-header">
          <div className="section-title-wrap">
            <span className="section-tag" style={{ color: '#FF6B9A' }}>Five Specialized Studios</span>
            <h2 className="section-title">Explore Clay Categories</h2>
          </div>
        </div>

        <div className="category-grid">
          {CLAY_CATEGORIES.map((cat, idx) => (
            <Link key={idx} to={cat.path} className="category-card">
              <div className="category-card-img-wrap">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="category-card-img"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&auto=format&fit=crop&q=80';
                  }}
                />
                <span className="category-card-badge">{cat.count} Handcrafted Items</span>
              </div>
              <div className="category-card-content">
                <div>
                  <h3 className="category-card-title">{cat.title}</h3>
                  <p className="category-card-desc">{cat.description}</p>
                </div>
                <div className="category-card-link">
                  <span>Explore Collection</span>
                  <ArrowRight size={16} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Clay Creations Grid */}
      <div style={{ marginTop: '3.5rem' }}>
        <div className="section-header">
          <div className="section-title-wrap">
            <span className="section-tag" style={{ color: '#6C2BD9' }}>Artisan Highlights</span>
            <h2 className="section-title">Trending Clay Sculptures</h2>
            <p className="section-desc">
              From pocket pets to functional stationery accessories, discover our collectors' favorite polymer clay creations.
            </p>
          </div>
        </div>

        <div className="product-grid">
          {highlightedClay.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClayArt;
