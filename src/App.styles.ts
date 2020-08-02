import styled, { createGlobalStyle } from 'styled-components';
//@ts-ignore
import BGImage from './images/background.jpg';

export const GlobalStyle = createGlobalStyle`

    * {
        font-family: 'Catamaran', sans-serif;
    }

    html {
        height: 100%;
    }

    body {
        background-image: url(${BGImage});
        background-size: cover;
        margin: 0;
        padding: 0 20px;
        display: flex;
        justify-content: center;
    }

`;

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;~

    > p {
        color: #fff;

    }

    .loading {
        background: #fff;
        padding: 10px;
        color: #555;
    }

    .score {
        color: #fff;
        font-size: 2rem;
        margin: 0;
    }

    h1 {
        font-family: Fascinate Inline, Arial;
        background-image: linear-gradient(180deg, #fff, #87f1ff);
        background-size: 100%;
        background-clip: text;
        -webkit-background-clip: text;
        -moz-background-clip: text;
        -moz-text-fill-color: transparent;
        filter: drop-shadow(2px 2px #87f1ff);
        font-size: 50px;
        font-weight: 400;
        text-align: center;
        text-transform: uppercase;
    }

    .start, .next {
        cursor: pointer;
        background: linear-gradient(180deg, #fff, #ffcc91);
        border: 2px solid #d38558;
        box-shadow: 0px 5px 10px rgba(0,0,0,0.25);
        border-radius: 10px;
        height: 40px;
        margin: 20px 0;
        padding: 0 40px
    }

    .start {
        width: 200px;
    }
`;