import React from 'react';
import TopoJSONLayer from '~/components/TopoJSONLayer';
import { scaleLinear } from 'd3-scale';

const colorScale = scaleLinear().domain([0, 1]).range(['#ffffcc', '#2c7fb8']);

const fillPaint = {
  'fill-color': ['get', 'color'],
  'fill-opacity': 0.7,
  'fill-outline-color': '#fff',
};

const onEachFeature = (feat) => {
  feat.properties.color = colorScale(Math.random()); // eslint-disable-line
};

export default props => (
  <TopoJSONLayer
    {...props}
    source="public/data/lor_planungsraeume.json"
    fillPaint={fillPaint}
    id="LorLayer"
    onEachFeature={onEachFeature}
  />
);
