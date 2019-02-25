import React, { PureComponent } from 'react';
import { connect } from 'unistore/react';
import styled from 'styled-components';

import { Popup } from 'react-mapbox-gl';

const StyledPopup = styled(Popup)`
  max-width: 250px;
`;

class Tooltip extends PureComponent {
  render() {
    const { tooltipPos, tooltipData } = this.props;

    if (!tooltipData) {
      return null;
    }

    return (
      <StyledPopup coordinates={tooltipPos}>
        <div>{tooltipData.name}</div>
        <div>{tooltipData.mainCategory}</div>
      </StyledPopup>
    );
  }
}

export default connect(state => ({
  tooltipPos: state.tooltipPos,
  tooltipData: state.tooltipData,
}))(Tooltip);
