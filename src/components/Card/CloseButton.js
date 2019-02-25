import styled from 'styled-components';

const Close = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: ${props => props.theme.colors.primary};
  right: -10px;
  top: -15px;
  cursor: pointer;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.24);

  &:hover {
    opacity: .8;
  }
`;

export default Close;
