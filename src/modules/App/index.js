import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import matchPath from 'react-router/matchPath';
import { connect } from 'unistore/react';

import Actions, { loadEntryData } from '~/state/Actions';
import AppWrapper from './AppWrapper';
import history from '~/history';
import Store from '~/state/Store';

const loadEntryDataAction = Store.action(loadEntryData(Store));


function syncLocation(state, location) {
  const match = matchPath(location.pathname, {
    path: '/:id?',
    exact: false,
    strict: false
  });

  if (!match) {
    return {};
  }

  const { id } = match.params;

  loadEntryDataAction(id);

  return {};
}

const updateLocation = Store.action(syncLocation);

history.listen(location => {
  updateLocation(location);
});

updateLocation(history.location);

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <AppWrapper />
      </Router>
    );
  }
}

export default connect(
  state => state,
  Actions
)(App);
