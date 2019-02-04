import React, { PureComponent } from 'react';
import { connect } from 'unistore/react';

import Actions from '~/state/Actions';

import { Layer, Feature } from 'react-mapbox-gl';

const paintProp = {
  'circle-radius': 4,
  'circle-color': ['get', 'color'],
  'circle-stroke-color': '#fff',
  'circle-stroke-width': 1,
  'circle-stroke-opacity': 0.7
};

const getRandomColor = () => (
  '#111'
);

class MarkerLayer extends PureComponent {
  handleClick({ geometry: { coordinates } = [], properties = {} }) {
    this.props.setMapView({ center: coordinates, zoom: 14 });
    this.props.setTooltipPos(coordinates);
    this.props.setTooltipData(properties);
  }

  render() {
    const { data, layerId } = this.props;

    if (!data) {
      return null;
    }

    // assign random colors
    data.features.forEach((feat) => { feat.properties.color = getRandomColor() }); // eslint-disable-line

    return (
      <Layer id={layerId} type="circle" paint={paintProp}>
        {data.features.map(feat => (
          <Feature
            coordinates={feat.geometry.coordinates}
            key={feat.properties.name}
            onClick={() => this.handleClick(feat)}
            properties={feat.properties}
          />
        ))}
      </Layer>
    );
  }
}

export default connect(null, Actions)(MarkerLayer);
