import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Main from './pages/Main';
import Login from './pages/Login';
import Profile from './pages/Profile';

export default function Routes() {
  return (
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/" component={Main}>
        </Route>
      </Switch>
  );
}
