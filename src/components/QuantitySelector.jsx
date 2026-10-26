import React from 'react';
import { Minus, Plus } from 'lucide-react';

const QuantitySelector = ({ quantity = 1, maxStock = 20, onIncrease, onDecrease }) => {
  return (
    <div className="quantity-selector">
      <button
        type="button"
        className="qty-btn"
        onClick={onDecrease}
        disabled={quantity <= 1}
        aria-label="Decrease quantity"
      >
        <Minus size={14} />
      </button>
      <span className="qty-value">{quantity}</span>
      <button
        type="button"
        className="qty-btn"
        onClick={onIncrease}
        disabled={quantity >= maxStock}
        aria-label="Increase quantity"
      >
        <Plus size={14} />
      </button>
    </div>
  );
};

export default QuantitySelector;
