import React, { useState } from 'react';

import axios from 'axios';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { withRouter } from 'react-router-dom';
import { Buttons } from '../../components/molecules';
import Layout from '../../components/organism/Layout/Layout';
import { Heading, TextInput } from '../../components/atoms';
// eslint-disable-next-line import/no-unresolved
import './index.scss';
import API_URL from '../../utils/apiUrl';

const SignUp = () => {
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [messageEmail, setMessageEmail] = useState('');
  const [isEmail, setIsEmail] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);
  const [open, setOpen] = useState(false);
  const [registerStatus, setRegisterStatus] = useState('');

  const [errorType, setErrorType] = useState('warning');

  axios.defaults.withCredentials = true;
  const register = e => {
    e.preventDefault();
    if (isEmail) {
      return;
    }
    if ((firstName && lastName && phone && email && password).length === 0) {
      setLoginStatus(true);
      return;
    }
    setLoginStatus(false);

    axios
      .post(`${API_URL}auth/register`, {
        password,
        email,
        firstName,
        lastName,
        phone,
      })
      .then(
        response => {
          if (response.status === 200) {
            setRegisterStatus(response.data.message);
            setOpen(true);
            setErrorType('success');
          } else {
            setOpen(false);
          }
        },
        error => {
          if (error.response.status === 401) {
            setOpen(true);
            setRegisterStatus(error.response.data.message);
            setErrorType('error');
          } else {
            setOpen(false);
          }
        },
      );
  };

  const checkEmail = () => {
    axios
      .post(`${API_URL}auth/checkEmail`, {
        email,
      })
      .then(response => {
        setMessageEmail(response.data.message);
        setIsEmail(response.data.isEmail);
      });
  };
  return (
    <>
      <Layout>
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Heading type="h3">Advisor Sign Up</Heading>
            </Grid>

            <Grid item xs={12}>
              <form className="login">
                <TextInput
                  type="text"
                  placeholder="Firstname"
                  label="First Name:"
                  error={!!loginStatus}
                  onChange={e => {
                    setFirstName(e.target.value);
                  }}
                />
                <TextInput
                  type="text"
                  placeholder="Lastname"
                  label="Last Name:"
                  error={!!loginStatus}
                  onChange={e => {
                    setLastName(e.target.value);
                  }}
                />
                <TextInput
                  type="email"
                  placeholder="Email Address"
                  label="Email Address:"
                  error={!!loginStatus}
                  required
                  onChange={e => {
                    setEmail(e.target.value);
                  }}
                  change={checkEmail}
                />
                {messageEmail ? (
                  <Alert severity="warning">{messageEmail}</Alert>
                ) : (
                  ''
                )}
                <TextInput
                  type="text"
                  placeholder="Phone Number"
                  label="Phone Number:"
                  error={!!loginStatus}
                  onChange={e => {
                    setPhone(e.target.value);
                  }}
                />
                <TextInput
                  type="password"
                  placeholder="Password"
                  label="Password:"
                  error={!!loginStatus}
                  required
                  onChange={e => {
                    setPassword(e.target.value);
                  }}
                />
                <br />
                <Buttons clickEvent={register}>SignUp</Buttons>
              </form>
            </Grid>
            <Grid item xs={12}>
              <Snackbar open={open} autoHideDuration={1000}>
                <Alert severity={errorType}>{registerStatus}</Alert>
              </Snackbar>
            </Grid>
          </Grid>
        </Container>
      </Layout>
    </>
  );
};
export default withRouter(SignUp);
