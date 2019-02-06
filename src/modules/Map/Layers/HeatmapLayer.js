import React, { PureComponent } from 'react';
import { Layer, Feature } from 'react-mapbox-gl';

const paintProp = {
  // increase intensity as zoom level increases
  'heatmap-intensity': {
    stops: [
      [11, 1],
      [15, 3]
    ]
  },
  // assign color values be applied to points depending on their density
  // increase radius as zoom increases
  'heatmap-radius': 50,
  // decrease opacity to transition into the circle layer
  'heatmap-opacity': 1
};

class HeatmapLayer extends PureComponent {
  render() {
    const data = this.props.data || { features: [] };

    return (
      <Layer id="HeatmapLayer" type="heatmap" paint={paintProp}>
        {data.features.map(feat => (
          <Feature
            coordinates={feat.geometry.coordinates}
            key={feat.properties.name}
            properties={feat.properties}
          />
        ))}
      </Layer>
    );
  }
}

export default HeatmapLayer;
