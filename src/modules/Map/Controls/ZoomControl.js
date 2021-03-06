import React, { PureComponent } from 'react';
import styled from 'styled-components';

import RoundButton from '~/components/RoundButton';

import ControlContainer from './ControlContainer';
import withMap from '../hoc/withMap';

const StyledContainer = styled(ControlContainer)`

`;

const StyledRoundButton = styled(RoundButton)`
  margin-top: 5px;
  font-weight: 700;
  font-family: ${props => props.theme.fonts.sans};
  font-size: 18px;
  line-height: 1;

  div {
    position: relative;
    top: 1px;
  }
`;

class ZoomControl extends PureComponent {
  zoomIn() {
    console.log(this.props);
    if (this.props.map) {
      this.props.map.zoomIn();
    }
  }

  zoomOut() {
    if (this.props.map) {
      this.props.map.zoomOut();
    }
  }

  render() {
    return (
      <StyledContainer position={this.props.position}>
        <StyledRoundButton onClick={() => this.zoomIn()}>
          <div title="Heranzoomen">+</div>
        </StyledRoundButton>
        <StyledRoundButton onClick={() => this.zoomOut()}>
          <div title="Herauszoomen">−</div>
        </StyledRoundButton>
      </StyledContainer>
    );
  }
}

export default withMap(ZoomControl);
