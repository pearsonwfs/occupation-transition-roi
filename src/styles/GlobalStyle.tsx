import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

const GlobalStyle = createGlobalStyle`
  ${normalize}
  html {
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale; 
    text-rendering: optimizeLegibility;
    background-color: "#f3f6f8";
  }
  body {
    font-family: Foundry Sterling, -apple-system, BlinkMacSystemFont, Segoe UI,
    Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, Icons16,
    sans-serif;
  }
  button, a {
    outline-color: #00B5AC;
  }
  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }
  .mapboxgl-reset-control {
    width: 29px;
    height: 29px;
    background-color: #fff;
    box-shadow: 0 0 0 2px rgb(0 0 0 / 10%);
    border-radius: 4px;
    background-image: url('data:image/svg+xml,%3Csvg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="base"%3E%3Cpath d="M8.07991 6.6125L12.5035 3.11367C12.5971 3.04251 12.7139 3 12.84 3C13.0969 3 13.3134 3.17506 13.3794 3.41372C13.3928 3.46237 13.4 3.51367 13.4 3.56667L13.3999 3.57669L13.3999 5.97642C14.3745 6.17773 15.301 6.58809 16.1145 7.18613C17.3104 8.06537 18.2006 9.30516 18.6574 10.7278C19.1142 12.1504 19.1142 13.6829 18.6574 15.1055C18.2006 16.5282 17.3104 17.768 16.1145 18.6472C14.9186 19.5264 13.4783 20 12 20C10.5217 20 9.08144 19.5264 7.8855 18.6472C6.68957 17.768 5.79941 16.5282 5.3426 15.1055C4.94365 13.8631 4.89313 12.5368 5.19102 11.2732C5.26279 10.9687 5.58105 10.8062 5.8752 10.9029L7.47297 11.4282C7.76711 11.5249 7.92409 11.8445 7.86847 12.1524C7.74373 12.8428 7.78943 13.5569 8.00556 14.23C8.27965 15.0836 8.81374 15.8274 9.5313 16.355C10.2489 16.8825 11.113 17.1667 12 17.1667C12.887 17.1667 13.7511 16.8825 14.4687 16.355C15.1863 15.8274 15.7204 15.0836 15.9944 14.23C16.2685 13.3764 16.2685 12.4569 15.9944 11.6033C15.7204 10.7498 15.1863 10.0059 14.4687 9.47834C14.1393 9.2362 13.7791 9.04534 13.3999 8.9097L13.3999 10.9023L13.3998 10.9165L13.4 10.9334C13.4 11.2463 13.1493 11.5 12.84 11.5C12.6907 11.5 12.5551 11.4409 12.4547 11.3446L8.07991 7.60417C8.07089 7.59733 8.06244 7.59037 8.05453 7.5833C7.90133 7.48219 7.80007 7.30723 7.80007 7.10833C7.80007 6.90367 7.90729 6.72435 8.068 6.62475C8.07122 6.6202 8.07517 6.6161 8.07991 6.6125Z" fill="currentColor"%3E%3C/path%3E%3C/svg%3E');
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: 24px;
    cursor: pointer;
  }
  
`;

export default GlobalStyle;
