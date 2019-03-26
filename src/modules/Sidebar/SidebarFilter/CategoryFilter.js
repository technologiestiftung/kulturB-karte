import React, { PureComponent } from 'react';
import { connect } from 'unistore/react';
import styled from 'styled-components';

import Actions from '~/state/Actions';
import SidebarItemTitle from '~/modules/Sidebar/SidebarItemTitle';
import { getIconByCategory } from '~/state/DataUtils';

const CategoryFilterWrapper = styled.div`
  margin-bottom: ${props => props.theme.margin[2]};
`;

const CategoriesWrapper = styled.div`
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
  user-select: none;

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
  color: white;
  display: flex;
  justify-items: center;
  align-items: center;

  svg {
    width: 16px;
    height: 16px;
    display: block;
    margin: 0 auto;
  }
`;

class CategoryFilter extends PureComponent {
  onChange(category) {
    this.props.toggleCategoryFilter(category);
  }

  onReset() {
    this.props.resetCategoryFilter();
  }

  render() {
    const {
      expanded,
      categories,
      filter,
      colorizer
    } = this.props;
    const { categoryFilter } = filter;

    return (
      <CategoryFilterWrapper>
        <SidebarItemTitle
          text="Kategorie filtern"
          showReset={categoryFilter.length !== categories.length}
          onReset={() => this.onReset()}
        />
        <CategoriesWrapper isExpanded={expanded}>
          {categories.map((category) => {
            const CategoryIcon = getIconByCategory(category);
            const isActive = categoryFilter.includes(category);

            return (
              <CategoryFilterItem
                key={`CategoryFilter__${category}`}
                onClick={() => this.onChange(category)}
                isActive={isActive}
              >
                <CategoryFilterIcon
                  isActive={isActive}
                  bg={colorizer(category)}
                >
                  {CategoryIcon && <CategoryIcon />}
                </CategoryFilterIcon>
                <div>{category}</div>
              </CategoryFilterItem>
            );
          })}
        </CategoriesWrapper>
      </CategoryFilterWrapper>
    );
  }
}

export default connect(state => ({
  categories: state.categories,
  colorizer: state.colorizer,
  filter: state.filter,
  expanded: state.categoryFilterExpanded,
}), Actions)(CategoryFilter);
