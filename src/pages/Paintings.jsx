import React, { useState, useMemo } from 'react';
import { Image as ImageIcon, Search, ArrowUpDown, X, Sparkles, LayoutGrid } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import ProductGrid from '../components/ProductGrid';
import PaintingsGallery3D from '../components/3d/PaintingsGallery3D';

const PAINTING_SUBCATS = [
  'All',
  'Abstract Paintings',
  'Nature Paintings',
  'Landscape Paintings',
  'Floral Paintings',
  'Sunset Paintings',
  'Modern Art'
];

const Paintings = () => {
  const [search, setSearch] = useState('');
  const [selectedSubcat, setSelectedSubcat] = useState('All');
  const [sort, setSort] = useState('newest');
  const [showGallery3D, setShowGallery3D] = useState(true);

  const paintingProducts = useMemo(() => {
    let list = PRODUCTS.filter(p => p.category === 'Paintings');

    if (selectedSubcat !== 'All') {
      list = list.filter(p => p.subcategory === selectedSubcat);
    }

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
  }, [search, selectedSubcat, sort]);

  return (
    <div className="paintings-page container" style={{ padding: '2.5rem 1.5rem 5rem 1.5rem' }}>
      {/* Editorial Luxury Category Banner */}
      <div 
        style={{
          background: 'linear-gradient(135deg, #1c0f2d 0%, #351654 45%, #6428D9 100%)',
          borderRadius: '24px',
          padding: '3.5rem 2.5rem',
          color: '#FFFFFF',
          marginBottom: '2.5rem',
          boxShadow: '0 18px 45px rgba(28, 15, 45, 0.28)',
          border: '1px solid rgba(217, 183, 121, 0.35)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{ maxWidth: '680px', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', background: 'rgba(217, 183, 121, 0.18)', border: '1px solid rgba(217, 183, 121, 0.45)', color: '#FFF2D1', padding: '0.35rem 0.95rem', borderRadius: '999px', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
            <ImageIcon size={14} color="#D9B779" />
            <span>Exhibition Hall · {paintingProducts.length} Original Canvases</span>
          </div>
          <h1 className="font-editorial" style={{ fontSize: '2.8rem', fontWeight: 700, color: '#FFFFFF', lineHeight: 1.15, marginBottom: '0.9rem' }}>
            Paintings & Canvas Wonders
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#E2DFE9', lineHeight: 1.65 }}>
            Immerse yourself in original acrylic and oil paintings capturing vivid landscapes, twilight sunsets, serene floral blossoms, and modern abstract emotions.
          </p>
        </div>
      </div>

      {/* 3D Exhibition Showcase */}
      {showGallery3D && paintingProducts.length > 0 && (
        <PaintingsGallery3D paintings={paintingProducts} />
      )}

      {/* Filter and Search Bar */}
      <div className="shop-top-bar" style={{ marginTop: '2rem' }}>
        {/* Subcategory Pills */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {PAINTING_SUBCATS.map(s => (
            <button
              key={s}
              type="button"
              className={`btn btn-sm ${selectedSubcat === s ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setSelectedSubcat(s)}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Right side: View Toggle, Search & Sort */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => setShowGallery3D(!showGallery3D)}
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
          >
            {showGallery3D ? <LayoutGrid size={15} /> : <Sparkles size={15} color="#6C2BD9" />}
            <span>{showGallery3D ? 'Hide 3D Stage' : 'Show 3D Stage'}</span>
          </button>

          <div className="search-input-wrapper" style={{ width: '220px' }}>
            <Search className="search-icon-left" size={16} />
            <input
              type="text"
              placeholder="Search paintings..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button type="button" className="search-clear-btn" onClick={() => setSearch('')}>
                <X size={14} />
              </button>
            )}
          </div>

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

      {/* Product Grid */}
      <ProductGrid
        products={paintingProducts}
        emptyMessage="No paintings match your current style selection."
        onClearFilters={() => {
          setSearch('');
          setSelectedSubcat('All');
        }}
      />
    </div>
  );
};

export default Paintings;
