import React, { useContext, useState } from 'react';
import './Loginpopup.css';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';

function Loginpopup({ setshowlogin }) {
    const { token, settoken } = useContext(StoreContext);
    const [state, setstate] = useState("Login");
    const [data, setdata] = useState({
        name: "",
        email: "",
        password: ""
    });

    const onchangehandler = (event) => {
        const { name, value } = event.target;
        setdata(prevData => ({ ...prevData, [name]: value }));
    }

    const onLogin = async (event) => {
      event.preventDefault();
      let apiUrl = "https://backend-food-4.onrender.com";
      if (state === "Login") {
        apiUrl += "/api/user/login";
      } else {
        apiUrl += "/api/user/register";
      }
    
      try {
        const axios = require('axios');

        axios.post(apiUrl, data)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.error(error);
        });
        
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
    
        const responseData = await response.json();
        if (responseData.token) {
          settoken(responseData.token);
          localStorage.setItem("token", responseData.token);
          setshowlogin(false);
        } else {
          alert(responseData.message);
        }
      } catch (error) {
        alert(`Error: ${error.message}`);
      }
    };
    

    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className='login-popup-container'>
                <div className='login-popup-title'>
                    <h2>{state}</h2>
                    <img onClick={() => setshowlogin(false)} src={assets.cross_icon} alt="close" />
                </div>
                <div className='login-popup-input'>
                    {state === "Sign Up" && <input type='text' name='name' onChange={onchangehandler} value={data.name} placeholder='Your Name' required />}
                    <input type='email' name='email' onChange={onchangehandler} value={data.email} placeholder='Your Email' required />
                    <input type='password' name='password' onChange={onchangehandler} value={data.password} placeholder='Your Password' required />
                </div>
                <button type='submit'>{state === "Sign Up" ? "Create Account" : "Login"}</button>
                <div className='login-popup-condition'>
                    <input type='checkbox' />
                    <p>By Continuing, I agree to the terms of use & privacy setting</p>
                </div>
                {state === "Login" ? <p>Create a new Account? <span onClick={() => setstate("Sign Up")}>Click Here</span></p> : <p>Already Have An Account? <span onClick={() => setstate("Login")}>Login Here</span></p>}
            </form>
        </div>
    );
}

export default Loginpopup;
