import './filter.scss'

function Filter(){
  return (
    <div className='filter'>
      <h1>Searching for <b>hammer</b></h1>
      <div className="top">
        <div className="item">
            <label htmlFor='item'>Item</label>
            <input 
              type="text" 
              id="item" 
              name='item' 
              placeholder='Item'
            />
        </div>
      </div>
      <div className="bottom">
        <div className="item">
            <label htmlFor='minPrice'>Min Price</label>
            <input 
              type="number" 
              id="minPrice" 
              name='minPrice' 
              placeholder='any'
            />
        </div>
        <div className="item">
            <label htmlFor='maxPrice'>Max Price</label>
            <input 
              type="number" 
              id="maxPrice" 
              name='maxPrice' 
              placeholder='any'
            />
        </div>
        <button>
            <img src='/search.png' alt=''></img>
        </button>
      </div>
    </div>
  )
}

export default Filter