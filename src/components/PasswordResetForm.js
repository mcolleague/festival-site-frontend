import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { changePasswordURL } from '../helpers/api';
import { getUrlParameter } from '../helpers/functions';
import axios from 'axios';
import arrowRight from '../ArrowRight.svg';

function ResetPasswordForm(props) {
  const [email, setEmail] = useState(getUrlParameter('user'));
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isBusy, setIsBusy] = useState(false);
  const [error, setError] = useState("");
  const [key, setKey] = useState(getUrlParameter('key'));
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function changePassword() {
    axios.post(changePasswordURL, {
        email: email,
        password: password,
        confirm_password: confirmPassword,
        reset_key: key
      })
      .then(response => {
        setIsSubmitted(true);
        setIsBusy(false);
        setError("");
      })
      .catch(error => {
        setIsBusy(false);
        setError(error.response.data.message);
      });
  }

  const handleSubmit = (e) => {
      e.preventDefault();
      setIsBusy(true);
      changePassword();
  }

  const BackLink = () => {
    return (
      <Link className="Link --hasArrow hide-sm" to="/home"><span className="Arrow --left"><img src={arrowRight}/></span></Link>
    )
  }

  return (
    <>
      <h1 className="InnerPage--title"><BackLink /> Password Reset</h1>
      { isSubmitted ? (
        <p>Your password has been reset. Log in <Link to='/myaccount'><strong>here</strong></Link>.</p>
      ) : (
        <>
        <p>Please enter a new password below.</p>
        <form onSubmit={handleSubmit}>
          <div className="InputGroup">
            <label>Password: <input id="password" type="password" required value={password} onChange={e => { setPassword(e.target.value); }} /></label>
          </div>
          <div className="InputGroup">
            <label>Confirm password: <input id="confirm_password" type="password" required value={confirmPassword} onChange={e => { setConfirmPassword(e.target.value); }} /></label>
          </div>

          <div className="ErrorMsg">
            <p>{ isBusy ? 'Verifying...' : error }</p>
          </div>

          <div className="InputGroup">
            <input disabled={isBusy} className="Btn" type="submit" value="Reset password" />
          </div>
        </form>
        </>
      )}
    </>
  )
}

export default ResetPasswordForm;
