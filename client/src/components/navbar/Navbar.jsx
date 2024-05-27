/*
    haven't link to any pages yet

*/


import { useState } from "react";
import { Link } from 'react-router-dom'
import { userData } from "../../lib/dummydata";
import "./navbar.scss"

function Navbar() {

    const [open,setOpen] = useState(false);
    const user = true;

    return (
        <nav>
            <div className="left">
                <Link to="/" className="logo">
                    <img src="/logo.png" alt= ""/>
                    <span>UI MARKET</span>
                </Link>
                <Link to="/">Home</Link>
                <Link to="/">About</Link>
                <Link to="/">Contact</Link>
                <Link to="/">Agents</Link>
            </div>
            <div className="right">
                
                {user ? (
                    <div className="user">
                        <img src={userData.img} alt=""/>
                        <span>{userData.name}</span>
                        <Link to='/profile' className="profile">Profile</Link>
                    </div>
                )  : (
                <>
                    <Link to="/login" className="login">Sign in</Link>
                    <Link to="/register" className="register">Sign up</Link>
                </>
                )
                }

                <div className="menuIcon">
                    <img 
                        src="/menu.png" 
                        alt="" 
                        onClick={() => setOpen((prev) => !prev)}
                    />
                </div>
                
                <div className={open ? "menu active": "menu"}>
                    <Link to="/">Home</Link>
                    <Link to="/">About</Link>
                    <Link to="/">Contact</Link>
                    <Link to="/">Agents</Link>
                    <Link to="/login">Sign in</Link>
                    <Link to="/register">Sign up</Link>
                    <p style={{color: "#dc143c"}} >Don't forget to close menu</p>
                </div>
            
            </div>
        </nav>
    )

}

export default Navbar;