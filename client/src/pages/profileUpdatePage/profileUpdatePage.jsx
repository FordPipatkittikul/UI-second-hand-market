import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./profileUpdatePage.scss";
import { AuthContext}  from "../../context/AuthContext"
import apiRequest from "../../lib/apiRequest";
import ImageUpload from "../../components/imageUpload/imgaeUpload";


function ProfileUpdatePage() {
  const [error,setError] = useState("");
  const { currentUser, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    
    event.preventDefault(); // to prevent reload
    setError("");

    const formData = new FormData(event.target);
    const {username, email, password , phone } = Object.fromEntries(formData); // get user from input tag

    try{

      const res = await apiRequest.put(`/users/${currentUser.id}`,{
        username,
        email,
        password,
        phone
      })
      updateUser(res.data);
      navigate("/profile");
      // console.log(res.data);

    }catch(err){
      console.log(err)
      setError(err.response.data.msg)
    }

  }

  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Update Profile</h1>
          <div className="item">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              required minLength={3} maxLength={20}
              type="text"
              defaultValue={currentUser.username}
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              required minLength={4} maxLength={20}
              type="email"
              defaultValue={currentUser.email}
            />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password"/>
          </div>
          <div className="item">
            <label htmlFor="phone">Phone</label>
            <input id="phone" name="phone" required minLength={9} maxLength={20} type="text" defaultValue={currentUser.phone}/>
          </div>
          <button>Update</button>
          {error && <span>{error}</span>}
        </form>
      </div>
      <div className="sideContainer">
        <img src={currentUser.avatar || "/noavatar.jpg"} alt="" className="avatar" />
        {/* <ImageUpload/> */}
      </div>
    </div>
  );
}

export default ProfileUpdatePage;