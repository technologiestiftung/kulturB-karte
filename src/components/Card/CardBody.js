import React, { PureComponent } from 'react';
import { connect } from 'unistore/react';
import styled from 'styled-components';
import { SimpleOpeningHours } from 'simple-opening-hours';

import OpeningHours from '~/components/OpeningHours';
import WebsiteLink from '~/components/Link';
import Accessibility from '~/components/Accessibility';
import Transportation from '~/components/Transportation';
import SocialMedia from '~/components/SocialMedia';

const CardBodyWrapper = styled.div`
  font-size: ${props => props.theme.fontSizes[0]};
`;

const CardBodySection = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const CardSectionLeft = styled.div`
  margin-right: 10px;
  min-width: 35%;
  width: 35%;
`;

const CardSectionRight = styled.div`
  margin-left: auto;
  text-align: right;
  flex-grow: 1;
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

  a {
    font-weight: 400;
  }
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
    const openingHours = detailData.openingHours && new SimpleOpeningHours(detailData.openingHours);
    const hasSocial = (
      detailData.twitter
      || detailData.facebook
      || detailData.instagram
      || detailData.youtube
    );

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

        {hasSocial && (
          <CardBodySection>
            <CardSectionLeft>Socialmedia</CardSectionLeft>
            <CardSectionRight>
              <SocialMedia data={detailData} />
            </CardSectionRight>
          </CardBodySection>
        )}

        <CardBodySection>
          <CardSectionLeft>Öffnungszeiten</CardSectionLeft>
          <CardSectionRight>
            <OpeningHours data={detailData.openingHours ? openingHours.getTable() : null} />
          </CardSectionRight>
        </CardBodySection>

        {detailData.transportation && (
          <CardBodySection>
            <CardSectionLeft>ÖPNV</CardSectionLeft>
            <CardSectionRight>
              <Transportation data={detailData.transportation} />
            </CardSectionRight>
          </CardBodySection>
        )}

        <CardBodySection>
          <CardSectionLeft>Barrierefreiheit</CardSectionLeft>
          <CardSectionRight>
            <Accessibility data={detailData} />
          </CardSectionRight>
        </CardBodySection>

      </CardBodyWrapper>
    );
  }
}

export default connect(state => ({
  detailData: state.detailData,
}))(CardBody);
