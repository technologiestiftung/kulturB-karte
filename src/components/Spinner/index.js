import React, { PureComponent } from 'react';
import styled from 'styled-components';

import CircularProgress from '@material-ui/core/CircularProgress';

const SpinnerWrapper = styled.div`
  position: absolute;
  z-index: 100000;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  user-select: none;
  pointer-events: none;
`;

class Spinner extends PureComponent {
  render() {
    if (!this.props.loading) {
      return null;
    }

    return (
      <SpinnerWrapper>
        <CircularProgress />
      </SpinnerWrapper>
    );
  }
}

export default Spinner;
