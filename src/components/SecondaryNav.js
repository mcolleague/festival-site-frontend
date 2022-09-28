import React from 'react';
import { Link } from "react-router-dom";
import { revokeTokenURL } from '../helpers/api';

function SecondaryNav(props) {
  const { isLoggedIn, token, setToken } = props;

  function logOut(){
    if (!token) return;

    fetch(revokeTokenURL, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json',
          'Authorization': 'Bearer ' + token
        }
    }).then(response => {
        setToken(null);
    }).catch(error => {
        console.log(error);
    });
  }

  return isLoggedIn ? (
    <div className="SecondaryNav">
      <Link to="/myaccount">My Account</Link>
      <span className="Divider">—</span>
      <a href="#" onClick={logOut}>Log out</a>
    </div>
  ) : (
    <div className="SecondaryNav">
      <Link to="/myaccount">Log in</Link>
    </div>
  )
}

export default SecondaryNav;
