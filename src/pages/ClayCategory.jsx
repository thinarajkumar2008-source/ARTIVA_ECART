import React, { useState, useMemo } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Sparkles, Search, ArrowUpDown, X, ChevronRight, Tag } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import ProductGrid from '../components/ProductGrid';

const SUB_CONFIG = {
  '/clay/small': {
    title: 'Small Clay Art',
    badge: 'Miniature Joy',
    description: 'Charming mini figurines, cute desk pets, tiny food platters, and little succulent planters hand-sculpted with delicate craftsmanship.',
    gradient: 'linear-gradient(135deg, #8BE0C4 0%, #6C2BD9 100%)',
    subcatName: 'Small Clay Art'
  },
  '/clay/anime': {
    title: 'Anime Clay Art',
    badge: 'Chibi & Fantasy Miniatures',
    description: 'Original anime-inspired miniature characters, chibi idols, fantasy warriors, and school companions handcrafted in polymer clay.',
    gradient: 'linear-gradient(135deg, #FF8264 0%, #FF6B9A 50%, #432080 100%)',
    subcatName: 'Anime Clay Art'
  },
  '/clay/cartoon': {
    title: 'Cartoon Clay Art',
    badge: 'Playful Characters',
    description: 'Joyful cartoon critters, smiling fluffy clouds, quirky monsters, and lovable robot companions bursting with heartwarming smiles.',
    gradient: 'linear-gradient(135deg, #FFD166 0%, #FF8264 100%)',
    subcatName: 'Cartoon Clay Art'
  },
  '/clay/keychain': {
    title: 'Handmade Keychains',
    badge: 'Portable Art Charms',
    description: 'Lightweight and durable clay charms sealed with crystal resin. Finished with heavy-duty alloy clasps to adorn bags and keys.',
    gradient: 'linear-gradient(135deg, #FF6B9A 0%, #6C2BD9 100%)',
    subcatName: 'Keychains'
  },
  '/clay/pen-pencil': {
    title: 'Pen & Pencil Designer',
    badge: 'Creative Stationery',
    description: 'Handmade clay pencil toppers, cheerful animal writing pens, and artistic palette pens designed to brighten up any desk.',
    gradient: 'linear-gradient(135deg, #6C2BD9 0%, #FFD166 100%)',
    subcatName: 'Pen & Pencil Designer'
  }
};

const ClayCategory = ({ type }) => {
  const location = useLocation();
  const currentPath = type ? `/clay/${type}` : location.pathname;
  const config = SUB_CONFIG[currentPath] || SUB_CONFIG['/clay/small'];

  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('newest');

  const products = useMemo(() => {
    let list = PRODUCTS.filter(p => p.subcategory === config.subcatName);

    if (search.trim()) {
      const q = search.toLowerCase().trim();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.tags && p.tags.some(t => t.toLowerCase().includes(q)))
      );
    }

    if (sort === 'price-low') list.sort((a, b) => a.price - b.price);
    else if (sort === 'price-high') list.sort((a, b) => b.price - a.price);
    else if (sort === 'popularity') list.sort((a, b) => (b.reviewsCount || 0) - (a.reviewsCount || 0));
    else list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return list;
  }, [config.subcatName, search, sort]);

  return (
    <div className="clay-subcategory-page container" style={{ padding: '2.5rem 1.5rem 5rem 1.5rem' }}>
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: '#777386', marginBottom: '1.5rem' }}>
        <Link to="/" style={{ color: 'inherit' }}>Home</Link>
        <ChevronRight size={14} />
        <Link to="/clay" style={{ color: 'inherit' }}>Clay Art</Link>
        <ChevronRight size={14} />
        <span style={{ color: '#27213C', fontWeight: 600 }}>{config.title}</span>
      </div>

      {/* Hero Category Banner */}
      <div
        style={{
          background: config.gradient,
          borderRadius: '24px',
          padding: '3.5rem 2.5rem',
          color: '#FFFFFF',
          marginBottom: '3rem',
          boxShadow: '0 18px 45px rgba(37, 22, 56, 0.22)',
          border: '1px solid rgba(217, 183, 121, 0.35)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{ maxWidth: '650px', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', background: 'rgba(217, 183, 121, 0.22)', border: '1px solid rgba(217, 183, 121, 0.5)', color: '#FFF2D1', padding: '0.35rem 0.95rem', borderRadius: '999px', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
            <Sparkles size={14} color="#D9B779" />
            <span>{config.badge} · {products.length} Handmade Pieces</span>
          </div>
          <h1 className="font-editorial" style={{ fontSize: '2.8rem', fontWeight: 700, color: '#FFFFFF', lineHeight: 1.15, marginBottom: '0.9rem' }}>
            {config.title}
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#F4F0FB', lineHeight: 1.65 }}>
            {config.description}
          </p>
        </div>
      </div>

      {/* Quick Navigation to Sister Clay Categories */}
      <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem', marginBottom: '2rem' }}>
        {Object.entries(SUB_CONFIG).map(([path, cfg]) => {
          const isActive = path === currentPath;
          return (
            <Link
              key={path}
              to={path}
              className={`btn btn-sm ${isActive ? 'btn-primary' : 'btn-secondary'}`}
              style={{ whiteSpace: 'nowrap' }}
            >
              {cfg.title}
            </Link>
          );
        })}
      </div>

      {/* Search & Sort Controls */}
      <div className="shop-top-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, maxWidth: '400px' }}>
          <div className="search-input-wrapper" style={{ flex: 1 }}>
            <Search className="search-icon-left" size={16} />
            <input
              type="text"
              placeholder={`Search in ${config.title}...`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button type="button" className="search-clear-btn" onClick={() => setSearch('')}>
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontSize: '0.9rem', color: '#777386' }}>
            <strong>{products.length}</strong> items available
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <ArrowUpDown size={15} color="#777386" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              style={{
                padding: '0.5rem 0.8rem',
                borderRadius: '999px',
                border: '1.5px solid #EFE7E2',
                background: '#FFFFFF',
                fontWeight: 600,
                fontSize: '0.85rem'
              }}
            >
              <option value="newest">Newest First</option>
              <option value="popularity">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <ProductGrid
        products={products}
        emptyMessage={`No ${config.title} products found for "${search}".`}
        onClearFilters={() => setSearch('')}
      />
    </div>
  );
};

export default ClayCategory;
