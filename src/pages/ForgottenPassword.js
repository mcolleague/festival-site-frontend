import React, { useEffect } from 'react';
import ForgottenPasswordForm from '../components/ForgottenPasswordForm';

function ForgottenPassword(props) {
  const { setPage } = props;

  useEffect(() => setPage('ForgottenPassword'), []);

  return (
    <ForgottenPasswordForm {...props} />
  )
}

export default ForgottenPassword;
