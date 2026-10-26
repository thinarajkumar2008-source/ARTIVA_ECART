// API Service with seamless backend connection & robust local fallback
import { PRODUCTS, CATEGORIES } from '../data/products';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Helper to check if backend is reachable
let backendAvailable = null;

async function checkBackend() {
  if (backendAvailable !== null) return backendAvailable;
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1200);
    const res = await fetch(`${API_BASE_URL}/products`, {
      method: 'GET',
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    backendAvailable = res.ok;
    return backendAvailable;
  } catch {
    backendAvailable = false;
    return false;
  }
}

export const api = {
  // Fetch all products with filtering, search, sorting
  async getProducts(params = {}) {
    const isUp = await checkBackend();
    if (isUp) {
      try {
        const query = new URLSearchParams(params).toString();
        const res = await fetch(`${API_BASE_URL}/products?${query}`);
        if (res.ok) {
          const data = await res.json();
          return data;
        }
      } catch (err) {
        console.warn('Backend fetch failed, using local product catalog', err);
      }
    }

    // Local in-memory filtering fallback
    let list = [...PRODUCTS];

    if (params.category) {
      list = list.filter(p => 
        p.category.toLowerCase() === params.category.toLowerCase() ||
        p.subcategory.toLowerCase() === params.category.toLowerCase()
      );
    }

    if (params.search) {
      const q = params.search.toLowerCase().trim();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.subcategory.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.tags && p.tags.some(t => t.toLowerCase().includes(q)))
      );
    }

    if (params.minPrice) {
      list = list.filter(p => p.price >= Number(params.minPrice));
    }
    if (params.maxPrice) {
      list = list.filter(p => p.price <= Number(params.maxPrice));
    }

    if (params.sort) {
      switch (params.sort) {
        case 'price-low':
          list.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          list.sort((a, b) => b.price - a.price);
          break;
        case 'name':
          list.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'popularity':
          list.sort((a, b) => (b.reviewsCount || 0) - (a.reviewsCount || 0));
          break;
        case 'newest':
        default:
          list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          break;
      }
    }

    return {
      products: list,
      total: list.length,
      mode: isUp ? 'backend' : 'local-demo'
    };
  },

  // Fetch product by ID or slug
  async getProductById(id) {
    const isUp = await checkBackend();
    if (isUp) {
      try {
        const res = await fetch(`${API_BASE_URL}/products/${id}`);
        if (res.ok) {
          const data = await res.json();
          return data;
        }
      } catch (err) {
        console.warn('Backend fetch product by ID failed', err);
      }
    }

    const found = PRODUCTS.find(p => p.id === id || p.slug === id);
    return found || null;
  },

  // Fetch Categories
  async getCategories() {
    return CATEGORIES;
  },

  // Place Order (recalculates & creates simulated or real record)
  async createOrder(orderPayload) {
    const isUp = await checkBackend();
    if (isUp) {
      try {
        const res = await fetch(`${API_BASE_URL}/orders`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderPayload)
        });
        if (res.ok) {
          const data = await res.json();
          return data;
        }
      } catch (err) {
        console.warn('Backend order placement failed, falling back to local order simulation', err);
      }
    }

    // Local demo order generation
    const orderId = 'ARTIVA-' + Math.floor(100000 + Math.random() * 900000);
    const orderDate = new Date().toISOString();
    
    // Server-side total recalculation simulation (never trust raw total)
    const itemsTotal = orderPayload.items.reduce((sum, item) => {
      const prod = PRODUCTS.find(p => p.id === item.id) || item;
      return sum + (prod.price * item.quantity);
    }, 0);

    const shipping = itemsTotal >= 999 ? 0 : 79;
    const discount = orderPayload.discount || 0;
    const finalAmount = Math.max(0, itemsTotal + shipping - discount);

    const simulatedOrder = {
      orderId,
      orderDate,
      customer: orderPayload.customer,
      items: orderPayload.items,
      subtotal: itemsTotal,
      shipping,
      discount,
      totalAmount: finalAmount,
      status: 'Confirmed (Demo Mode)',
      paymentMethod: orderPayload.paymentMethod || 'Cash on Delivery (Demo)',
      deliveryEstimate: 'Delivered in 4-6 business days'
    };

    // Store in localStorage for persistent order history
    try {
      const existing = JSON.parse(localStorage.getItem('artiva_orders') || '[]');
      existing.unshift(simulatedOrder);
      localStorage.setItem('artiva_orders', JSON.stringify(existing));
    } catch {
      // Local storage fallback
    }

    return simulatedOrder;
  },

  // Fetch orders from local storage or backend
  async getOrders() {
    try {
      return JSON.parse(localStorage.getItem('artiva_orders') || '[]');
    } catch {
      return [];
    }
  },

  // Submit Contact Form
  async submitContact(contactData) {
    const isUp = await checkBackend();
    if (isUp) {
      try {
        const res = await fetch(`${API_BASE_URL}/contact`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(contactData)
        });
        if (res.ok) {
          return await res.json();
        }
      } catch (err) {
        console.warn('Backend contact submit failed', err);
      }
    }

    // Demo response
    return {
      success: true,
      message: 'Thank you! Your message has been received in demo mode. Our creative team will get back to you within 24 hours.'
    };
  }
};
