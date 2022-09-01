import React from "react";
import './NavBar.css'
import {Link} from 'react-router-dom'
import dogIcon from '../../images/dog-icon.jpg'

const NavBar = () => {
  return (
    <div className="containerNavBar">
      <ul className="NavigationPart">
        <li>
          <Link to='/home'><button className="buttonNavigation">Home</button></Link>
        </li>
        <li>
          <Link to='/dog'><button className="buttonNavigation">+ Create Breed</button></Link>
        </li>
      </ul>
      <div className="SearchContainer">
        <Link to='/home'>
          <img src={dogIcon} alt='dog icon' />
        </Link>
      </div>
    </div>
  )
}

export default NavBar