import styled from 'styled-components';

export const ContainerUser = styled.div`
  background: ${({ theme }) => theme.bg3};
  position: relative;
  padding: 0;
  margin: 0;
  overflow: auto;
  width: 100%;
  height: 100vh;
  display: column;
  overflow-x: hidden;

`;

export const ImgUser = styled.img`
  width: 50px;
  height: 50px;
  margin: 10px;
  border-radius: 20px;
`;

export const TableUser = styled.table`
  display: inline-block;
  background: ${({ theme }) => theme.bg};
  width: 70%;
  height: 80%;
  margin: 20px;
  padding: 20px;
  position: relative;
  color: ${({ theme }) => theme.text};
  border-radius: 14px;
  align-items: column;
  overflow: auto;
`;

export const ThUser = styled.th`
  padding: 12px;
  margin: 20px;
  align-items: center;
`;

export const TdUser = styled.td`
  padding: 12px;
`;

export const DivNewUser = styled.div`
  display: inline-block;
  position: relative;
  align-items: center;
  margin: 10px;
  height: 40px;
  width: 100%;
`;

export const TitleUser = styled.h1`
  display: flex;
  color: ${({ theme }) => theme.text};
  align-items: center;
  margin: 15px;
`;

export const BtNewUser = styled.button`
  display: flex;
  margin: 15px;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.txtButton};
  border-radius: 5px;
  padding: 7px;
  border: none;
`;
