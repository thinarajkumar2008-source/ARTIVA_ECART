import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Sparkles, SlidersHorizontal, ArrowUpDown, X } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import ProductGrid from '../components/ProductGrid';
import FilterSidebar from '../components/FilterSidebar';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchFromUrl = searchParams.get('search') || '';
  const categoryFromUrl = searchParams.get('category') || '';

  const [searchQuery, setSearchQuery] = useState(searchFromUrl);
  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl);
  const [selectedPriceRange, setSelectedPriceRange] = useState({ min: '', max: '' });
  const [sortBy, setSortBy] = useState('newest');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Sync state if URL query parameters change
  useEffect(() => {
    if (searchFromUrl !== searchQuery) {
      setSearchQuery(searchFromUrl);
    }
  }, [searchFromUrl]);

  useEffect(() => {
    if (categoryFromUrl !== selectedCategory) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [categoryFromUrl]);

  // Handle Search Input Submit
  const handleSearchChange = (val) => {
    setSearchQuery(val);
    const newParams = new URLSearchParams(searchParams);
    if (val.trim()) {
      newParams.set('search', val.trim());
    } else {
      newParams.delete('search');
    }
    setSearchParams(newParams);
  };

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    const newParams = new URLSearchParams(searchParams);
    if (cat) {
      newParams.set('category', cat);
    } else {
      newParams.delete('category');
    }
    setSearchParams(newParams);
  };

  const handleClearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedPriceRange({ min: '', max: '' });
    setSortBy('newest');
    setInStockOnly(false);
    setSearchParams({});
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.subcategory.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.tags && p.tags.some(t => t.toLowerCase().includes(q)))
      );
    }

    // Category filter
    if (selectedCategory) {
      result = result.filter(p =>
        p.category.toLowerCase() === selectedCategory.toLowerCase() ||
        p.subcategory.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Price range filter
    if (selectedPriceRange.min !== '') {
      result = result.filter(p => p.price >= Number(selectedPriceRange.min));
    }
    if (selectedPriceRange.max !== '') {
      result = result.filter(p => p.price <= Number(selectedPriceRange.max));
    }

    // Stock availability
    if (inStockOnly) {
      result = result.filter(p => p.stock > 0);
    }

    // Sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'popularity':
        result.sort((a, b) => (b.reviewsCount || 0) - (a.reviewsCount || 0));
        break;
      case 'newest':
      default:
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
    }

    return result;
  }, [searchQuery, selectedCategory, selectedPriceRange, inStockOnly, sortBy]);

  return (
    <div className="shop-page container" style={{ padding: '2.5rem 1.5rem 5rem 1.5rem' }}>
      {/* Page Title & Breadcrumb Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <span className="section-tag text-gold" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
          <Sparkles size={14} /> Complete Artisan Catalog
        </span>
        <h1 className="font-editorial" style={{ fontSize: '2.8rem', fontWeight: 700, color: 'var(--midnight-plum)', marginTop: '0.25rem' }}>
          Explore All Art & Handmade Creations
        </h1>
        <p style={{ color: 'var(--muted-slate)', fontSize: '1.05rem', marginTop: '0.4rem', maxWidth: '720px', lineHeight: 1.6 }}>
          Discover {PRODUCTS.length} original pieces ranging from fine graphite drawings and acrylic canvases to miniature clay friends, lucky charms, and designer desk pens.
        </p>
      </div>

      {/* Top Controls: Search Bar & Sorting */}
      <div className="shop-top-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, maxWidth: '480px' }}>
          <div className="search-input-wrapper" style={{ flex: 1 }}>
            <Search className="search-icon-left" size={17} />
            <input
              type="text"
              placeholder="Search by title, style, or tag..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              aria-label="Filter products"
            />
            {searchQuery && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={() => handleSearchChange('')}
                aria-label="Clear search"
              >
                <X size={15} />
              </button>
            )}
          </div>

          {/* Mobile Filter Toggle */}
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            style={{ display: 'none' }} // Can be enabled on mobile
            onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
          >
            <SlidersHorizontal size={15} />
            <span>Filters</span>
          </button>
        </div>

        {/* Right side: Count & Sort Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <span className="shop-count-text">
            Showing <strong>{filteredProducts.length}</strong> of {PRODUCTS.length} items
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ArrowUpDown size={15} color="#777386" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort products"
              style={{
                padding: '0.55rem 0.95rem',
                borderRadius: '999px',
                border: '1.5px solid #EFE7E2',
                background: '#FFFFFF',
                fontWeight: 600,
                fontSize: '0.88rem',
                color: '#27213C',
                cursor: 'pointer'
              }}
            >
              <option value="newest">Sort by: Newest Additions</option>
              <option value="popularity">Sort by: Customer Popularity</option>
              <option value="price-low">Sort by: Price: Low to High</option>
              <option value="price-high">Sort by: Price: High to Low</option>
              <option value="name">Sort by: Name (A to Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Active Filter Chips */}
      {(selectedCategory || selectedPriceRange.min !== '' || searchQuery || inStockOnly) && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#777386' }}>Active Filters:</span>
          {selectedCategory && (
            <span className="badge badge-category" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
              Category: {selectedCategory}
              <button type="button" onClick={() => handleCategorySelect('')} style={{ color: 'inherit' }}>
                <X size={12} />
              </button>
            </span>
          )}
          {selectedPriceRange.min !== '' && (
            <span className="badge badge-category" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
              {selectedPriceRange.label}
              <button type="button" onClick={() => setSelectedPriceRange({ min: '', max: '' })} style={{ color: 'inherit' }}>
                <X size={12} />
              </button>
            </span>
          )}
          {searchQuery && (
            <span className="badge badge-category" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
              Query: "{searchQuery}"
              <button type="button" onClick={() => handleSearchChange('')} style={{ color: 'inherit' }}>
                <X size={12} />
              </button>
            </span>
          )}
          {inStockOnly && (
            <span className="badge badge-stock-in" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
              In Stock Only
              <button type="button" onClick={() => setInStockOnly(false)} style={{ color: 'inherit' }}>
                <X size={12} />
              </button>
            </span>
          )}
          <button
            type="button"
            onClick={handleClearAllFilters}
            style={{ fontSize: '0.8rem', color: '#EF4444', fontWeight: 700, marginLeft: '0.5rem' }}
          >
            Clear All
          </button>
        </div>
      )}

      {/* Main Grid with Filter Sidebar */}
      <div className="shop-layout">
        <FilterSidebar
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
          selectedPriceRange={selectedPriceRange}
          onSelectPriceRange={setSelectedPriceRange}
          inStockOnly={inStockOnly}
          onToggleInStock={setInStockOnly}
          onClearAll={handleClearAllFilters}
        />

        <main>
          <ProductGrid
            products={filteredProducts}
            emptyMessage="No creations matched your filter combination. Try adjusting or resetting your search."
            onClearFilters={handleClearAllFilters}
          />
        </main>
      </div>
    </div>
  );
};

export default Shop;
