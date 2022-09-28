import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { tokenURL, userRegisterURL, getUrlParameter, settingsURL } from '../helpers/api';
import arrowRight from '../ArrowRight.svg';

function RegistrationForm(props) {
  const { setToken, isLoggedIn } = props;

  const [registrationSettings, setRegistrationSettings] = useState({});

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [dietaryRequirements, setDietaryRequirements] = useState("");
  const [partyBusInterest, setPartyBusInterest] = useState("No");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isBusy, setIsBusy] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  function handleSubmit(e) {
      e.preventDefault();
      setIsBusy(true);
      createUser();
  }

  const getRegistrationSettings = () => {
    axios.get(settingsURL)
      .then(response => {
        setRegistrationSettings(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error.response);
        // setError(error);
        setIsLoading(false);
      })
  }

  useEffect(() => { getRegistrationSettings() }, []);

  function createUser() {
    axios.post(userRegisterURL, {
        first_name: firstName,
        last_name: lastName,
        username: email,
        email: email,
        password: password,
        confirm_password: confirmPassword,
        party_bus_interest: partyBusInterest
        // dietary_requirements: dietaryRequirements,
      })
      .then(response => {
        setIsSubmitted(true);
        setIsBusy(false);
        setError("");
        logIn();
      })
      .catch(error => {
        setIsBusy(false);
        setError('Something went wrong. Please try again or contact us at info@hundredheads.co.uk.');
      });
  }

  const logIn = () => {
    axios.post(tokenURL, {
      email: email,
      username: email,
      password: password
    })
    .then(response => { setToken(response.data.token) })
    .catch(error => { console.log(error.response) })
  }

  return (
    isSubmitted || isLoggedIn ? (
      <div className="SuccessMsg">
        <p>Thank you for registering for Hundred Heads 2021! Please head to your account page for more information.</p>
        <Link className="Link --hasArrow" to="/myaccount">My account<span className="Arrow --right"><img src={arrowRight}/></span></Link>
      </div>
    ) : isLoading ? (
      <div>Checking availability...</div> ) : ( <>
        <p>{ registrationSettings.ticket_sales_status } If you've already registered for this year, <strong><Link to="/myaccount">log in</Link></strong> to see your details.</p>

        { (registrationSettings.has_valid_access_key || (registrationSettings.is_active && registrationSettings.is_active !== false)) && (
        <form onSubmit={handleSubmit}>
          <div className="InputGroup">
            <label>First name: <input type="text" required value={firstName} onChange={e => setFirstName(e.target.value)} /></label>
          </div>
          <div className="InputGroup">
            <label>Last name: <input type="text" required value={lastName} onChange={e => setLastName(e.target.value)} /></label>
          </div>
          <div className="InputGroup">
            <label>Email: <input type="email" required value={email} onChange={e => setEmail(e.target.value)} /></label>
          </div>
          <div className="InputGroup">
            <label>Password: <input id="password" type="password" required value={password} onChange={e => { setPassword(e.target.value); }} /></label>
          </div>
          <div className="InputGroup">
            <label>Confirm password: <input id="confirm_password" type="password" required value={confirmPassword} onChange={e => { setConfirmPassword(e.target.value); }} /></label>
          </div>
          <br/><br/>
          <div className="InputGroup">
            <label><small>Would you be interested in taking a party bus from London to the festival and back?</small> <input id="party_bus_interest" type="checkbox" value={ partyBusInterest } onChange={e => { setPartyBusInterest(e.target.checked ? "Yes" : "No") }} /></label>
          </div>

          <div className="ErrorMsg">
            <p>{ error }</p>
          </div>

          <div className="InputGroup">
            <input disabled={isBusy} className="Btn" type="submit" value="Register" />
          </div>
        </form>
        ) }
      </>
    )
  )
}

export default RegistrationForm;
