import React, { PureComponent } from 'react';
import { connect } from 'unistore/react';

import { Popup } from 'react-mapbox-gl';

class Tooltip extends PureComponent {
  render() {
    const { tooltipPos, tooltipData } = this.props;

    return (
      <Popup coordinates={tooltipPos}>
        <div>{tooltipData.name}</div>
        <div>{tooltipData.mainCategory}</div>
      </Popup>
    );
  }
}

export default connect(state => ({
  tooltipPos: state.tooltipPos,
  tooltipData: state.tooltipData,
}))(Tooltip);
