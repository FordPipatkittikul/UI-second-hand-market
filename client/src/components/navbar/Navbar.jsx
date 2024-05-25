import { useState } from "react";
import { Link } from 'react-router-dom'
import ParticlesBg from 'particles-bg'

import "./navbar.scss"

function Navbar() {

    const [open,setOpen] = useState(false);

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
                <Link to="/" className="login">Sign in</Link>
                <Link to="/" className="register">Sign up</Link>
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
                    <Link to="/">Sign in</Link>
                    <Link to="/">Sign up</Link>
                    <p style={{color: "#dc143c"}} >Don't forget to close menu</p>
                </div>
            </div>
        </nav>
    )

}

export default Navbar;