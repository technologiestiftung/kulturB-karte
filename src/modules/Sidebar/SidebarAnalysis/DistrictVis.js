import React, { PureComponent } from 'react';
import styled from 'styled-components';

import DistrictNumbers from './DistrictNumbers';
import districtAdditionalData from './district-data';
import StackedBars from './StackedBars';
import CategoryBars from './CategoryBars';
import { groupByCategory, sortByItemsLength } from './analysis-utils';

const DistrictVisWrapper = styled.div`
  border: 1px solid #ddd;
  padding: 10px;
`;

const VisWrapper = styled.div`
  margin-top: 10px;
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
    const bars = districtData.features
      .reduce(groupByCategory, categories.map(category => ({ category, items: [] })))
      .sort(sortByItemsLength)
      .map(d => ({
        ...d,
        perPop: (d.items.length / additionalData.population) * 100000
      }));

    return (
      <DistrictVisWrapper>
        <DistrictNumbers
          additionalData={additionalData}
          districtData={districtData}
        />
        <VisWrapper>
          <StackedBars
            data={bars}
            count={districtData.features.length}
          />
          <CategoryBars
            data={bars}
            title="Anzahl der Kulturorte pro 100.000 Einwohner"
          />
        </VisWrapper>
      </DistrictVisWrapper>
    );
  }
}

export default DistrictVis;
