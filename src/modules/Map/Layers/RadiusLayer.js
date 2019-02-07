import React, { PureComponent } from 'react';
import { GeoJSONLayer } from 'react-mapbox-gl';
import MapUtils from '../MapUtils';

const paintProps = {
  'fill-color': '#4A90E2',
  'fill-opacity': 0.5,
};

class RadiusLayer extends PureComponent {
  render() {
    const { data, radius } = this.props;
    const features = data.features
      .map(feat => MapUtils.getPolygonFeature(feat.geometry.coordinates, radius));

    return (
      <GeoJSONLayer
        data={{ type: 'FeatureCollection', features }}
        fillPaint={paintProps}
        id="RadiusLayer"
      />
    );
  }
}

export default RadiusLayer;
