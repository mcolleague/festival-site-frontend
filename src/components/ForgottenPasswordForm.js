import React, { useState } from 'react';
import { forgottenPasswordURL } from '../helpers/api';
import { Link } from 'react-router-dom';
import arrowRight from '../ArrowRight.svg';

function ForgottenPasswordForm(props) {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const sendPasswordResetLink = () => {
    setIsLoading(true);

    fetch(forgottenPasswordURL, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
      		email: email,
      		username: email
      })
    })
    .then(function(response){ return response.json() })
    .then(function(result){
      if (result.data.status !== 200) {
         setError("No account was found for this email.");
         setIsLoading(false);
       } else {
         setError("");
         setIsSubmitted(true);
         setIsLoading(false);
       }
    })
    // .catch(error => { setError("No account was found for this email.") })
  }

  const handleSubmit = (e) => {
      e.preventDefault();
      sendPasswordResetLink();
  }

  const BackLink = () => {
    return (
      <Link className="Link --hasArrow hide-sm" to="/home"><span className="Arrow --left"><img alt="" src={arrowRight}/></span></Link>
    )
  }

  return (
    <>
      <h1 className="InnerPage--title"><BackLink /> Forgotten Password</h1>
      { isSubmitted ? (
        <p>A password reset link has been sent to you. Remember to check your junk folder!</p>
      ) : (
        <>
        <p>Please enter your email address below.</p>
        <form onSubmit={handleSubmit}>
          <div className="InputGroup">
            <label>Email: <input type="email" required value={email} onChange={e => setEmail(e.target.value)} /></label>
          </div>

          <div className="ErrorMsg">
            <p>{ isLoading ? 'Checking for account...' : error }</p>
          </div>

          <div className="InputGroup">
            <input className="Btn" type="submit" value="Submit" />
          </div>
        </form>
        </>
      )}
    </>
  )
}

export default ForgottenPasswordForm;
