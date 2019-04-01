import React, { PureComponent } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'unistore/react';
import styled from 'styled-components';
import ReactMapboxGl from 'react-mapbox-gl';

import Actions from '~/state/Actions';
import { districtBoundsSelector } from '~/state/Selectors';
import MapUtils from './MapUtils';
import { MapProvider } from './hoc/MapContext';
import FilterView from './MapViews/FilterView';
import AnalysisView from './MapViews/AnalysisView';
import Tooltip from './Tooltip';
import MapDetailCard from './MapDetailCard';
import BoundingBoxToggle from './Controls/BoundingBoxToggle';
import ZoomControl from './Controls/ZoomControl';

const LayerOrder = ['LorLayer', 'DistrictsLayer', 'RadiusLayer', 'MarkerLayer', 'HighlightLayer', 'HeatmapLayer', 'LocationFilterLayer'];

const mapConfig = {
  minZoom: 8,
  maxZoom: 17,
  dragRotate: false,
  bearing: 0,
  maxBounds: [
    [10, 50],
    [15, 54]
  ]
};

const MapGL = ReactMapboxGl({ ...mapConfig });

const MapWrapper = styled.div`
  height: 100%;
  width: 100%;
  flex: 1;
  flex-shrink: 1;
  flex-grow: 1;
  position: relative;
  opacity: ${props => (props.isLoading ? 0 : 1)};
`;

class Map extends PureComponent {
  state = {
    isLoading: true,
    map: false,
  };

  lastLayerIds = '';

  componentDidMount() {
    this.props.loadData();
  }

  onStyleLoad(map) {
    map.resize();
    window.map = map;
    this.setState({ isLoading: false, map });

    map.jumpTo({
      center: this.props.mapCenter,
      zoom: this.props.mapZoom[0]
    });
  }

  onData(map) {
    const layerIds = Object.keys(map.style._layers).join(''); // eslint-disable-line

    if (layerIds !== this.lastLayerIds) {
      MapUtils.orderLayers(map, LayerOrder);
    }

    this.lastLayerIds = layerIds;
  }

  onMoveEnd() {
    const { map } = this.state;

    if (!map) {
      return false;
    }

    this.props.setMapBounds(map.getBounds());
  }

  render() {
    const {
      mapZoom,
      mapCenter,
      districtBounds,
    } = this.props;

    const isLoading = this.props.isLoading || this.state.isLoading;

    return (
      <MapWrapper isLoading={isLoading}>
        <MapProvider value={this.state.map}>
          <MapGL
            zoom={mapZoom}
            center={mapCenter}
            bearing={mapConfig.bearing}
            style={config.map.style} // eslint-disable-line
            containerStyle={{ height: '100%', width: '100%' }}
            onStyleLoad={map => this.onStyleLoad(map)}
            flyToOptions={config.map.flyToOptions}
            onData={map => this.onData(map)}
            fitBounds={districtBounds}
            maxBounds={mapConfig.maxBounds}
            onMoveEnd={() => this.onMoveEnd()}
          >
            <Route exact path={['/', '/suche', '/liste', '/favoriten', '/info']} component={FilterView} />
            <Route path="/liste" component={BoundingBoxToggle} />
            <Route path="/analyse" component={AnalysisView} />
            <Tooltip />
            <ZoomControl position="bottom-left" />
          </MapGL>
        </MapProvider>
        <MapDetailCard />
      </MapWrapper>
    );
  }
}

export default withRouter(connect(state => ({
  mapZoom: state.mapZoom,
  mapCenter: state.mapCenter,
  districtBounds: districtBoundsSelector(state),
}), Actions)(Map));
