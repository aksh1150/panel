import React, { useState, useEffect } from 'react';
import './index.scss';
import axios from 'axios';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import API_URL from '../../utils/apiUrl';
import {
  Heading,
  TextInput,
  BaseLink,
  Paragraph,
} from '../../components/atoms';
import authHeader from '../../utils/jwt';
import Logout from '../../utils/logout';
import { Buttons } from '../../components/molecules';
import Layout from '../../components/organism/Layout/Layout';

const EditContact = ({ history, match }) => {
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  const emailREGX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const phoneREGX = /^\d+$/;

  const [name, setName] = useState('');
  // const [ctype, setCtype] = useState('');
  // const [op, setOp] = useState('');

  const [open, setOpen] = useState(false);
  const [forgotStatus, setForgotStatus] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [alertType, setAlertType] = useState('error');

  const [messageEmail, setMessageEmail] = useState('');
  const [isEmail, setIsEmail] = useState(false);

  const [isEdit, setIsEdit] = useState(true);

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
    abc: '',
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

    axios
      .get(`${API_URL}customer/getCustomer/${match.params.id}`, {
        headers: authHeader(),
      })
      .then(
        res => {
          if (res.status === 200) {
            console.log(res);
            if (res.data.message == 'invalid token') {
              Logout();
              return history.push('/');
            } else {
              const {
                firstname,
                lastname,
                address,
                apt,
                birth_date,
                city,
                contact_type,
                email,
                phone,
                source,
                state,
                zipcode,
              } = res.data[0];
              //      console.log('RES: ', res.data[0]);
              const d = new Date(birth_date);
              const yyyy = d.getFullYear();
              const mm = ('0' + (d.getMonth() + 1)).slice(-2);
              const dd = ('0' + d.getDate()).slice(-2);

              const newDate = `${yyyy}-${mm}-${dd}`;
              setCustomerData({
                fname: firstname,
                lname: lastname,
                cemail: email,
                cphone: phone,
                bday: newDate,
                street: address,
                apt: apt,
                city: city,
                state: state,
                zcode: zipcode,
                abc: contact_type,
              });
              // setOp(source);
              // setCtype(contact_type);
              // console.log(customerData.abc);
              // console.log(customerData.fname);
            }
          }
        },
        error => {
          if (error.response.status === 401) {
            return history.push('/contact');
          } else {
            setOpen(false);
          }
        },
      );
  }, []);

  // const soptions = [{}];

  const save = async e => {
    e.preventDefault();
    setIsEdit(true);
    // console.log(match.params.id);
    // console.log('in');
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
    // console.log(ctype);
    if (!fname && !lname && !cemail && !cphone && !street && !city && !zcode) {
      displayErrors('Fields cannot be empty!');
    } else if (!cemail.match(emailREGX)) {
      displayErrors('Please enter valid email!');
    } else if (!zcode.match(phoneREGX)) {
      displayErrors('Please enter valid input! Zip Code only accept number.');
    } else {
      //  console.log('CTYPE: ', ctype);
      //  const ctypes = ctype.value ? ctype.value : ctype;

      //   const ops = 'Website';
      await axios
        .put(`${API_URL}customer/editCustomer/${match.params.id}`, {
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
          // ctypes,
          //    ops,
        })
        .then(
          cusResponse => {
            // console.log(cusResponse);
            if (cusResponse.status === 200) {
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
      .then(response => {
        setMessageEmail(response.data.message);
        setIsEmail(response.data.isEmail);
      });
  };

  const edit = () => {
    //
    setIsEdit(false);
  };

  // const {
  //   fname,
  //   lname,
  //   cemail,
  //   cphone,
  //   bday,
  //   street,
  //   apt,
  //   city,
  //   state,
  //   zcode,
  //   abc,
  // } = customerData;
  // console.log(customerData);
  const pageContent = (
    <>
      <Layout isLogin userName={name}>
        <Container maxWidth="lg">
          <Grid container spacing={3} justify="center" alignItems="center">
            <Grid item md={6} sm={12} xs={12}>
              <Heading type="h3">
                {isEdit ? '' : 'Edit'} Contact Information
              </Heading>
            </Grid>
            <Grid item md={3} sm={6} xs={12}>
              {isEdit ? (
                <Buttons clickEvent={edit}>Edit Contact</Buttons>
              ) : (
                <Buttons clickEvent={save}>Save Contact</Buttons>
              )}
            </Grid>
            <Grid item md={3} sm={6} xs={12}>
              <Paragraph>
                <BaseLink link="/contact" internal>
                  Cancel
                </BaseLink>
              </Paragraph>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item lg={6} md={12} sm={12} xs={12}>
              <TextInput
                type="text"
                placeholder={isEdit ? '' : 'Alex'}
                label="First Name"
                inlineLabel
                className={isEdit ? 'editText' : ''}
                defaultValue={customerData.fname}
                error={!!forgotStatus}
                onChange={e => {
                  setCustomerData({
                    ...customerData,
                    fname: e.target.value,
                  });
                  removeErrors();
                }}
                disabled={isEdit}
              />
              <TextInput
                type="text"
                placeholder={isEdit ? '' : 'Rilakuma'}
                label="Last Name"
                inlineLabel
                className={isEdit ? 'editText' : ''}
                defaultValue={customerData.lname}
                error={!!forgotStatus}
                onChange={e => {
                  setCustomerData({
                    ...customerData,
                    lname: e.target.value,
                  });
                  removeErrors();
                }}
                disabled={isEdit}
              />
              <TextInput
                type="email"
                placeholder={isEdit ? '' : 'alex@google.com'}
                label="Email"
                inlineLabel
                className={isEdit ? 'editText' : ''}
                defaultValue={customerData.cemail}
                error={!!forgotStatus}
                onChange={e => {
                  setCustomerData({
                    ...customerData,
                    cemail: e.target.value,
                  });
                  removeErrors();
                }}
                change={checkEmail}
                disabled={isEdit}
              />

              <TextInput
                type="text"
                placeholder={isEdit ? '' : '(415)099-1212'}
                label="Phone"
                inlineLabel
                className={isEdit ? 'editText' : ''}
                defaultValue={customerData.cphone}
                error={!!forgotStatus}
                onChange={e => {
                  setCustomerData({
                    ...customerData,
                    cphone: e.target.value,
                  });
                  removeErrors();
                }}
                disabled={isEdit}
              />
              <TextInput
                type="date"
                label="Birthday"
                inlineLabel
                className={isEdit ? 'editText' : ''}
                defaultValue={customerData.bday}
                error={!!forgotStatus}
                onChange={e => {
                  setCustomerData({
                    ...customerData,
                    bday: e.target.value,
                  });
                  removeErrors();
                }}
                disabled={isEdit}
              />

              {/* <Dropdown
                options={Options}
                onChange={setCtype}
                value={ctype}
                className={isEdit ? 'editText' : ''}
                defaultValue={ctype}
                label="Contact Type"
                inlineLabel
                disabled={isEdit}
                placeholder="Please select your option"
              /> */}
              {/* <Dropdown
                options={soptions}
                onChange={setOp}
                value={op}
                className={isEdit ? 'editText' : ''}
                defaultValue={customerData.op}
                label="Source"
                inlineLabel
                disabled={isEdit}
              /> */}
            </Grid>
            <Grid item lg={6} md={12} sm={12} xs={12}>
              <TextInput
                type="text"
                placeholder={isEdit ? '' : '1101 San Pablo Ave'}
                label="Street"
                inlineLabel
                className={isEdit ? 'editText' : ''}
                defaultValue={customerData.street}
                error={!!forgotStatus}
                onChange={e => {
                  setCustomerData({
                    ...customerData,
                    street: e.target.value,
                  });
                  removeErrors();
                }}
                disabled={isEdit}
              />
              <TextInput
                type="text"
                placeholder={isEdit ? '' : '19'}
                label="Apt"
                defaultValue={customerData.apt}
                className={isEdit ? 'editText' : ''}
                inlineLabel
                onChange={e =>
                  setCustomerData({ ...customerData, apt: e.target.value })
                }
                disabled={isEdit}
              />
              <TextInput
                type="text"
                placeholder={isEdit ? '' : 'San Jose'}
                label="City"
                inlineLabel
                className={isEdit ? 'editText' : ''}
                defaultValue={customerData.city}
                error={!!forgotStatus}
                onChange={e => {
                  setCustomerData({ ...customerData, city: e.target.value });
                  removeErrors();
                }}
                disabled={isEdit}
              />
              <TextInput
                type="text"
                placeholder={isEdit ? '' : 'CA'}
                label="State"
                inlineLabel
                className={isEdit ? 'editText' : ''}
                defaultValue={customerData.state}
                onChange={e =>
                  setCustomerData({ ...customerData, state: e.target.value })
                }
                disabled={isEdit}
              />
              <TextInput
                type="text"
                placeholder={isEdit ? '' : '95340'}
                label="Zip Code"
                inlineLabel
                className={isEdit ? 'editText' : ''}
                defaultValue={customerData.zcode}
                error={!!forgotStatus}
                onChange={e => {
                  setCustomerData({ ...customerData, zcode: e.target.value });
                  removeErrors();
                }}
                disabled={isEdit}
              />
            </Grid>
          </Grid>
          <Grid container className="gridTopMargin">
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
export default withRouter(EditContact);
