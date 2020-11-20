import React, { useState, useEffect } from 'react';
import './index.scss';
import axios from 'axios';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { withRouter, Link } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { TextInput } from '../../components/atoms';
import { Buttons } from '../../components/molecules';
import Layout from '../../components/organism/Layout/Layout';
import authHeader from '../../utils/jwt';
import Logout from '../../utils/logout';
import API_URL from '../../utils/apiUrl';
import { Table } from '../../components/organism';

const ShowAllContact = ({ history, match }) => {
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  const [name, setName] = useState('');
  const [rows, setRows] = useState([]);
  const [searchData, setSearchData] = useState('');
  useEffect(() => {
    axios
      .get(`${API_URL}user/info`, {
        headers: authHeader(),
      })
      .then((response) => {
        if (response) {
          if (response.data.message == 'invalid token') {
            Logout();
            return history.push('/');
          }
          setName(`${response.data[0].firstname} ${response.data[0].lastname}`);
        }
      });
    axios
      .get(`${API_URL}customer/getAllCustomers`, {
        headers: authHeader(),
      })
      .then((res) => {
        if (res) {
          const customerData = res.data.map((val) => {
            const caseArr = JSON.parse(val.case_id);
            const newCaseId = val.case_id ? caseArr.slice(-1).pop() : '';
            return {
              firstname: val.firstname,
              lastname: val.lastname,
              email: val.email,
              phone: val.phone,
              case_id: newCaseId,
              _uid: val._uid,
            };
          });
          setRows(customerData);
        }
      });
  }, []);
  const headCells = [
    {
      id: 'firstname',
      sorting: true,
      label: 'First name',
    },
    { id: 'lastname', sorting: true, label: 'Last name' },
    { id: 'email', sorting: true, label: 'E-mail' },
    { id: 'phone', sorting: false, label: 'Phone number' },
    { id: 'case_id', sorting: true, label: ' Recent Case ID' },
  ];
  const handleClick = (id) => {
    history.push(`/EditContact${id}`);
  };
  const search = (e) => {
    setSearchData(e.target.value);
    console.log(searchData);
  };
  const pageContent = (
    <>
      <Layout isLogin userName={name}>
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            <Grid item lg={4} sm={6} xs={12}>
              <TextInput
                type="text"
                placeholder="Search by name"
                inlineLabel
                className="searchBox"
                onChange={search}
              />
            </Grid>
            <Grid item lg={8} sm={6} xs={12}>
              <Buttons
                internal
                link="/addcontact"
                iconAtStart
                icon={<AddCircleIcon />}
                bg="white"
                colour="#1946b4"
                className="addBtn"
              >
                Add New Contact
              </Buttons>
            </Grid>
            <Grid item xs={12}>
              <Table
                TableContent={rows}
                headings={headCells}
                clickEvent={handleClick}
              />
            </Grid>
          </Grid>
        </Container>
      </Layout>
    </>
  );
  return pageContent;
};
export default withRouter(ShowAllContact);
