import styled, { css } from 'styled-components';

const activeStyle = css`
  background: ${props => props.theme.colors.secondary};
  border-color: ${props => props.theme.colors.secondary};
  color: white;
`;

export default styled.button`
  color: #111;
  outline: none;
  border: 1px solid #111;
  border-radius: 4px;
  font-weight: 400;
  padding: ${props => props.theme.padding[0]} ${props => props.theme.padding[1]};
  font-size: 13px;
  line-height: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all .3s;

  &:hover {
    ${activeStyle};
  }

  ${props => (props.active ? activeStyle : '')};
`;
