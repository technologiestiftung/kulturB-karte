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
    this.props.setDistrictFilter(evt.target.value);
  }

  render() {
    const { districts } = this.props;

    if (!districts) {
      return null;
    }

    return (
      <DistrictFilterWrapper>
        <Select onChange={evt => this.handleChange(evt)}>
          {districts.features.map(feat => (
            <Option {...feat.properties} />
          ))}
        </Select>
      </DistrictFilterWrapper>
    );
  }
}

export default connect(state => ({
  districts: state.additionalData.districts,
}), Actions)(DistrictFilter);
