import React from 'react';
import Nav from './Nav';
import SecondaryNav from './SecondaryNav';
import { NavLink } from 'react-router-dom';
import logo from '../Logo.svg';
import logoOld from '../Logo_White.png';
import logoOldText from '../Logo_white.svg';
import logoNew from '../Logo_new.svg';
import logoNew2 from '../Logo_new2.svg';


function Masthead(props){
  const { isLoggedIn, token, setToken, page, setIsFlattened } = props;

  return (
    <header className="Masthead">
      <div className="Masthead--left">
        <NavLink exact={true} activeClassName='--active' to='/'>
          <div className="Logo"><img src={logo} alt="Logo" /></div>
        </NavLink>
      </div>
      <div className="Masthead--center">{ !!page.length && page != 'Home' && <Nav {...props} usage="masthead" />}</div>
      <div className="Masthead--right"><SecondaryNav {...props} /></div>
    </header>
  )
}

export default Masthead;
