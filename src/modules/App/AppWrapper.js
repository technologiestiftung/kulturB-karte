import React, { PureComponent } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { withRouter } from 'react-router-dom';

import Sidebar from '~/modules/Sidebar';
import Map from '~/modules/Map';

import Theme from '~/styles/DefaultTheme';

const StyledAppWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  display: flex;
  font-family: ${props => props.theme.fonts.sans};
`;

class AppWrapper extends PureComponent {
  render() {
    return (
      <ThemeProvider theme={Theme}>
        <StyledAppWrapper>
          <Sidebar />
          <Map />
        </StyledAppWrapper>
      </ThemeProvider>
    );
  }
}

export default withRouter(AppWrapper);
