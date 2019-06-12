import React, { PureComponent, Fragment } from 'react';
import styled from 'styled-components';
import turfBbox from '@turf/bbox';
import { connect } from 'unistore/react';
import { Marker } from 'react-mapbox-gl';
import Home from '@material-ui/icons/Home';
import withMap from '../hoc/withMap';
import { getPolygonFeature } from '../MapUtils';

import Actions from '~/state/Actions';
import RadiusLayer from './RadiusLayer';

const StyledMarker = styled(Marker)`
  background: #222;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  padding: 3px;
  opacity: 0.8;

  svg {
    fill: white;
    width: 18px;
    height: 18px;
  }
`;

class LocationFilterLayer extends PureComponent {
  componentDidUpdate() {
    if (this.props.coordinates && this.props.coordinates.length) {
      const data = { features: [{ geometry: { coordinates: this.props.coordinates } }] };
      const features = data.features
        .map(feat => getPolygonFeature(feat.geometry.coordinates, this.props.radius));
      const geoJSON = { type: 'FeatureCollection', features };
      const bbox = turfBbox(geoJSON);

      this.props.map.fitBounds(bbox, { padding: 25 });
    }
  }

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
        <StyledMarker
          coordinates={coordinates}
          anchor="center"
        >
          <Home />
        </StyledMarker>
      </Fragment>
    );
  }
}

export default connect(state => ({
  coordinates: state.filter.locationFilterCoords,
  radius: state.filter.locationFilterRadius,
}), Actions)(withMap(LocationFilterLayer));
