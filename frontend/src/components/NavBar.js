/* eslint-disable react/forbid-prop-types, import/no-extraneous-dependencies */
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  Affix, AutoComplete, Col, DatePicker, Icon, Input, Row,
} from 'antd';

import MountainsIcon from '../assets/icons/mountains-light.svg';
import { ClientContext } from '../contexts/ClientContext';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';

const { RangePicker } = DatePicker;

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

const FilterContainer = styled.div`
  height: 45px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ebebeb;
  padding-left: 80px;
  background-color: white;
`;

const FilterItemContainer = styled.div`
  border: 1px solid #b1b1b1;
  border-radius: 20px;
  margin: 0px 10px;

  .ant-input {
    border: none;
  }

  .ant-calendar-picker .ant-calendar-picker-input:not(.ant-input-disabled) {
    :hover {
      border: none;
    }
  }

  .ant-calendar-picker:focus
    .ant-calendar-picker-input:not(.ant-input-disabled) {
    border: none;
    outline: 0;
    -webkit-box-shadow: none;
    box-shadow: none;
  }
`;

const FilterItem = styled.div`
  padding: 5px 15px;
  color: #484848;
`;

class NavBar extends Component {
  state = {
    loginModalVisible: false,
    signupModalVisible: false,
    signupSuccess: false,
  }

  handleLoginModalVisible = (visible) => {
    this.setState({ loginModalVisible: visible });
  }

  handleSignupModalVisible = (visible) => {
    this.setState({ signupModalVisible: visible });
  }

  handleChangeModal = (modal, options) => {
    if (modal === 'login') {
      this.setState({
        loginModalVisible: true,
        signupModalVisible: false,
        ...options,
      });
    } else if (modal === 'signup') {
      this.setState({
        loginModalVisible: false,
        signupModalVisible: true,
      });
    }
  }

  handleLogout = () => {
    const client = this.context;
    client.setToken('');
  }

  render() {
    const client = this.context;
    const { location } = this.props;
    const {
      loginModalVisible, signupModalVisible, signupSuccess,
    } = this.state;

    return (
      <>
        <Affix offsetTop={0}>
          <NavBarContainer>
            <Row type="flex" align="middle">
              <Col span={12}>
                <MainContainer>
                  <LogoContainer>
                    <LogoIcon src={MountainsIcon} />
                  </LogoContainer>
                  <AutoComplete
                    dropdownMatchSelectWidth={false}
                    size="large"
                    style={{ width: '350px' }}
                    placeholder="Search"
                  >
                    <Input suffix={<Icon type="search" />} />
                  </AutoComplete>
                </MainContainer>
              </Col>
              <Col span={12}>
                <MenuContainer>
                  {client.token && (
                    <>
                      <TextLink>My Booking</TextLink>
                      <TextLink onClick={() => this.handleLogout()}>Log out</TextLink>
                    </>
                  )}
                  {!client.token && (
                    <>
                      <TextLink
                        onClick={() => { this.handleSignupModalVisible(true); }}
                      >
                        Sign up
                      </TextLink>
                      <TextLink
                        onClick={() => { this.handleLoginModalVisible(true); }}
                      >
                        Log in
                      </TextLink>
                    </>
                  )}
                </MenuContainer>
              </Col>
            </Row>
          </NavBarContainer>
          {(location.pathname === '/' || location.pathname === '/hostels') && (
          <FilterContainer>
            <FilterItemContainer>
              <FilterItem>
                <b>Available: </b>
                <RangePicker size="small" suffixIcon={<></>} allowClear={false} />
              </FilterItem>
            </FilterItemContainer>
          </FilterContainer>
          )}
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
  location: PropTypes.object.isRequired,
};

export default withRouter(NavBar);
