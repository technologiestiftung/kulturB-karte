import styled from 'styled-components';

const CardWrapper = styled.div`
  position: relative;
  background: #fff;
  border-radius: ${props => props.theme.borderRadius};
  max-height: 75vh;
`;

export default CardWrapper;
