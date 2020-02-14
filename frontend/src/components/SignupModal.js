import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  Button, DatePicker, Icon, Input, Modal,
} from 'antd';

import CloseIcon from '../assets/icons/times-circle-light.svg';

const SignupContainer = styled.div`
  padding: 50px 10px 10px 10px;

  .ant-input-affix-wrapper .ant-input:not(:first-child) {
    padding-left: 35px;
  }
`;

const InputContainer = styled.div`
  padding-bottom: 20px;

  .ant-calendar-picker {
    width: 100%;
  }

  .ant-calendar-picker-icon  {
    left: 12px;
    right: 0px;
  }

  .ant-input-lg {
    padding: 6px 11px 6px 35px;
  }
`;

const Hr = styled.div`
  border-bottom: 1px solid #ebebeb;
  margin: 20px 0px 15px 0px;
`;

const LoginText = styled.span`
  color: #1890ff;
  font-weight: bold;
  cursor: pointer;
`;

class SignupModal extends Component {
  render() {
    const { visible } = this.props;

    return (
      <Modal
        centered
        visible={visible}
        footer={null}
        closeIcon={<img src={CloseIcon} width="25px" alt="close-icon" />}
      >
        <SignupContainer>
          <InputContainer>
            <Input
              size="large"
              placeholder="Email address"
              prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
            />
          </InputContainer>
          <InputContainer>
            <Input
              size="large"
              placeholder="First name"
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            />
          </InputContainer>
          <InputContainer>
            <Input
              size="large"
              placeholder="Last name"
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            />
          </InputContainer>
          <InputContainer>
            <DatePicker block size="large" placeholder="Birthday" />
          </InputContainer>
          <InputContainer>
            <Input.Password
              size="large"
              placeholder="Password"
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            />
          </InputContainer>
          <InputContainer>
            <Input.Password
              size="large"
              placeholder="Confirm Password"
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            />
          </InputContainer>
          <Button block type="primary" size="large"><b>Sign up</b></Button>
          <Hr />
          <div>
            Already have an account?&nbsp;&nbsp;
            <LoginText>Log in</LoginText>
          </div>
        </SignupContainer>
      </Modal>
    );
  }
}

SignupModal.propTypes = {
  visible: PropTypes.bool.isRequired,
};

export default SignupModal;
