import { useState } from 'react'
import './searchBar.scss'

const types = ["Buy","Sell"];

function SearchBar(){

  const [query,setQuery] = useState({
    type: "buy",
    item: "",
    minPrice: 0,
    maxPrice: 0,
  });

  const switchType = (val) => {
    setQuery(prev => ({...prev, type: val}));

  }

  return (
    <div className='searchBar'>
        <div className='type'>
            {types.map((type) => (
                <button 
                    key={type} 
                    onClick={() => switchType(type)} 
                    className={query.type === type ? "active" : ""}
                >
                    {type}
                </button>
            ))}
        </div>
        <form>
            <input type='text' name="item" placeholder='item'/>
            <input 
                type='number' 
                name="minPrice" 
                min={0} 
                max={1000000} 
                placeholder='Min Price'
            />
            <input 
                type='number' 
                name="maxPrice"  
                min={0} 
                max={1000000} 
                placeholder='Max Price'
            />
            <button>
                <img src='/search.png' alt=''></img>
            </button>
        </form>
    </div>
  )
}

export default SearchBar

