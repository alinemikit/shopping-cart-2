import { createGlobalStyle } from 'styled-components';

import GeneralSansRegularWoff2 from '../assets/fonts/GeneralSans/GeneralSans-Regular.woff2';
import GeneralSansRegularWoff from '../assets/fonts/GeneralSans/GeneralSans-Regular.woff';
import GeneralSansRegularTtf from '../assets/fonts/GeneralSans/GeneralSans-Regular.ttf';
import GeneralSansMediumWoff2 from '../assets/fonts/GeneralSans/GeneralSans-Medium.woff2';
import GeneralSansMediumWoff from '../assets/fonts/GeneralSans/GeneralSans-Medium.woff';
import GeneralSansMediumTtf from '../assets/fonts/GeneralSans/GeneralSans-Medium.ttf';
import GeneralSansSemiboldWoff2 from '../assets/fonts/GeneralSans/GeneralSans-Semibold.woff2';
import GeneralSansSemiboldWoff from '../assets/fonts/GeneralSans/GeneralSans-Semibold.woff';
import GeneralSansSemiboldTtf from '../assets/fonts/GeneralSans/GeneralSans-Semibold.ttf';

import DynaPuffBold from '../assets/fonts/DynaPuff/DynaPuff/DynaPuff-Bold.ttf';

export const GlobalStyles = createGlobalStyle`
@font-face {
    font-family: 'GeneralSans';
    font-weight: 400;
    font-display: 'swap';
    font-style: 'normal';
    src: url('${GeneralSansRegularWoff2}') format('woff2'),
          url('${GeneralSansRegularWoff}') format('woff'),
          url('${GeneralSansRegularTtf}') format('truetype');
  }

  @font-face {
    font-family: 'GeneralSans';
    font-weight: 500;
    font-display: 'swap';
    font-style: 'normal';
    src: url('${GeneralSansMediumWoff2}') format('woff2'),
          url('${GeneralSansMediumWoff}') format('woff'),
          url('${GeneralSansMediumTtf}') format('truetype');
  }

  @font-face {
    font-family: 'GeneralSans';
    font-weight: 600;
    font-display: 'swap';
    font-style: 'normal';
    src: url('${GeneralSansSemiboldWoff2}') format('woff2'),
          url('${GeneralSansSemiboldWoff}') format('woff'),
          url('${GeneralSansSemiboldTtf}') format('truetype');
  }

  @font-face {
    font-family: 'DynaPuff';
    font-weight: 600;
    font-display: 'swap';
    font-style: 'normal';
    src: url('${DynaPuffBold}') format('truetype');
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: GeneralSans, sans-serif;
  }

  body {
    /* background: #fafafa; */
    background: #fff;
    color: #333;
  }

  button {
    cursor: pointer;
    font-size: 1rem;
    color: #333;
  }
`;
