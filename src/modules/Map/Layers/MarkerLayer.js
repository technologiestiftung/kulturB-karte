import React, { PureComponent } from 'react';
import { connect } from 'unistore/react';
import Actions from '~/state/Actions';
import { Layer, Feature } from 'react-mapbox-gl';
import { getColorByCategory } from '../MapUtils';

class MarkerLayer extends PureComponent {
  handleClick({ geometry: { coordinates } = [], properties = {} }) {
    this.props.setMapView({ center: coordinates, zoom: 14 });
    this.props.setTooltipPos(coordinates);
    this.props.setTooltipData(properties);
  }

  render() {
    const { data, radius = 5 } = this.props;

    const paintProp = {
      'circle-radius': radius,
      'circle-color': ['get', 'color'],
      'circle-stroke-color': '#fff',
      'circle-stroke-width': 1
    };

    // assign random colors
    data.features.forEach((feat) => { feat.properties.color = getColorByCategory(feat.properties.mainCategory) }); // eslint-disable-line

    return (
      <Layer id="MarkerLayer" type="circle" paint={paintProp}>
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
