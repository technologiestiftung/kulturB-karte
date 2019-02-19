import React from 'react';
import TopoJSONLayer from '~/components/TopoJSONLayer';
import { scaleLinear } from 'd3-scale';

import withMap from '../hoc/withMap';

const layerId = 'LorLayer';
const colorScale = scaleLinear().domain([0, 1]).range(['#ffffcc', '#2c7fb8']);
const fillPaint = {
  'fill-color': ['get', 'color'],
  'fill-opacity': 0.7,
  'fill-outline-color': '#fff',
};

const onEachFeature = (feat) => {
  feat.properties.color = colorScale(Math.random()); // eslint-disable-line
};

const LorLayer = (props) => {
  const { map } = props;

  if (map && map.getLayer(layerId)) {
    map.removeLayer(layerId);
  }

  return (
    <TopoJSONLayer
      {...props}
      source="public/data/lor_planungsraeume.json"
      fillPaint={fillPaint}
      id={layerId}
      onEachFeature={onEachFeature}
    />
  );
};

export default withMap(LorLayer);
