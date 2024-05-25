import Slider from '../../components/slider/Slider'
import './singlePage.scss'
import { singlePostData, userData } from '../../lib/dummydata'

import ParticlesBg from 'particles-bg'

function SinglePage(){
  return (
    <div className='singlePage'>

      <div className='details'>
        <div className="wrapper">
          <Slider images={singlePostData.images}/>

          <div className='info'>

            <div className='top'>
              <div className="post">
                <h1>{singlePostData.title}</h1>
                <div className="price">$ {singlePostData.price}</div>
              </div>
              <div className='user'>
                <img src={userData.img} alt=''></img>
                <span>{userData.name}</span>
              </div>
            </div>
            
            <div className='description'>
                Description: {singlePostData.description}
            </div>

            <div className="buttons">
              <button>
                <img src="/chat.png" alt="" />
                Send a Message
              </button>
              <button>
                <img src="/save.png" alt="" />
                Save the Place
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