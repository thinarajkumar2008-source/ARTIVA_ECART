import React from 'react';
import { Filter, RotateCcw } from 'lucide-react';

const CATEGORIES_LIST = [
  'All',
  'Art & Drawings',
  'Paintings',
  'Small Clay Art',
  'Anime Clay Art',
  'Cartoon Clay Art',
  'Keychains',
  'Pen & Pencil Designer'
];

const PRICE_RANGES = [
  { label: 'All Prices', min: '', max: '' },
  { label: 'Under ₹500', min: '0', max: '500' },
  { label: '₹500 to ₹1,000', min: '500', max: '1000' },
  { label: '₹1,000 to ₹2,000', min: '1000', max: '2000' },
  { label: 'Above ₹2,000', min: '2000', max: '10000' }
];

const FilterSidebar = ({
  selectedCategory,
  onSelectCategory,
  selectedPriceRange,
  onSelectPriceRange,
  inStockOnly,
  onToggleInStock,
  onClearAll
}) => {
  return (
    <aside className="filter-sidebar" aria-label="Product Filters">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '1.05rem', color: '#27213C' }}>
          <Filter size={18} color="#6C2BD9" />
          <span>Filters</span>
        </div>
        <button
          type="button"
          onClick={onClearAll}
          style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8rem', color: '#6C2BD9', fontWeight: 600 }}
          title="Reset all filters"
        >
          <RotateCcw size={13} />
          <span>Reset</span>
        </button>
      </div>

      {/* Category Filter */}
      <div className="filter-group">
        <h4 className="filter-title">Category</h4>
        <div className="filter-radio-list">
          {CATEGORIES_LIST.map((cat) => {
            const isChecked = (selectedCategory === '' && cat === 'All') || selectedCategory === cat;
            return (
              <label key={cat} className="filter-option">
                <input
                  type="radio"
                  name="category"
                  checked={isChecked}
                  onChange={() => onSelectCategory(cat === 'All' ? '' : cat)}
                />
                <span style={{ fontWeight: isChecked ? 700 : 400, color: isChecked ? '#6C2BD9' : 'inherit' }}>
                  {cat}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="filter-group">
        <h4 className="filter-title">Price Range</h4>
        <div className="filter-radio-list">
          {PRICE_RANGES.map((range, index) => {
            const isChecked = selectedPriceRange.min === range.min && selectedPriceRange.max === range.max;
            return (
              <label key={index} className="filter-option">
                <input
                  type="radio"
                  name="priceRange"
                  checked={isChecked}
                  onChange={() => onSelectPriceRange(range)}
                />
                <span style={{ fontWeight: isChecked ? 700 : 400, color: isChecked ? '#6C2BD9' : 'inherit' }}>
                  {range.label}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Availability Filter */}
      <div className="filter-group">
        <h4 className="filter-title">Availability</h4>
        <label className="filter-option">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => onToggleInStock(e.target.checked)}
          />
          <span>In Stock Only</span>
        </label>
      </div>
    </aside>
  );
};

export default FilterSidebar;
