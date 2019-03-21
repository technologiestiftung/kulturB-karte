import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ControlPositioner = styled.div`
  display: block;
  position: absolute;
  top: ${props => (props.position.includes('top') ? '15px' : 'auto')};
  right: ${props => (props.position.includes('right') ? '15px' : 'auto')};
  bottom: ${props => (props.position.includes('bottom') ? '15px' : 'auto')};
  left: ${props => (props.position.includes('left') ? '15px' : 'auto')};
`;

class ControlContainer extends PureComponent {
  static defaultProps = {
    position: 'top-left'
  }

  static propTypes = {
    position: PropTypes.string,
  }

  render() {
    const { position, className, children } = this.props;

    return (
      <ControlPositioner className={className} position={position}>
        {children}
      </ControlPositioner>
    );
  }
}

export default ControlContainer;
