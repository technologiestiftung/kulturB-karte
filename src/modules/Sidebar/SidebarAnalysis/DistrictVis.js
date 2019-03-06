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

function getData(districtName) {
  const data = districtAdditionalData.find(d => d.id === districtName);

  if (!data) {
    return districtAdditionalData.find(d => d.id === 'Berlin');
  }

  return data;
}

class DistrictVis extends PureComponent {
  render() {
    const {
      districtData, categories, data, district
    } = this.props;

    if (districtData.features.length === 0) {
      return null;
    }

    const additionalData = getData(district);
    const categoryArray = categories.map(category => ({ category, items: [] }));
    const dataBerlin = data.features.reduce(groupByCategory, categoryArray);
    const additionalDataBerlin = getData('Berlin');
    const bars = districtData.features
      .reduce(groupByCategory, categoryArray)
      .sort(sortByItemsLength)
      .map(d => ({
        ...d,
        perPop: (d.items.length / additionalData.population) * 100000,
        perPopBerlin: (dataBerlin.find(db => db.category === d.category).items.length / additionalDataBerlin.population) * 100000
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
            districtId={district}
            districtName={additionalData.name}
            title="Anzahl der Kulturorte pro 100.000 Einwohner"
          />
        </VisWrapper>
      </DistrictVisWrapper>
    );
  }
}

export default DistrictVis;
