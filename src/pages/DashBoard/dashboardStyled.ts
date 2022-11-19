import styled from "styled-components";

export const Container = styled.div`
  background: ${({ theme }) => theme.bg3};
  width: 100%;
  display: inline-block;
  position: relative;
  padding: 0;
  margin: 0;
  overflow-x: hidden;
  overflow-y: hidden;
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.text};
  font-size: 15px;
  margin: 8px;
  text-align: center;
  justify-content: center;
  align-items: center;
`;

export const TitleBlocks = styled.div`
  color: ${({ theme }) => theme.text};
  font-size: 20px;
  max-width: 90%;
  min-width: 90%;
  margin-top: 5px;
  position: static;

`;

export const DivIconsBlocks = styled.div`
  display: flex;
  background: ${({ theme }) => theme.bg};
  max-width: 60%;
  min-width: 60%;
  min-height: 67vh;
  max-height: 67vh;
  margin-left: 35px;
  position: relative;
  color: ${({ theme }) => theme.text};
  border-radius: 14px;
  margin-top: 25px;
  justify-content: center;
`;

export const DivIconsPrevision = styled.div`
  display: flex;
  max-width: 99.5%;
  min-width: 99.5%;
  position: relative;
  color: ${({ theme }) => theme.text};
  margin-top: 20px;
  justify-content: space-between;
`;

export const DivIconsTemp = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${({ theme }) => theme.text};
  position: relative;
  padding: 15px 0 0 0;
  background: linear-gradient(
    45deg,
    ${({ theme }) => theme.bg},
    ${({ theme }) => theme.bg},
    ${({ theme }) => theme.primary},
    ${({ theme }) => theme.bg}

  );
  background-position: 0 0;
  border-radius: 14px;
  animation: bgLinear_move 15s infinite;
`;

export const DivIconsHistory = styled.div`
  display: flex;
  background: ${({ theme }) => theme.bg};
  max-width: 90%;
  min-width: 90%;
  min-height: 67vh;
  max-height: 67vh;
  margin-top: 25px;
  margin-left: 35px;
  justify-content: center;
  position: relative;
  color: ${({ theme }) => theme.text};
  border-radius: 14px;
  overflow-x: hidden;
  overflow: auto;
`;

export const SelectStyle = styled.select`
  background: ${({ theme }) => theme.primaryAlpha};
  margin-left: 20px;
  padding: 10px;
  align-items: center;
  position: relative;
  border: 1px solid ${({ theme }) => theme.primary};
  border-radius: 10px;
`;

export const ButtonStyle = styled.button`
  height: 100%;
  width: 100%;
  background: transparent;
  display: flex;
  border: none;
`;

export const ReturnButton = styled.div`
  display: flex;
  font-size: 33px;
  border-radius: 4px;
  text-align: center;
  justify-content: center;
  color: ${({ theme }) => theme.primary};
  position: relative;
  margin-left: 20px;
`;

export const ContainerTitleBt = styled.div`
  align-items: center;
  display: flex;
  width: 100%;
  height: 70px;
  z-index: 2;
  position: absolute;
  font-size: 24px;
  border: none;
  margin-top: 14px;
`;
export const TitleBLocks = styled.div`
  width: 100%;
  justify-content: center;
  display: flex;
`;

export const Left = styled.div`
  width: 230px;
  display: flex;
  color: ${({ theme }) => theme.text};
  border-radius: 5px;
  animation: bgLinear_move 15s infinite;
  z-index: 10;
  //margin-bottom: 14px; bordar em volta do name
  .topTime {
    top: 50px;
    left: 0;

    &:before {
      display: block;
      font-size: 12px;
      line-height: 2;
      letter-spacing: 10px;
      text-align: right;
      color: ${({ theme }) => theme.text};
    }
  }

  .inner {
    background-color: ${({ theme }) => theme.bg};
    padding: 10px 0 0 0 ;
    
  }

  .p {
    color: ${({ theme }) => theme.text};
    background: red;
    font-size: 18px;

  }

  .info {
    p {
      text-align: center;
      font-size: 15px;
      font-weight: bold;
      line-height: 1.5;
      letter-spacing: 1px;
    }
  }
`;

export const DayBox = styled.div`
  width: 100%;
  position: relative;
  cursor: pointer;
  color: ${({ theme }) => theme.text};
  .content {
    display: flex;
    width: 100%;
    height: 100%;
  }
  &:hover {
    transition-delay: 0s;
    overflow: hidden;
    .right {
      width: 250px;
      background-color: transparent;
      transition-delay: 0s;

      .weatherList {
        opacity: 1;
        left: 0;
        transition-delay: 0.5s;

        &:nth-child(1) {
          transition-delay: 0.5s;
        }

        &:nth-child(2) {
          transition-delay: 0.6s;
        }

        &:nth-child(3) {
          transition-delay: 0.7s;
        }

        &:nth-child(4) {
          transition-delay: 0.8s;
        }

        &:nth-child(5) {
          transition-delay: 0.9s;
        }

        &:nth-child(6) {
          transition-delay: 1s;
        }

        &:nth-child(7) {
          transition-delay: 1.1s;
        }
      }
    }
  }
`;
export const H3Styled = styled.h3`
  font-size: 12px;
  padding: 0px;
  margin: 20px;
  color: ${({ theme }) => theme.text};
  letter-spacing: 1px;
`;

export const PStyled = styled.p`
  font-size: 12px;
  padding: 0px;
  color: ${({ theme }) => theme.text};
  letter-spacing: 1px;
`;
export const BackPrevision = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  border-radius: 14px;
  padding: 20px;
  background-color: ${({ theme }) => theme.bg};
  min-width: 20px;
  min-height: 120px;
`;

export const IconsHistory = styled.div`
  color: ${({ theme }) => theme.primary};
  font-size: 33px;
`

export const LiHistory = styled.div`

  font-size: 15px;
  list-style-type: none;


  .li-history {
  margin: 10px;
  padding: 10px;
  border-radius: 15px;
  background-color: ${({ theme }) => theme.history};
  filter: drop-shadow(0px 0px 8px #ED5400);

  color: white;
}
.li-history:hover {
  background-color: ${({ theme }) => theme.primary};
}
`