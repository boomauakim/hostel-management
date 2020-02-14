import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  Button, Icon, Input, Modal,
} from 'antd';

import CloseIcon from '../assets/icons/times-circle-light.svg';

const LoginContainer = styled.div`
  padding: 50px 10px 10px 10px;

  .ant-input-affix-wrapper .ant-input:not(:first-child) {
    padding-left: 35px;
  }
`;

const InputContainer = styled.div`
  padding-bottom: 20px;
`;

const Hr = styled.div`
  border-bottom: 1px solid #ebebeb;
  margin: 20px 0px 15px 0px;
`;

const SignupText = styled.span`
  color: #1890ff;
  font-weight: bold;
  cursor: pointer;
`;

class LoginModal extends Component {
  render() {
    const { visible } = this.props;

    return (
      <Modal
        centered
        visible={visible}
        footer={null}
        closeIcon={<img src={CloseIcon} width="25px" alt="close-icon" />}
      >
        <LoginContainer>
          <InputContainer>
            <Input
              size="large"
              placeholder="Email address"
              prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
            />
          </InputContainer>
          <InputContainer>
            <Input.Password
              size="large"
              placeholder="Password"
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            />
          </InputContainer>
          <Button block type="primary" size="large"><b>Login</b></Button>
          <Hr />
          <div>
            Don&apos;t have an account?&nbsp;&nbsp;
            <SignupText>Sign up</SignupText>
          </div>
        </LoginContainer>
      </Modal>
    );
  }
}

LoginModal.propTypes = {
  visible: PropTypes.bool.isRequired,
};

export default LoginModal;
