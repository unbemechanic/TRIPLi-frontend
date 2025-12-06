import React from "react";
import { persistor } from "../../redux/store";

const SignOut = () => {
  // Clear local storage
  localStorage.removeItem("access_token");
  localStorage.removeItem("user_data"); // Add any other items you need to clear

  // Clear Redux Persist storage
  persistor.purge();

  // Optionally, redirect the user
  window.location.href = "/login";
};

export default SignOut;
