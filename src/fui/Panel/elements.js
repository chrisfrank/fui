import { default as styled, keyframes } from 'styled-components';

const entrance = keyframes`
  0% {
    transform: translate3d(50%, 0, 0);
    opacity: 0;
  }
  100% {
    transform: translate3d(0,0,0);
    opacity: 1;
  }
`;

const ScrollDiv = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  box-sizing: border-box;
  transition: all 0.3s;
  flex: 1;
`;

const PanelDiv = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition-property: filter, left, width;
  transition-duration: ${props => props.transition}s;
  animation: ${props =>
    props.animate ? `${entrance} ${props.transition}s` : 'none'};
`;

export { PanelDiv, ScrollDiv };
