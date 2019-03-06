import React, { PureComponent, Fragment } from 'react';
import { connect } from 'unistore/react';
import styled from 'styled-components';

import { filteredAnalysisDataSelector, allCategoriesSelector } from '~/state/Selectors';
import Actions from '~/state/Actions';
import DistrictFilter from '../SidebarFilter/DistrictFilter';
import SidebarItemTitle from '../SidebarItemTitle';
import DistrictVis from './DistrictVis';

const Wrapper = styled.div``;
const CheckboxWrapper = styled.div`
  margin-bottom: 10px;
  display: flex;
`;

const Checkbox = styled.input.attrs({
  type: 'checkbox'
})`
  margin-right: 8px;
`;

class DistrictAnalysis extends PureComponent {
  onToggle(activeAnalysis) {
    this.props.setActiveAnalysis(
      this.props.activeAnalysis === activeAnalysis ? false : activeAnalysis
    );
  }

  render() {
    const {
      activeDistrict, activeAnalysis, filteredData, categories, data
    } = this.props;
    const isActive = activeAnalysis === 'districts';

    return (
      <Wrapper>
        <CheckboxWrapper>
          <Checkbox
            checked={isActive}
            onChange={() => this.onToggle('districts')}
          />
          <SidebarItemTitle text="Bezirks-Analyse" />
        </CheckboxWrapper>

        {isActive && (
          <Fragment>
            <DistrictFilter hideTitle />
            <DistrictVis
              district={activeDistrict}
              districtData={filteredData}
              data={data}
              categories={categories}
            />
          </Fragment>
        )}
      </Wrapper>
    );
  }
}

export default connect(state => ({
  activeAnalysis: state.activeAnalysis,
  activeDistrict: state.filter.districtFilter,
  filteredData: filteredAnalysisDataSelector(state),
  data: state.data,
  categories: allCategoriesSelector(state),
}), Actions)(DistrictAnalysis);
