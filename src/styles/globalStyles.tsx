import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    *, *::before, *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        
    }

    body {
        background: white;
        color: black;
        font-family: 'Roboto', sans-serif;
        letter-spacing: .6px;
    }
`;
