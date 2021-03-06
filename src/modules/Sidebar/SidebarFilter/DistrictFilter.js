import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { connect } from 'unistore/react';

import Actions from '~/state/Actions';
import SidebarItemTitle from '~/modules/Sidebar/SidebarItemTitle';
import Select from '~/components/Select';

const DistrictFilterWrapper = styled.div`
  margin-bottom: ${props => props.theme.margin[2]};
`;

const Option = (props) => {
  const label = props.spatial_alias;
  const value = props.spatial_name;

  return (
    <option
      key={`DistrictOption__${value}`}
      value={value}
    >
      {label}
    </option>
  );
};

class DistrictFilter extends PureComponent {
  onChange(evt) {
    let { value } = evt.target;
    if (evt.target.value === 'none') value = false;
    this.props.setDistrictFilter(value);
  }

  onReset() {
    this.props.setDistrictFilter(false);
  }

  render() {
    const { districts, selectedDistrict } = this.props;

    if (!districts) {
      return null;
    }

    const selectValue = !selectedDistrict ? 'none' : selectedDistrict;

    return (
      <DistrictFilterWrapper>
        {!this.props.hideTitle && (
          <SidebarItemTitle
            text="Bezirk filtern"
            showReset={selectedDistrict}
            onReset={() => this.onReset()}
          />
        )}
        <Select value={selectValue} onChange={evt => this.onChange(evt)}>
          <option key="DistrictOption__All" value="none">
            Alle Bezirke
          </option>
          {districts.features.map(feat => (
            <Option key={`DistrictOption__${feat.properties.spatial_alias}`} {...feat.properties} />
          ))}
        </Select>
      </DistrictFilterWrapper>
    );
  }
}

export default connect(state => ({
  districts: state.additionalData.districts,
  selectedDistrict: state.filter.districtFilter
}), Actions)(DistrictFilter);
