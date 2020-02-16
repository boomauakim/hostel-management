import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import AuthRoute from '../components/AuthRoute';
import Layout from '../components/Layout';
import Home from '../pages/Home';
import Hostel from '../pages/Hostel';
import MyBooking from '../pages/MyBooking';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/">
        <Layout>
          <Switch>
            <AuthRoute path="/me/bookings">
              <MyBooking />
            </AuthRoute>
            <Route path="/hostels/:id">
              <Hostel />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Layout>
      </Route>
    </Switch>
  </BrowserRouter>
);

export default Router;
