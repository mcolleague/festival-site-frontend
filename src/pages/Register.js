import React, { useEffect } from 'react';
import RegistrationForm from '../components/RegistrationForm';
import { Link } from "react-router-dom";
import arrowRight from '../ArrowRight.svg';

function Tickets(props) {
  const { setToken, isLoggedIn, page, setPage } = props;
  const registrationFormProps = { setToken, isLoggedIn };
  const BackLink = () => {
    return (
      <Link className="Link --hasArrow hide-sm" to="/home"><span className="Arrow --left"><img src={arrowRight}/></span></Link>
    )
  }

  useEffect(() => setPage('Register'), []);

  return (
    <div className="InnerPage">
      <h1 className="InnerPage--title"><BackLink /> Register</h1>
      <RegistrationForm {...registrationFormProps} />
    </div>
  )
}

export default Tickets;
