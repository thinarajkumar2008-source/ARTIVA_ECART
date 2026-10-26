import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { PRODUCTS } from '../data/products';

const CategoryCard = ({ category }) => {
  // Compute accurate product count from live catalog
  const actualCount = PRODUCTS.filter(p => {
    if (category.slug === 'art') return p.category === 'Art & Drawings';
    if (category.slug === 'paintings') return p.category === 'Paintings';
    if (category.slug === 'small') return p.subcategory === 'Small Clay Art';
    if (category.slug === 'anime') return p.subcategory === 'Anime Clay Art';
    if (category.slug === 'cartoon') return p.subcategory === 'Cartoon Clay Art';
    if (category.slug === 'keychain') return p.subcategory === 'Keychains';
    if (category.slug === 'pen-pencil') return p.subcategory === 'Pen & Pencil Designer';
    return false;
  }).length || category.itemCount || 8;

  return (
    <Link to={category.path} className="category-card" aria-label={`Explore ${category.name}`}>
      <div className="category-card-img-wrap">
        <img
          src={category.image}
          alt={category.name}
          className="category-card-img"
          loading="lazy"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80';
          }}
        />
        <div className="category-card-overlay-gradient"></div>
        <span className="category-card-badge">
          {actualCount} Creations
        </span>
      </div>

      <div className="category-card-content">
        <div>
          <h3 className="category-card-title font-editorial">{category.name}</h3>
          <p className="category-card-desc">{category.description}</p>
        </div>
        <div className="category-card-link">
          <span>Explore Collection</span>
          <ArrowRight size={15} />
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
