import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  Palette, 
  PackageCheck, 
  ShieldCheck, 
  Gift, 
  Star,
  CheckCircle2,
  Heart
} from 'lucide-react';
import { PRODUCTS, CATEGORIES, REVIEWS } from '../data/products';
import ProductCard from '../components/ProductCard';
import CategoryCard from '../components/CategoryCard';
import NewsletterForm from '../components/NewsletterForm';
import HeroArtScene from '../components/3d/HeroArtScene';

const Home = () => {
  // 8 Trending creations
  const trendingProducts = PRODUCTS.filter(p => p.featured).slice(0, 8);
  // Bestselling creations
  const bestsellers = PRODUCTS.filter(p => p.bestseller).slice(0, 8);

  return (
    <div className="home-page">
      {/* 1. IMMERSIVE 3D HERO SECTION */}
      <section className="hero-section hero-section-3d">
        <div className="container hero-grid">
          <div className="hero-content" style={{ position: 'relative', zIndex: 10 }}>
            <div className="hero-tagline-badge">
              <Sparkles size={16} color="#6C2BD9" />
              <span>Interactive 3D Art Studio</span>
            </div>

            <h1 className="hero-heading">
              Art Beyond <br />
              <span className="gradient-text">Imagination</span>
            </h1>

            <p className="hero-description">
              Step into a colorful world of handmade creations, expressive paintings, playful miniatures, and artistic treasures.
            </p>

            <div className="hero-buttons">
              <Link to="/shop" className="btn btn-primary btn-lg">
                <span>Explore the Collection</span>
                <ArrowRight size={18} />
              </Link>
              <Link to="/art" className="btn btn-secondary btn-lg">
                <span>Discover Our Art</span>
              </Link>
            </div>

            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">40+</span>
                <span className="stat-label">Handcrafted Designs</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">100%</span>
                <span className="stat-label">Original Artworks</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">4.9 ★</span>
                <span className="stat-label">Artisan Rating</span>
              </div>
            </div>
          </div>

          {/* Interactive 3D Canvas Scene */}
          <div className="hero-visual" style={{ minHeight: '440px', position: 'relative' }}>
            <HeroArtScene />
          </div>
        </div>
      </section>

      {/* 2. TRUST AND BENEFITS SECTION */}
      <section className="benefits-section" aria-label="Why Choose ARTIVA">
        <div className="container benefits-grid">
          <div className="benefit-card">
            <div className="benefit-icon-box" style={{ background: 'rgba(108, 43, 217, 0.1)', color: '#6C2BD9' }}>
              <Palette size={26} />
            </div>
            <div className="benefit-info">
              <h4>Unique Handmade Creations</h4>
              <p>Every piece is individually hand-sculpted, sketched, or painted.</p>
            </div>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon-box" style={{ background: 'rgba(255, 107, 154, 0.12)', color: '#FF6B9A' }}>
              <PackageCheck size={26} />
            </div>
            <div className="benefit-info">
              <h4>Carefully Packed Products</h4>
              <p>Shock-absorbent cushioned layers protect every fragile detail.</p>
            </div>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon-box" style={{ background: 'rgba(139, 224, 196, 0.25)', color: '#059669' }}>
              <ShieldCheck size={26} />
            </div>
            <div className="benefit-info">
              <h4>Secure Checkout Integration</h4>
              <p>Transparent order confirmation and verified simulated checkout.</p>
            </div>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon-box" style={{ background: 'rgba(255, 209, 102, 0.25)', color: '#D97706' }}>
              <Gift size={26} />
            </div>
            <div className="benefit-info">
              <h4>Creative Gifts for Everyone</h4>
              <p>Whimsical desk buddies, keychains, and fine canvas art.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SHOP BY CATEGORY */}
      <section className="section-wrapper">
        <div className="container">
          <div className="section-header">
            <div className="section-title-wrap">
              <span className="section-tag">Handpicked Collections</span>
              <h2 className="section-title">Shop by Category</h2>
              <p className="section-desc">
                From vivid original drawings to pocket-sized clay companions and designer stationery.
              </p>
            </div>
            <Link to="/shop" className="btn btn-secondary">
              <span>View All Catalog</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="category-grid">
            {CATEGORIES.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. TRENDING CREATIONS */}
      <section className="section-wrapper" style={{ background: '#FFFFFF', borderTop: '1px solid #EFE7E2', borderBottom: '1px solid #EFE7E2' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-title-wrap">
              <span className="section-tag" style={{ color: '#FF6B9A' }}>Popular Right Now</span>
              <h2 className="section-title">Trending Creations</h2>
              <p className="section-desc">
                Handmade pieces that art lovers are collecting and falling in love with this week.
              </p>
            </div>
            <Link to="/shop" className="btn btn-primary btn-sm">
              <span>See More Trending</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="product-grid">
            {trendingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. FEATURED COLLECTION: CLAY ART BANNER */}
      <section className="section-wrapper">
        <div className="container">
          <div className="featured-clay-banner">
            <div>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(255, 255, 255, 0.2)', padding: '0.3rem 0.8rem', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 700, marginBottom: '1.25rem', letterSpacing: '0.04em' }}>
                <Sparkles size={15} /> Handcrafted Miniature Magic
              </span>
              <h2>Little Creations. <br />Big Happiness.</h2>
              <p>
                Explore our whimsical world of polymer clay characters, tiny food platters, adorable desk buddies, and custom lucky keychains. Each miniature is baked with loving care.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link to="/clay" className="btn" style={{ background: '#FFD166', color: '#432080', fontWeight: 800 }}>
                  <span>Explore Clay Art</span>
                  <ArrowRight size={16} />
                </Link>
                <Link to="/clay/anime" className="btn" style={{ background: 'rgba(255,255,255,0.2)', color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.4)' }}>
                  <span>Anime Chibi Collection</span>
                </Link>
              </div>
            </div>

            <div className="featured-clay-img-wrap">
              <img
                src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop&q=80"
                alt="Handcrafted Clay Art"
                className="featured-clay-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 6. BESTSELLERS */}
      <section className="section-wrapper" style={{ background: '#FFF9F5' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-title-wrap">
              <span className="section-tag" style={{ color: '#6C2BD9' }}>Customer Favorites</span>
              <h2 className="section-title">All-Time Bestsellers</h2>
              <p className="section-desc">
                The most cherished paintings, drawings, and desk toppers across the ARTIVA community.
              </p>
            </div>
            <Link to="/shop" className="btn btn-secondary">
              <span>Explore All</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="product-grid">
            {bestsellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 7. CUSTOMER REVIEWS (Clearly labeled demonstration reviews) */}
      <section className="section-wrapper" style={{ background: '#FFFFFF', borderTop: '1px solid #EFE7E2' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-title-wrap">
              <span className="section-tag" style={{ color: '#FF6B9A' }}>Real Feedback</span>
              <h2 className="section-title">What Collectors Say</h2>
              <p className="section-desc">
                Sample customer experiences from art lovers across India (Sample Content Demo).
              </p>
            </div>
          </div>

          <div className="reviews-grid">
            {REVIEWS.map((rev) => (
              <div key={rev.id} className="review-card">
                <div>
                  <div className="review-stars">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="#F59E0B" />
                    ))}
                  </div>
                  <h4 className="review-title">"{rev.title}"</h4>
                  <p className="review-comment">"{rev.comment}"</p>
                </div>

                <div className="review-author">
                  <div className="author-info">
                    <h5>{rev.name}</h5>
                    <span>{rev.city} • Purchased {rev.productName}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: '#059669', fontSize: '0.75rem', fontWeight: 600 }}>
                    <CheckCircle2 size={13} />
                    <span>Verified</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. NEWSLETTER SUBSCRIPTION */}
      <section className="container" style={{ marginTop: '3.5rem' }}>
        <NewsletterForm />
      </section>
    </div>
  );
};

export default Home;
