import styled from 'styled-components';

export const Divmain = styled.div`
width: 100%;
height: 100vh;
@media screen and (max-width: 800px) {
  .Content{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
  }
  .container-input{
    width: 60%;
    height: 40%;
    display: flex;
    align-items: center;
    backdrop-filter: blur(1px);
  }
  .titulo{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .input-value{
    display: flex;
    width: 75%;
    height: 10%;
    align-items: center;
    justify-content: center;
  }
  .loginButton{
    margin-bottom: 40px;
    width: 35%;
    height: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
};
@media screen and (max-height: 800px) {
  .content{
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
  }
  .container-input{
    width: 50%;
    height: 90%;
    display: flex;
    align-items: center;
    backdrop-filter: blur(1px);

  }
  .Titulo{
    width: 10%;
    height: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .input-value{
    width: 75%;
    height: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .loginButton{
    width: 30%;
    height: 12%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
`;

export const VideoBackground = styled.video`
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: flex;
`;

export const Content = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
`;

export const ContainerInput = styled.div`
    display: flex;
    backdrop-filter: blur(3px);
    margin-left: 20px;
    margin-right: 20px;
    margin-bottom: 20px;
    display: flex;
    border-radius: 20px;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    overflow-x: hidden;
    overflow-y: hidden;
    z-index: 1;
    text-align: center;
    background-color: rgba(38, 38, 38, 0.2);
    @media screen and (min-width: 300px) {
    display: flex;
    margin-left: 20px;
    margin-right: 20px;
    margin-bottom: 20px;
    width: 20%;
    height: 58%;
    .TitleEmail{
        font-size: 12px;
        align-self: start;
        margin-left: 50px;
        margin-bottom: 5px;
    }
    }
    @media screen and (max-width: 1050px) {
        display: flex;
        margin-left: 20px;
        margin-right: 20px;
        margin-bottom: 20px;
        width: 40%;
        height: 60%;
        .title-Email{
            font-size: 12px;
            align-self: start;
            margin-left: 50px;
            margin-bottom: 5px;
        }
        }
`;

export const Titulo = styled.img`
    display: flex;
    text-align: center;
    width: 300px;
    height: 160px;
`;

export const InputValue = styled.input`
    display: flex;
    width: 80%;
    border-radius: 5px;
    border: 1px solid rgb(254, 254, 254);
    padding-bottom: 10px;
    padding: 8px;
    background-color: rgba(212, 207, 207, 0.659);
    background: rgb(213, 213, 213);
    font-size: 16px;
    color: rgb(26, 26, 26);
    margin-bottom: 15px;
`;

export const TitleEmail = styled.p`
    font-size: 18px;
    margin-bottom: 5px;
    margin-right: 100px;
    @media screen and (min-width: 300px) {
        margin-left: 100px;
    }
    @media screen and (max-width: 800px) {
        margin-left: 70px;
    }
`;


export const SenhaTitle = styled.p`
  font-size: 18px;
  margin-bottom: 5px;
  margin-right: 100px;
  @media screen and (min-width: 300px) {
      margin-left: 100px;
  }
  @media screen and (max-width: 800px) {
      margin-left: 70px;
  }
`;

export const LoginButton = styled.button`
    margin-top: 12px;
    display: flex;
    background:linear-gradient(to bottom, #e68600 5%, #f76b00 100%);
    background-color:#e68600;
    border-radius:9px;
    border:2px solid #000000;
    display:inline-block;
    cursor:pointer;
    color:#ffffff;
    font-family:Arial;
    font-size:21px;
    font-weight:bold;
    padding: 8px 15px;
    text-decoration:none;
    text-shadow:0px 7px 4px #ffab0f;
    :hover {
        background:linear-gradient(to bottom, #f76b00 5%, #e68600 100%);
        background-color:#f76b00;
    }
    :active {
        position:relative;
        top:1px;
    }
`;
