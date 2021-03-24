module.exports = {
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: ["service/**/*.{js,jsx}"],
  coverageReporters: ["json", ["lcov", { projectRoot: "./" }]],
  coverageDirectory: './tests/coverage'
};
