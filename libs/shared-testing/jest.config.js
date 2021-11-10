module.exports = {
  displayName: 'shared-testing',
  preset: '../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/libs/shared-testing',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};
