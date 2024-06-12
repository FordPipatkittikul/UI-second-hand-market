import Slider from '../../components/slider/Slider'
import './singlePage.scss'
import { AuthContext } from "../../context/AuthContext";
import apiRequest from '../../lib/apiRequest';

import ParticlesBg from 'particles-bg'
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom'
import { useContext } from "react";

function SinglePage(){

  const post = useLoaderData();
  const {currentUser} = useContext(AuthContext);
  const location = useLocation();
  const path = location.pathname
  const postId = path.split('/').pop();
  const navigate = useNavigate();
  // console.log(location.pathname)

  const handleDelete = async (params) => {
    try{
      const response = await apiRequest.delete("/posts/" + params)
      navigate("/profile");
      console.log('Delete successful:', response.data);
    }
    catch(err){
      console.log(err)
    }
  }

  const handleUpdate = async () => {
     // Extract the ID from the path
    // console.log(postId)
    navigate(`/update/${postId}`);
  }

  return (
    <div className='singlePage'>

      <div className='details'>
        <div className="wrapper">
          <Slider images={post.images}/>

          <div className='info'>

            <div className='top'>
              <div className="post">
                <h1>{post.title}</h1>
                <div className="price">$ {post.price}</div>
              </div>
              <div className='user'>
                <img src={post.user.avatar} alt=''></img>
                <span>{post.user.username}</span>
              </div>
            </div>
            
            <div className='description'>
                Description: {post.postDetail.desc}
            </div>

            <div className="buttons">
              <button>
                <img src="/chat.png" alt="" />
                {post.user.phone}
              </button>
              <button>
                <img src="/chat.png" alt="" />
                {post.user.email}
              </button>
            </div>

            {
              (currentUser.email === post.user.email && currentUser.username === post.user.username && currentUser.avatar === post.user.avatar) ? (
                <div className="buttons">
                  <button onClick={handleUpdate}>
                    Update
                  </button>
                  <button onClick={() => handleDelete(postId)}>
                    Delete
                  </button>
                </div>
              ) : (
                <></>
              )
            }

          </div>

        </div>
      </div>

      <div className='features'>
        <ParticlesBg/>
        {/* <div className="wrapper"></div> */}
      </div>

    </div>
  )
}

export default SinglePage