import './filter.scss'

function Filter({ item ,setItem, setMaxPrice, setminPrice }){
  

  return (
    <div className='filter'>
      <h1>Searching for <b>{item}</b></h1>
      <div className="top">
        <div className="item">
            <label htmlFor='item'>Item</label>
            <input 
              type="text" 
              id="item" 
              name='item' 
              placeholder='Item'
              onChange={(event) => setItem(event.target.value)}
            />
        </div>
      </div>
      {/* <div className="bottom">
        <div className="item">
            <label htmlFor='minPrice'>Min Price</label>
            <input 
              type="number" 
              id="minPrice" 
              name='minPrice' 
              placeholder='any'
              onChange={(event) => setminPrice(Number(event.target.value))}
            />
        </div>
        <div className="item">
            <label htmlFor='maxPrice'>Max Price</label>
            <input 
              type="number" 
              id="maxPrice" 
              name='maxPrice' 
              placeholder='any'
              onChange={(event) => setMaxPrice(Number(event.target.value))}
            />
        </div>
      </div> */}
    </div>
  )
}

export default Filter