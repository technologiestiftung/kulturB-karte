import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { connect } from 'unistore/react';
import Select from 'react-select';
import Slider from 'rc-slider/lib/Slider';
import 'rc-slider/assets/index.css';

import { fetchJSON, formatNumber } from '~/utils';
import { dataAsArraySelector } from '~/state/Selectors';
import Actions from '~/state/Actions';
import SidebarItemTitle from '~/modules/Sidebar/SidebarItemTitle';

const SearchFilterWrapper = styled.div`
  display: block;
  margin-bottom: ${props => props.theme.margin[2]};
  font-size: ${props => props.theme.fontSizes[1]};
`;

const SelectWrapper = styled.div`
  display: flex;

  .react-select {
    :first-child {
      flex-grow: 1;
      margin-right: 5px;
    }
    :last-child {
      min-width: 25%;
    }
  }
`;

const SliderWrapper = styled.div`
  display: flex;
  align-items: center;
  line-height: 1;
  margin: 10px 0;
  position: relative;

  &:hover {
    .sliderinfo {
      display: block;
    }
  }
`;

const RadiusLabel = styled.div`
  min-width: 55px;
  font-size: ${props => props.theme.fontSizes[0]};
`;

const SliderInfo = styled.div`
  color: #777;
  margin-top: 10px;
  display: none;
  position: absolute;
  top: 10px;
`;

class SearchFilter extends PureComponent {
  state = {
    streetOptions: [],
    numberOptions: []
  }

  onSelectStreet(selectedStreet) {
    if (selectedStreet === null) {
      return this.setState({
        streetOptions: [],
        numberOptions: []
      });
    }

    fetchJSON(`https://tsb.ara.uberspace.de/tsb-geocoding/num?street=${selectedStreet.id}`)
      .then((numberOptions) => {
        const sortedOptions = numberOptions.sort((a, b) => parseInt(a.num, 0) - parseInt(b.num, 0));
        this.setState({ numberOptions: sortedOptions });
      });
  }

  onInputChange(input) {
    if (input.length < 3) {
      return input;
    }

    fetchJSON(`https://tsb.ara.uberspace.de/tsb-geocoding/street?street=${input}`)
      .then(streetOptions => this.setState({ streetOptions }));

    return input;
  }

  onSelectNumber(selectedNumber = null) {
    if (selectedNumber === null) {
      return false;
    }

    fetchJSON(`https://tsb.ara.uberspace.de/tsb-geocoding/geo?num=${selectedNumber.id}`)
      .then((res) => {
        this.props.setLocationFilterCoords([res.lat, res.lon]);
        this.props.setMapView({ center: [res.lat, res.lon], zoom: 12 });
        this.props.setListSorting('distance');
      });
  }

  onRadiusChange(radius) {
    this.props.setLocationFilterRadius(radius);
  }

  onReset() {
    this.streetSelect.select.clearValue();
    this.numberSelect.select.clearValue();

    this.props.setLocationFilterCoords([]);
    this.props.setLocationFilterRadius(1000);
    this.props.setListSorting('name');

    this.setState({
      streetOptions: [],
      numberOptions: []
    });
  }

  render() {
    const { radius, coords } = this.props;
    const showReset = coords && coords.length > 0;

    return (
      <SearchFilterWrapper>
        <SidebarItemTitle
          text="Umkreissuche"
          showReset={showReset}
          onReset={() => this.onReset()}
        />
        <SelectWrapper>
          <Select
            ref={(ref) => { this.streetSelect = ref; }}
            options={this.state.streetOptions}
            getOptionValue={option => (option.id)}
            getOptionLabel={option => (option.street)}
            onChange={evt => this.onSelectStreet(evt)}
            placeholder="Straße suchen ..."
            classNamePrefix="rs"
            onInputChange={input => this.onInputChange(input)}
            noOptionsMessage={() => 'Keine Straße gefunden'}
            className="react-select"
            isClearable
          />
          <Select
            ref={(ref) => { this.numberSelect = ref; }}
            options={this.state.numberOptions}
            getOptionValue={option => (option.id)}
            getOptionLabel={option => (option.num)}
            onChange={evt => this.onSelectNumber(evt)}
            placeholder="Nr."
            classNamePrefix="rs"
            noOptionsMessage={() => 'Keine Hausnummer gefunden'}
            isDisabled={!this.state.numberOptions.length}
            className="react-select"
            isClearable
          />
        </SelectWrapper>
        <SliderWrapper>
          <RadiusLabel>
            {formatNumber(radius / 1000, 1)} km
          </RadiusLabel>
          <Slider
            min={500}
            max={10000}
            step={500}
            onChange={value => this.onRadiusChange(value)}
            value={radius}
            disabled={!showReset}
          />
          <SliderInfo
            className="sliderinfo"
          >
            Sie müssen zuerst eine Adresse eingeben, um den Radius einstellen zu können.
          </SliderInfo>
        </SliderWrapper>
      </SearchFilterWrapper>
    );
  }
}

export default connect(state => ({
  options: dataAsArraySelector(state),
  coords: state.filter.locationFilterCoords,
  radius: state.filter.locationFilterRadius
}), Actions)(SearchFilter);
