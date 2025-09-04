import { API } from "../address/address";

const { createContext, useContext, useState, useEffect } = require("react");

const CartContext = createContext();
export const useCart = () => useContext(CartContext);
export const CartProvider = ({ children }) => {
  const persistRoot = JSON.parse(localStorage.getItem("persist:root") || "{}");
  const userObj = persistRoot.user ? JSON.parse(persistRoot.user) : {};
  const userId = userObj?.currentUser?._id;

  const [carts, setCarts] = useState({ items: [] });
  const refreshCart = async () => {
    if (!userId) return;
    const res = await fetch(`${API}/cart/${userId}`);
    const data = await res.json();
    setCarts(data);
  };

  const handleAddToCart = async (productId) => {
    await fetch(`${API}/cart/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId, quantity: 1 }),
    });
    refreshCart();
  };

  const updateCart = async (url, options = {}) => {
    await fetch(url, options);
    return refreshCart();
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    return updateCart(`${API}/cart/${userId}/${productId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity: newQuantity }),
    });
  };

  const handleMinusQuantity = (productId, quantity) => {
    if (quantity === 1) {
      return updateCart(`${API}/cart/${userId}/${productId}`, {
        method: "DELETE",
      });
    } else {
      return updateCart(`${API}/cart/${userId}/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: quantity - 1 }),
      });
    }
  };

  useEffect(() => {
    refreshCart();
  }, [userId]);
  return (
    <CartContext.Provider
      value={{
        carts,
        setCarts,
        handleAddToCart,
        refreshCart,
        handleUpdateQuantity,
        handleMinusQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
