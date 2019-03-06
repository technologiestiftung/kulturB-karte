import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { formatNumber } from '~/utils';

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

class DistrictNumbers extends PureComponent {
  render() {
    const { additionalData, districtData } = this.props;
    return (
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
    );
  }
}

export default DistrictNumbers;
