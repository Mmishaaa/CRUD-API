module.exports = {
  // [...]
  // extensionsToTreatAsEsm: ['.ts'],
  // globals: {
  //   'ts-jest': {
  //     useESM: true,
  //   },
  // },
  // moduleNameMapper: {
  //   '^(\\.{1,2}/.*)\\.js$': '$1',
  // },
  jest: {
    globalSetup: "./dist/tests/jest-config.js",
    moduleFileExtensions: ["ts", "js", "json"],
    testMatch: ["**/dist/**/*.test.js"],
    testEnvironment: "node",
  },
};
