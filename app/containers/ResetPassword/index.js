import React, { useState } from 'react';

import axios from 'axios';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { withRouter } from 'react-router-dom';
import Cookies from 'js-cookie';
import Layout from '../../components/organism/Layout/Layout';

import { Buttons } from '../../components/molecules';
import {
  Heading,
  TextInput,
  BaseLink,
  Paragraph,
} from '../../components/atoms';
import './index.scss';

import API_URL from '../../utils/apiUrl';

const ResetPassword = () => {
  const [open, setOpen] = useState(false);
  const [forgotStatus, setForgotStatus] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [success, setSuccess] = useState(false);

  const displayErrors = errorText => {
    setErrorMsg(errorText);
    setOpen(true);
    setForgotStatus(true);
    return;
  };

  const REGEX = '^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+*!=]).*$';
  const reset = async e => {
    e.preventDefault();
    if (password.length === 0 || confirmPassword.length === 0) {
      displayErrors('These fields cannot be empty!');
    } else if (password !== confirmPassword) {
      displayErrors('Password and Confirm password do not match!');
    } else if (password.length < 8 || confirmPassword.length < 8) {
      displayErrors('Password and Confirm password must be 8 characters long!');
    } else if (!password.match(REGEX)) {
      displayErrors(
        'Password should contain one lower case, upper case, number, and special characters.',
      );
    } else {
      const getEmail = Cookies.get('forgot-email');
      await axios
        .put(`${API_URL}auth/resetPassword`, {
          password,
          getEmail,
        })
        .then(response => {
          if (response.status === 401) {
            setErrorMsg(response.data.message);
            setOpen(true);
            setForgotStatus(true);
            return;
          }
          if (response.status === 200) {
            setSuccess(response.data.message);
            Cookies.remove('forgot-email');
            Cookies.remove('forgot-passcode');
          }
        });
    }
  };

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  return (
    <>
      <Layout>
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Heading type="h3">Reset password</Heading>
            </Grid>

            <Grid item xs={12}>
              <form className="login">
                <Grid item md={4} sm={5} xs={12}>
                  <TextInput
                    type="password"
                    placeholder="Password"
                    label="New Password."
                    error={!!forgotStatus}
                    onChange={e => {
                      setPassword(e.target.value);
                      setForgotStatus(false);
                      setOpen(false);
                      setErrorMsg('');
                    }}
                  />
                </Grid>

                <Grid item md={4} sm={5} xs={12}>
                  <TextInput
                    type="password"
                    placeholder="Re-enter Password"
                    label="Re-enter Password"
                    error={!!forgotStatus}
                    onChange={e => {
                      setConfirmPassword(e.target.value);
                      setForgotStatus(false);
                      setOpen(false);
                      setErrorMsg('');
                    }}
                  />
                </Grid>
                <br />
                <Buttons clickEvent={reset}>Set New Password</Buttons>
              </form>
            </Grid>
            <Grid item xs={12}>
              <Snackbar open={open} autoHideDuration={1000}>
                <Alert severity="error">{errorMsg}</Alert>
              </Snackbar>
            </Grid>
            {success ? (
              <Grid item md={6} sm={6} xs={12}>
                <Paragraph>
                  You have successfully change your password. Please{' '}
                  <BaseLink link="/" internal>
                    Sign In
                  </BaseLink>{' '}
                  your account.
                </Paragraph>
              </Grid>
            ) : (
              ''
            )}
          </Grid>
        </Container>
      </Layout>
    </>
  );
};
export default withRouter(ResetPassword);
