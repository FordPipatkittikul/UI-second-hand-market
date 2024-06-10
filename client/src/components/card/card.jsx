import { Link, useLocation } from 'react-router-dom'

import './card.scss'

function Card({item}){
  const location = useLocation();

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
        {location.pathname === '/profile' && (
          <div className='bottom'>
            <p>Delete</p>
            <p>Update</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Card