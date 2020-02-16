import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Alert, Button, Icon, Input, Form, Modal } from 'antd';
import { Formik, Form as FormikForm } from 'formik';
import * as Yup from 'yup';

import CloseIcon from '../assets/icons/times-circle-light.svg';
import { ClientContext } from '../contexts/ClientContext';
import { login } from '../services/auth';

const LoginContainer = styled.div`
  padding: 50px 10px 10px 10px;

  .ant-input-affix-wrapper .ant-input:not(:first-child) {
    padding-left: 35px;
  }
`;

const AlertContainer = styled.div`
  margin-bottom: 25px;
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

const LoginModal = props => {
  const client = useContext(ClientContext);
  const [error, setError] = useState(false);
  const { handleChangeModal, handleVisible, signupSuccess, visible } = props;
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email is invalid.')
      .required('Email is required.'),
    password: Yup.string().required('Password is required.')
  });

  return (
    <Modal
      centered
      visible={visible}
      footer={null}
      closeIcon={<img src={CloseIcon} width="25px" alt="close-icon" />}
      onCancel={() => {
        handleVisible(false);
      }}
    >
      <LoginContainer>
        {signupSuccess && (
          <AlertContainer>
            <Alert message="Sign up success." type="success" showIcon />
          </AlertContainer>
        )}
        {error && (
          <AlertContainer>
            <Alert
              message="Error, Please check your email or password and try again later."
              type="error"
              showIcon
            />
          </AlertContainer>
        )}
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={values => {
            login(values)
              .then(res => {
                client.setToken(res.data.access_token);
                handleVisible(false);
              })
              .catch(() => {
                setError(true);
              });
          }}
        >
          {({ errors, touched, handleBlur, handleChange, values }) => (
            <FormikForm>
              <Form.Item
                validateStatus={
                  errors.email && touched.email ? 'error' : 'success'
                }
                help={errors.email && touched.email ? errors.email : null}
              >
                <Input
                  name="email"
                  size="large"
                  placeholder="Email address"
                  value={values.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  prefix={
                    <Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                />
              </Form.Item>
              <Form.Item
                validateStatus={
                  errors.password && touched.password ? 'error' : 'success'
                }
                help={
                  errors.password && touched.password ? errors.password : null
                }
              >
                <Input.Password
                  name="password"
                  size="large"
                  placeholder="Password"
                  value={values.password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  prefix={
                    <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                />
              </Form.Item>
              <Form.Item>
                <Button block type="primary" size="large" htmlType="submit">
                  <b>Login</b>
                </Button>
              </Form.Item>
            </FormikForm>
          )}
        </Formik>
        <Hr />
        <div>
          Don&apos;t have an account?&nbsp;&nbsp;
          <SignupText
            onClick={() => {
              handleChangeModal('signup');
            }}
          >
            Sign up
          </SignupText>
        </div>
      </LoginContainer>
    </Modal>
  );
};

LoginModal.propTypes = {
  handleChangeModal: PropTypes.func.isRequired,
  handleVisible: PropTypes.func.isRequired,
  signupSuccess: PropTypes.bool.isRequired,
  visible: PropTypes.bool.isRequired
};

export default LoginModal;
