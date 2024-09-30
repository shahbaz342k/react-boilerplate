import React from 'react';
import { Redirect } from 'react-router-dom';

// Higher Order Component for Protected Routes
const WithAuth = (WrappedComponent) => {
  return (props) => {
    const isAuthenticated = !!localStorage.getItem('authToken');  // Simple token-based check

    if (isAuthenticated) {
      return <WrappedComponent {...props} />;
    } else {
      return <Redirect to="/login" />;
    }
  };
};

export default WithAuth;
