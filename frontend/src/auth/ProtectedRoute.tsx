import React, { useContext } from 'react';
import { redirect } from 'react-router-dom';

const ProtectedRoute = ({
  isProtected,
  children,
}) => {
  const { isLoggedIn } = useContext(AuthState);

  if (isProtected && !isLoggedIn) {
    return redirect('/login')
  }

  return children
};

export default ProtectedRoute;