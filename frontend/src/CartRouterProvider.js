import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContextProvider";

const CartContext = createContext();

export function CartProvider({ children }) {
  const { userData } = useAuth();
  const [cart, setCart] = useState([]);

  useEffect(
    () => async () => {
      try {
        const response = await axios.post("http://localhost:5000/cart", { userId: userData._id });
        if (response.data.success) {
          setCart(response.data.cart);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },
    []
  );

  return <CartContext.Provider value={{ cart, setCart }}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const { userData } = useAuth();
  const [wishlist, setWishlist] = useState([]);

  useEffect(
    () => async () => {
      try {
        const response = await axios.post("http://localhost:5000/wishlist", { userId: userData._id });
        if (response.data.success) {
          console.log(response.data.wishlist);
          setWishlist(response.data.wishlist);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },
    []
  );

  return <WishlistContext.Provider value={{ wishlist, setWishlist }}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  return useContext(WishlistContext);
}
