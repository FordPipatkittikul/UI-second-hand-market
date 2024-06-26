import './profilePage.scss'
import SellItem from '../../components/sellItem/SellItem'
import apiRequest from '../../lib/apiRequest'
import { AuthContext } from "../../context/AuthContext"

import ParticlesBg from 'particles-bg'
import { Link, useNavigate,useLoaderData } from 'react-router-dom'
import { useContext, useState } from "react";

function ProfilePage(){

  const {updateUser, currentUser} =useContext(AuthContext)
  

  const navigate = useNavigate();
  const [isLoading,setIsLoading] = useState(false); // PURPOSE: prevent user not clicking button twice while waiting resposne from server
  
  const posts = useLoaderData()
  const getUserPost = (posts,currentUser) => {
    const userPost = []
    for(let i = 0; i < posts.length; i++){
      // console.log(posts[i].userId) is correct
      // console.log(currentUser.id) is correct
      if(posts[i].userId === currentUser.id){
        userPost.push(posts[i])
      }
    }
    return userPost
  }
  const currentUserPost = getUserPost(posts,currentUser)

  const handleLogout = async (event) => {
    setIsLoading(true);

    try{
      await apiRequest.post("/auth/logout");
      updateUser(null);
      // console.log(res)
      navigate("/");
    } catch(err){
      console.log(err)
    } finally{
      setIsLoading(false)
    }

  }

  return  (
    <div className='profilepage'>
      
      <div className="details">
        <div className="wrapper">
          
          <div className="title">
            <h1>User Information</h1>
            <Link to="/profile/update">
              <button>Update profile</button>
            </Link>
          </div>

          <div className='info'>
              <span>Username: <b>{currentUser.username}</b></span>
              <span>Email: <b>{currentUser.email}</b></span>
              <span>Phone: <b>{currentUser.phone}</b></span>
              <button onClick={handleLogout} disabled={isLoading}>Log out</button>
          </div>

          
          <div className="endDetails"></div>
          

          <div className="title">
            <h1>Your Item</h1>
            <Link to="/add">
              <button>Want to sell more</button>
            </Link>
          </div>
          <SellItem currentUserPost={currentUserPost}/>

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