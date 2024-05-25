import { Link } from 'react-router-dom'

import './card.scss'

function Card({item}){
  return (
    <div className='card'>
      <Link to={`/${item.id}`} className='imageContainer'>
        <img src={item.img} alt=''/>
      </Link>
      <div className='textContainer'>
        <h2 className='title'>
          <Link to={`/${item.id}`}>{item.title}</Link>
        </h2>
        {/* <p className='address'>
          <img src="/pin.png" alt=""/>
          <span>{item.address}</span>
        </p> */}
        <div className='middle'>
          <p className='price'>$ {item.price}</p>
        </div>
        <div className='bottom'>
          {/* <div className='features'>
            <div className='feature'>
            
            </div>
            <div className='feature'>
            
            </div>
          </div> */}
          <div className='icons'>
            <div className='icon'>
               <img src='/save.png' alt=''/>
            </div>
            <div className='icon'>
               <img src='/chat.png' alt=''/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card