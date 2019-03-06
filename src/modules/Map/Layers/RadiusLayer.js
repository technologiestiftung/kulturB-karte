import React, { PureComponent } from 'react';
import { GeoJSONLayer } from 'react-mapbox-gl';
import dissolve from '@turf/dissolve';

import { getPolygonFeature } from '../MapUtils';

const getPaintProps = props => ({
  'fill-color': props.fillColor || '#4A90E2',
  'fill-opacity': 0.5,
});

const getLinePaint = props => ({
  'line-color': props.lineColor || '#4A90E2',
  'line-width': 1,
});

class RadiusLayer extends PureComponent {
  render() {
    const { data, radius } = this.props;
    const features = data.features
      .map(feat => getPolygonFeature(feat.geometry.coordinates, radius));
    const geoJSON = { type: 'FeatureCollection', features };
    const dissolvedGeoJSON = dissolve(geoJSON);

    return (
      <GeoJSONLayer
        data={dissolvedGeoJSON}
        fillPaint={getPaintProps(this.props)}
        linePaint={getLinePaint(this.props)}
        id="RadiusLayer"
      />
    );
  }
}

export default RadiusLayer;
