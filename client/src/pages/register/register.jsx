import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import { useState } from "react";

import "./register.scss";

function Register() {

  const [error,setError] = useState("");
  const [isLoading,setIsLoading] = useState(false); // PURPOSE: prevent user not clicking button twice while waiting resposne from server
  const navigate = useNavigate();

  const handleSubmit = async (event) => {

    event.preventDefault(); // to prevent reload
    setIsLoading(true);
    setError("");
    
    const formData = new FormData(event.target);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    const phone = formData.get("phone");

    try{
      const res = await apiRequest.post("/auth/register",{
        username,
        email,
        password,
        phone
      })
      // console.log(res)
      navigate("/login");
    } catch(err){
      // console.log(err)
      setError(err.response.data.msg)
    } finally{
      setIsLoading(false)
    }

  };

  return (
    <div className="registerPage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          <input name="username" required minLength={3} maxLength={20} type="text" placeholder="Username" />
          <input name="email" required minLength={4} maxLength={20} type="text" placeholder="Email" />
          <input name="password" required minLength={4} maxLength={20} type="password" placeholder="Password" />
          <input name="phone" required minLength={9} maxLength={20} type="text" placeholder="phone" />
          <button disabled={isLoading}>Register</button>
          {error && <span>{error}</span>}
          <Link to="/login">Do you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        {/* <img src="/Herky.png" alt="" /> */}
      </div>
    </div>
  );
}

export default Register;