import React from 'react'
import '../navbar.css';
//import {handleLogout} from '../Components/Dashboard';







const Navbar = ({handleLogout}) =>{
    
    
    
    return (
        <div className="navbar">
            <div className="navbar-left">
                <a href="" className='navbar-brand'>
                    Dashboard
                </a>
    
            </div>
            <div className="navbar-right">
                <a href="" className='navbar-link' onClick={handleLogout}>Logout</a>
            </div>
            
    
    
    
        </div>
    )
}

export default Navbar;