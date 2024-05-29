import { listData } from '../../lib/dummydata'
import './listPage.scss'
import Filter from '../../components/filter/Filter'
import Card from '../../components/card/card'

import ParticlesBg from 'particles-bg'
import { useState } from 'react'

function ListPage(){

  const data = listData;

  const [itemm,setItem] = useState("");
  const [maxPrice,setMaxPrice] = useState(0);
  const [minPrice,setminPrice] = useState(Infinity);

  // console.log(itemm)
  // console.log(minPrice)
  // console.log(maxPrice)

  return (
    <div className='listPage'>

      <div className='listContainer'>
        <div className="wrapper">
          <Filter item={itemm} setItem={setItem} setMaxPrice={setMaxPrice} setminPrice={setminPrice}/>
          {data.filter((item) =>{
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