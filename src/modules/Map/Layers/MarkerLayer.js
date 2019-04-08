import React, { PureComponent, Fragment } from 'react';
import { connect } from 'unistore/react';
import Actions from '~/state/Actions';
import { Layer, Feature } from 'react-mapbox-gl';
import idx from 'idx';

import { isMobile, noop } from '~/utils';

let clickTimeout = null;

function getPaintProps(props) {
  const radius = props.radius || 5;
  const detailId = idx(props, _ => _.detailData.name) || idx(props, _ => _.highlightData.name) || '';
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
    if (feat.properties && feat.properties.isFiltered) {
      return false;
    }

    clearTimeout(clickTimeout);

    clickTimeout = setTimeout(() => {
      this.handleClick(evt, feat);
    }, 10);
  }

  handleClick(evt, { properties = {} }) {
    evt.originalEvent.preventDefault();
    evt.originalEvent.stopPropagation();

    this.props.setDetailRoute(properties.id);
  }

  handleMouseEnter({ properties = {} }) {
    if (isMobile) {
      return this.props.setDetailRoute(properties.id);
    }

    if (properties && properties.isFiltered) {
      return false;
    }

    this.props.setTooltipData(properties);
  }

  handleMouseLeave() {
    this.props.setTooltipData(null);
  }

  handleMouseMove(evt) {
    this.props.setTooltipPos([evt.lngLat.lng, evt.lngLat.lat]);
  }

  render() {
    const { data, highlightData } = this.props;
    const paintProps = getPaintProps(this.props);
    const highlightFeat = data.features.find(
      feat => highlightData && (feat.properties.name === highlightData.name)
    );

    return (
      <Fragment>
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
              onClick={evt => (isMobile ? noop() : this.timeoutClick(evt, feat))}
              onMouseEnter={() => this.handleMouseEnter(feat)}
              onMouseLeave={() => this.handleMouseLeave()}
              properties={feat.properties}
            />
          ))}
        </Layer>
        {highlightFeat && (
          <Layer
            id="HighlightLayer"
            type="circle"
            paint={paintProps}
          >
            <Feature
              coordinates={highlightFeat.geometry.coordinates}
              key={highlightFeat.properties.name}
              properties={highlightFeat.properties}
            />
          </Layer>
        )}
      </Fragment>
    );
  }
}

export default connect(state => ({
  detailData: state.detailData,
  highlightData: state.highlightData,
  tooltipData: state.tooltipData,
}), Actions)(MarkerLayer);
