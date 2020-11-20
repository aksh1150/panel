import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import green from '@material-ui/core/colors/green';
import './AddNewCase.scss';
import CloseIcon from '@material-ui/icons/Close';
import {
  Heading,
  TextInput,
  BaseLink,
  Paragraph,
  Dropdown,
} from '../../components/atoms';

import { Buttons, AccordionSingle } from '../../components/molecules';
import Layout from '../../components/organism/Layout/Layout';
import authHeader from '../../utils/jwt';
import Logout from '../../utils/logout';
import API_URL from '../../utils/apiUrl';
import RandomNumber from '../../utils/randomNumber';
import { RequestedHelp, Options } from '../../data/CaseInfo';
import Popup from '../../components/organism/Popup/Popup';

import AdvisorOption from '../../utils/getAdvisor';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: '15px',
  },
  details: {
    flexDirection: 'column',
  },
  rootCheck: {
    color: green[600],
    '&$checked': {
      color: green[500],
    },
  },
  checked: {},
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Grid p={3}>
          <Grid>{children}</Grid>
        </Grid>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const AddNewCase = ({ history }) => {
  const classes = useStyles();

  function Alert(props) {
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  const [option, setOption] = useState([]);
  const [name, setName] = useState('');
  const [userRole, setUserRole] = useState('');
  const [ctype, setCtype] = useState('');
  const [advisor, setAdvisor] = useState('');
  const [open, setOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [alertType, setAlertType] = useState('error');
  const emailREGX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const phoneREGX = /^\d+$/;
  const [messageEmail, setMessageEmail] = useState('');
  const [isEmail, setIsEmail] = useState(false);
  const [customerData, setCustomerData] = useState([]);

  const [caseName, setCaseName] = useState('');
  const [caseType, setCaseType] = useState('');
  const [details, setDetails] = useState('');

  const [isFormDisplay, setIsFormDisplay] = useState(false);

  const [value, setValue] = useState(0);
  const [caseId, setCaseId] = useState('');
  const [userId, setUserId] = useState([]);

  const [checked, setChecked] = useState(RequestedHelp);

  const [displaySave, setDisplaySave] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [existingCustomerData, setExistingCustomerData] = useState({
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

  const setUser = userRole === 2;
  // get case id from localstorage
  const getCaseId = localStorage.getItem('caribou-case-id');

  // handle checkboxes values and make an object
  const handleCheckChange = event => {
    const chke = [...checked];
    chke.forEach(ch => {
      if (ch.label === event.target.value) ch.click = event.target.checked;
    });
    setChecked(chke);
  };

  // handle new contact and existing contact tab in right panel
  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  // display error messages
  const displayErrors = errorText => {
    setErrorMsg(errorText);
    setOpen(true);
  };

  // remove error messages
  const removeErrors = () => {
    setErrorMsg('');
    setOpen(false);
  };

  const deleteContact = async contactId => {
    const newContactObject = await customerData.filter(
      e => e.userId !== contactId,
    );
    const newContactUids = await userId.filter(e => e.userId !== contactId);
    setCustomerData(newContactObject);
    setUserId(newContactUids);
  };

  const contacts = [];
  customerData.map(data => {
    contacts.push({
      id: `${data.dfname}${data.dlname}${data.userId}`,
      summary: (
        <>
          <Heading type="h4">{`${data.dfname} ${data.dlname}`}</Heading>
          <Heading type="h6">{data.demail}</Heading>
          <Heading type="h6">{data.dphone}</Heading>
          <BaseLink
            clickEvent={() => deleteContact(data.userId)}
            className="close"
          >
            <CloseIcon />
          </BaseLink>
        </>
      ),
      details: (
        <>
          <Heading type="h6">{`${data.dapt} ${data.dstreet}`}</Heading>
          <Heading type="h6">
            {`${data.dcity}, ${data.dstate} ${data.dzip}`}
          </Heading>
        </>
      ),
    });
  });

  // This displays the checkboxes
  const che = checked.map(e => (
    <FormControlLabel
      key={e.label}
      control={
        <Checkbox
          checked={e.click}
          onChange={handleCheckChange}
          value={e.label}
          name={e.label}
          classes={{
            root: classes.rootCheck,
            checked: classes.checked,
          }}
        />
      }
      label={e.label}
    />
  ));

  useEffect(() => {
    setChecked(RequestedHelp);
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
          setUserRole(response.data[0].user_role_id);
        }
      });

    axios
      .get(`${API_URL}customer/getAllCustomers`, {
        headers: authHeader(),
      })
      .then(
        async getContacts => {
          const contactLists = getContacts.data;
          for (const property in contactLists) {
            option.push({
              value: contactLists[property]._uid,
              label: `${contactLists[property].firstname} ${
                contactLists[property].lastname
              } - ${contactLists[property].phone}`,
            });
          }
        },
        error => {
          displayErrors(error);
          option.push({
            value: 'No',
            label: 'No options to select',
          });
        },
      )
      .catch(err => {
        displayErrors(err);
      });
  }, []);
  // setUser ? console.log(AdvisorOption) : 'Do not get';
  // console.log(GetAdvisor());
  const addContact = () => {
    setIsFormDisplay(false);
    setDisplaySave(false);
  };

  // Add new case
  const save = async e => {
    e.preventDefault();
    const advisorId = JSON.parse(localStorage.getItem('caribou-advisor'));
    if (!getCaseId) {
      setAlertType('error');
      displayErrors('Create at least one contact for this case!');
    } else if (!caseName && !details) {
      setAlertType('error');
      displayErrors('Case fields cannot be empty!');
    } else {
      const caseStage = caseType.value;
      const jsonCase = getCaseId;
      const newAdvisorValue = advisor.value;
      await axios
        .post(`${API_URL}customer/addCase`, {
          caseName,
          details,
          checked,
          getCaseId,
          userId,
          caseStage,
          advisorId,
          advisor,
        })
        .then(
          async caseres => {
            await axios
              .put(`${API_URL}customer/updateCaseId`, {
                userId,
                jsonCase,
                advisor,
              })
              .then(
                async userUpdates => {
                  await localStorage.removeItem('caribou-case-id');
                  await localStorage.removeItem('caribou-case-contacts');
                  setAlertType('success');
                  displayErrors(userUpdates.data.message);
                  setDisplaySave(false);
                  history.push('/cases');
                },
                errors => {
                  displayErrors(errors);
                },
              );
            await localStorage.removeItem('caribou-case-id');
            await localStorage.removeItem('caribou-case-contacts');
            setAlertType('success');
            displayErrors(caseres.data.message);
            setDisplaySave(false);
          },
          err => {
            displayErrors(err);
          },
        )
        .catch(error => {
          displayErrors(error);
        });
    }
  };

  const createCaseID = (fname, lname) => {
    const d = new Date();
    const day = `0${d.getDate()}`.slice(-2);
    const month = `0${d.getMonth() + 1}`.slice(-2);
    const cdlname = lname.substring(0, 3);
    const cdfname = fname.substring(0, 3);
    const PassCode = RandomNumber(6);
    return `${cdfname}-${cdlname}-${month}-${day}-${PassCode}`;
  };

  // Add new contact
  const add = async e => {
    e.preventDefault();
    console.log(advisor);
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
    } = existingCustomerData;
    if (isEmail) {
      return;
    }
    const getCaseId = await localStorage.getItem('caribou-case-id');

    caseId || setCaseId(createCaseID(fname, lname));

    const getLocalCaseId = getCaseId || createCaseID(fname, lname);
    const cids = caseId || getLocalCaseId;

    const advisorId = await JSON.parse(localStorage.getItem('caribou-advisor'));

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
        })
        .then(
          async cusResponse => {
            if (cusResponse.status === 200) {
              const uuid = [...userId];
              await uuid.push({ userId: cusResponse.data.uid });
              await setUserId(uuid);

              const values = [...customerData];
              await values.push({
                userId: cusResponse.data.uid,
                dfname: fname,
                dlname: lname,
                demail: cemail,
                dphone: cphone,
                dbday: bday,
                dstreet: street,
                dapt: apt,
                dcity: city,
                dstate: state,
                dzip: zcode,
                caseId: createCaseID(fname, lname),
              });
              await setCustomerData(values);
              setExistingCustomerData({
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
              setIsFormDisplay(true);
              await localStorage.setItem(
                'caribou-case-contacts',
                JSON.stringify(customerData),
              );
              await localStorage.setItem('caribou-case-id', cids);
              removeErrors();

              setDisplaySave(true);
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
        )
        .catch(err => {
          displayErrors(err);
        });
    }
  };

  // Update selected contact
  const update = async e => {
    e.preventDefault();

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
    } = existingCustomerData;

    const advisorId = JSON.parse(localStorage.getItem('caribou-advisor'));
    const caseId = createCaseID(fname, lname);
    if (!fname && !lname) {
      displayErrors('Fields cannot be empty!');
    } else if (!cemail.match(emailREGX)) {
      displayErrors('Please enter valid email!');
    } else if (!zcode.match(phoneREGX)) {
      displayErrors('Please enter valid input! Zip Code only accept number.');
    } else {
      await axios
        .put(`${API_URL}customer/editCustomer/${ctype.value}`, {
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
        })
        .then(
          async cusResponse => {
            if (cusResponse.status === 200) {
              displayErrors(cusResponse.data.message);
              setAlertType('success');
              setExistingCustomerData({
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
              // Test

              const uuid = [...userId];
              await uuid.push({ userId: ctype.value });
              await setUserId(uuid);
              const values = [...customerData];
              await values.push({
                userId: ctype.value,
                dfname: fname,
                dlname: lname,
                demail: cemail,
                dphone: cphone,
                dbday: bday,
                dstreet: street,
                dapt: apt,
                dcity: city,
                dstate: state,
                dzip: zcode,
                caseId,
              });
              await setCustomerData(values);
              setIsFormDisplay(true);
              removeErrors();
              setDisplaySave(true);
              await localStorage.setItem('caribou-case-id', caseId);
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
        )
        .catch(err => {
          displayErrors(err);
        });
    }
  };

  // Use this function in edit existing contact info. Using this we display selected contact information on the screen.
  const handle = ctype => {
    setCtype(ctype);
    axios
      .get(`${API_URL}customer/getCustomer/${ctype.value}`, {
        headers: authHeader(),
      })
      .then(
        res => {
          if (res.status === 200) {
            if (res.data.message == 'invalid token') {
              Logout();
              history.push('/');
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
              const d = new Date(birth_date);
              const yyyy = d.getFullYear();
              const mm = ('0' + (d.getMonth() + 1)).slice(-2);
              const dd = ('0' + d.getDate()).slice(-2);
              const newDate = `${yyyy}-${mm}-${dd}`;
              setExistingCustomerData({
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
              });
            }
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
            const d = new Date(birth_date);
            const yyyy = d.getFullYear();
            const mm = `0${d.getMonth() + 1}`.slice(-2);
            const dd = `0${d.getDate()}`.slice(-2);
            const newDate = `${yyyy}-${mm}-${dd}`;
            setExistingCustomerData({
              fname: firstname,
              lname: lastname,
              cemail: email,
              cphone: phone,
              bday: newDate,
              street: address,
              apt,
              city,
              state,
              zcode: zipcode,
            });
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
      )
      .catch(err => {
        displayErrors(err);
      });
  };
  const cancel = () => {
    setIsDialogOpen(true);
  };
  const notLeave = () => {
    setIsDialogOpen(false);
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const closePan = () => {
    setIsFormDisplay(true);
    setDisplaySave(true);
  };

  const RightPanel = (
    <>
      <Grid container justify="center" alignItems="center" className="paddings">
        <Grid item xs={6}>
          <Heading type="h4">Contact</Heading>
        </Grid>

        <Grid item xs={6}>
          {isFormDisplay ? (
            <Paragraph>
              <Buttons
                bg="#BED1E0"
                colour="#1946b4"
                className="addBtns"
                clickEvent={() => addContact()}
              >
                Add
              </Buttons>
            </Paragraph>
          ) : (
            ''
          )}
        </Grid>
      </Grid>

      {isFormDisplay ? (
        <Grid container spacing={3} className="paddings box">
          <div className={classes.root}>
            <AccordionSingle AccordionContents={contacts} Border Separated />
          </div>
        </Grid>
      ) : (
        <>
          <Grid container>
            <Grid item xs={12}>
              <Tabs
                value={value}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleTabChange}
                aria-label="Tabs"
              >
                <Tab label="Create New Contact" {...a11yProps(0)} />
                <Tab label="Add Existing Contact" {...a11yProps(1)} />
              </Tabs>
            </Grid>
          </Grid>
          <TabPanel value={value} index={0}>
            <Grid container className="contactForm paddings" spacing={2}>
              <Grid item xs={12}>
                <Heading type="h4">Create New Contact</Heading>
              </Grid>
              <Grid item xs={12}>
                <TextInput
                  type="text"
                  placeholder="Alex"
                  label="First Name"
                  name="fname"
                  onChange={e =>
                    setExistingCustomerData({
                      ...existingCustomerData,
                      fname: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextInput
                  type="text"
                  placeholder="Rilakuma"
                  label="Last Name"
                  name="lname"
                  onChange={e =>
                    setExistingCustomerData({
                      ...existingCustomerData,
                      lname: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextInput
                  type="email"
                  placeholder="alex@google.com"
                  label="Email"
                  name="email"
                  onChange={e =>
                    setExistingCustomerData({
                      ...existingCustomerData,
                      cemail: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextInput
                  type="text"
                  placeholder="(415)099-1212"
                  label="Phone"
                  name="phone"
                  onChange={e =>
                    setExistingCustomerData({
                      ...existingCustomerData,
                      cphone: e.target.value,
                    })
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <TextInput
                  type="date"
                  placeholder="09/09/2020"
                  label="Birthday"
                  onChange={e =>
                    setExistingCustomerData({
                      ...existingCustomerData,
                      bday: e.target.value,
                    })
                  }
                  name="bday"
                />
              </Grid>
              <Grid item xs={12}>
                <TextInput
                  type="text"
                  placeholder="1101 San Pablo Ave"
                  label="Street"
                  onChange={e =>
                    setExistingCustomerData({
                      ...existingCustomerData,
                      street: e.target.value,
                    })
                  }
                  name="street"
                />
              </Grid>
              <Grid item xs={4}>
                <TextInput
                  type="text"
                  placeholder="19"
                  label="Apt"
                  onChange={e =>
                    setExistingCustomerData({
                      ...existingCustomerData,
                      apt: e.target.value,
                    })
                  }
                  name="apt"
                />
              </Grid>
              <Grid item xs={8}>
                <TextInput
                  type="text"
                  placeholder="San Jose"
                  label="City"
                  onChange={e =>
                    setExistingCustomerData({
                      ...existingCustomerData,
                      city: e.target.value,
                    })
                  }
                  name="city"
                />
              </Grid>
              <Grid item xs={4}>
                <TextInput
                  type="text"
                  placeholder="CA"
                  label="State"
                  onChange={e =>
                    setExistingCustomerData({
                      ...existingCustomerData,
                      state: e.target.value,
                    })
                  }
                  name="state"
                />
              </Grid>
              <Grid item xs={8}>
                <TextInput
                  type="text"
                  placeholder="95340"
                  label="Zip Code"
                  onChange={e =>
                    setExistingCustomerData({
                      ...existingCustomerData,
                      zcode: e.target.value,
                    })
                  }
                  name="zcode"
                />
              </Grid>
            </Grid>
            <Grid
              container
              justify="center"
              alignItems="center"
              className="contactForm paddings"
            >
              <Grid item lg={8} md={12} sm={6} xs={12}>
                <Buttons clickEvent={add}>Create & Add</Buttons>
              </Grid>
              <Grid item lg={4} md={12} sm={6} xs={12}>
                <BaseLink clickEvent={closePan}>Close</BaseLink>
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Grid container className="contactForm paddings" spacing={2}>
              <Grid item xs={12}>
                <Heading type="h4">Add Existing Contact</Heading>
              </Grid>
              <Grid item xs={12}>
                <Dropdown options={option} onChange={handle} value={ctype} />
              </Grid>
              <Grid item xs={12}>
                <TextInput
                  type="text"
                  placeholder="Alex"
                  label="First Name"
                  name="fname"
                  onChange={e =>
                    setExistingCustomerData({
                      ...existingCustomerData,
                      fname: e.target.value,
                    })
                  }
                  defaultValue={existingCustomerData.fname}
                />
              </Grid>
              <Grid item xs={12}>
                <TextInput
                  type="text"
                  placeholder="Rilakuma"
                  label="Last Name"
                  name="lname"
                  onChange={e =>
                    setExistingCustomerData({
                      ...existingCustomerData,
                      lname: e.target.value,
                    })
                  }
                  defaultValue={existingCustomerData.lname}
                />
              </Grid>
              <Grid item xs={12}>
                <TextInput
                  type="email"
                  placeholder="alex@google.com"
                  label="Email"
                  name="email"
                  onChange={e =>
                    setExistingCustomerData({
                      ...existingCustomerData,
                      cemail: e.target.value,
                    })
                  }
                  defaultValue={existingCustomerData.cemail}
                />
              </Grid>
              <Grid item xs={12}>
                <TextInput
                  type="text"
                  placeholder="(415)099-1212"
                  label="Phone"
                  name="phone"
                  onChange={e =>
                    setExistingCustomerData({
                      ...existingCustomerData,
                      cphone: e.target.value,
                    })
                  }
                  defaultValue={existingCustomerData.cphone}
                />
              </Grid>
              <Grid item xs={12}>
                <TextInput
                  type="date"
                  placeholder="09/09/2020"
                  label="Birthday"
                  onChange={e =>
                    setExistingCustomerData({
                      ...existingCustomerData,
                      bday: e.target.value,
                    })
                  }
                  name="bday"
                  defaultValue={existingCustomerData.bday}
                />
              </Grid>
              <Grid item xs={12}>
                <TextInput
                  type="text"
                  placeholder="1101 San Pablo Ave"
                  label="Street"
                  onChange={e =>
                    setExistingCustomerData({
                      ...existingCustomerData,
                      street: e.target.value,
                    })
                  }
                  name="street"
                  defaultValue={existingCustomerData.street}
                />
              </Grid>
              <Grid item xs={4}>
                <TextInput
                  type="text"
                  placeholder="19"
                  label="Apt"
                  onChange={e =>
                    setExistingCustomerData({
                      ...existingCustomerData,
                      apt: e.target.value,
                    })
                  }
                  name="apt"
                  defaultValue={existingCustomerData.apt}
                />
              </Grid>
              <Grid item xs={8}>
                <TextInput
                  type="text"
                  placeholder="San Jose"
                  label="City"
                  onChange={e =>
                    setExistingCustomerData({
                      ...existingCustomerData,
                      city: e.target.value,
                    })
                  }
                  name="city"
                  defaultValue={existingCustomerData.city}
                />
              </Grid>
              <Grid item xs={4}>
                <TextInput
                  type="text"
                  placeholder="CA"
                  label="State"
                  onChange={e =>
                    setExistingCustomerData({
                      ...existingCustomerData,
                      state: e.target.value,
                    })
                  }
                  name="state"
                  defaultValue={existingCustomerData.state}
                />
              </Grid>
              <Grid item xs={8}>
                <TextInput
                  type="text"
                  placeholder="95340"
                  label="Zip Code"
                  onChange={e =>
                    setExistingCustomerData({
                      ...existingCustomerData,
                      zcode: e.target.value,
                    })
                  }
                  name="zcode"
                  defaultValue={existingCustomerData.zcode}
                />
              </Grid>
            </Grid>
            <Grid
              container
              justify="center"
              alignItems="center"
              className="contactForm paddings"
            >
              <Grid item lg={8} md={12} sm={6} xs={12}>
                <Buttons clickEvent={update}>Add</Buttons>
              </Grid>
              <Grid item lg={4} md={12} sm={6} xs={12}>
                <BaseLink clickEvent={closePan}>Cancel</BaseLink>
              </Grid>
            </Grid>
          </TabPanel>
        </>
      )}
    </>
  );
  // display advisor drop-down if super admin found
  const isSuperAdmin = setUser ? (
    <Dropdown
      options={AdvisorOption}
      onChange={setAdvisor}
      value={advisor}
      label="Advisor"
      inlineLabel
    />
  ) : (
    ''
  );
  const pageContent = (
    <>
      <Layout isLogin userName={name}>
        {isDialogOpen ? (
          <Popup
            title="Do you want to leave without saving?"
            isDialogOpen={isDialogOpen}
            closeDialog={notLeave}
          >
            <Container maxWidth="lg">
              <Grid container spacing={10} alignItems="center">
                <Grid item sm={6} xs={12}>
                  <Buttons clickEvent={notLeave}>No</Buttons>
                </Grid>
                <Grid item sm={6} xs={12}>
                  <BaseLink link="/cases" internal>
                    Yes, leave
                  </BaseLink>
                </Grid>
              </Grid>
            </Container>
          </Popup>
        ) : (
          ''
        )}

        <form>
          <Grid container spacing={3} justify="center" alignItems="center" />
          <Grid container spacing={3}>
            <Grid item lg={9} md={8} xs={12} className="mainPanelHEad">
              <Container>
                <Grid
                  container
                  spacing={4}
                  justify="center"
                  alignItems="center"
                >
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Heading type="h3">Add New Case</Heading>
                  </Grid>
                </Grid>
              </Container>
              <Container className="otherCon">
                <Grid container spacing={4} className="requestedHelp">
                  <Grid item lg={3} sm={4} xs={12}>
                    <Paragraph>Requested Help</Paragraph>
                  </Grid>
                  <Grid item lg={9} sm={8} xs={12}>
                    <FormGroup column="true">{che}</FormGroup>
                  </Grid>
                </Grid>
              </Container>
              <Container className="otherCon padBotm">
                <Grid container spacing={2} className="requestedHelp">
                  <Grid item xs={12}>
                    <TextInput
                      type="text"
                      label="Case Name"
                      name="fname"
                      inlineLabel
                      onChange={e => setCaseName(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Dropdown
                      options={Options}
                      onChange={setCaseType}
                      value={caseType}
                      label="Case Stage"
                      inlineLabel
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextInput
                      size="long"
                      label="Details"
                      inlineLabel
                      onChange={e => setDetails(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    {isSuperAdmin}
                  </Grid>
                </Grid>
                <Grid container spacing={6} className="bottomSave">
                  <Grid item lg={4} md={6} sm={6} xs={12}>
                    {displaySave ? (
                      <Buttons clickEvent={save}>Save</Buttons>
                    ) : (
                      ''
                    )}
                  </Grid>
                  <Grid item lg={4} md={6} sm={6} xs={12}>
                    {displaySave ? (
                      <Paragraph>
                        <BaseLink clickEvent={cancel}>Cancel</BaseLink>
                      </Paragraph>
                    ) : (
                      ''
                    )}
                  </Grid>
                </Grid>
              </Container>
            </Grid>

            <Grid item lg={3} md={4} xs={12} className="rightBack">
              {RightPanel}
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
              <Snackbar
                open={open}
                autoHideDuration={4000}
                onClose={handleClose}
              >
                <Alert onClose={handleClose} severity={alertType}>
                  {errorMsg}
                </Alert>
              </Snackbar>
            </Grid>
          </Grid>
        </form>
      </Layout>
    </>
  );

  return pageContent;
};
export default withRouter(AddNewCase);
