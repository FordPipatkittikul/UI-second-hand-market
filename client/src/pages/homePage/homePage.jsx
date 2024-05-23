import SearchBar from '../../components/searchBar/SearchBar'
import './homePage.scss'

function HomePage() {
    return (
      <div className="homePage">
        <div className="textContainer">
          <div className="wrapper">
            <h1 className="title">Find what you need to buy/sell without wasting your time</h1>
            <p>
                At this market place, we believe that every item has a story to tell and a journey yet to embark on. 
                Our platform is dedicated to fostering a sustainable and vibrant community where college students can easily buy and sell second-hand items, 
                saving money and reducing waste in the process.
            </p>
            <SearchBar />
            {/* <div className="boxes">
              <div className="box">
                <h1>16+</h1>
                <h2>Years of Experience</h2>
              </div>
              <div className="box">
                <h1>200</h1>
                <h2>Award Gained</h2>
              </div>
              <div className="box">
                <h1>2000+</h1>
                <h2>Property Ready</h2>
              </div>
            </div> */}
          </div>
        </div>
        <div className="imgContainer">
          <img src="/bg2.png" alt="" />
        </div>
      </div>
    );
}
  
export default HomePage;