module.exports = {
  displayName: 'feature-game',
  preset: '../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/libs/feature-game',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};
