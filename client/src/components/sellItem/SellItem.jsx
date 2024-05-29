import './sellItem.scss'
import Card from '../card/card'
import {listData} from '../../lib/dummydata'

function SellItem({currentUserPost}){
  return (
    <div className='sellItem'>
        {currentUserPost.map(item => (
            <Card key={item.id} item={item}/>
        ))}
    </div>
  )
}

export default SellItem