import { createGlobalStyle } from 'styled-components';
import LimerickMedium from './static/fonts/limerick-serial-medium-regular.ttf';
import LimerickLight from './static/fonts/limerick-serial-light-regular.ttf';
import LimerickBold from './static/fonts/limerick-serial-bold.ttf';

const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: LimerickMedium;
  src: url(${LimerickMedium}) format('truetype');
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: LimerickLight;
  src: url(${LimerickLight}) format('truetype');
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: LimerickBold;
  src: url(${LimerickBold}) format('truetype');
  font-weight: normal;
  font-style: normal;
}

  html,
  body {
    height: 100%;
    width: 100%;
    font-family: LimerickLight;
    
  }

  body {
    font-family: 'LimerickLight',Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'LimerickLight','Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: 'LimerickLight',Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }
`;

export default GlobalStyle;
