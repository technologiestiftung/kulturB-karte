import React, { PureComponent } from 'react';
import { connect } from 'unistore/react';
import styled from 'styled-components';

import { allCategoriesSelector } from '~/state/Selectors';
import Actions from '~/state/Actions';

const CategoryFilterWrapper = styled.div`
  margin-bottom: ${props => props.theme.margin[2]};
`;

class CategoryFilter extends PureComponent {
  handleChange(category) {
    this.props.toggleCategoryFilter(category);
  }

  render() {
    const { categoryFilter } = this.props.filter;

    return (
      <CategoryFilterWrapper>
        {this.props.categories.map(category => (
          <div key={`CategoryFilter__${category}`}>
            <input checked={!categoryFilter.includes(category)} onChange={() => this.handleChange(category)} type="checkbox" />
            <span>{category}</span>
          </div>
        ))}
      </CategoryFilterWrapper>
    );
  }
}

export default connect(state => ({
  categories: allCategoriesSelector(state),
  filter: state.filter
}), Actions)(CategoryFilter);
