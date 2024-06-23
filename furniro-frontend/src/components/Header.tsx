import { Link } from "react-router-dom"
import React from 'react'

function Header() {
  return (
    <div>
        <header>
             <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/about'>About</Link></li>
                <li><Link to='/signup'>Signup</Link></li>
             </ul>
        </header>
    </div>
  )
}

export default Header