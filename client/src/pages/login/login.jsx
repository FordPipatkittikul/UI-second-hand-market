import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import apiRequest from "../../lib/apiRequest";

import "./login.scss";



function Login() {

  const [error,setError] = useState("");
  const [isLoading,setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {

    event.preventDefault(); // to prevent reload
    setIsLoading(true);
    setError("");

    const formData = new FormData(event.target);
    const username = formData.get("username");
    const password = formData.get("password");
    

    try{
      const res = await apiRequest.post("/auth/login",{
        username,
        password,
      })

      localStorage.setItem("user", JSON.stringify(res.data));

      // console.log(res)
      navigate("/");
    } catch(err){
      // console.log(err)
      setError(err.response.data.msg)
    } finally{
      setIsLoading(false)
    }

  };

  return (
    <div className="loginPage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome back Hawkeye</h1>
          <input name="username" required minLength={3} maxLength={20} type="text" placeholder="Username" />
          <input name="password" type="password" placeholder="Password" />
          <button disabled={isLoading}>Login</button>
          {error && <span>{error}</span>}
          <Link to="/register">{"Don't"} you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/Herky.png" alt="" />
      </div>
    </div>
  );
}

export default Login;