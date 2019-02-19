import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

import Sidebar from '~/modules/Sidebar';
import Map from '~/modules/Map';

const StyledAppWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  display: flex;
`;

class AppWrapper extends PureComponent {
  render() {
    return (
      <StyledAppWrapper>
        <Sidebar />
        <Map />
      </StyledAppWrapper>
    );
  }
}

export default withRouter(AppWrapper);
