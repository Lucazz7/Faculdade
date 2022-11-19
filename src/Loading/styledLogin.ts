import styled from 'styled-components';

export const SpinneBox = styled.div `
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    text-align: center;
    background-color: transparent;
`

export const BordStyledOne = styled.div `
    position: absolute;
    width: 150px;
    height: 150px;
    padding: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background: transparente;
    animation: spin3D 1.8s linear 0s infinite;
`
export const ArcoOne = styled.div `
    width: 100%;
    height: 100%;
    background-color: transparente;
    border-radius: 50%;
`

export const BordStyledTwo = styled.div `
    position: absolute;
    width: 150px;
    height: 150px;  
    padding: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background: transparente;
    animation: spin3D 2.2s linear 0s infinite;
`

export const ArcoTwo = styled.div `
    width: 100%;
    height: 100%;
    background-color: transparente;
    border-radius: 50%;
`

export const ContentLogin = styled.div`
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
