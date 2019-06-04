import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import decode from 'jwt-decode';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import CreateTeam from './CreateTeam';
import ViewTeam from './ViewTeam';

const isAuthenticated = () => {
  const token = localStorage.getItem('sc_token');
  const refreshToken = localStorage.getItem('sc_refreshToken');
  try {
    decode(token);
    decode(refreshToken);
  } catch (err) {
    return false;
  }
  return true;
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => isAuthenticated()
      ? <Component {...props} />
      : <Redirect to='/login' />
    }
  />
);

export default () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <PrivateRoute exact path="/view-team/:teamId?/:channelId?" component={ViewTeam} />
      <PrivateRoute exact path="/create-team" component={CreateTeam} />
    </Switch>
  </Router>
);
