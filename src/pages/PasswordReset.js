import React, { useEffect } from 'react';
import PasswordResetForm from '../components/PasswordResetForm';

function PasswordReset(props) {
  const { token, setToken, isLoggedIn, setPage } = props;

  useEffect(() => setPage('PasswordReset'), []);

  return (
    <PasswordResetForm {...props} />
  )
}

export default PasswordReset;
