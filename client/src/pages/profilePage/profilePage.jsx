import './profilePage.scss'
import { userData } from '../../lib/dummydata'
import SellItem from '../../components/sellItem/SellItem'
import apiRequest from '../../lib/apiRequest'

import ParticlesBg from 'particles-bg'
import { useNavigate } from 'react-router-dom'
import { useState } from "react";

function ProfilePage(){

  const navigate = useNavigate();
  const [isLoading,setIsLoading] = useState(false); // PURPOSE: prevent user not clicking button twice while waiting resposne from server

  const handleLogout = async (event) => {
    setIsLoading(true);

    try{
      const res = apiRequest.post("/auth/logout");
      localStorage.removeItem("user");
      // console.log(res)
      navigate("/");
    } catch(err){
      console.log(err)
    } finally{
      setIsLoading(false)
    }

  }

  return (
    <div className='profilepage'>
      
      <div className="details">
        <div className="wrapper">
          
          <div className="title">
            <h1>User Information</h1>
            <button>Update profile</button>
          </div>

          <div className='info'>
              <span>Username: <b>{userData.name}</b></span>
              <span>Email: <b>{userData.email}</b></span>
              <span>Phone: <b>{userData.phone}</b></span>
              <button onClick={handleLogout} disabled={isLoading}>Log out</button>
          </div>

          
          <div className="endDetails"></div>
          

          <div className="title">
            <h1>Your Item</h1>
            <button>Want to sell more</button>
          </div>
          <SellItem/>

          {/* <div className="title">
              <h1>Saved List</h1>
          </div>
          <SellItem/> */}

        </div>
      </div>

      <div className="right">
        {/* might change to something else in the future */}
        {/* <div className="wrapper">

        </div> */}
        <ParticlesBg/>
      </div>

    </div>
  )
}

export default ProfilePage