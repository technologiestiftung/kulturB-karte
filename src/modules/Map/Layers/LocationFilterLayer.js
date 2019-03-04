import React, { PureComponent } from 'react';
import { connect } from 'unistore/react';
import Actions from '~/state/Actions';

import RadiusLayer from './RadiusLayer';

class LocationFilterLayer extends PureComponent {
  render() {
    const { coordinates, radius } = this.props;

    if (!coordinates || !coordinates.length) {
      return null;
    }

    return (
      <RadiusLayer
        data={{ features: [{ geometry: { coordinates } }] }}
        radius={radius}
        fillColor="transparent"
      />
    );
  }
}

export default connect(state => ({
  coordinates: state.filter.locationFilterCoords,
  radius: state.filter.locationFilterRadius,
}), Actions)(LocationFilterLayer);
