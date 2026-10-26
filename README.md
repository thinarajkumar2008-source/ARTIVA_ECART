# ARTIVA 3D — IMMERSIVE ART & HANDMADE E-COMMERCE 🎨✨
### Art Beyond Imagination
**Discover Art. Collect Creativity. Share Happiness.**

ARTIVA 3D is a complete, immersive, colorful, and interactive 3D e-commerce platform and online digital art gallery. Built with **React 19, Vite, Three.js, React Three Fiber, and Framer Motion**, it brings physical handmade creations to life with realistic lighting, interactive 3D canvas previews, and playful miniature sculptures while maintaining a fast, accessible, and robust shopping experience.

---

## 🌟 3D & Creative Innovations

1. **Interactive 3D Hero Art Scene (`HeroArtScene.jsx`):**
   - Real-time WebGL canvas featuring a curved procedural artist palette with wobbling oil paint blobs in brand colors (#6C2BD9, #FF6B9A, #FF8264, #FFD166, #8BE0C4).
   - Floating paintbrushes with wooden handles, brushed metal ferrules, and color-dipped bristles.
   - Miniature floating framed art canvases and drifting ambient pastel pigment droplets.
   - Subtle interactive perspective response that tracks mouse pointer coordinates.
   - Graceful 2D fallback when WebGL is unavailable or reduced motion is enabled.

2. **Interactive 3D Product Tilt Cards (`ProductCard.jsx`):**
   - Pointer-tracked 3D card tilt clamped smoothly between -7° and +7°.
   - Dynamic radial light sheen / glare overlay that responds in real-time to pointer angle.
   - Layered depth translation (`translateZ`) on product images and badges.
   - Smooth easing reset on pointer leave.
   - Touch-device friendly (no stuck hover states) and respects `prefers-reduced-motion`.

3. **3D Virtual Art Gallery on `/art` (`ArtGallery3D.jsx`):**
   - Virtual exhibition wall displaying framed artworks in 3D perspective with overhead spotlighting.
   - Interactive carousel controls with keyboard arrow navigation and thumbnail track.
   - Quick "View Artwork" and "Add to Cart" actions directly from the 3D gallery promenade.

4. **3D Paintings Exhibition Hall on `/paintings` (`PaintingsGallery3D.jsx`):**
   - Gold moulding framed canvas showcase with deep ambient light wash.
   - One-click toggle between 3D Virtual Stage and Classic Grid layout.

5. **3D Clay Studio Showcase on `/clay` (`ClayStudioScene.jsx`):**
   - Miniature handmade sculpture studio with real-time floating 3D procedural models:
     - Polka-dot clay mushroom with organic wobble.
     - Chubby baby panda head with painted eyes and blush.
     - Glazed donut charm with rainbow sprinkles.

6. **Interactive 3D Product Inspector on `/product/:id` (`ProductViewer3D.jsx`):**
   - Allows users to orbit 360°, inspect textures from any angle, zoom in/out, and reset the camera.
   - Automatically projects product artwork textures onto a 3D stretcher canvas for paintings, or renders a sculpted clay figurine on a mahogany pedestal for clay creations.
   - Easy toggle between "Studio Photos" and "Interactive 3D Preview".

7. **Artistic Floating Custom Cursor (`CustomCursor.jsx`):**
   - Luminous paint droplet pointer with a smooth trailing ring.
   - Automatically disabled on touch screens and when reduced motion is preferred.
   - Does not interfere with text selection, form inputs, or buttons.

---

## 🌟 Key Features

1. **Brand & Visual Design:**
   - Artistic color palette (Primary Purple `#6C2BD9`, Deep Purple `#432080`, Pink `#FF6B9A`, Coral `#FF8264`, Yellow `#FFD166`, Mint `#8BE0C4`).
   - Clean typography using Google's **Poppins** & **Nunito** fonts.
   - Smooth hover micro-interactions, floating badges, and responsive CSS grid layouts.
   - Graceful fallback placeholders for images when offline or if external links fail.

2. **Complete Navigation & Expandable 3-Dot Drawer:**
   - Sticky top announcement banner with real-time promo code (`ARTIVA10` for 10% off).
   - Global search bar with live filtering.
   - Live shopping cart icon with reactive item count badge.
   - Wishlist heart icon with real-time count.
   - Dedicated expandable **14-item Three-Dot Menu Drawer** (accessible on desktop and mobile) with active page highlighting.

3. **Curated Product Catalog (40+ Handcrafted Designs):**
   - **Art & Drawings:** *Dreaming in Color*, *Sunset Thoughts*, *Floral Sketch*, *Abstract Dreams*, *Nature's Whisper*, *Pencil Portrait*, *Blooming Garden*.
   - **Paintings:** *Midnight Bloom*, *Ocean Whisper*, *Golden Sunset*, *Mountain Dreams*, *Blooming Serenity*, *Colors of Nature*, *The Blue Horizon*.
   - **Small Clay Art:** *Tiny Panda*, *Little Mushroom*, *Mini Flower Pot*, *Tiny Cat*, *Miniature Food Platter*, *Cute Duck*, *Tiny Frog*.
   - **Anime Clay Art:** *Anime Star Chibi*, *Chibi Hero in Cape*, *Magical School Character*, *Cute Anime Neko*, *Fantasy Warrior*.
   - **Cartoon Clay Art:** *Happy Buddy*, *Rainbow Friend*, *Smiling Cloud*, *Funny Friendly Monster*, *Retro Robot*, *Happy Strawberry*.
   - **Keychains:** *Lucky Four-Leaf Clover Charm*, *Mini Swirl Heart*, *Sakura Blossom*, *Custom Initial Letter*, *Donut Charm*.
   - **Pen & Pencil Designer:** *Pencil Pal Sloth*, *Cute Bear Gel Pen*, *Floral Bouquet Pencils*, *Artist Palette Pen*.

4. **Interactive Shopping Cart & Sliding Drawer:**
   - Slide-in side drawer on desktop and mobile.
   - Live quantity controls strictly bounded by available stock.
   - Item removal, clear cart, and persistent storage in `localStorage`.
   - Real-time price calculation in Indian Rupees (**₹**).
   - Promo coupon validation (`ARTIVA10` for 10% off, `CREATIVE50` for flat ₹50 off).
   - Free shipping calculation for orders above ₹999 (otherwise ₹79).

5. **Full Checkout & Order Confirmation Simulation:**
   - Form validation for Indian shipping addresses and 6-digit PIN codes.
   - Simulated order confirmation generating a unique reference ID (e.g. `ARTIVA-839201`).
   - Confetti celebration upon successful purchase.
   - Automatic record persistence in `localStorage` and optional backend API.

6. **Order Tracking & Favorites Management:**
   - Dedicated `/orders` page with detailed order receipts.
   - Dedicated `/favorites` wishlist page with one-click "Move to Cart" action.

7. **Dual-Mode Backend Architecture (Standalone Demo or PostgreSQL REST API):**
   - Seamless transition: runs 100% standalone with mock local data, or connects automatically to the Node/Express backend (`http://localhost:5000/api`) when running.
   - Ready-to-use PostgreSQL schema with parameterized queries in `server/schema.sql`.

---

## 💻 Technology Stack

### Frontend
- **React 19**
- **Vite 8**
- **React Router DOM 7**
- **Lucide React** (Modern SVG iconography)
- **Canvas-Confetti** (Order celebration animations)
- **Responsive CSS3** (Flexbox & CSS Grid, no heavy UI framework overhead)
- **Context API** (`CartContext`, `FavoritesContext`, `AuthContext`, `ToastContext`)

### Backend (Included in `/server`)
- **Node.js**
- **Express.js**
- **pg** (PostgreSQL client)
- **CORS & Dotenv**

---

## 📁 Project Folder Structure

```
artiva-ecart/
│
├── public/
│   ├── favicon.svg              # Custom ARTIVA palette SVG favicon
│   └── images/
│
├── src/
│   ├── assets/                  # Static art assets
│   ├── components/
│   │   ├── Header.jsx           # Global header with search, cart, and drawer trigger
│   │   ├── Footer.jsx           # Professional 4-column footer
│   │   ├── ThreeDotMenu.jsx     # 14-route navigation slide-out panel
│   │   ├── ProductCard.jsx      # Reusable card with price, badge, favorite toggle
│   │   ├── ProductGrid.jsx      # Responsive grid with empty state support
│   │   ├── CategoryCard.jsx     # Clickable category banner card
│   │   ├── CartDrawer.jsx       # Slide-in sliding cart with coupon validation
│   │   ├── QuickViewModal.jsx   # Quick view pop-up with image gallery
│   │   ├── FilterSidebar.jsx    # Price, category, and stock filter sidebar
│   │   ├── QuantitySelector.jsx # Bounded stock quantity increment/decrement
│   │   ├── ToastNotification.jsx# Animated alert toasts
│   │   └── NewsletterForm.jsx   # Newsletter subscription with email validation
│   │
│   ├── context/
│   │   ├── CartContext.jsx      # Cart items, coupon, subtotal, shipping, persistence
│   │   ├── FavoritesContext.jsx # Wishlist tracking & localStorage sync
│   │   ├── AuthContext.jsx      # Demo authentication & session profile
│   │   └── ToastContext.jsx     # Floating notifications
│   │
│   ├── data/
│   │   └── products.js          # 40+ curated products, reviews, categories & formatPrice
│   │
│   ├── pages/
│   │   ├── Home.jsx             # Hero, benefits, categories, trending, bestsellers
│   │   ├── Shop.jsx             # Comprehensive shop with combined search, filters & sort
│   │   ├── ArtDrawings.jsx      # Art & drawings collection page
│   │   ├── Paintings.jsx        # Canvas paintings collection page
│   │   ├── ClayArt.jsx          # Clay art landing page with 5 category spotlights
│   │   ├── ClayCategory.jsx     # Dedicated subcategory view (small, anime, cartoon, etc.)
│   │   ├── ProductDetails.jsx   # Product gallery, specs, buy now & related items
│   │   ├── Favorites.jsx        # Wishlist management
│   │   ├── Checkout.jsx         # Form validation & simulated demo order generation
│   │   ├── Orders.jsx           # Order tracking and receipt viewing
│   │   ├── About.jsx            # Brand story, mission, vision & 4-step artisan process
│   │   ├── Contact.jsx          # Message form, FAQ, and studio support details
│   │   ├── Login.jsx            # Sign in with 1-click demo login helper
│   │   ├── Register.jsx         # Create account form with password visibility toggle
│   │   └── NotFound.jsx         # Friendly 404 canvas blank screen
│   │
│   ├── services/
│   │   └── api.js               # Auto-detecting backend connection & local fallback
│   │
│   ├── App.jsx                  # Main route configuration & global layout
│   ├── main.jsx                 # React root & BrowserRouter initialization
│   └── style.css                # ARTIVA design system, CSS variables & typography
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js            # PostgreSQL connection pool with fallback detection
│   │   ├── controllers/
│   │   │   ├── productController.js # Product endpoints with parameterized SQL
│   │   │   ├── orderController.js   # Server-side total recalculation & orders
│   │   │   └── contactController.js # Contact inquiries
│   │   ├── routes/
│   │   │   ├── products.js
│   │   │   ├── orders.js
│   │   │   └── contact.js
│   │   └── app.js               # Express application initialization & CORS
│   ├── schema.sql               # PostgreSQL tables, relations & indices
│   ├── .env.example             # Database credentials template
│   └── package.json             # Server dependencies
│
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 🚀 How to Install and Run

### 1. Prerequisites
- **Node.js**: Version 18.x, 20.x, or 24.x ([Download Node.js](https://nodejs.org/))
- **npm**: Version 9.x or higher (bundled with Node.js)

Verify your Node.js and npm installations:
```bash
node -v
npm -v
```

---

### 2. Frontend Installation & Startup

1. Open a terminal in the project directory:
   ```bash
   cd "C:\Users\Thina rajkumar\.gemini\antigravity\scratch\artiva-ecart"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to the local development URL displayed in your terminal (typically **`http://localhost:5173/`** or **`http://localhost:5174/`**).

---

### 3. Production Build
To create an optimized production build:
```bash
npm run build
```
This will compile all assets into the `dist/` directory with zero errors. You can preview the production bundle using:
```bash
npm run preview
```

---

### 4. Optional: Backend & PostgreSQL Setup

ARTIVA functions **100% out of the box in Demo Mode** using local structured data and browser `localStorage`. To connect a real PostgreSQL database:

1. **Install PostgreSQL** on your system if not already installed.
2. Create a new database in PostgreSQL:
   ```sql
   CREATE DATABASE artiva_db;
   ```
3. Initialize the database schema:
   ```bash
   psql -U postgres -d artiva_db -f server/schema.sql
   ```
4. Configure the server environment:
   In `server/`, copy `.env.example` to `.env`:
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=artiva_db
   DB_USER=postgres
   DB_PASSWORD=your_actual_password
   FRONTEND_URL=http://localhost:5173
   ```
5. Install backend dependencies and start the API server:
   ```bash
   cd server
   npm install
   npm run dev
   ```
   The backend will start on `http://localhost:5000`. The frontend will automatically detect the server and switch from `local-demo` to `backend` mode!

---

## 🎨 How Demo Mode Works

- **Persistent Cart & Wishlist:** All additions, removals, and quantity modifications are immediately saved to your browser's `localStorage` and will persist across refreshes.
- **Simulated Checkout:** Orders validate complete shipping and phone numbers, recalculate taxes and shipping fees, generate a unique order reference code (e.g., `ARTIVA-492104`), clear the cart, and record the purchase in your `/orders` history.
- **Sample Coupons:** Use code **`ARTIVA10`** for 10% off your entire order, or **`CREATIVE50`** for a flat ₹50 discount.
- **Demo Accounts:** On the `/login` page, you can type any valid email or click the **"One-Click Demo Account Login"** button to explore the user profile experience.

---

## 🖼️ Adding or Modifying Products & Images

All products are cleanly centralized in `src/data/products.js`. To add a new piece of art:

```javascript
{
  id: 'unique-id',
  slug: 'unique-slug-name',
  name: 'Artwork Title',
  category: 'Clay Art', // 'Art & Drawings' | 'Paintings' | 'Clay Art'
  subcategory: 'Small Clay Art',
  description: 'Detailed description of the medium, emotion, and craftsmanship...',
  price: 499,              // Price in Indian Rupees (₹)
  originalPrice: 699,      // For discount calculation
  image: 'https://images.unsplash.com/...', // Primary image URL
  galleryImages: ['https://...', 'https://...'],
  stock: 12,
  material: 'Polymer clay, satin varnish',
  dimensions: '4.5 x 3.0 cm',
  featured: true,          // Shows in Trending section
  bestseller: false,
  rating: 4.9,
  reviewsCount: 28,
  createdAt: new Date().toISOString()
}
```

---

## 🏷️ External Services Overview

| Feature | Current State | External Service Required For Production |
| :--- | :--- | :--- |
| **Product Catalog** | Working (40+ items) | PostgreSQL (optional) |
| **Cart & Wishlist** | Working (LocalStorage) | None needed |
| **Checkout Flow** | Working (Simulated Demo) | Razorpay / Stripe / PhonePe credentials |
| **Email Newsletters** | Working (Validation Demo) | Mailchimp / SendGrid API key |
| **Image Hosting** | Working (Unsplash + Fallbacks)| Cloudinary / AWS S3 / Local static assets |

---

## 🌐 Opening the Project in VS Code

1. Open VS Code.
2. Select **File > Open Folder...**
3. Select `C:\Users\Thina rajkumar\.gemini\antigravity\scratch\artiva-ecart`.
4. Open the integrated terminal (`Ctrl + \``).
5. Run `npm run dev` and click the local link!

© 2026 **ARTIVA Inc.** — Art Beyond Imagination.
