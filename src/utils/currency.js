import currency from "currency.js";

export const formatKRW = (amount) => {
  return currency(amount, { symbol: "W", precision: 0 }).format();
};
