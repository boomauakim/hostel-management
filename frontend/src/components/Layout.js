import React, { Component } from 'react';
import PropTypes from 'prop-types';

import NavBar from './NavBar';

class Layout extends Component {
  render() {
    const { children } = this.props;

    return (
      <>
        <NavBar />
        <>{children}</>
      </>
    );
  }
}


Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Layout;
