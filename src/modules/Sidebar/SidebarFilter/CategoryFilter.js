import React, { PureComponent } from 'react';
import { connect } from 'unistore/react';

import { allCategoriesSelector } from '~/state/Selectors';
import Actions from '~/state/Actions';

class CategoryFilter extends PureComponent {
  handleChange(category) {
    this.props.toggleCategoryFilter(category);
  }

  render() {
    const { categoryFilter } = this.props.filter;

    return (
      <div>
        {this.props.categories.map(category => (
          <div key={`CategoryFilter__${category}`}>
            <input checked={!categoryFilter.includes(category)} onChange={() => this.handleChange(category)} type="checkbox" />
            <span>{category}</span>
          </div>
        ))}
      </div>
    );
  }
}

export default connect(state => ({
  categories: allCategoriesSelector(state),
  filter: state.filter
}), Actions)(CategoryFilter);
