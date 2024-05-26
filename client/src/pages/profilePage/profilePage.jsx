import './profilePage.scss'
import { userData } from '../../lib/dummydata'
import SellItem from '../../components/sellItem/SellItem'

import ParticlesBg from 'particles-bg'
import { Link } from 'react-router-dom'

function ProfilePage(){
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
              <span>Phone: <b>{userData.phone}</b></span>
              <span>Email: <b>{userData.email}</b></span>
          </div>

          
          <div to="/" className="endDetails"></div>
          

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