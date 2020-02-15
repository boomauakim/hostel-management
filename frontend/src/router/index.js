import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Layout from '../components/Layout';
import Home from '../pages/Home';
import Hostel from '../pages/Hostel';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/">
        <Layout>
          <Switch>
            <Route path="/hostels/:id" component={Hostel} />
            <Route path="/" component={Home} />
          </Switch>
        </Layout>
      </Route>
    </Switch>
  </BrowserRouter>
);

export default Router;
