module.exports = {
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: ["service/**/*.{js,jsx}"],
  coverageDirectory: "/tests/coverage",
  coverageReporters: ["json", ["lcov", { projectRoot: "./tests/coverage" }]],
};
