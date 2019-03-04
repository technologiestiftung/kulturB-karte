import styled from 'styled-components';

export default styled.div`
  margin-bottom: 10px;
  font-family: ${props => props.theme.fonts.mono };
  letter-spacing: 0.1;
  text-transform: uppercase;
  font-size: ${props => props.theme.fontSizes[2]};
  font-weight: 700;
`;
