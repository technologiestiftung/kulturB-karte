import React, { PureComponent, Fragment } from 'react';
import { connect } from 'unistore/react';
import { Marker } from 'react-mapbox-gl';
import Place from '@material-ui/icons/Place';

import Actions from '~/state/Actions';
import RadiusLayer from './RadiusLayer';

class LocationFilterLayer extends PureComponent {
  render() {
    const { coordinates, radius } = this.props;

    if (!coordinates || !coordinates.length) {
      return null;
    }

    return (
      <Fragment>
        <RadiusLayer
          data={{ features: [{ geometry: { coordinates } }] }}
          radius={radius}
          fillColor="transparent"
        />
        <Marker
          coordinates={coordinates}
          anchor="bottom"
        >
          <Place />
        </Marker>
      </Fragment>
    );
  }
}

export default connect(state => ({
  coordinates: state.filter.locationFilterCoords,
  radius: state.filter.locationFilterRadius,
}), Actions)(LocationFilterLayer);
