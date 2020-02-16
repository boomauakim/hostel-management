/* eslint-disable react/forbid-prop-types, import/no-extraneous-dependencies, no-restricted-syntax  */
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Affix, AutoComplete, Col, Icon, Input, Row } from 'antd';

import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import MountainsIcon from '../assets/icons/mountains-light.svg';
import { ClientContext } from '../contexts/ClientContext';
import { searchHostel } from '../services/hostels';

const NavBarContainer = styled.div`
  height: 70px;
  border-bottom: 1px solid #ebebeb;
  background-color: white;
`;

const MainContainer = styled.div`
  height: 70px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const LogoContainer = styled.div`
  height: 70px;
  display: flex;
  align-items: center;
`;

const LogoIcon = styled.img`
  width: 40px;
  margin: 0px 24px 0px 24px;
  cursor: pointer;
`;

const MenuContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const TextLink = styled.div`
  margin: 0px 20px;
  font-weight: bold;
  cursor: pointer;
`;

class NavBar extends Component {
  state = {
    loginModalVisible: false,
    signupModalVisible: false,
    signupSuccess: false,
    autoValue: '',
    autoSource: [],
    hostels: {}
  };

  handleLoginModalVisible = visible => {
    this.setState({ loginModalVisible: visible });
  };

  handleSignupModalVisible = visible => {
    this.setState({ signupModalVisible: visible });
  };

  handleChangeModal = (modal, options) => {
    if (modal === 'login') {
      this.setState({
        loginModalVisible: true,
        signupModalVisible: false,
        ...options
      });
    } else if (modal === 'signup') {
      this.setState({
        loginModalVisible: false,
        signupModalVisible: true
      });
    }
  };

  handleLogout = () => {
    const client = this.context;
    client.setToken('');
  };

  handleBackToHome = () => {
    const { history } = this.props;
    history.push('/');
  };

  handleMyBooking = () => {
    const { history } = this.props;
    history.push('/me/bookings');
  };

  handleSearch = () => {
    const { autoValue } = this.state;

    searchHostel(autoValue).then(({ data }) => {
      const searchResult = [];
      const hostelResult = {};

      for (const result of data.hostels) {
        searchResult.push(result.name);
        hostelResult[result.name] = result.id;
      }

      this.setState({ autoSource: searchResult, hostels: hostelResult });
    });
  };

  handleSearchTextChange = value => {
    this.setState({ autoValue: value });
  };

  handleSelectItem = value => {
    const { history } = this.props;
    const { hostels } = this.state;

    this.setState({ autoValue: '', autoSource: [] });
    history.replace(`/hostels/${hostels[value]}`);
  };

  render() {
    const client = this.context;
    const {
      loginModalVisible,
      signupModalVisible,
      signupSuccess,
      autoValue,
      autoSource
    } = this.state;

    return (
      <>
        <Affix offsetTop={0}>
          <NavBarContainer>
            <Row type="flex" align="middle">
              <Col span={12}>
                <MainContainer>
                  <LogoContainer>
                    <LogoIcon
                      src={MountainsIcon}
                      onClick={this.handleBackToHome}
                    />
                  </LogoContainer>
                  <AutoComplete
                    dropdownMatchSelectWidth={false}
                    size="large"
                    style={{ width: '350px' }}
                    placeholder="Search"
                    onSearch={this.handleSearch}
                    value={autoValue}
                    dataSource={autoSource}
                    onChange={this.handleSearchTextChange}
                    onSelect={this.handleSelectItem}
                    placeholder="Hostel Name / City"
                  >
                    <Input suffix={<Icon type="search" />} />
                  </AutoComplete>
                </MainContainer>
              </Col>
              <Col span={12}>
                <MenuContainer>
                  {client.token && (
                    <>
                      <TextLink onClick={() => this.handleMyBooking()}>
                        My Booking
                      </TextLink>
                      <TextLink onClick={() => this.handleLogout()}>
                        Log out
                      </TextLink>
                    </>
                  )}
                  {!client.token && (
                    <>
                      <TextLink
                        onClick={() => {
                          this.handleSignupModalVisible(true);
                        }}
                      >
                        Sign up
                      </TextLink>
                      <TextLink
                        onClick={() => {
                          this.handleLoginModalVisible(true);
                        }}
                      >
                        Log in
                      </TextLink>
                    </>
                  )}
                </MenuContainer>
              </Col>
            </Row>
          </NavBarContainer>
        </Affix>
        <LoginModal
          visible={loginModalVisible}
          handleVisible={this.handleLoginModalVisible}
          handleChangeModal={this.handleChangeModal}
          signupSuccess={signupSuccess}
        />
        <SignupModal
          visible={signupModalVisible}
          handleVisible={this.handleSignupModalVisible}
          handleChangeModal={this.handleChangeModal}
        />
      </>
    );
  }
}

NavBar.contextType = ClientContext;
NavBar.propTypes = {
  history: PropTypes.object.isRequired
};

export default withRouter(NavBar);
