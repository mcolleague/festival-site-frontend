import React from 'react';
import { NavLink } from "react-router-dom";

function Nav(props){
  const { usage } = props;
  const activeClass = '--active';

  return (
    <nav className={`Nav --${usage}`}>
      <ul className="Nav--list">
        <li className="Nav--item"><NavLink activeClassName={activeClass} to="/info">Info</NavLink></li>
        <li className="Nav--item"><NavLink activeClassName={activeClass} to="/register">Register</NavLink></li>
        <li className="Nav--item"><NavLink activeClassName={activeClass} to="/programme">Programme</NavLink></li>
        <li className="Nav--item"><NavLink activeClassName={activeClass} to="/gallery">Gallery</NavLink></li>
        <li className="Nav--item hide-sm"><NavLink to="/myaccount">My account</NavLink></li>
      </ul>
    </nav>
  )
}

export default Nav;
