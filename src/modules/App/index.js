import React, { PureComponent } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'unistore/react';

import Actions from '~/state/Actions';
import Map from '~/modules/Map';

class App extends PureComponent {
  render() {
    return (
      <Router>
        <Map />
      </Router>
    );
  }
}

export default connect(
  state => state,
  Actions
)(App);
