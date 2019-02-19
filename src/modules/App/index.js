import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'unistore/react';

import Actions from '~/state/Actions';
import AppWrapper from './AppWrapper';

class App extends Component {
  render() {
    return (
      <Router>
        <AppWrapper />
      </Router>
    );
  }
}

export default connect(
  state => state,
  Actions
)(App);
