import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { connect } from 'unistore/react';

import Actions from '~/state/Actions';

import CardHeader from './CardHeader';
import CardDivider from './CardDivider';

const CardNearbyWrapper = styled.div`
  display: block;
`;

const CardDistance = styled.div`
  font-size: 12px;
  color: #777;
  margin-top: 5px;
`;

const CardTitle = styled.div`
  font-weight: bold;
  font-size: 14px;
  margin-bottom: ${props => props.theme.margin[0]};
  padding: 0 ${props => props.theme.padding[1]};
`;

const NearbyCard = styled.div`
  border-top: 1px solid #ddd;
  padding: ${props => props.theme.padding[1]};
  cursor: pointer;

  &:hover {
    background: #f0f0f0;
  }
`;

class CardNearby extends PureComponent {
  handleNearbyClick(props) {
    this.props.setDetailRoute(props.id);
  }

  render() {
    const { data } = this.props;

    if (!data || !data.length) {
      return null;
    }

    return (
      <CardNearbyWrapper>
        <CardDivider />
        <CardTitle>Weitere Orte in der Nähe</CardTitle>
        {data.map(d => (
          <NearbyCard onClick={() => this.handleNearbyClick(d)} key={`NearbyCard__${d.id}`}>
            <CardHeader data={d} />
            <CardDistance>
              {Math.floor(d.detailDistance * 1000)}
              <span> Meter entfernt</span>
            </CardDistance>
          </NearbyCard>
        ))}
      </CardNearbyWrapper>
    );
  }
}

export default connect(null, Actions)(CardNearby);
