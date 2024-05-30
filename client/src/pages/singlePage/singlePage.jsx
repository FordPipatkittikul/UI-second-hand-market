import Slider from '../../components/slider/Slider'
import './singlePage.scss'

import ParticlesBg from 'particles-bg'
import { useLoaderData } from 'react-router-dom'

function SinglePage(){

  const post = useLoaderData();
  // console.log(post)

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

          </div>

        </div>
      </div>

      <div className='features'>
        <ParticlesBg/>
        <div className="wrapper"></div>
      </div>

    </div>
  )
}

export default SinglePage