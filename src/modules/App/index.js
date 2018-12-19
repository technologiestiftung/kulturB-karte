import React, { PureComponent } from 'react';
import { connect } from 'unistore/react';
import styled from 'styled-components';

import Actions from '~/state/Actions';
import Map from '~/modules/Map';

const AppWrapper = styled.div``;

class App extends PureComponent {
  render() {
    return (
      <AppWrapper>
        <Map />
      </AppWrapper>
    );
  }
}

export default connect(
  state => state,
  Actions
)(App);
