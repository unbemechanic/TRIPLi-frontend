import React from "react";
import { Provider } from "react-redux";

import ReactDOM from "react-dom/client";
import "./index.css";
import Navbar from "./page/navbar/navbar";
import Footer from "./components/footer/footer.jsx";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductListComponent from "./page/plp/plp.jsx";
import DocumentsComponent from "./page/plp/pdp.jsx";
import CampingComponent from "./page/camping/camping";
import CampingDetailComponent from "./page/camping/details";
import RegisterComponent from "./page/register";
import MainComponent from "./page/main.jsx/main";
import ScrollToTop from "./scrollTop";
import CartMotorComponent from "./page/cart/cart";
import Maping from "./maping";
import OverFLow from "./overFlow/overFlow";
import NavCart from "./page/cart/navCart";
import Login from "./login";
import Dashboard from "./page/dashboard/dashboard";
import { store, persistor } from "./redux/store.js";
import { PersistGate } from "redux-persist/integration/react";
import Profile from "./page/profile.jsx";
import { CartProvider } from "./contextAPI/cartContext.jsx";

store.subscribe(() => {
  // console.log('State after dispatch: ', store.getState());
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <CartProvider>
        <BrowserRouter>
          <Navbar />
          <ScrollToTop />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<MainComponent />} />
            <Route path="/motor" element={<ProductListComponent />} />
            <Route path="/motor/:id" element={<DocumentsComponent />} />
            <Route path="/camping" element={<CampingComponent />} />
            <Route path="/camping/:id" element={<CampingDetailComponent />} />
            <Route path="/register" element={<RegisterComponent />} />
            <Route path="/cart/:id" element={<CartMotorComponent />} />
            <Route path="/maping" element={<Maping />} />
            <Route path="/overflow" element={<OverFLow />} />
            <Route path="/cart" element={<NavCart />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </CartProvider>
    </PersistGate>
  </Provider>
);
