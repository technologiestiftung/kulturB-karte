import React, { PureComponent } from 'react';
import { connect } from 'unistore/react';
import styled from 'styled-components';
import idx from 'idx';
import FavIcon from '@material-ui/icons/BookmarkBorder';
import UnFavIcon from '@material-ui/icons/Bookmark';

import CategoryLabels from '~/components/CategoryLabels';
import Button from '~/components/GhostButton';
import Actions from '~/state/Actions';

const CardHeaderWrapper = styled.div`
  display: flex;
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

const CardAddress = styled.div`
  font-size: 12px;
  color: ${props => props.theme.colors.textgrey};
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
    const hasLogo = idx(data, _ => _.logo.url);
    const isFav = favs.includes(data.id);

    return (
      <CardHeaderWrapper className={className}>
        <CardHeaderLeft>
          <CategoryLabels categories={data.tags} />
          <CardTitle>{data.name}</CardTitle>
          <CardAddress>{data.address}</CardAddress>
        </CardHeaderLeft>
        <CardHeaderRight>
          {(hasLogo && !isListMode) && <CardImage src={data.logo.url} />}
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
