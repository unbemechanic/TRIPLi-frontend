import { API } from "../address/address";

import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GeneralContext = createContext();
export const useCart = () => useContext(GeneralContext);
export const GeneralProvider = ({ children }) => {
  const navigate = useNavigate();

  const getUserId = () => {
    const persistRoot = JSON.parse(
      localStorage.getItem("persist:root") || "{}"
    );
    const userObj = persistRoot.user ? JSON.parse(persistRoot.user) : {};
    return userObj?.currentUser?._id;
  };

  const [userId, setUserId] = useState(getUserId());
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
    const interval = setInterval(() => {
      const newId = getUserId();
      if (newId && newId !== userId) {
        setUserId(newId);
        refreshCart();
      }
    }, 100);

    return () => clearInterval(interval);
  }, [userId]);

  // Navigation menu context
  const [selectedNav, setSelectedNav] = useState("Motor");

  const handleNavChange = (title) => {
    setSelectedNav(title.toLowerCase());
    navigate("/vehicles");
    console.log("Selected Navigation:", title.toLowerCase());
  };

  return (
    <GeneralContext.Provider
      value={{
        carts,
        getUserId,
        setCarts,
        handleAddToCart,
        refreshCart,
        handleUpdateQuantity,
        handleMinusQuantity,
        selectedNav,
        handleNavChange,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};
