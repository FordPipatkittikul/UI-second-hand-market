/* 
    This is the layout for all our pages rn(maybe change it in future). For resuseable purposes.
    /     : homepage need navbar.
    /list : need navbar.
    qucik note <Outlet/> for Renders the child route's element
*/

import { useContext } from "react";
import {Navigate, Outlet} from "react-router-dom";

import Navbar from "../../components/navbar/Navbar";
import './layout.scss'
import { AuthContext } from "../../context/AuthContext";

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

function RequireAuthLayout() {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) return <Navigate to="/login" />;
  else {
    return (
      <div className="layout">
        <div className="navbar">
          <Navbar />
        </div>
        <div className="content">
          <Outlet />
        </div>
      </div>
    );
  }
}

export {Layout,RequireAuthLayout};