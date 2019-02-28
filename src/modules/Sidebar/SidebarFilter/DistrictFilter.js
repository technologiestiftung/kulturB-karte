import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { connect } from 'unistore/react';

import Actions from '~/state/Actions';

const DistrictFilterWrapper = styled.div`
  display: block;
`;

const Select = styled.select``;

const Option = (props) => {
  const label = props.Gemeinde_name;
  const value = props.Gemeinde_schluessel;

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
  handleChange(evt) {
    let { value } = evt.target;
    if (evt.target.value === 'none') value = false;
    this.props.setDistrictFilter(value);
  }

  render() {
    const { districts } = this.props;

    if (!districts) {
      return null;
    }

    return (
      <DistrictFilterWrapper>
        <Select onChange={evt => this.handleChange(evt)}>
          <option key="DistrictOption__All" value="none">
            Alle Bezirke
          </option>
          {districts.features.map(feat => (
            <Option key={`DistrictOption__${feat.properties.Gemeinde_schluessel}`} {...feat.properties} />
          ))}
        </Select>
      </DistrictFilterWrapper>
    );
  }
}

export default connect(state => ({
  districts: state.additionalData.districts,
}), Actions)(DistrictFilter);
