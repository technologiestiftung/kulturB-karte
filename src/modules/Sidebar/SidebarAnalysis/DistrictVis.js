import React, { PureComponent } from 'react';
import styled from 'styled-components';

import BarVis from './BarVis';
import districtAdditionalData from './district-data';
import { formatNumber } from '~/utils';

const VisBox = styled.div`
  border: 1px solid #ddd;
  padding: 10px;
`;

const VisBoxHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const VisBoxHeaderItem = styled.div`
  text-align: center;
`;

const VisBoxHeaderItemNumber = styled.div`
  font-size: ${props => props.theme.fontSizes[3]};
  font-weight: 700;
  margin-bottom: 5px;
`;

const VisBoxHeaderItemLabel = styled.div`
  font-size: ${props => props.theme.fontSizes[0]};
`;

class DistrictVis extends PureComponent {
  getData() {
    const data = districtAdditionalData.find(d => d.id === this.props.district);

    if (!data) {
      return districtAdditionalData.find(d => d.id === 'Berlin');
    }

    return data;
  }

  render() {
    const { districtData, categories } = this.props;
    const additionalData = this.getData();

    return (
      <VisBox>
        <VisBoxHeader>
          <VisBoxHeaderItem>
            <VisBoxHeaderItemNumber>{formatNumber(additionalData.population)}</VisBoxHeaderItemNumber>
            <VisBoxHeaderItemLabel>Einwohner</VisBoxHeaderItemLabel>
          </VisBoxHeaderItem>
          <VisBoxHeaderItem>
            <VisBoxHeaderItemNumber>{formatNumber(additionalData.area, 1)} </VisBoxHeaderItemNumber>
            <VisBoxHeaderItemLabel>Fläche in km²</VisBoxHeaderItemLabel>
          </VisBoxHeaderItem>
          <VisBoxHeaderItem>
            <VisBoxHeaderItemNumber>{formatNumber(districtData.features.length)}</VisBoxHeaderItemNumber>
            <VisBoxHeaderItemLabel>Kulturorte</VisBoxHeaderItemLabel>
          </VisBoxHeaderItem>
        </VisBoxHeader>
        <BarVis
          categories={categories.map(category => ({ category, items: [] }))}
          additionalData={additionalData}
          data={districtData.features}
        />
      </VisBox>
    );
  }
}

export default DistrictVis;
