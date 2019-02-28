import React, { PureComponent } from 'react';
import { connect } from 'unistore/react';

import { enrichedDetailDataSelector } from '~/state/Selectors';
import Actions from '~/state/Actions';

import DetailCard from '~/components/Card/Detail';

class SidebarDetail extends PureComponent {
  onDetailClose() {
    this.props.loadEntryData(false);
  }

  render() {
    const { detailData } = this.props;

    return detailData && (
      <DetailCard
        onClose={() => this.onDetailClose()}
        data={detailData}
      />
    );
  }
}

export default connect(state => ({
  detailData: enrichedDetailDataSelector(state)
}), Actions)(SidebarDetail);
