import React from "react";
import './NavBar.css'
import {Link} from 'react-router-dom'
import SearchBar from "../SearchBar/SearchBar";

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
        <SearchBar/>
      </div>
    </div>
  )
}

export default NavBar