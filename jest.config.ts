import { pathsToModuleNameMapper } from 'ts-jest/utils';

import { compilerOptions } from './tsconfig.json';

export default {
  roots: ['<rootDir>/src'],
  bail: true,
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/domain/entities/*.ts',
    '!<rootDir>/src/domain/interfaces/*.ts',
    '!<rootDir>/src/main/interfaces/*.ts',
  ],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/src/' }),
  preset: 'ts-jest',
  testMatch: [
    '**/*.spec.ts',
  ],
  setupFilesAfterEnv: ['<rootDir>/.jest/setup.ts'],
};
