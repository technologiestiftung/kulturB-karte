import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { GeoJSONLayer } from 'react-mapbox-gl';
import { feature } from 'topojson';

class TopoJSONLayer extends PureComponent {
  static propTypes = {
    source: PropTypes.string.isRequired,
    onEachFeature: PropTypes.func,
  }

  static defaultProps = {
    onEachFeature: () => {}
  }

  state = {
    data: false
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = async () => {
    const { source, onEachFeature } = this.props;
    const res = await fetch(source);
    const topoData = await res.json();
    const data = feature(topoData, topoData.objects[Object.keys(topoData.objects)[0]]);
    data.features.forEach(onEachFeature);
    this.setState({ data });
  }

  render() {
    const { data } = this.state;

    return (
      <GeoJSONLayer
        {...this.props}
        data={data}
      />
    );
  }
}

export default TopoJSONLayer;
