import React from 'react';
import PropTypes from 'prop-types';

import NavBar from './NavBar';

const Layout = ({ children }) => (
  <>
    <NavBar />
    <>{children}</>
  </>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired
};
export default Layout;
