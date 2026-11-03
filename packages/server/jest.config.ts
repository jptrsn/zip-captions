/* eslint-disable */
export default {
  displayName: 'server',
  preset: '../../jest.preset.js',
  testEnvironment: 'node',
  setupFiles: ['<rootDir>/src/test-setup.ts'],
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/packages/server',
};
