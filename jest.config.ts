import type { Config } from '@jest/types';
import { defaults } from 'jest-config';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  verbose: true,
  testEnvironment: 'jsdom',
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'ts-jest',
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2|svg)$':
      'jest-transform-stub',
  },
  transformIgnorePatterns: ['node_modules/(?!(@pearsonwfs/component-library)/'],
  globals: {
    ENV: 'development',
    'ts-jest': {
      useESM: true,
      isolatedModules: true,
    },
  },
  moduleDirectories: ['node_modules', 'src'],
  collectCoverage: true,
  collectCoverageFrom: ['./src/**/*.ts'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    './src/styles/',
    './src/constants/',
    'assets/base64/',
    'requests/',
    'utils/initDatadog.ts',
    'screens/ImpactJobs/useImpactJobsData.ts',
    'components/shared/ResetMapControl.ts',
    'utils/tests.ts',
  ],
  coverageThreshold: {
    global: {
      lines: 80,
      branches: 80,
    },
  },
};

export default config;
