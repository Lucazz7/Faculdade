import styled from 'styled-components';

export const ContainerRelatorio = styled.div`
  background: ${({ theme }) => theme.bg3};
  height: 100vh;
  width: 100%;
  display: flex;
  position: relative;
  padding: 0;
  margin: 0;
`;

export const IframesLooker = styled.iframe`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.bg3};
`