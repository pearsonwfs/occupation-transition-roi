interface EnvironmentVariableMap {
  [key: string]: string;
}

function getRegion() {
  const isDevEnv =
    window._env_.APP_ENV === 'sandbox' ||
    window._env_.APP_ENV === 'development';
  return isDevEnv ? 'au' : 'us';
}

export const getAPIUrl = () => {
  const environment = window._env_.APP_ENV;

  const region: string = getRegion();
  const nonProdEnvMap: EnvironmentVariableMap = {
    sandbox: 'sbx',
    development: 'dev',
    stage: 'stg',
  };

  if (environment === 'production') {
    return `api.workforce.pearson.com`;
  }

  const suffix = environment === 'sandbox' ? `dev` : `non`;
  return `api-${region}.external-${nonProdEnvMap[environment]}.workforce-${suffix}.pearsondev.tech`;
};
