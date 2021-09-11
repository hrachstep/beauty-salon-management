"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("ts-jest/utils");
const tsconfig_json_1 = require("./tsconfig.json");
exports.default = {
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
    moduleNameMapper: utils_1.pathsToModuleNameMapper(tsconfig_json_1.compilerOptions.paths, { prefix: '<rootDir>/src/' }),
    preset: 'ts-jest',
    testMatch: [
        '**/*.spec.ts',
    ],
    setupFilesAfterEnv: ['<rootDir>/.jest/setup.ts'],
};
