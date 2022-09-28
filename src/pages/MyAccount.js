import React, { useEffect } from 'react';
import LoginForm from '../components/LoginForm';
import AccountDetails from '../components/AccountDetails';

function MyAccount(props) {
  const { isLoggedIn, setPage } = props;

  useEffect(() => setPage('MyAccount'), []);

  return (
    <div className="InnerPage">
      { isLoggedIn ? (
        <AccountDetails {...props} />
      ) : (
        <LoginForm {...props} />
      ) }
    </div>
  )
}

export default MyAccount;
