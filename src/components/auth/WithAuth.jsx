import React from 'react';
import { redirect } from 'react-router-dom';

// Higher Order Component for Protected Routes
const WithAuth = (WrappedComponent) => {
  return (props) => {
    const isAuthenticated = !!localStorage.getItem('userAuth');  // Simple token-based check
    console.log('Authent ', isAuthenticated)
    if (isAuthenticated) {
        console.log('if app js')

      return <WrappedComponent {...props} />;
    } else {
        console.log('else app js')
        // return <Redirect to="/login" />;
        // redirect('/login');
        window.location.href = '/login'
    }
  };
};

export default WithAuth;