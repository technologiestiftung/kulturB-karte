import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { connect } from 'unistore/react';

import FavIcon from '@material-ui/icons/BookmarkBorder';
import UnFavIcon from '@material-ui/icons/Bookmark';
// import ShareIcon from '@material-ui/icons/Reply';

import Button from '~/components/Button';

import Actions from '~/state/Actions';

const CardActionsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${props => props.theme.padding[1]};
  max-width: 220px;
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

// const StyledShareIcon = styled(ShareIcon)`
//   transform: scale(-1, 1);
//   font-size: 13px !important;
// `;

class CardActions extends PureComponent {
  render() {
    const { data, toggleFav, favs } = this.props;
    const isFav = favs.includes(data.id);

    return (
      <CardActionsWrapper>
        <Button
          onClick={() => toggleFav(data.id)}
          active={isFav}
        >
          {isFav ? <StyledUnFavIcon /> : <StyledFavIcon />}
          <span>Merken</span>
        </Button>
        { /* <Button><StyledShareIcon /> Teilen</Button> */ }
      </CardActionsWrapper>
    );
  }
}

export default connect(state => ({
  favs: state.favs
}), Actions)(CardActions);
