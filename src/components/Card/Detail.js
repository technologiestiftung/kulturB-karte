import React, { PureComponent } from 'react';
import styled from 'styled-components';

import Clear from '@material-ui/icons/Clear';

import CardWrapper from './CardWrapper';
import CardHeader from './CardHeader';
import CardBody from './CardBody';
import CardDivider from './CardDivider';
import CardNearby from './CardNearby';
import CloseButton from './CloseButton';

const DetailCardWrapper = styled(CardWrapper)`
  margin-bottom: ${props => props.theme.margin[2]};
  position: absolute;
  z-index: 9000;
  top: 15px;
  left: 15px;
  width: 300px;
`;

const StyledCardHeader = styled(CardHeader)`
  padding: ${props => props.theme.padding[1]};
`;

const StyledCardBody = styled(CardBody)`
  padding: ${props => props.theme.padding[1]};
`;

class DetailCard extends PureComponent {
  render() {
    const { data } = this.props;

    if (!data) {
      return null;
    }

    return (
      <DetailCardWrapper>
        <CloseButton onClick={this.props.onClose}>
          <Clear />
        </CloseButton>
        <StyledCardHeader data={data} />
        <CardDivider />
        <StyledCardBody data={data} />
        <CardNearby data={data.nearby} />
      </DetailCardWrapper>
    );
  }
}

export default DetailCard;
