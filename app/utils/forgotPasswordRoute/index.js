import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import Cookies from 'js-cookie';

const ForgotPasswordRoute = ({ component: Component, ...rest }) => {
  // Add your own authentication on the below line.
  const isForgotEmail = Cookies.get('forgot-email');

  return (
    <Route
      {...rest}
      render={props =>
        isForgotEmail ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
      }
    />
  );
};

export default ForgotPasswordRoute;
