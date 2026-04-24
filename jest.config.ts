import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.app.json',
    },
  },
  moduleNameMapper: {
    '\\.(svg)$': 'jest-transform-stub',
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.(svg)$': 'jest-transform-stub',
  },
  transformIgnorePatterns: ['/node_modules/(?!d3|d3-array|internmap|delaunator|robust-predicates)'],
};

export default config;
