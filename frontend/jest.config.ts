import nextJest from 'next/jest';

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  testEnvironment: 'jest-environment-jsdom', 
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], 
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1', // Alias support
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // Use ts-jest for TypeScript files
  },
  collectCoverage: true,
  collectCoverageFrom: [
    'components/**/*.tsx',
    'pages/**/*.tsx',
    'utils/**/*.ts',  // You can add additional folders here for coverage
  ],
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  clearMocks: true, // Automatically reset mocks between tests
  testTimeout: 10000, // Optional: Increase test timeout if needed
};

export default createJestConfig(customJestConfig);
