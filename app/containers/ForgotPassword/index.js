import React, { useState } from 'react';

import axios from 'axios';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { withRouter } from 'react-router-dom';
import Cookies from 'js-cookie';
import OtpInput from 'react-otp-input';
import Layout from '../../components/organism/Layout/Layout';

import { Buttons } from '../../components/molecules';
import {
  Heading,
  TextInput,
  BaseLink,
  Paragraph,
} from '../../components/atoms';
import './index.scss';
import RandomNumber from '../../utils/randomNumber';
import cookiesExpiration from '../../utils/cookie';

import Popup from '../../components/organism/Popup/Popup';

import API_URL from '../../utils/apiUrl';

// const API_URL = 'http://localhost:8081/api/';

const ForgotPassword = ({ history }) => {
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  const [email, setEmail] = useState('');
  const [open, setOpen] = useState(false);
  const [forgotStatus, setForgotStatus] = useState(false);
  const [forgotMsg, setForgotMsg] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [otp, setOtp] = useState('');
  const [otperror, setOtpError] = useState(false);

  const sendPassCode = () => {
    setForgotMsg('');
    setForgotStatus(false);
    setOpen(false);

    const PassCode = RandomNumber(6);

    axios
      .post(`${API_URL}auth/forgotPass`, {
        email,
        PassCode,
      })
      .then(resp => {
        if (resp.status === 401) {
          setForgotMsg('There is problem to send code.');
          setForgotStatus(true);
          setOpen(true);
          return;
        }
        Cookies.set('forgot-passcode', resp.data.encryptedPassCode, {
          expires: cookiesExpiration(15),
        });
        Cookies.set('forgot-email', email, {
          expires: cookiesExpiration(15),
        });
      });
  };

  const forgot = async e => {
    e.preventDefault();
    if (!email) {
      setForgotMsg('Please enter your email.');
      setForgotStatus(true);
      setOpen(true);
      return;
    }
    await axios
      .post(`${API_URL}auth/checkEmail`, {
        email,
      })
      .then(response => {
        if (response.data.isEmail === false) {
          setForgotMsg(
            'Your email is not found in our database please register first.',
          );
          setForgotStatus(true);
          setOpen(true);

          return;
        }
        if (response.data.isEmail === true) {
          setIsDialogOpen(true);
          sendPassCode();
        }
      });
  };
  const handleClose = () => {
    setIsDialogOpen(false);
  };

  const submitPassCode = async () => {
    const getCookies = Cookies.get('forgot-passcode');

    await axios
      .post(`${API_URL}auth/matchCode`, {
        otp,
        getCookies,
      })
      .then(matchCode => {
        if (matchCode.data === false) {
          setForgotMsg('You have entered wrong passcode.');
          setOtpError(true);
          setOpen(true);
          return;
        }
        setForgotMsg('');
        setOtpError(false);
        setOpen(false);
        history.push('/reset');
      });
  };

  const resendCode = () => {
    setOtpError(false);
    setOtp('');
    sendPassCode();
  };

  return (
    <>
      <Layout>
        {isDialogOpen ? (
          <Popup
            title="We sent a code to your email (please check your junk mail, too)."
            subtitle="Enter the code below:"
            isDialogOpen={isDialogOpen}
            closeDialog={handleClose}
          >
            <Container maxWidth="lg">
              <Grid container spacing={10} alignItems="center" justify="center">
                <Grid item xs={12}>
                  <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    separator={<span> </span>}
                    hasErrored={otperror}
                    errorStyle="otpError"
                    autoFocus
                    isInputNum
                    shouldAutoFocus
                    inputStyle="verification"
                  />
                </Grid>

                <Grid item sm={6} xs={12}>
                  <Buttons clickEvent={submitPassCode}>Submit</Buttons>
                </Grid>
                <Grid item sm={6} xs={12}>
                  <BaseLink clickEvent={resendCode}>Resend code</BaseLink>
                </Grid>
              </Grid>
            </Container>
          </Popup>
        ) : (
          ''
        )}

        <Container maxWidth="lg">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Heading type="h3">Forgot your password?</Heading>
            </Grid>

            <Grid item xs={12}>
              <form className="login">
                <Grid item md={4} sm={5} xs={12}>
                  <TextInput
                    type="text"
                    placeholder="Email Address"
                    error={!!forgotStatus}
                    label="Don't worry. Enter your email to reset your password."
                    onChange={e => {
                      setEmail(e.target.value);
                      setForgotStatus(false);
                      setOpen(false);
                    }}
                  />
                </Grid>

                <br />
                <Buttons clickEvent={forgot}>Reset Password</Buttons>
              </form>
            </Grid>
            <Grid item xs={12}>
              <Snackbar open={open} autoHideDuration={1000}>
                <Alert severity="error">{forgotMsg}</Alert>
              </Snackbar>
            </Grid>
            <Grid item md={3} sm={4} xs={6}>
              <Paragraph>
                <BaseLink link="/" internal>
                  Sign In
                </BaseLink>
              </Paragraph>
            </Grid>
            <Grid item md={3} sm={4} xs={6}>
              <Paragraph>
                <BaseLink link="/" internal>
                  Cancel
                </BaseLink>
              </Paragraph>
            </Grid>
          </Grid>
        </Container>
      </Layout>
    </>
  );
};
export default withRouter(ForgotPassword);
