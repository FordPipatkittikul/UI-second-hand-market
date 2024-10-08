import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import apiRequest from "../../lib/apiRequest";

import "./login.scss";
import { AuthContext } from "../../context/AuthContext";



function Login() {

  const {updateUser} = useContext(AuthContext);

  const [error,setError] = useState("");
  const [isLoading,setIsLoading] = useState(false); // PURPOSE: prevent user not clicking button twice while waiting resposne from server
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

      updateUser(res.data)

      navigate("/");
    } catch(err){
      console.log(err)
      setError(err.response.data.msg)
    } finally{
      setIsLoading(false)
    }

  };

  return (
    <div className="loginPage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <input name="username" required minLength={3} maxLength={20} type="text" placeholder="Username" />
          <input name="password" required minLength={4} maxLength={20} type="password" placeholder="Password" />
          <button disabled={isLoading}>Login</button>
          {error && <span>{error}</span>}
          <Link to="/register">{"Don't"} you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        {/* <img src="/Herky.png" alt="" /> */}
      </div>
    </div>
  );
}

export default Login;