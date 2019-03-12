import React, { PureComponent } from 'react';
import { connect } from 'unistore/react';

import Actions from '~/state/Actions';

class Sorter extends PureComponent {
  handleChange = (evt) => {
    this.props.setListSorting(evt.target.value);
  }

  render() {
    return (
      <div>
        <select onChange={this.handleChange} value={this.props.listSorting}>
          <option value="name">Name</option>
          <option value="mainCategory">Kategorie</option>
        </select>
      </div>
    );
  }
}

export default connect(state => ({
  listSorting: state.listSorting
}), Actions)(Sorter);
