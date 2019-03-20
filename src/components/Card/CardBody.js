import React, { PureComponent } from 'react';
import { connect } from 'unistore/react';
import styled from 'styled-components';

import { parseOpeningHours } from '~/utils';

import OpeningHours from '~/components/OpeningHours';
import WebsiteLink from '~/components/Link';

const CardBodyWrapper = styled.div`
  font-size: ${props => props.theme.fontSizes[0]};
`;

const CardBodySection = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const CardSectionLeft = styled.div`
  margin-right: 10px;
  font-weight: 700;
  min-width: 35%;
`;

const CardSectionRight = styled.div`
  margin-left: auto;
`;

const Description = styled.div`
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
`;

const WebsiteLinkContainer = styled(CardSectionRight)`
  overflow: hidden;
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

function formatWebsite(str) {
  if (!str) {
    return '';
  }

  return str
    .toLowerCase()
    .replace(/https?:\/\//, '')
    .replace(/www\./, '')
    .replace(/\/$/, '');
}


class CardBody extends PureComponent {
  render() {
    const { detailData } = this.props;
    const openingHours = detailData.openingHours && parseOpeningHours(detailData.openingHours);

    return (
      <CardBodyWrapper className={this.props.className}>
        {detailData.description && (
          <CardBodySection>
            <Description>{detailData.description}</Description>
          </CardBodySection>
        )}
        {detailData.website && (
          <CardBodySection>
            <CardSectionLeft>Website</CardSectionLeft>
            <WebsiteLinkContainer>
              <WebsiteLink href={detailData.website} target="_blank" rel="noopener noreferrer">
                {formatWebsite(detailData.website)}
              </WebsiteLink>
            </WebsiteLinkContainer>
          </CardBodySection>
        )}
        {openingHours && (
          <CardBodySection>
            <CardSectionLeft>Öffnungszeiten</CardSectionLeft>
            <CardSectionRight>
              <OpeningHours data={openingHours} />
            </CardSectionRight>
          </CardBodySection>
        )}
      </CardBodyWrapper>
    );
  }
}

export default connect(state => ({
  detailData: state.detailData,
}))(CardBody);
