import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CategoryCard = ({ category }) => {
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
        {category.itemCount && (
          <span className="category-card-badge">
            {category.itemCount} Designs
          </span>
        )}
      </div>

      <div className="category-card-content">
        <div>
          <h3 className="category-card-title">{category.name}</h3>
          <p className="category-card-desc">{category.description}</p>
        </div>
        <div className="category-card-link">
          <span>Explore Collection</span>
          <ArrowRight size={16} />
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
