import React, { useState } from 'react';

import axios from 'axios';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { withRouter } from 'react-router-dom';
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

const HomePage = props => {
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  const [newUserName, setNewUserName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [open, setOpen] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);
  const [loginMsg, setLoginMsg] = useState('');
  const login = e => {
    e.preventDefault();
    axios
      .post(`${API_URL}auth/login`, {
        email: newUserName,
        password: newPassword,
      })
      .then(response => {
        if (response.data.message) {
          setLoginStatus(true);
          setLoginMsg(response.data.message);
          setOpen(true);
        } else {
          localStorage.setItem(
            'caribou-advisor',
            JSON.stringify(response.data),
          );

          props.history.push('/user');
        }
      });
  };
  return (
    <>
      <Layout>
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Heading type="h3">Advisor Sign In</Heading>
            </Grid>

            <Grid item xs={12}>
              <form className="login">
                <div>
                  <TextInput
                    type="text"
                    placeholder="Email Address"
                    error={!!loginStatus}
                    label="Email Address:"
                    onChange={e => {
                      setNewUserName(e.target.value);
                      setLoginStatus(false);
                      setOpen(false);
                    }}
                  />
                </div>
                <div>
                  <TextInput
                    type="password"
                    placeholder="Password"
                    label="Password:"
                    error={!!loginStatus}
                    onChange={e => {
                      setNewPassword(e.target.value);
                      setLoginStatus(false);
                      setOpen(false);
                    }}
                  />
                </div>
                <br />
                <Buttons clickEvent={login}>Login</Buttons>
              </form>
            </Grid>
            <Grid item xs={12}>
              <Snackbar open={open} autoHideDuration={1000}>
                <Alert severity="error">{loginMsg}</Alert>
              </Snackbar>
            </Grid>
            <Grid item xs={12}>
              <Paragraph>
                <BaseLink link="/forgotpassword" internal>
                  Forget Password
                </BaseLink>
              </Paragraph>

              <Paragraph>To become a Caribou advisor,</Paragraph>

              <Paragraph>
                please{' '}
                <BaseLink link="/login" internal>
                  contact us
                </BaseLink>
                .
              </Paragraph>
            </Grid>
          </Grid>
        </Container>
      </Layout>
    </>
  );
};
export default withRouter(HomePage);
