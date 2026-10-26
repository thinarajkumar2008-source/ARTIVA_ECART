import React from 'react';
import ProductCard from './ProductCard';
import { Sparkles, RefreshCw } from 'lucide-react';

const ProductGrid = ({ products = [], emptyMessage = "No creations found matching your selection.", onClearFilters }) => {
  if (!products || products.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">
          <Sparkles size={36} />
        </div>
        <h3>No Products Found</h3>
        <p>{emptyMessage}</p>
        {onClearFilters && (
          <button type="button" className="btn btn-primary" onClick={onClearFilters}>
            <RefreshCw size={16} />
            <span>Clear Filters</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
