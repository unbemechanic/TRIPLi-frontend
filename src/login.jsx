import React, { useState } from "react";
import styled from "styled-components";
import BgImg from "./assets/login.jpeg";
import {
  LogInForm,
  LogInInputs,
  LongDash,
  SignInnerDiv,
  SignOr,
  SignTypography,
  SocialIcon,
  SocialIcons,
} from "./style";
import { SLink } from "./page/linkStyle";
import SizeCheckboxes from "./materials/checkbox";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signInFailure, signInStart, signInSuccess } from "./redux/user/userSlice";
import OAuth from "./components/OAuth";
import { API } from "./address/address";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999999;
  display: grid;
  /* grid-template-columns: 1fr 1fr; */
  background-color: white;
  align-items: center;
`
const Wrapper = styled.div`
  background-color: rgba(217, 171, 171, 0.398); /* Semi-transparent background */
  backdrop-filter: blur(10px); /* Apply blur effect */
  -webkit-backdrop-filter: blur(10px); /* For Safari support */
  border-radius: 10px; /* Optional: rounded corners */
  border: 1px solid rgba(255, 255, 255, 0.3); /* Optional: light border */
  padding: 20px;
  width: 50%;
  margin-inline: auto;
  color: white;
  height: fit-content;
`

const Bg = styled.div`
  background-image: url(${BgImg});
  background-position: center;
  background-size: cover;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const LoginSec = styled.div`
  width: 500px;
  margin-inline: auto;
`;

const Heading = styled.h1`
  font-family: "Edu AU VIC WA NT Hand";
  font-size: 50px;
  color: #ffffff;
  margin-bottom: 30px;
`;
// is fetching working

const Login = () => {
  const [formData, setFormData] = useState({});
  const [email, setEmail] = useState(); //should be deleted before publishing
  const [password, setPassword] = useState(); // should be deleted before publishing
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart())
    if (email !== "") {
      try {
        const response = await fetch(`https://api-camper.inomjonov.site/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        const access = data.token;
        if (response.status === 201) {
          alert(`Welcom ${data.name}`);
          navigate("/");
          setError("");
          localStorage.setItem("token", access);
        dispatch(signInSuccess(data))
        } else {
          setError("Incorrect email or password.");
          alert("Incorrect email or password.");
          alert(data.message)
          dispatch(signInFailure(data.message))
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          setError("Incorrect email or password.");
          alert("Incorrect email or password.");
        } else {
          setError("An error occurred. Please try again.");
          alert("An error occurred. Please try again.");
          console.error("Login error is ",error)
        }
      }
    }
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <Container>
      
      <Bg>
      <div style={{backgroundColor:'white', width:'fit-content', padding:'30px', position:'fixed', top:'0', left:'0'}}>
        <h3>For demo usage</h3>
        <p>Email: camper@mail.ru</p>
        <p>Password: camper</p>
      </div>
      <Wrapper>
        <LoginSec>
          <Heading> Welcome to Caravan</Heading>
          <h1
            style={{
              marginBottom: "10px",
              color: "#ffffff",
              textAlign: "center",
            }}
          >
            Login with email
          </h1>
          {error && <div style={{ color: "red" }}>{error}</div>}
          <button
            onClick={(e) => {
              setEmail("camper@mail.ru");
              setPassword("camper");
            }}
          >
            autofill
          </button>
          <LogInForm onSubmit={handleSubmit}>
            <label>Your email</label>
            <LogInInputs
              type="text"
              placeholder="example@gmail.com"
              id="email"
              onChange={handleChange}
            />
            <label>Your password</label>
            <LogInInputs
              type="password"
              placeholder="Your password"
              id="password"
              onChange={handleChange}
            />
            <SignInnerDiv style={{ marginBottom: "10px" }}>
              <SizeCheckboxes />
              <SignTypography>Keep me Logged in</SignTypography>
              <SignTypography>Forgot your password?</SignTypography>
            </SignInnerDiv>
            <Button
              type="submit"
              sx={{ width: "100%", height: "50px" }}
              variant="contained"
            >
              SIGN IN
            </Button>
          </LogInForm>
          <SignOr $or>
            <LongDash></LongDash> OR <LongDash></LongDash>
          </SignOr>
          <SocialIcons>
            <SocialIcon ><OAuth/></SocialIcon>
          </SocialIcons>
          <SLink to="/register">
            <Button
              sx={{ width: "100%", height: "50px", marginTop: "30px" }}
              variant="outlined"
            >
              CREATE ACCOUNT
            </Button>
          </SLink>
        </LoginSec>
      </Wrapper>
      </Bg>
      
    </Container>
  );
};

export default Login;
