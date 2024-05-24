/* 
    This is the layout for all our pages rn(maybe change it in future). For resuseable purposes.
    /     : homepage need navbar.
    /list : need navbar.
    qucik note <Outlet/> for Renders the child route's element
*/

import Navbar from "../../components/navbar/Navbar";
import './layout.scss'

import {Outlet} from "react-router-dom";



function Layout(){
  return (
    <div className="layout">
      <div className="navbar">
        <Navbar/>
      </div>
      <div className="content">
        <Outlet/>
      </div>
    </div>
  )
}

export default Layout