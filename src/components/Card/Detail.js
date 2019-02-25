import React, { PureComponent } from 'react';
import styled from 'styled-components';

import Clear from '@material-ui/icons/Clear';

import CardHeader from '~/components/Card/CardHeader';
import CardNearby from '~/components/Card/CardNearby';

const DetailCardWrapper = styled.div`
  background: #fff;
  border: 1px solid #777;
  padding: 10px;
  position: relative;
  border-radius: 4px;
`;

const Close = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #fff;
  border: 1px solid #777;
  right: -10px;
  top: -10px;
  cursor: pointer;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

class DetailCard extends PureComponent {
  render() {
    const { data } = this.props;

    if (!data) {
      return null;
    }

    return (
      <DetailCardWrapper>
        <Close onClick={this.props.onClose}>
          <Clear />
        </Close>
        <CardHeader data={data} />
        <CardNearby data={data.nearby} />
      </DetailCardWrapper>
    );
  }
}

export default DetailCard;
