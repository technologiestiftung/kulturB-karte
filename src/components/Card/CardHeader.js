import React, { PureComponent } from 'react';
import { connect } from 'unistore/react';
import styled from 'styled-components';
import idx from 'idx';
import FavIcon from '@material-ui/icons/BookmarkBorder';
import UnFavIcon from '@material-ui/icons/Bookmark';

import CategoryLabels from '~/components/CategoryLabels';
import Button from '~/components/GhostButton';
import Actions from '~/state/Actions';

const StyledCategoryLabels = styled(CategoryLabels)``;

const CardAddress = styled.div`
  font-size: 12px;
  color: ${props => props.theme.colors.textgrey};
`;

const CardHeaderWrapper = styled.div`
  display: flex;
  background: ${props => (props.teaserUrl ? `url(${props.teaserUrl}) no-repeat center center` : 'none')};
  background-size: cover;
  color: white;
  height: ${props => (props.teaserUrl ? '150px' : 'auto')};

  ${CardAddress} {
    color: ${props => (props.teaserUrl ? 'white' : props.theme.colors.textgrey)};
  }
`;

const CardHeaderLeft = styled.div`
  overflow: hidden;
  margin-right: 10px;
`;

const CardHeaderRight = styled.div`
  margin-left: auto;
`;

const CardImage = styled.div`
  display: block;
  width: 70px;
  height: 70px;
  background-image: ${props => `url(${props.src})`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100%;
`;

const CardTitle = styled.div`
  font-size: 14px;
  font-weight: bold;
  margin: 4px 0;
  line-height: 1.2;
`;

const FavButton = styled(Button)`
  color: #222;
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${props => (props.active ? 1 : 0.7)};

  svg {
    width: 18px;
    height: 18px;
  }
`;

class CardHeader extends PureComponent {
  render() {
    const {
      data, className, isListMode, toggleFav, favs
    } = this.props;
    const logoUrl = idx(data, _ => _.logo.url);
    const teaserUrl = idx(data, _ => _.teaser.url);
    const isFav = favs.includes(data.id);

    return (
      <CardHeaderWrapper
        className={className}
        teaserUrl={teaserUrl}
      >
        <CardHeaderLeft>
          <StyledCategoryLabels categories={data.tags} hasBorder={teaserUrl} />
          <CardTitle>{data.name}</CardTitle>
          <CardAddress>{data.address}</CardAddress>
        </CardHeaderLeft>
        <CardHeaderRight>
          {(logoUrl && !isListMode && !teaserUrl) && <CardImage src={logoUrl} />}
          {isListMode && (
            <FavButton
              onClick={() => toggleFav(data.id)}
              active={isFav}
            >
              {isFav ? <UnFavIcon /> : <FavIcon />}
            </FavButton>
          )}
        </CardHeaderRight>
      </CardHeaderWrapper>
    );
  }
}

export default connect(state => ({
  favs: state.favs
}), Actions)(CardHeader);
