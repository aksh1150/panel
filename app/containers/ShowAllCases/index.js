import React, { useState, useEffect } from 'react';
import './index.scss';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { TextInput } from '../../components/atoms';
import { Buttons } from '../../components/molecules';
import Layout from '../../components/organism/Layout/Layout';

import authHeader from '../../utils/jwt';
import Logout from '../../utils/logout';

import API_URL from '../../utils/apiUrl';
import { Table } from '../../components/organism';

import DateFormat from '../../utils/dateFormat/index';

const ShowAllCases = ({ history }) => {
  const [name, setName] = useState('');
  const [rows, setRows] = useState([]);
  const [searchData, setSearchData] = useState('');
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    axios
      .get(`${API_URL}user/info`, {
        headers: authHeader(),
      })
      .then(async response => {
        if (response) {
          if (response.data.message == 'invalid token') {
            Logout();
            return history.push('/');
          }
          await setName(
            `${response.data[0].firstname} ${response.data[0].lastname}`,
          );
          await setUserRole(response.data[0].user_role_id);
        }
      });
    const getLink =
      userRole === 2 ? 'customer/showCases/all' : 'customer/showCases/advisor';
    axios
      .get(`${API_URL}${getLink}`, {
        headers: authHeader(),
      })
      .then(res => {
        if (res) {
          const caseData = res.data.map(val => {
            const newDate = DateFormat(val.date_created);
            return {
              case_name: val.case_name,
              case_stage: val.case_stage,
              date_created: newDate,
              _uid: val._uid,
            };
          });
          setRows(caseData);
        }
      });
  }, [userRole]);
  const headCells = [
    {
      id: 'case_name',
      sorting: true,
      label: 'Case name',
    },
    { id: 'case_stage', sorting: true, label: 'Case stage' },
    { id: 'date_created', sorting: true, label: 'Date created' },
  ];
  const handleClick = id => {
    history.push(`/editcase${id}`);
  };
  const search = e => {
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
                link="/addCase"
                iconAtStart
                icon={<AddCircleIcon />}
                bg="white"
                colour="#1946b4"
                className="addBtn"
              >
                Add New Case
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
export default withRouter(ShowAllCases);
