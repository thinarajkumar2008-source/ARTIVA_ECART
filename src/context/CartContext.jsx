import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('artiva_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [couponCode, setCouponCode] = useState(() => {
    return localStorage.getItem('artiva_coupon') || '';
  });
  const [couponDiscount, setCouponDiscount] = useState(0);

  // Sync with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('artiva_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.warn('Failed to save cart to localStorage', e);
    }
  }, [cartItems]);

  // Recalculate coupon discount whenever items or code change
  useEffect(() => {
    if (!couponCode) {
      setCouponDiscount(0);
      return;
    }
    const clean = couponCode.trim().toUpperCase();
    const rawSubtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    if (clean === 'ARTIVA10') {
      // 10% off
      setCouponDiscount(Math.round(rawSubtotal * 0.1));
    } else if (clean === 'CREATIVE50') {
      // Flat ₹50 off
      setCouponDiscount(Math.min(rawSubtotal, 50));
    } else if (clean === 'ARTFIRST') {
      // Flat ₹100 off on orders > 500
      setCouponDiscount(rawSubtotal >= 500 ? 100 : 0);
    } else {
      setCouponDiscount(0);
    }
  }, [cartItems, couponCode]);

  // Add product to cart
  const addToCart = (product, quantity = 1) => {
    const qtyToAdd = Math.max(1, parseInt(quantity, 10) || 1);

    setCartItems(prev => {
      const existingIndex = prev.findIndex(item => item.id === product.id);

      if (existingIndex > -1) {
        const updated = [...prev];
        const currentItem = updated[existingIndex];
        const maxStock = currentItem.stock || 20;
        const newQty = Math.min(currentItem.quantity + qtyToAdd, maxStock);
        updated[existingIndex] = {
          ...currentItem,
          quantity: newQty
        };
        return updated;
      } else {
        const maxStock = product.stock || 20;
        return [
          ...prev,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            originalPrice: product.originalPrice,
            image: product.image,
            category: product.category,
            subcategory: product.subcategory,
            stock: maxStock,
            quantity: Math.min(qtyToAdd, maxStock)
          }
        ];
      }
    });
  };

  // Update item quantity
  const updateQuantity = (productId, newQuantity) => {
    const parsed = parseInt(newQuantity, 10);
    if (parsed <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems(prev =>
      prev.map(item => {
        if (item.id === productId) {
          const maxStock = item.stock || 20;
          return {
            ...item,
            quantity: Math.min(parsed, maxStock)
          };
        }
        return item;
      })
    );
  };

  // Remove single item
  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  // Clear entire cart
  const clearCart = () => {
    setCartItems([]);
    setCouponCode('');
    localStorage.removeItem('artiva_coupon');
  };

  // Apply Coupon code
  const applyCoupon = (code) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'ARTIVA10' || clean === 'CREATIVE50' || clean === 'ARTFIRST') {
      setCouponCode(clean);
      localStorage.setItem('artiva_coupon', clean);
      return { success: true, message: `Coupon ${clean} applied successfully!` };
    }
    return { success: false, message: 'Invalid coupon code. Try ARTIVA10 or CREATIVE50.' };
  };

  const removeCoupon = () => {
    setCouponCode('');
    setCouponDiscount(0);
    localStorage.removeItem('artiva_coupon');
  };

  // Computed values
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 0 && subtotal < 999 ? 79 : 0;
  const grandTotal = Math.max(0, subtotal + shipping - couponDiscount);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        setIsCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItems,
        subtotal,
        shipping,
        couponCode,
        couponDiscount,
        applyCoupon,
        removeCoupon,
        grandTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
