import React, { useContext, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../contexts/storeContext";
import axios from 'axios'

const LoginPopup = ({ setLogin }) => {
  const [currState, setCurrState] = useState("Sign Up");
  const {cartItems} = useContext(StoreContext)
  const [data, setData] = useState({
    name:'',
    password:'',
    email:'',
    cartData: cartItems
  })

  const onChangeHandler = (evt) => {
      setData((prev) => ({...prev, [evt.target.name]:evt.target.value}))
  }

  const {url, setToken} = useContext(StoreContext)

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;
    if(currState==="Login") {
      newUrl += "/api/user/login"
    } else {
      newUrl += "/api/user/register"
    }

    const response = await axios.post(newUrl, data)

    if(response.data.success) {
      setToken(response.data.token)
      localStorage.setItem('token', response.data.token)
      setLogin(false)
    }
    else {
      alert(response.data.message)
    }
  }

  return (
    <div className="login">
      <form onSubmit={onLogin} className="login-form" action="">
        <div className="login-title">
          <h2>{currState}</h2>
          <img onClick={() => setLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-inputs">
          {currState === "Sign Up" ? (
            <input onChange={onChangeHandler} value={data.name} name="name" type="text" placeholder="Your Name" required />
          ) : (
            <></>
          )}
          <input onChange={onChangeHandler} value={data.email} name="email" type="email" placeholder="Email" required />
          <input onChange={onChangeHandler} value={data.password} name="password" type="password" placeholder="Password" required />
        </div>
        <button>{currState === "Sign Up" ? "Sign Up" : "Login"}</button>
        {currState === "Sign Up" ? (
          <div className="login-contents">
            <input type="checkbox" required />
            <p>
              By continuing, I agree to the terms of use and privacy policy.
            </p>
          </div>
        ) : (
          <></>
        )}
        {currState === "Sign Up" ? (
          <p>
            Alreay have an account?{" "}
            <span onClick={() => setCurrState("Login")}>Click Here</span>
          </p>
        ) : (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrState("Sign Up")}>Click Here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
