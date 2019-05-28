import React, { PureComponent, Fragment } from 'react';
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

const CardTitle = styled.div`
  font-size: 14px;
  font-weight: bold;
  margin: 4px 0;
  line-height: 1.2;
`;

const CardHeaderWrapper = styled.div`
  display: flex;

  ${CardAddress} {
    color: ${props => (props.teaserUrl ? 'white' : props.theme.colors.textgrey)};
  }

  ${CardTitle} {
    color: ${props => (props.teaserUrl ? 'white' : props.theme.colors.black)};
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
  background-image: ${props => `url(${props.src.replace(/\s/g, '%20')})`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
`;

const CardTeaserImage = styled.div`
  background: ${props => `url(${props.src}) no-repeat center center`};
  background-size: cover;
  height: 150px;
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
      <Fragment>
        <CardHeaderWrapper
          className={className}
        >
          <CardHeaderLeft>
            <StyledCategoryLabels categories={data.tags} hasBorder={teaserUrl} />
            <CardTitle>{data.name}</CardTitle>
            <CardAddress>{data.address}</CardAddress>
          </CardHeaderLeft>
          <CardHeaderRight>
            {(logoUrl && !isListMode) && <CardImage src={logoUrl} />}
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
        {teaserUrl && <CardTeaserImage src={teaserUrl} />}
      </Fragment>
    );
  }
}

export default connect(state => ({
  favs: state.favs
}), Actions)(CardHeader);
