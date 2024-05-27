import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

import "./register.scss";

function Register() {

  const [error,setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {

    event.preventDefault() // to prevent reload

    const formData = new FormData(event.target);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    const phone = formData.get("phone");

    try{
      const res = await axios.post("http://localhost:8000/api/auth/register",{
        username,
        email,
        password,
        phone
      })
      navigate("/login");
    }catch(err){
      // console.log(err)
      setError(err.response.data.msg)
    }

  };

  return (
    <div className="registerPage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          <input name="username" type="text" placeholder="Username" />
          <input name="email" type="text" placeholder="Email" />
          <input name="password" type="password" placeholder="Password" />
          <input name="phone" type="text" placeholder="phone" />
          <button >Register</button>
          {error && <span>{error}</span>}
          <Link to="/login">Do you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/Herky.png" alt="" />
      </div>
    </div>
  );
}

export default Register;