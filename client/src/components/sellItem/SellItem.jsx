/*
    Right now Every User's sell item is every Item in the market.
*/

import './sellItem.scss'
import Card from '../card/card'
import {listData} from '../../lib/dummydata'

function SellItem(){
  return (
    <div className='sellItem'>
        {listData.map(item => (
            <Card key={item.id} item={item}/>
        ))}
    </div>
  )
}

export default SellItem