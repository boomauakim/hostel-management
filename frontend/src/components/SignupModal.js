import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  Alert, Button, DatePicker, Form, Icon, Input, Modal,
} from 'antd';
import { Formik, Form as FormikForm } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';

import CloseIcon from '../assets/icons/times-circle-light.svg';
import { signup } from '../services/auth';

const SignupContainer = styled.div`
  padding: 50px 10px 10px 10px;

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

const LoginText = styled.span`
  color: #1890ff;
  font-weight: bold;
  cursor: pointer;
`;

class SignupModal extends Component {
  state = {
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
      birthday: '',
      password: '',
      confirmPassword: '',
    },
    error: undefined,
  }

  render() {
    const { error, initialValues } = this.state;
    const { visible, handleChangeModal, handleVisible } = this.props;
    const LoginSchema = Yup.object().shape({
      email: Yup.string().email('Email is invalid.').required('Email is required.'),
      firstName: Yup.string().required('First name is required.'),
      lastName: Yup.string().required('Last name is required.'),
      birthday: Yup.string().required('Birthday is required.'),
      password: Yup.string().required('Password is required.'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match.')
        .required('Confirm Password is required.'),
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
        <SignupContainer>
          {error && error === 'DUPLICATE_EMAIL' && (
            <AlertContainer>
              <Alert message="Email is already used. Please change email and continue." type="error" showIcon />
            </AlertContainer>
          )}
          {error && error !== 'DUPLICATE_EMAIL' && (
            <AlertContainer>
              <Alert message="Something went wrong, Please try again later." type="error" showIcon />
            </AlertContainer>
          )}
          <Formik
            initialValues={initialValues}
            validationSchema={LoginSchema}
            onSubmit={async (values, { resetForm }) => {
              const payload = { ...values };
              delete payload.confirmPassword;
              await signup(payload)
                .then(() => {
                  resetForm(initialValues);
                  handleChangeModal('login', { signupSuccess: true });
                })
                .catch((err) => {
                  const { errors } = err.response.data;
                  this.setState({ error: errors.error });
                });
            }}
          >
            {({
              errors, touched, handleBlur, handleChange, values,
            }) => (
              <FormikForm>
                <Form.Item
                  validateStatus={errors.email && touched.email ? 'error' : 'success'}
                  help={errors.email && touched.email ? errors.email : null}
                >
                  <Input
                    name="email"
                    size="large"
                    placeholder="Email address"
                    value={values.email}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  />
                </Form.Item>
                <Form.Item
                  validateStatus={errors.firstName && touched.firstName ? 'error' : 'success'}
                  help={errors.firstName && touched.firstName ? errors.firstName : null}
                >
                  <Input
                    name="firstName"
                    size="large"
                    placeholder="First name"
                    value={values.firstName}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  />
                </Form.Item>
                <Form.Item
                  validateStatus={errors.lastName && touched.lastName ? 'error' : 'success'}
                  help={errors.lastName && touched.lastName ? errors.lastName : null}
                >
                  <Input
                    name="lastName"
                    size="large"
                    placeholder="Last name"
                    value={values.lastName}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  />
                </Form.Item>
                <Form.Item
                  validateStatus={errors.birthday && touched.birthday ? 'error' : 'success'}
                  help={errors.birthday && touched.birthday ? errors.birthday : null}
                >
                  <DatePicker
                    block
                    name="birthday"
                    allowClear={false}
                    size="large"
                    value={values?.birthday ? moment(values.birthday) : null}
                    onBlur={handleBlur('birthday')}
                    // eslint-disable-next-line no-param-reassign
                    onChange={(value) => { values.birthday = value ? value.format('YYYY-MM-DD') : ''; }}
                    placeholder="Birthday"
                  />
                </Form.Item>
                <Form.Item
                  validateStatus={errors.password && touched.password ? 'error' : 'success'}
                  help={errors.password && touched.password ? errors.password : null}
                >
                  <Input.Password
                    name="password"
                    size="large"
                    placeholder="Password"
                    value={values.password}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  />
                </Form.Item>
                <Form.Item
                  validateStatus={errors.confirmPassword
                    && touched.confirmPassword ? 'error' : 'success'}
                  help={errors.confirmPassword
                    && touched.confirmPassword ? errors.confirmPassword : null}
                >
                  <Input.Password
                    name="confirmPassword"
                    size="large"
                    placeholder="Confirm Password"
                    value={values.confirmPassword}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  />
                </Form.Item>
                <Form.Item>
                  <Button block type="primary" size="large" htmlType="submit"><b>Sign up</b></Button>
                </Form.Item>
              </FormikForm>
            )}
          </Formik>
          <Hr />
          <div>
            Already have an account?&nbsp;&nbsp;
            <LoginText onClick={() => { handleChangeModal('login'); }}>Log in</LoginText>
          </div>
        </SignupContainer>
      </Modal>
    );
  }
}

SignupModal.propTypes = {
  handleChangeModal: PropTypes.func.isRequired,
  handleVisible: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default SignupModal;
