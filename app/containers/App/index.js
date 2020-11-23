/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from '../HomePage/Loadable';
import UserInfo from '../UserInfo/Loadable';
import AddContact from '../AddContact/Loadable';
import AddNewCase from '../AddNewCase/Loadable';
import AddNewLead from '../AddNewLead/Loadable';
import ShowAllContact from '../ShowAllContact/Loadable';
import ShowAllCases from '../ShowAllCases/Loadable';
import ShowAllLeads from '../ShowAllLeads/Loadable';
import EditCase from '../EditCase/Loadable';
import EditLead from '../EditLead/Loadable';
import EditContact from '../EditContact/Loadable';
import ForgotPassword from '../ForgotPassword/Loadable';
import NotFoundPage from '../NotFoundPage/Loadable';
import SignUp from '../SignUp/Loadable';
import ResetPassword from '../ResetPassword/Loadable';
import GlobalStyle from '../../global-styles';
import PrivateRoute from '../../utils/privateRoute';

import ForgotPasswordRoute from '../../utils/forgotPasswordRoute';

function App() {
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/signup" component={SignUp} />

        {/* <Route path="/testpage" component={TestPage} /> */}
        <Route path="/forgotpassword" component={ForgotPassword} />

        <ForgotPasswordRoute path="/reset" component={ResetPassword} />

        <PrivateRoute exact path="/" component={HomePage} />
        <PrivateRoute path="/user" component={UserInfo} />
        <PrivateRoute path="/addcontact" component={AddContact} />
        <PrivateRoute path="/contact" component={ShowAllContact} />
        <PrivateRoute path="/cases" component={ShowAllCases} />
        <PrivateRoute path="/leads" component={ShowAllLeads} />
        <PrivateRoute path="/editcase:id" component={EditCase} />
        <PrivateRoute path="/editlead:id" component={EditLead} />
        <PrivateRoute path="/editcontact:id" component={EditContact} />
        <PrivateRoute path="/addCase" component={AddNewCase} />
        <PrivateRoute path="/addLead" component={AddNewLead} />

        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </>
  );
}
export default App;
