import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { tokenURL } from '../helpers/api';
import axios from 'axios';
import arrowRight from '../ArrowRight.svg';

function LoginForm(props) {
  const { setToken, isRestrictedContent } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
      e.preventDefault();
      getToken();
  }

  const getToken = () => {
    setIsLoading(true);

    axios.post(tokenURL, {
      email: email,
      username: email,
      password: password
    })
    .then(response => {
      setIsSubmitted(true);
      setToken(response.data.token);
      setIsLoading(false);
    })
    .catch(error => {
      setError("No account was found for this email and password.");
      setIsLoading(false);
    });
  }

  const BackLink = () => {
    return (
      <Link className="Link --hasArrow hide-sm" to="/home"><span className="Arrow --left"><img alt="" src={arrowRight}/></span></Link>
    )
  }

  return (
    <>
      { !isSubmitted && (
        <>
        <h1 className="InnerPage--title"><BackLink /> Login</h1>
        { isRestrictedContent ? <p>Please login to view this content. </p> : <p>Login below, or <strong><Link to="/register">create an account</Link></strong> to reserve a place.</p> }
        <form onSubmit={handleSubmit}>
          <div className="InputGroup">
            <label>Email: <input type="email" required value={email} onChange={e => setEmail(e.target.value)} /></label>
          </div>
          <div className="InputGroup">
            <label>Password: <input id="password" type="password" required value={password} onChange={e => { setPassword(e.target.value); }} /></label>
          </div>

          <div className="ErrorMsg">
            <p>{ isLoading ? 'Checking your details...' : error }</p>
          </div>

          <div className="InputGroup">
            <input className="Btn" type="submit" value="Login" disabled={isLoading}/>
          </div>
        </form>
        <br/>
        <Link to="/forgottenpassword">Forgot your password?</Link>
        </>
      )}
    </>
  )
}

export default LoginForm;
