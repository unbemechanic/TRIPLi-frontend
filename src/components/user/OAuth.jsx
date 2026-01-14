import React from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../../firebase";
import { useDispatch } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import GoogleIcon from "../../assets/google.png";

// create a new project in the firebase using email account, then click dev button for web, then click on authentication
// import GoogleAuthProvider from firebase/auth
// getAuth function from firebase/auth
// import app from firebase, to let firebase identify which project is creating the request

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async (e) => {
    e.preventDefault();
    dispatch(signInStart());
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider); // this works as a popup sign in

      const response = await fetch(
        "https://tripli-api.inomjonov.site/api/auth",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: result.user.displayName,
            email: result.user.email,
            avatar: result.user.photoURL,
          }),
        }
      );
      const data = await response.json();
      const access = await data.token;
      if (response.ok) {
        alert(`Welcome ${data.name}`);
        navigate("/");
        localStorage.setItem("token", access);
        dispatch(signInSuccess(data));
      }
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      alert(error.message || "An error occurred. Please try again.");
      dispatch(signInFailure(error.message || "Sign in failed"));
    }
  };
  return (
    <div>
      <button
        onClick={handleGoogleClick}
        style={{
          backgroundColor: "inherit",
          border: "none",
          width: "40px",
          cursor: "pointer",
        }}
      >
        <img
          src={GoogleIcon}
          alt="google icon"
          style={{ backgroundColor: "inherit", border: "none", width: "40px" }}
        />
      </button>
    </div>
  );
};

export default OAuth;
