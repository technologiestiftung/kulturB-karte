import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Clear from '@material-ui/icons/Clear';

import RoundButton from '~/components/RoundButton';

import CardWrapper from './CardWrapper';
import CardHeader from './CardHeader';
import CardBody from './CardBody';
import CardDivider from './CardDivider';
import CardNearby from './CardNearby';

const DetailCardWrapper = styled(CardWrapper)`
  position: absolute;
  z-index: 9000;
  top: 20px;
  right: 5%;
  left: 5%;
  margin: auto;
  max-width: 500px;
  box-shadow: ${props => props.theme.boxShadow};

  @media screen and (min-width: 768px) {
    right: 20px;
    left: auto;
    width: 300px;
  } 
`;

const StyledCardHeader = styled(CardHeader)`
  padding: ${props => props.theme.padding[1]};
`;

const StyledCardBody = styled(CardBody)`
  padding: ${props => props.theme.padding[1]};
`;

const CloseButton = styled(RoundButton)`
  position: absolute;
  top: -15px;
  right: -15px;
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
