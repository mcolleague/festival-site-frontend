import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { userURL, settingsURL } from '../helpers/api';
import { globals } from '../helpers/globals';
import { slugify } from '../helpers/functions';
import arrowRight from '../ArrowRight.svg';

function AccountDetails(props) {
  const { token, userMeta, setUserMeta } = props;
  const [registrationSettings, setRegistrationSettings] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const errorMsg = "There was a problem getting your account information. Please refresh the page.";
  const { ticketPrice, accountName, accountSortCode, accountNumber } = globals;
  const BackLink = () => {
    return (
      <Link className="Link --hasArrow hide-sm" to="/home"><span className="Arrow --left"><img src={arrowRight}/></span></Link>
    )
  }

  let {
      first_name,
      last_name,
      registration_status,
      queue_position,
      payment_code,
      payment_status,
      dietary_requirements,
      guestlist
  } = userMeta;

  let { allow_payments } = registrationSettings;
  let is_guestlist = !!guestlist && guestlist[0] === "Yes";
  let disallowPayments = 
    !is_guestlist && 
    allow_payments === "false" && 
    !!payment_status && 
    payment_status[0] === "Awaiting payment";

  useEffect(() => { if (!first_name) getUserMeta()}, []);

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

  function getUserMeta() {
    setIsLoading(true);

    axios.get(userURL, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      setUserMeta(response.data.meta);
      setIsLoading(false);
    })
    .catch(error => {
      setError(errorMsg);
      setIsLoading(false);
    });
  }

  return (
    <div className="AccountDetails Article">
      <h1 className="InnerPage--title"><BackLink /> My account</h1>
      { isLoading ? (
        <div>Loading account details...</div>
      ) : (
        <>
        { !disallowPayments && (
          <div className="Status">
            { !!registration_status && !!registration_status[0] && (
            <div className={`Status--item --${slugify(registration_status[0])}`}>{ registration_status[0].replace('ticket ', '') }</div>
            )}
            { !!payment_status && !!payment_status[0] && (
            <div className={`Status--item --${slugify(payment_status[0])}`}>{ payment_status[0].replace('payment', 'contribution').replace('Payment', 'Contribution') }</div>
            )}
          </div>
        )}

        { !!registration_status && registration_status[0] == 'In ticket queue' &&
          !!queue_position && !!queue_position[0] && (
          <p>Hi, {first_name[0]}. Unfortunately all the places are currently reserved, but you're number <strong>{queue_position[0]}</strong> in the queue. You will receive an email if you are allocated a place, so keep an eye out (including your spam folder!), or check back here at any time.</p>
        )}

        { !!payment_status && payment_status[0] == 'Issue with payment' && (
          <p>It looks like we received a contribution from you that didn't match the suggested amount. Please contact us at <strong><a href="mailto:info@hundredheads.co.uk">info@hundredheads.co.uk</a></strong>.</p>
        )}

        { !!payment_status && payment_status[0] == 'Payment received' && (
          <p>You're all set, {first_name[0]}. Keep an eye on your emails and check the <strong><a target="_blank" href="https://www.facebook.com/groups/hundredheads/">Hundred Heads Facebook group</a></strong> for updates (you may need someone to add you). See you in the dance!</p>
        )}

        { !!payment_status && payment_status[0] == 'Awaiting payment' && (
          <>

            { disallowPayments ? (
              <div className="ErrorMsg">Sorry, it is no longer possible to make a contribution to claim your place.</div>
            ) : (    
              <>      
                { !payment_code ? (
                  <p>There was an issue generating a unique membership code for you. Please contact us at <strong><a href="mailto:info@hundredheads.co.uk">info@hundredheads.co.uk</a></strong>.</p>
                ) : (
                  <>
                    <p>Hi, {first_name[0]}. Please confirm your Hundred Heads membership. Make a contribution of <strong className="text--highlight">{ticketPrice}</strong> to the account below, with your unique membership code <strong className="text--highlight">{payment_code[0]}</strong> as the reference.</p>
                    <p>Please read the information below before proceeding.</p>

                    <table>
                      <tbody>
                        <tr><td>Name: </td><td>{ accountName} </td></tr>
                        <tr><td>Account number: </td><td>{ accountNumber } </td></tr>
                        <tr><td>Sort code: </td><td>{ accountSortCode } </td></tr>
                        <tr><td>Reference: </td><td>{ payment_code[0] }</td></tr>
                        <tr><td>Amount: </td><td>{ ticketPrice} </td></tr>
                      </tbody>
                    </table>

                    <h3>Important information</h3>

                    <p>The purpose of this contribution is for friends to pool money to fund throwing a private party. All money collected will be used for this purpose only, and everyone — acts and organisers included — will be making the same contribution.</p>

                    <p>As such, this is not an exchange of goods and services, so if your bank asks you what kind of payment this is, make sure to pick 'Friends and Family' or equivalent.</p>

                    <p>If you make a contribution but cannot make the party then sadly we can’t guarantee that you’ll get your money back, but will do our best to reallocate your place. If we can reallocate your spot then your contribution will be returned.</p>

                    <p>Once you've made the transfer, refresh this page to check that your membership status has been updated. If it hasn't updated within a few minutes, or you made an error with your payment, please email us at <strong><a href="mailto:info@hundredheads.co.uk">info@hundredheads.co.uk</a></strong>.</p>
                  </>
                )}
              </>
            )}
        </>
        )}

        <div className="ErrorMsg">
          <p>{ error }</p>
        </div>
        </>
      )}
    </div>
  )
}

export default AccountDetails;
