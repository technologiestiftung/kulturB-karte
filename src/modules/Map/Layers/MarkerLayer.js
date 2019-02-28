import React, { PureComponent } from 'react';
import { connect } from 'unistore/react';
import Actions from '~/state/Actions';
import { Layer, Feature } from 'react-mapbox-gl';
import idx from 'idx';

import { getColorByCategory } from '~/state/DataUtils';

function getPaintProps(props) {
  const radius = props.radius || 5;
  const detailId = idx(props, _ => _.detailData.name) || '';
  const tooltipId = idx(props, _ => _.tooltipData.name) || '';

  return {
    'circle-radius': [
      'case',
      ['==', ['string', ['get', 'name']], detailId], 10,
      radius
    ],
    'circle-color': ['get', 'color'],
    'circle-stroke-color': '#fff',
    'circle-stroke-width': [
      'case',
      ['==', ['string', ['get', 'name']], tooltipId], 2,
      ['==', ['string', ['get', 'name']], detailId], 2,
      1
    ],
  };
}

class MarkerLayer extends PureComponent {
  handleClick({ geometry: { coordinates } = [], properties = {} }) {
    this.props.setMapView({ center: coordinates, zoom: 14 });
    this.props.setDetailData(properties);
  }

  handleMouseEnter({ properties = {} }) {
    this.props.setTooltipData(properties);
  }

  handleMouseLeave() {
    this.props.setTooltipData(null);
  }

  handleMouseMove(evt) {
    this.props.setTooltipPos([evt.lngLat.lng, evt.lngLat.lat]);
  }

  render() {
    const { data } = this.props;

    const paintProps = getPaintProps(this.props);

    // assign random colors
    data.features.forEach((feat) => {feat.properties.color = getColorByCategory(feat.properties.mainCategory)}); // eslint-disable-line

    return (
      <Layer id="MarkerLayer" type="circle" paint={paintProps} onMouseMove={evt => this.handleMouseMove(evt)}>
        {data.features.map(feat => (
          <Feature
            coordinates={feat.geometry.coordinates}
            key={feat.properties.name}
            onClick={() => this.handleClick(feat)}
            onMouseEnter={() => this.handleMouseEnter(feat)}
            onMouseLeave={() => this.handleMouseLeave()}
            properties={feat.properties}
          />
        ))}
      </Layer>
    );
  }
}

export default connect(state => ({
  detailData: state.detailData,
  tooltipData: state.tooltipData,
}), Actions)(MarkerLayer);
