import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { connect } from 'unistore/react';

import FavIcon from '@material-ui/icons/BookmarkBorder';
import UnFavIcon from '@material-ui/icons/Bookmark';
import EditIcon from '@material-ui/icons/Create';
// import ShareIcon from '@material-ui/icons/Reply';

import Button from '~/components/Button';
import Link from '~/components/Link';

import Actions from '~/state/Actions';

const CardActionsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${props => props.theme.padding[1]};
`;

const StyledFavIcon = styled(FavIcon)`
  font-size: 15px !important;
  margin-right: 2px;
  margin-top: -2px;
`;

const StyledUnFavIcon = styled(UnFavIcon)`
  font-size: 15px !important;
  margin-right: 2px;
  margin-top: -2px;
`;

const StyledEditIcon = styled(EditIcon)`
  font-size: 15px !important;
  margin-right: 2px;
  margin-top: -2px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

// const StyledShareIcon = styled(ShareIcon)`
//   transform: scale(-1, 1);
//   font-size: 13px !important;
// `;

class CardActions extends PureComponent {
  render() {
    const { data, toggleFav, favs } = this.props;
    const isFav = favs.includes(data.id);
    const favButtonLabel = isFav ? 'nicht mehr merken' : 'zur Merkliste';
    const correctionLink = `${config.cms.base}${config.cms.locations}/${data.id}`;

    return (
      <CardActionsWrapper>
        <Button
          onClick={() => toggleFav(data.id)}
          active={isFav}
        >
          {isFav ? <StyledUnFavIcon /> : <StyledFavIcon />}
          <span>{favButtonLabel}</span>
        </Button>
        <StyledLink target="_blank" rel="noopener noreferrer" href={correctionLink}>
          <Button>
            <StyledEditIcon />
            <span>Eintrag bearbeiten</span>
          </Button>
        </StyledLink>
      </CardActionsWrapper>
    );
  }
}

export default connect(state => ({
  favs: state.favs
}), Actions)(CardActions);
