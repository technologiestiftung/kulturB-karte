import React, { PureComponent } from 'react';
import { connect } from 'unistore/react';

import Actions from '~/state/Actions';

import { Layer, Feature } from 'react-mapbox-gl';

const paintProp = {
  'circle-radius': 4,
  'circle-color': ['get', 'color']
};

const getRandomColor = () => (
  config.colors[Math.floor(Math.random() * config.colors.length)]
);

class MarkerLayer extends PureComponent {
  handleMouseEnter({ properties = {} }) {
    this.props.setTooltipData(properties);
  }

  handleClick({ geometry: { coordinates } = [] }) {
    this.props.setMapView({ center: coordinates, zoom: 14 });
  }

  render() {
    const { data } = this.props;

    if (!data) {
      return null;
    }

    // assign random colors
    data.features.forEach((feat) => { feat.properties.color = getRandomColor() }); // eslint-disable-line

    return (
      <Layer type="circle" paint={paintProp}>
        {data.features.map(feat => (
          <Feature
            coordinates={feat.geometry.coordinates}
            key={feat.properties.name}
            onMouseEnter={() => this.handleMouseEnter(feat)}
            onClick={() => this.handleClick(feat)}
            properties={feat.properties}
          />
        ))}
      </Layer>
    );
  }
}

export default connect(null, Actions)(MarkerLayer);
