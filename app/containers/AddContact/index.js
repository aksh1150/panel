import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import './AddContact.scss';
import axios from 'axios';
import {
  Heading,
  TextInput,
  BaseLink,
  Paragraph,
} from '../../components/atoms';

import { Buttons } from '../../components/molecules';
import Layout from '../../components/organism/Layout/Layout';
import authHeader from '../../utils/jwt';
import Logout from '../../utils/logout';

import API_URL from '../../utils/apiUrl';

const AddContact = ({ history }) => {
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const [name, setName] = useState('');

  const [open, setOpen] = useState(false);
  const [forgotStatus, setForgotStatus] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [alertType, setAlertType] = useState('error');
  const emailREGX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const phoneREGX = /^\d+$/;
  const [messageEmail, setMessageEmail] = useState('');
  const [isEmail, setIsEmail] = useState(false);
  const [customerData, setCustomerData] = useState({
    fname: '',
    lname: '',
    cemail: '',
    cphone: '',
    bday: '',
    street: '',
    apt: '',
    city: '',
    state: '',
    zcode: '',
  });

  const displayErrors = errorText => {
    setErrorMsg(errorText);
    setOpen(true);
    setForgotStatus(true);
    return;
  };

  const removeErrors = () => {
    setErrorMsg('');
    setOpen(false);
    setForgotStatus(false);
  };

  useEffect(() => {
    axios
      .get(`${API_URL}user/info`, {
        headers: authHeader(),
      })
      .then(response => {
        if (response) {
          if (response.data.message == 'invalid token') {
            Logout();
            return history.push('/');
          }
          setName(`${response.data[0].firstname} ${response.data[0].lastname}`);
        }
      });
  }, []);

  const save = async e => {
    e.preventDefault();
    if (isEmail) {
      return;
    }

    const {
      fname,
      lname,
      cemail,
      cphone,
      bday,
      street,
      apt,
      city,
      state,
      zcode,
    } = customerData;

    const advisorId = JSON.parse(localStorage.getItem('caribou-advisor'));

    if (!fname && !lname) {
      displayErrors('Fields cannot be empty!');
    } else if (!cemail.match(emailREGX)) {
      displayErrors('Please enter valid email!');
    } else if (!zcode.match(phoneREGX)) {
      displayErrors('Please enter valid input! Zip Code only accept number.');
    } else {
      await axios
        .post(`${API_URL}customer/addCustomer`, {
          fname,
          lname,
          cemail,
          cphone,
          bday,
          street,
          apt,
          city,
          state,
          zcode,
          advisorId,

          //  ops,
        })
        .then(
          cusResponse => {
            if (cusResponse.status === 200) {
              history.push(`/EditContact${cusResponse.data.uid}`);
              displayErrors(cusResponse.data.message);
              setAlertType('success');
              setForgotStatus(false);
            } else {
              setOpen(false);
            }
          },
          error => {
            if (error.response.status === 401) {
              displayErrors(error.response.data.message);
              setAlertType('error');
            } else {
              setOpen(false);
            }
          },
        );
    }
  };

  const checkEmail = () => {
    const { cemail } = customerData;
    axios
      .post(`${API_URL}customer/checkEmail`, {
        cemail,
      })
      .then(resp => {
        setMessageEmail(resp.data.message);
        setIsEmail(resp.data.isEmail);
      });
  };

  const pageContent = (
    <>
      <Layout isLogin userName={name}>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Heading type="h3">Add New Contact</Heading>
            </Grid>
            <Grid item lg={6} md={12} sm={12} xs={12}>
              <TextInput
                type="text"
                label="First Name"
                inlineLabel
                error={!!forgotStatus}
                onChange={e => {
                  setCustomerData({
                    ...customerData,
                    fname: e.target.value,
                  });
                  removeErrors();
                }}
              />
              <TextInput
                type="text"
                label="Last Name"
                inlineLabel
                error={!!forgotStatus}
                onChange={e => {
                  setCustomerData({
                    ...customerData,
                    lname: e.target.value,
                  });
                  removeErrors();
                }}
              />
              <TextInput
                type="email"
                label="Email"
                inlineLabel
                error={!!forgotStatus}
                onChange={e => {
                  setCustomerData({
                    ...customerData,
                    cemail: e.target.value,
                  });
                  removeErrors();
                }}
                change={checkEmail}
              />

              <TextInput
                type="text"
                label="Phone"
                inlineLabel
                error={!!forgotStatus}
                onChange={e => {
                  setCustomerData({
                    ...customerData,
                    cphone: e.target.value,
                  });
                  removeErrors();
                }}
              />
              <TextInput
                type="date"
                label="Birthday"
                inlineLabel
                error={!!forgotStatus}
                onChange={e => {
                  setCustomerData({
                    ...customerData,
                    bday: e.target.value,
                  });
                  removeErrors();
                }}
              />
            </Grid>
            <Grid item lg={6} md={12} sm={12} xs={12}>
              <TextInput
                type="text"
                label="Street"
                inlineLabel
                error={!!forgotStatus}
                onChange={e => {
                  setCustomerData({
                    ...customerData,
                    street: e.target.value,
                  });
                  removeErrors();
                }}
              />
              <TextInput
                type="text"
                label="Apt"
                inlineLabel
                onChange={e =>
                  setCustomerData({ ...customerData, apt: e.target.value })
                }
              />
              <TextInput
                type="text"
                label="City"
                inlineLabel
                error={!!forgotStatus}
                onChange={e => {
                  setCustomerData({ ...customerData, city: e.target.value });
                  removeErrors();
                }}
              />
              <TextInput
                type="text"
                label="State"
                inlineLabel
                onChange={e =>
                  setCustomerData({ ...customerData, state: e.target.value })
                }
              />
              <TextInput
                type="text"
                label="Zip Code"
                inlineLabel
                error={!!forgotStatus}
                onChange={e => {
                  setCustomerData({ ...customerData, zcode: e.target.value });
                  removeErrors();
                }}
              />
            </Grid>
          </Grid>
          <Grid container className="gridTopMargin">
            <Grid item sm={4} xs={12}>
              <Buttons clickEvent={save}>Save Contact</Buttons>
            </Grid>
            <Grid item sm={6} xs={12}>
              <Paragraph>
                <BaseLink link="/contact" internal>
                  Cancel
                </BaseLink>
              </Paragraph>
            </Grid>

            <Grid item xs={12}>
              {messageEmail ? (
                <Alert severity="warning" className="alt">
                  {messageEmail}
                </Alert>
              ) : (
                ''
              )}
              <Snackbar open={open} autoHideDuration={1000}>
                <Alert severity={alertType}>{errorMsg}</Alert>
              </Snackbar>
            </Grid>
          </Grid>
        </Container>
      </Layout>
    </>
  );

  return pageContent;
};
export default withRouter(AddContact);
