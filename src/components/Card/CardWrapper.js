import styled from 'styled-components';

const CardWrapper = styled.div`
  position: relative;
  box-shadow: ${props => props.theme.boxShadow};
  background: #fff;
  border-radius: ${props => props.theme.borderRadius};
`;

export default CardWrapper;
