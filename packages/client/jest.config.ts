/* eslint-disable */
export default {
  displayName: 'client',
  moduleNameMapper: {
    '.*worker.util': 'packages/client/src/app/services/worker.util.mock.ts'
  },
  preset: '../../jest.preset.js',
  setupFiles: ['jest-wake-lock-mock'],
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/\\._'],
  coverageDirectory: '../../coverage/packages/client',
  transform: {
    '^.+\\.(ts|mjs|js|html)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.(html|svg)$',
      },
    ],
  },
  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
};
