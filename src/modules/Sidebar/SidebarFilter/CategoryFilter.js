import React, { PureComponent } from 'react';
import { connect } from 'unistore/react';
import styled from 'styled-components';

import { allCategoriesSelector } from '~/state/Selectors';
import Actions from '~/state/Actions';

const CategoryFilterWrapper = styled.div`
  margin-bottom: ${props => props.theme.margin[2]};
`;

const CategoriesWrapper = styled.div`
  > div:nth-child(n+10) {
    display: ${props => (props.isExpanded ? 'block' : 'none')};
  }
`;

class CategoryFilter extends PureComponent {
  toggleExpand() {
    this.props.toggleCategoryFilterExpanded();
  }

  handleChange(category) {
    this.props.toggleCategoryFilter(category);
  }

  render() {
    const { expanded } = this.props;
    const { categoryFilter } = this.props.filter;

    const expandButtonLabel = expanded ? 'weniger Kategorien anzeigen' : 'mehr Kategorien anzeigen';

    return (
      <CategoryFilterWrapper>
        <CategoriesWrapper isExpanded={expanded}>
          {this.props.categories.map(category => (
            <div key={`CategoryFilter__${category}`} onClick={() => this.handleChange(category)}>
              <input checked={!categoryFilter.includes(category)} type="checkbox" />
              <span>{category}</span>
            </div>
          ))}
        </CategoriesWrapper>
        <button type="button" onClick={() => this.toggleExpand()}>{expandButtonLabel}</button>
      </CategoryFilterWrapper>
    );
  }
}

export default connect(state => ({
  categories: allCategoriesSelector(state),
  filter: state.filter,
  expanded: state.categoryFilterExpanded,
}), Actions)(CategoryFilter);
