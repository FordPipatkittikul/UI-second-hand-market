/*
    haven't link to every pages yet
*/

import { useContext, useState } from "react";
import { Link } from 'react-router-dom'


import "./navbar.scss"
import { AuthContext } from "../../context/AuthContext";

function Navbar() {

    const [open,setOpen] = useState(false);
    

    const {currentUser} = useContext(AuthContext);

    return (
        <nav>
            <div className="left">
                <Link to="/" className="logo">
                    <img src="/logo.png" alt= ""/>
                    <span>YORWOR MARKET</span>
                </Link>
                <Link to="/list">Items</Link>
                {/* <Link to="/">About</Link>
                <Link to="/">Usuage</Link> */}
            </div>
            <div className="right">
                
                {currentUser ? (
                    <div className="user">
                        <img src={currentUser.avatar || "/noavatar.jpg"} alt=""/>
                        <span>{currentUser.username}</span>
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
                    {currentUser ? (
                        <>
                            <Link to="/">Home</Link>
                            <Link to="/">About</Link>
                            <Link to="/">Usuage</Link>
                            <Link to="/profile">Profile</Link>
                        </>
                    )  : (
                    <>
                        <Link to="/">Home</Link>
                        <Link to="/">About</Link>
                        <Link to="/">Usuage</Link>
                        <Link to="/login">Sign in</Link>
                        <Link to="/register">Sign up</Link>
                    </>
                    )
                    }
                    <p style={{color: "#dc143c"}} >Don't forget to close menu</p>
                </div>
            
            </div>
        </nav>
    )

}

export default Navbar;