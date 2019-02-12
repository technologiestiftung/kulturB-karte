import React, { PureComponent } from 'react';
import { GeoJSONLayer } from 'react-mapbox-gl';
import dissolve from '@turf/dissolve';

import MapUtils from '../MapUtils';

const paintProps = {
  'fill-color': '#4A90E2',
  'fill-opacity': 0.5,
};

const linePaint = {
  'line-color': '#4A90E2',
  'line-width': 1,
};

class RadiusLayer extends PureComponent {
  render() {
    const { data, radius } = this.props;
    const features = data.features
      .map(feat => MapUtils.getPolygonFeature(feat.geometry.coordinates, radius));

    const geoJSON = { type: 'FeatureCollection', features };
    const dissolvedGeoJSON = dissolve(geoJSON);
    console.log(dissolvedGeoJSON);

    return (
      <GeoJSONLayer
        data={dissolvedGeoJSON}
        fillPaint={paintProps}
        linePaint={linePaint}
        id="RadiusLayer"
      />
    );
  }
}

export default RadiusLayer;
