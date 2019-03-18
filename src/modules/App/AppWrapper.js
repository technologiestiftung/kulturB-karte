import React, { PureComponent } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { withRouter } from 'react-router-dom';

import Sidebar from '~/modules/Sidebar';
import Map from '~/modules/Map';
import Menu from '~/components/Menu';
import Logo from '~/components/TSBLogo';

import Theme from '~/styles/DefaultTheme';

const StyledAppWrapper = styled.div`
  width: 100vw;
  height: 100%;
  position: relative;
  display: flex;
  font-family: ${props => props.theme.fonts.sans};
`;

class AppWrapper extends PureComponent {
  render() {
    return (
      <ThemeProvider theme={Theme}>
        <StyledAppWrapper>
          <Logo />
          <Menu />
          <Sidebar />
          <Map />
        </StyledAppWrapper>
      </ThemeProvider>
    );
  }
}

export default withRouter(AppWrapper);
