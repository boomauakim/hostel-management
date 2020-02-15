import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export const ClientContext = React.createContext({
  token: '',
  setToken: () => null
});

export const ClientProvider = ({ children }) => {
  const initialToken = localStorage.getItem('token') ?? '';
  const [token, setToken] = useState(initialToken);

  useEffect(() => {
    if (token !== localStorage.getItem('token')) {
      localStorage.setItem('token', token);
    }
  }, [token]);

  return (
    <ClientContext.Provider value={{ token, setToken }}>
      {children}
    </ClientContext.Provider>
  );
};

ClientProvider.propTypes = {
  children: PropTypes.node.isRequired
};
