import React, { useState, useEffect } from 'react';
import './index.scss';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import { Heading } from '../../components/atoms';
import Layout from '../../components/organism/Layout/Layout';

import authHeader from '../../utils/jwt';
import Logout from '../../utils/logout';

import API_URL from '../../utils/apiUrl';

const UserInfo = props => {
  const [adid, setAdId] = useState('');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [userRole, setUserRole] = useState('');
  //

  useEffect(() => {
    axios
      .get(`${API_URL}user/info`, {
        headers: authHeader(),
      })
      .then(response => {
        if (response) {
          if (response.data.message == 'invalid token') {
            Logout();
            return props.history.push('/');
          }
          setAdId(response.data[0].advisor_id);
          setName(`${response.data[0].firstname} ${response.data[0].lastname}`);
          setMobile(response.data[0].mobile_phone);
          setEmail(response.data[0].email);
          setUserRole(response.data[0].user_role_id);
        }
      });
  }, []);

  const pageContent = email ? (
    <>
      <Layout isLogin userName={name} isAdmin={userRole}>
        <Box m={2} p={2}>
          <Heading type="h1" colour="primary">
            User page
          </Heading>
          <Heading type="h4">{`Welcome ${email} !`}</Heading>
          <Heading type="h6">{`Advisor id: ${adid}`}</Heading>
          <Heading type="h6">{`Name: ${name}`}</Heading>
          <Heading type="h6">{`Mobile: ${mobile}`}</Heading>
        </Box>
      </Layout>
    </>
  ) : (
    ''
  );

  return pageContent;
};
export default withRouter(UserInfo);
