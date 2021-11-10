module.exports = {
  displayName: 'jiji',
  preset: '../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/libs/jiji',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};
