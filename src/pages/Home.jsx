import React, { useState } from 'react';
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
  Heart,
  Eye,
  Layers,
  Box
} from 'lucide-react';
import { PRODUCTS, CATEGORIES, REVIEWS, formatPrice } from '../data/products';
import ProductCard from '../components/ProductCard';
import CategoryCard from '../components/CategoryCard';
import NewsletterForm from '../components/NewsletterForm';
import HeroArtScene from '../components/3d/HeroArtScene';
import ArtGallery3D from '../components/3d/ArtGallery3D';

const Home = () => {
  const [heroMode, setHeroMode] = useState('collage'); // 'collage' | '3d'

  // Curated subsets
  const bestsellers = PRODUCTS.filter(p => p.bestseller).slice(0, 8);
  const featuredArtworks = PRODUCTS.filter(p => p.category === 'Paintings' || p.category === 'Art & Drawings').slice(0, 6);
  const spotlightProduct = PRODUCTS.find(p => p.id === 'paint-1') || PRODUCTS[0];
  const supportingCurated = PRODUCTS.filter(p => ['paint-2', 'art-1', 'small-1'].includes(p.id));

  return (
    <div className="home-page">
      {/* ================= 1. EXTRAORDINARY HERO SECTION ================= */}
      <section className="hero-section hero-section-3d" aria-label="Hero Showcase">
        <div className="container hero-grid">
          {/* Left Side: Editorial Typography & Actions */}
          <div className="hero-content">
            <div className="hero-eyebrow-badge">
              <Sparkles size={14} className="text-gold" />
              <span>A WORLD OF ORIGINAL CREATIVITY</span>
            </div>

            <h1 className="hero-heading font-editorial">
              Art Beyond <br />
              <span className="hero-gradient-text">Imagination</span>
            </h1>

            <p className="hero-description">
              Discover original artworks, expressive paintings, handcrafted clay companions, and little treasures made to inspire.
            </p>

            <div className="hero-buttons">
              <Link to="/shop" className="btn btn-primary btn-lg">
                <span>Explore the Collection</span>
                <ArrowRight size={17} />
              </Link>
              <Link to="/art" className="btn btn-secondary btn-lg">
                <span>Discover Our Art</span>
              </Link>
            </div>

            {/* 3 Verified Trust Indicators Based on Actual Store Data */}
            <div className="hero-trust-strip">
              <div className="trust-indicator-item">
                <span className="trust-num">55+</span>
                <span className="trust-label">Unique Creations</span>
              </div>
              <div className="trust-divider"></div>
              <div className="trust-indicator-item">
                <span className="trust-num">100%</span>
                <span className="trust-label">Original Artwork</span>
              </div>
              <div className="trust-divider"></div>
              <div className="trust-indicator-item">
                <span className="trust-num">Handmade</span>
                <span className="trust-label">Thoughtfully Crafted</span>
              </div>
            </div>
          </div>

          {/* Right Side: Editorial Art Showcase & 3D Studio Dual Experience */}
          <div className="hero-visual-container">
            {/* Mode Switcher Pill */}
            <div className="hero-view-switcher" role="tablist" aria-label="Hero visual view">
              <button
                type="button"
                className={`switcher-pill ${heroMode === 'collage' ? 'active' : ''}`}
                onClick={() => setHeroMode('collage')}
                aria-selected={heroMode === 'collage'}
              >
                <Layers size={14} />
                <span>Editorial Gallery</span>
              </button>
              <button
                type="button"
                className={`switcher-pill ${heroMode === '3d' ? 'active' : ''}`}
                onClick={() => setHeroMode('3d')}
                aria-selected={heroMode === '3d'}
              >
                <Box size={14} />
                <span>3D Interactive Studio</span>
              </button>
            </div>

            {heroMode === 'collage' ? (
              /* Layered Editorial Collage with Natural Depth */
              <div className="editorial-collage-wrap">
                {/* Main Central Masterpiece Frame */}
                <div className="collage-frame frame-main">
                  <img
                    src="https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=900&auto=format&fit=crop&q=80"
                    alt="Midnight Bloom - Featured Canvas Painting"
                    className="collage-img"
                  />
                  <div className="frame-overlay-tag">
                    <span className="tag-label">Featured Canvas</span>
                    <span className="tag-name">Midnight Bloom</span>
                  </div>
                </div>

                {/* Floating Miniature Clay Showcase */}
                <div className="collage-frame frame-floating-clay">
                  <img
                    src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&auto=format&fit=crop&q=80"
                    alt="Handcrafted Clay Companions"
                    className="collage-img"
                  />
                  <div className="clay-floating-badge">
                    <Sparkles size={12} color="var(--champagne-gold)" />
                    <span>Polymer Clay Miniatures</span>
                  </div>
                </div>

                {/* Floating Artisan Drawing Card */}
                <div className="collage-frame frame-floating-drawing">
                  <img
                    src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80"
                    alt="Original Pencil & Ink Sketch"
                    className="collage-img"
                  />
                  <div className="drawing-floating-badge">
                    <span>Botanical Sketches</span>
                  </div>
                </div>

                {/* Ambient Soft Gold Accent Glow */}
                <div className="collage-ambient-glow" aria-hidden="true"></div>
              </div>
            ) : (
              /* 3D WebGL Canvas Scene */
              <div className="hero-3d-canvas-wrap">
                <HeroArtScene />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ================= GALLERY TRANSITION RIBBON ================= */}
      <div className="gallery-ribbon-ticker" aria-hidden="true">
        <div className="gallery-ribbon-track">
          {[...Array(2)].map((_, loopIdx) => (
            <React.Fragment key={loopIdx}>
              <span className="ribbon-item">
                <span>Original Canvas Paintings</span>
                <span className="ribbon-dot">✦</span>
              </span>
              <span className="ribbon-item">
                <span>Handcrafted Clay Miniatures</span>
                <span className="ribbon-dot">✦</span>
              </span>
              <span className="ribbon-item">
                <span>Botanical Ink & Pencil Drawings</span>
                <span className="ribbon-dot">✦</span>
              </span>
              <span className="ribbon-item">
                <span>Chibi Anime Sculptures</span>
                <span className="ribbon-dot">✦</span>
              </span>
              <span className="ribbon-item">
                <span>Artisan Keychains</span>
                <span className="ribbon-dot">✦</span>
              </span>
              <span className="ribbon-item">
                <span>Designer Desk Stationery</span>
                <span className="ribbon-dot">✦</span>
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ================= 2. TRUST AND SERVICE BENEFITS STRIP ================= */}
      <section className="benefits-section" aria-label="Why Choose ARTIVA">
        <div className="container benefits-grid">
          <div className="benefit-card">
            <div className="benefit-icon-box box-violet">
              <Palette size={22} />
            </div>
            <div className="benefit-info">
              <h4>Unique Handmade Creations</h4>
              <p>Every piece is individually hand-sculpted, sketched, or painted.</p>
            </div>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon-box box-blush">
              <PackageCheck size={22} />
            </div>
            <div className="benefit-info">
              <h4>Carefully Packed Products</h4>
              <p>Shock-absorbent cushioned layers protect every fragile detail.</p>
            </div>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon-box box-gold">
              <ShieldCheck size={22} />
            </div>
            <div className="benefit-info">
              <h4>Secure Checkout Experience</h4>
              <p>Transparent order confirmation and verified simulated checkout.</p>
            </div>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon-box box-mint">
              <Gift size={22} />
            </div>
            <div className="benefit-info">
              <h4>Creative Gifts for Everyone</h4>
              <p>Whimsical desk buddies, keychains, and fine canvas art.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 3. SHOP BY CATEGORY (ASYMMETRIC MOSAIC) ================= */}
      <section className="section-wrapper">
        <div className="container">
          <div className="section-header">
            <div className="section-title-wrap">
              <span className="section-tag">Find Your Kind of Art</span>
              <h2 className="section-title font-editorial">Curated Categories</h2>
              <p className="section-desc">
                From expressive drawings to miniature clay companions, discover something that feels uniquely yours.
              </p>
            </div>
            <Link to="/shop" className="btn btn-secondary">
              <span>View All 55+ Pieces</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="category-mosaic-grid">
            {CATEGORIES.map((cat, idx) => {
              let colClass = 'category-mosaic-item-standard';
              if (idx === 0 || idx === 1) {
                colClass = 'category-mosaic-item-featured';
              } else if (idx === 5 || idx === 6) {
                colClass = 'category-mosaic-item-wide';
              }
              return (
                <div key={cat.id} className={colClass}>
                  <CategoryCard category={cat} />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= 4. FEATURED COLLECTIONS: ART THAT SPEAKS TO YOU ================= */}
      <section className="section-wrapper featured-spotlight-section">
        <div className="container">
          <div className="section-header">
            <div className="section-title-wrap">
              <span className="section-tag text-gold">Curator's Spotlight</span>
              <h2 className="section-title font-editorial">Art That Speaks to You</h2>
              <p className="section-desc">
                Hand-selected masterwork canvases and intricate handmade clay pieces that transform any space.
              </p>
            </div>
            <Link to="/paintings" className="btn btn-primary btn-sm">
              <span>Explore Canvas Hall</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="spotlight-showcase-grid">
            {/* Large Featured Artwork Editorial Presentation */}
            <div className="spotlight-main-card">
              <div className="spotlight-img-wrap">
                <img
                  src={spotlightProduct.image}
                  alt={spotlightProduct.name}
                  className="spotlight-img"
                />
                <span className="spotlight-curator-badge">Curator's Choice</span>
              </div>
              <div className="spotlight-content">
                <div className="spotlight-eyebrow">{spotlightProduct.category} · Original Acrylic</div>
                <h3 className="spotlight-title font-editorial">{spotlightProduct.name}</h3>
                <p className="spotlight-description">
                  {spotlightProduct.description}
                </p>
                <div className="spotlight-meta-row">
                  <div className="spotlight-rating">
                    <Star size={16} fill="var(--champagne-gold)" color="var(--champagne-gold)" />
                    <span>{spotlightProduct.rating}</span>
                    <span className="review-count">({spotlightProduct.reviewsCount} reviews)</span>
                  </div>
                  <div className="spotlight-price">{formatPrice(spotlightProduct.price)}</div>
                </div>
                <div className="spotlight-actions">
                  <Link to={`/product/${spotlightProduct.id}`} className="btn btn-primary">
                    <span>Discover the Collection</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Supporting Smaller Curated Cards */}
            <div className="spotlight-supporting-column">
              {supportingCurated.map((item) => (
                <Link to={`/product/${item.id}`} key={item.id} className="spotlight-small-card">
                  <img src={item.image} alt={item.name} className="small-card-thumb" />
                  <div className="small-card-details">
                    <span className="small-card-cat">{item.subcategory || item.category}</span>
                    <h4 className="small-card-name">{item.name}</h4>
                    <div className="small-card-price-row">
                      <span className="price-bold">{formatPrice(item.price)}</span>
                      {item.originalPrice && (
                        <span className="price-struck">{formatPrice(item.originalPrice)}</span>
                      )}
                    </div>
                  </div>
                  <div className="small-card-arrow">
                    <ArrowRight size={16} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= 5. BESTSELLERS: MOST-LOVED CREATIONS ================= */}
      <section className="section-wrapper bestsellers-section">
        <div className="container">
          <div className="section-header">
            <div className="section-title-wrap">
              <span className="section-tag" style={{ color: 'var(--royal-violet)' }}>Community Favorites</span>
              <h2 className="section-title font-editorial">Most-Loved Creations</h2>
              <p className="section-desc">
                The most cherished paintings, drawings, and desk toppers across the ARTIVA community.
              </p>
            </div>
            <Link to="/shop" className="btn btn-secondary">
              <span>View All Bestsellers</span>
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

      {/* ================= 6. BRAND STORYTELLING: MADE WITH IMAGINATION. COLLECTED WITH LOVE. ================= */}
      <section className="section-wrapper brand-story-section">
        <div className="container">
          <div className="brand-story-grid">
            {/* Visual Studio Photograph */}
            <div className="brand-story-visual">
              <div className="story-image-frame">
                <img
                  src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=900&auto=format&fit=crop&q=80"
                  alt="Inside the ARTIVA Artisan Studio"
                  className="story-image"
                />
              </div>
              <div className="story-floating-stat">
                <Sparkles size={16} color="var(--champagne-gold)" />
                <div>
                  <strong>Artisan Made</strong>
                  <span>Every detail touched by hand</span>
                </div>
              </div>
            </div>

            {/* Emotional Narrative Copy */}
            <div className="brand-story-text">
              <span className="section-tag text-gold">Our Creative Purpose</span>
              <h2 className="brand-story-title font-editorial">Made with Imagination. Collected with Love.</h2>
              <p className="brand-story-lead">
                ARTIVA was founded on a simple belief: that genuine, handmade artwork possesses an emotional soul that mass-produced décor can never replicate.
              </p>
              <p className="brand-story-body">
                We bring together original drawings on fine textured cotton, rich canvas paintings, handmade polymer clay miniatures, personalized charms, and creative stationery. Each piece begins with pure imagination and hours of deliberate craftsmanship.
              </p>

              <div className="story-pillars">
                <div className="pillar-item">
                  <div className="pillar-dot"></div>
                  <div>
                    <h5>Original Craftsmanship</h5>
                    <p>Sketched, sculpted, and detailed by passionate independent artists.</p>
                  </div>
                </div>
                <div className="pillar-item">
                  <div className="pillar-dot"></div>
                  <div>
                    <h5>Thoughtfully Handmade</h5>
                    <p>Polymer clay baked with care, sealed with protective water-resistant glaze.</p>
                  </div>
                </div>
                <div className="pillar-item">
                  <div className="pillar-dot"></div>
                  <div>
                    <h5>Joyful Delivery</h5>
                    <p>Packaged in shock-resistant cushioned boxes ready for gift giving.</p>
                  </div>
                </div>
              </div>

              <div className="story-action">
                <Link to="/about" className="btn btn-primary">
                  <span>Discover Our Story</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 7. INTERACTIVE 3D ART EXPERIENCE ================= */}
      <section className="section-wrapper virtual-exhibition-section" aria-label="3D Virtual Art Exhibition">
        <div className="container">
          <div className="section-header">
            <div className="section-title-wrap">
              <span className="section-tag" style={{ color: 'var(--champagne-gold)' }}>Digital Promenade</span>
              <h2 className="section-title font-editorial" style={{ color: '#FFFFFF' }}>The Virtual Exhibition</h2>
              <p className="section-desc" style={{ color: '#C8C2D6' }}>
                Step into our interactive digital gallery. Explore curated creations in 3D perspective with spotlight illumination.
              </p>
            </div>
            <Link to="/art" className="btn btn-secondary" style={{ background: 'rgba(255,255,255,0.12)', color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.3)' }}>
              <span>View Full Gallery</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Interactive 3D Promenade */}
          <ArtGallery3D products={featuredArtworks} />
        </div>
      </section>

      {/* ================= 8. COLLECTOR REVIEWS ================= */}
      <section className="section-wrapper reviews-section" aria-label="Customer Reviews">
        <div className="container">
          <div className="section-header">
            <div className="section-title-wrap">
              <span className="section-tag text-gold">Collector Feedback</span>
              <h2 className="section-title font-editorial">What Collectors Say</h2>
              <p className="section-desc">
                Heartfelt experiences from art lovers and collectors across India.
              </p>
            </div>
          </div>

          <div className="reviews-grid">
            {REVIEWS.map((rev) => (
              <div key={rev.id} className="review-card">
                <div>
                  <div className="review-stars">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={15} fill="var(--champagne-gold)" color="var(--champagne-gold)" />
                    ))}
                  </div>
                  <h4 className="review-title font-editorial">"{rev.title}"</h4>
                  <p className="review-comment">"{rev.comment}"</p>
                </div>

                <div className="review-author">
                  <div className="author-info">
                    <h5>{rev.name}</h5>
                    <span>{rev.city} • Purchased {rev.productName}</span>
                  </div>
                  <div className="verified-badge">
                    <CheckCircle2 size={13} />
                    <span>Verified</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 9. NEWSLETTER SUBSCRIPTION ================= */}
      <section className="container" style={{ margin: '3.5rem auto 4.5rem auto' }}>
        <NewsletterForm />
      </section>
    </div>
  );
};

export default Home;