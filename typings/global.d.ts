declare let ENV: string;

declare module '*.woff';
declare module '*.woff2';
declare module '*.ttf';

declare module '*.svg' {
  const content: any;
  export default content;
}

declare module '*.png' {
  const pngContent: any;
  export default pngContent;
}

interface Window {
  _env_: {
    APP_ENV: string;
    AUTH0_DOMAIN: string;
    AUTH0_APPLICATION_CLIENT_ID?: string;
    AUTH0_AUDIENCE: string;
    PUBLIC_URL: string;
    AUTH0_REDIRECT_URL: string;
    API_KEY: string;
  };
}
