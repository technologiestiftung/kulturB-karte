import React, { PureComponent } from 'react';
import { connect } from 'unistore/react';
import styled from 'styled-components';

import { allCategoriesSelector } from '~/state/Selectors';
import Actions from '~/state/Actions';
import SidebarItemTitle from '~/modules/Sidebar/SidebarItemTitle';
import { getColorByCategory } from '~/state/DataUtils';

const CategoryFilterWrapper = styled.div`
  margin-bottom: ${props => props.theme.margin[2]};
`;

const CategoriesWrapper = styled.div`
  > div:nth-child(n+10) {
    display: ${props => (props.isExpanded ? 'block' : 'none')};
  }
  display: flex;
  flex-wrap: wrap;
`;

const CategoryFilterItem = styled.div`
  display: flex;
  color: ${props => (props.isActive ? '#222' : '#777')};
  margin-bottom: 8px;
  cursor: pointer;
  min-width: 50%;
  font-size: ${props => props.theme.fontSizes[1]};
  align-items: center;

  &:hover {
    opacity: 0.85;
  }
`;

const CategoryFilterIcon = styled.div`
  width: 30px;
  height: 30px;
  margin-right: 8px;
  border-radius: 100%;
  background: ${props => (props.isActive ? props.bg : '#ddd')};
`;

class CategoryFilter extends PureComponent {
  handleChange(category) {
    this.props.toggleCategoryFilter(category);
  }

  render() {
    const { expanded } = this.props;
    const { categoryFilter } = this.props.filter;

    return (
      <CategoryFilterWrapper>
        <SidebarItemTitle>
          Kulturorte filtern
        </SidebarItemTitle>
        <CategoriesWrapper isExpanded={expanded}>
          {this.props.categories.map(category => category && (
            <CategoryFilterItem
              key={`CategoryFilter__${category}`}
              onClick={() => this.handleChange(category)}
              isActive={!categoryFilter.includes(category)}
            >
              <CategoryFilterIcon
                isActive={!categoryFilter.includes(category)}
                bg={getColorByCategory(category)}
              />
              <div>{category}</div>
            </CategoryFilterItem>
          ))}
        </CategoriesWrapper>
        {/*<button type="button" onClick={() => this.props.categories.map(category => this.handleChange(category))}>
          Alle auswählen
        </button>*/}
      </CategoryFilterWrapper>
    );
  }
}

export default connect(state => ({
  categories: allCategoriesSelector(state),
  filter: state.filter,
  expanded: state.categoryFilterExpanded,
}), Actions)(CategoryFilter);
