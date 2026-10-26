import React, { useState, useMemo } from 'react';
import { Palette, Search, ArrowUpDown, X, Sparkles, LayoutGrid } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import ProductGrid from '../components/ProductGrid';
import ArtGallery3D from '../components/3d/ArtGallery3D';

const SUBCATS = ['All', 'Colorful Drawings', 'Sketches & Portraits', 'Botanical Art'];

const ArtDrawings = () => {
  const [search, setSearch] = useState('');
  const [subcat, setSubcat] = useState('All');
  const [sort, setSort] = useState('newest');
  const [showGallery3D, setShowGallery3D] = useState(true);

  const artProducts = useMemo(() => {
    let list = PRODUCTS.filter(p => p.category === 'Art & Drawings');

    if (subcat !== 'All') {
      list = list.filter(p => p.subcategory === subcat);
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
  }, [search, subcat, sort]);

  return (
    <div className="art-drawings-page container" style={{ padding: '2.5rem 1.5rem 5rem 1.5rem' }}>
      {/* Visual Category Banner */}
      <div 
        style={{
          background: 'linear-gradient(135deg, #FF6B9A 0%, #6C2BD9 100%)',
          borderRadius: '24px',
          padding: '3rem 2.5rem',
          color: '#FFFFFF',
          marginBottom: '2.5rem',
          boxShadow: '0 16px 36px rgba(255, 107, 154, 0.25)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{ maxWidth: '640px', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(255, 255, 255, 0.2)', padding: '0.3rem 0.8rem', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 700, marginBottom: '1rem' }}>
            <Palette size={15} /> Fine Art & 3D Illustration Studio
          </div>
          <h1 style={{ fontSize: '2.6rem', fontWeight: 800, color: '#FFFFFF', lineHeight: 1.15, marginBottom: '0.8rem' }}>
            Art & Drawings Collection
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'rgba(255, 255, 255, 0.95)', lineHeight: 1.6 }}>
            Explore expressive graphite sketches, vivid colored pencil portraits, and intricate botanical studies hand-drawn on premium archival textured paper.
          </p>
        </div>
      </div>

      {/* Interactive 3D Virtual Gallery Promenade */}
      {showGallery3D && artProducts.length > 0 && (
        <ArtGallery3D products={artProducts} />
      )}

      {/* Filter and Search Bar */}
      <div className="shop-top-bar" style={{ marginTop: '2rem' }}>
        {/* Subcategory Pills */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {SUBCATS.map(s => (
            <button
              key={s}
              type="button"
              className={`btn btn-sm ${subcat === s ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setSubcat(s)}
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
              placeholder="Search drawings..."
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
        products={artProducts}
        emptyMessage="No drawings match your search criteria."
        onClearFilters={() => {
          setSearch('');
          setSubcat('All');
        }}
      />
    </div>
  );
};

export default ArtDrawings;
