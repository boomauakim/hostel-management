import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import { ClientContext } from '../contexts/ClientContext';

const AuthRoute = ({ children }) => {
  const client = useContext(ClientContext);
  const history = useHistory();

  if (!client.token) {
    history.push('/');
  }

  return <>{children}</>;
};

AuthRoute.propTypes = {
  children: PropTypes.node
};
AuthRoute.defaultProps = {
  children: <></>
};

export default AuthRoute;
