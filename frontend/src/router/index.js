import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Layout from '../components/Layout';
import Home from '../pages/Home';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/">
        <Layout><Switch><Route path="/" component={Home} /></Switch></Layout>
      </Route>
    </Switch>
  </BrowserRouter>
);

export default Router;
