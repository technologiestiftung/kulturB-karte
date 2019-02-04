import React, { PureComponent } from 'react';
import { GeoJSONLayer } from 'react-mapbox-gl';
import { feature } from 'topojson';
import { scaleLinear } from 'd3-scale';

const colorScale = scaleLinear().domain([0, 1]).range(['#444', '#fefefe']);

const fillPaint = {
  'fill-color': ['get', 'color'],
  'fill-opacity': 0.7,
  'fill-outline-color': '#fff',
};

class ChoroplethLayer extends PureComponent {
  state = {
    data: false
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = async () => {
    const res = await fetch(this.props.topoJsonSrc);
    const topoData = await res.json();
    const data = feature(topoData, topoData.objects.lor_planungsraeume);
    this.setState({ data });
  }

  render() {
    const { data } = this.state;

    if (!data) {
      return null;
    }

    // assign random colors
    data.features = data.features.map((feat) => {
      feat.properties.color = colorScale(Math.random()); // eslint-disable-line
      return feat;
    });

    return (
      <GeoJSONLayer
        data={data}
        fillPaint={fillPaint}
        before={this.props.before}
      />
    );
  }
}

export default ChoroplethLayer;
