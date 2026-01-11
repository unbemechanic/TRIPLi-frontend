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
import RegisterComponent from "./page/user/register.jsx";
import MainComponent from "./page/main.jsx/main";
import ScrollToTop from "./components/scrollTop.jsx";
import Maping from "./components/general/maping.jsx";
import OverFLow from "./components/overFlow/overFlow.jsx";
import NavCart from "./page/cart/navCart";
import Login from "./page/user/login.jsx";
import { store, persistor } from "./redux/store.js";
import { PersistGate } from "redux-persist/integration/react";
import Profile from "./page/user/profile.jsx";
import { GeneralProvider } from "./contextAPI/Context.jsx";
import { CampingProvider } from "./contextAPI/CampingContext.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <GeneralProvider>
          <CampingProvider>
            <Navbar />
            <ScrollToTop />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<MainComponent />} />
              <Route
                path="/vehicles/:category"
                element={<ProductListComponent />}
              />
              <Route
                path="/product/detail/:category/:id"
                element={<DocumentsComponent />}
              />
              <Route path="/camping" element={<CampingComponent />} />
              <Route path="/camping/:id" element={<CampingDetailComponent />} />
              <Route path="/register" element={<RegisterComponent />} />
              <Route path="/cart/:id" element={<OverFLow />} />
              <Route path="/maping" element={<Maping />} />
              <Route path="/overflow" element={<OverFLow />} />
              <Route path="/cart" element={<NavCart />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
            <Footer />
          </CampingProvider>
        </GeneralProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
