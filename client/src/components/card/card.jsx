import { Link } from 'react-router-dom'

import './card.scss'

function Card({item}){
  return (
    <div className='card'>
      <Link to={`/${item.id}`} className='imageContainer'>
        <img src={item.images[0]} alt=''/>
      </Link>
      <div className='textContainer'>
        <h2 className='title'>
          <Link to={`/${item.id}`}>{item.title}</Link>
        </h2>
        <div className='middle'>
          <p className='price'>$ {item.price}</p>
        </div>
        <div className='bottom'>
          
          {/* TODO : User can save Item for future 
            WILL Implement this features later If I want to
          */}
          {/* <div className='icons'>
            <div className='icon'>
               <img src='/save.png' alt=''/>
            </div>
            <div className='icon'>
               <img src='/chat.png' alt=''/>
            </div>
          </div> */}

        </div>
      </div>
    </div>
  )
}

export default Card