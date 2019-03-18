import React, { PureComponent } from 'react';
import { connect } from 'unistore/react';
import Actions from '~/state/Actions';
import { Layer, Feature } from 'react-mapbox-gl';
import idx from 'idx';

let clickTimeout = null;

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
    'circle-color': [
      'case',
      ['==', ['string', ['get', 'name']], detailId], ['get', 'color'],
      ['get', 'isFiltered'], '#ddd',
      ['get', 'color']
    ],
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
  timeoutClick(evt, feat) {
    clearTimeout(clickTimeout);

    clickTimeout = setTimeout(() => {
      this.handleClick(evt, feat);
    }, 10);
  }

  handleClick(evt, { properties = {} }) {
    // where do we set the coordinates now?
    // this.props.setMapView({ center: coordinates, zoom: 14 });
    evt.originalEvent.preventDefault();
    evt.originalEvent.stopPropagation();

    this.props.setDetailRoute(properties.id);
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

    return (
      <Layer
        id="MarkerLayer"
        type="circle"
        paint={paintProps}
        onMouseMove={evt => this.handleMouseMove(evt)}
      >
        {data.features.map(feat => (
          <Feature
            coordinates={feat.geometry.coordinates}
            key={feat.properties.name}
            onClick={evt => this.timeoutClick(evt, feat)}
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
