/* 
    TODO: cannot figure out how to filter min max price yet
*/

import { listData } from '../../lib/dummydata'
import './listPage.scss'
import Filter from '../../components/filter/Filter'
import Card from '../../components/card/card'
import apiRequest from '../../lib/apiRequest'

import ParticlesBg from 'particles-bg'
import { useState } from 'react'
import { useLoaderData } from 'react-router-dom'

function ListPage(){

  const data = listData; // delete soon

  const [itemm,setItem] = useState("");
  const [maxPrice,setMaxPrice] = useState(0);
  const [minPrice,setminPrice] = useState(Infinity);

  // console.log(itemm)
  // console.log(minPrice)
  // console.log(maxPrice)

  const posts = useLoaderData()
  // console.log(posts)

  return (
    <div className='listPage'>

      <div className='listContainer'>
        <div className="wrapper">
          <Filter item={itemm} setItem={setItem} setMaxPrice={setMaxPrice} setminPrice={setminPrice}/>
          {posts.filter((item) =>{
            const matchesTitle = item.title.toLowerCase().includes(itemm.toLowerCase());
            // const matchesPrice = item.price >= minPrice && item.price <= maxPrice;
            // console.log(matchesPrice)
            return itemm.toLowerCase() === ""
              ? item
              : (matchesTitle)
          }).map(item=>(
            <Card key={item.id} item={item}/>
          ))}  
        </div>
      </div>

      <div className='mapContainer'>
        {/* <div className="wrapper">

        </div> */}
        <ParticlesBg/>
      </div>
      
    </div>
  )
}

export default ListPage