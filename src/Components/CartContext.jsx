/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";

export const CartContext = createContext();

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

const parseStoredCart = () => {
  try {
    const stored = localStorage.getItem("cartItems");
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) {
      localStorage.removeItem("cartItems");
      return [];
    }
    // Validate each item to prevent corrupted or negative quantity values
    return parsed
      .filter((item) => item && item.id != null)
      .map((item) => ({
        ...item,
        price: Math.max(0, Number(item.price) || 0),
        quantity: Math.max(1, Math.floor(Number(item.quantity) || 1)),
      }));
  } catch (error) {
    console.error("Failed to parse cart items from localStorage:", error);
    try {
      localStorage.removeItem("cartItems");
    } catch {
      // ignore
    }
    return [];
  }
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(parseStoredCart);

  // Sync cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    } catch (error) {
      console.error("Failed to persist cart items to localStorage:", error);
    }
  }, [cartItems]);

  const addToCart = useCallback((item, qty = 1) => {
    if (!item || item.id == null) return;
    const addQty = Math.max(1, Math.floor(Number(qty) || 1));
    const safePrice = Math.max(0, Number(item.price) || 0);

    setCartItems((prev) => {
      const existingIndex = prev.findIndex((p) => p.id === item.id);
      if (existingIndex > -1) {
        return prev.map((p, idx) =>
          idx === existingIndex
            ? { ...p, quantity: p.quantity + addQty }
            : p
        );
      }
      return [...prev, { ...item, price: safePrice, quantity: addQty }];
    });
  }, []);

  const increaseQty = useCallback((id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }, []);

  const decreaseQty = useCallback((id) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const removeFromCart = useCallback((id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
    try {
      localStorage.removeItem("cartItems");
    } catch {
      // ignore
    }
  }, []);

  const getItemQuantity = useCallback((id) => {
    const item = cartItems.find((p) => p.id === id);
    return item ? item.quantity : 0;
  }, [cartItems]);

  // Derived calculations: subtotal, totalAmount, and total item count
  const { subtotal, totalAmount, totalCount } = useMemo(() => {
    const rawTotal = cartItems.reduce(
      (sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 1),
      0
    );
    const count = cartItems.reduce(
      (sum, item) => sum + (Number(item.quantity) || 0),
      0
    );
    // Round to 2 decimal places to avoid floating point issues
    const rounded = Math.round(rawTotal * 100) / 100;
    return {
      subtotal: rounded,
      totalAmount: rounded,
      totalCount: count,
    };
  }, [cartItems]);

  const value = useMemo(
    () => ({
      cartItems,
      addToCart,
      increaseQty,
      decreaseQty,
      removeFromCart,
      clearCart,
      getItemQuantity,
      subtotal,
      totalAmount,
      totalCount,
    }),
    [
      cartItems,
      addToCart,
      increaseQty,
      decreaseQty,
      removeFromCart,
      clearCart,
      getItemQuantity,
      subtotal,
      totalAmount,
      totalCount,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
