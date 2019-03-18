import React, { PureComponent } from 'react';
import Link from 'react-router-dom/Link';
import styled from 'styled-components';
import CloseIcon from '@material-ui/icons/Close';

import RoundButton from '~/components/RoundButton';

const StyledLink = styled(Link)`
  position: absolute;
  top: 15px;
  right: 15px;
`;

class SidebarClose extends PureComponent {
  render() {
    return (
      <StyledLink to="/">
        <RoundButton>
          <CloseIcon />
        </RoundButton>
      </StyledLink>
    );
  }
}

export default SidebarClose;
