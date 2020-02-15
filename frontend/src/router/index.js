import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

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
            <Route path="/hostels/:id" component={Hostel} />
            <Route path="/me/bookings" component={MyBooking} />
            <Route path="/" component={Home} />
          </Switch>
        </Layout>
      </Route>
    </Switch>
  </BrowserRouter>
);

export default Router;
