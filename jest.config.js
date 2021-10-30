module.exports = {
  "collectCoverage": true,
  "coverageDirectory": "reports",
  "collectCoverageFrom": [
    "src/**/*.ts",
    "!**/node_modules/**"
  ],
  "coverageReporters": [
    "clover",
    // "html",
    "text-summary"
  ],
  "coverageThreshold": {
    "global": {
      "branches": 10,
      "functions": 10,
      "lines": 10,
      "statements": 10
    }
  },
  "moduleFileExtensions": [
    "js", "ts"
  ],
  "modulePaths": [
    "<rootDir>"
  ],
  "testRegex": "(/__tests__/.*|\\.test)\\.ts$"
}