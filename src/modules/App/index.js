import React, { Component } from 'react';
import {
  Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import { connect } from 'unistore/react';
import queryString from 'query-string';

import Actions, { loadEntryData } from '~/state/Actions';
import AppWrapper from './AppWrapper';
import history from '~/history';
import Store from '~/state/Store';

const loadEntryDataAction = Store.action(loadEntryData(Store));

function syncLocation(state, location) {
  const parsedQuery = queryString.parse(location.search);

  if (!parsedQuery.location) {
    return {
      detailData: false
    };
  }

  loadEntryDataAction(parsedQuery.location);

  return {};
}

const updateLocation = Store.action(syncLocation);

history.listen(location => updateLocation(location));

updateLocation(history.location);

const NotFoundRoute = () => (
  <Redirect to="/" />
);

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path={['/', '/suche', '/analyse', '/liste', '/favoriten']} component={AppWrapper} />
          <Route component={NotFoundRoute} />
        </Switch>
      </Router>
    );
  }
}

export default connect(
  state => state,
  Actions
)(App);
