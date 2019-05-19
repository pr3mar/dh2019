import React from 'react';
import {Route, Switch} from 'react-router-dom';
import LandingPage from './LandingPage';
import InfraPage from './InfraPage';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route path="/infrastructure" component={InfraPage} />
    </Switch>
    );
  }

  export default Routes;
