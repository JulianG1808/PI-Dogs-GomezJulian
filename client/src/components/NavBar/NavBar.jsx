import React from "react";
import './NavBar.css'
import {Link} from 'react-router-dom'
import dogIcon from '../../images/dog-icon.jpg'
import * as ImIcons from "react-icons/im";
import * as AiIcons from "react-icons/ai";

const NavBar = () => {
  return (
    <div className="containerNavBar">
      <ul className="NavigationPart">
        <li className="icon">
          <Link to='/home'>
            <span>HOME</span>
          </Link>
        </li>
        <li className="icon">
          <Link to='/dog'>
            <span>CREATE</span>
          </Link>
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