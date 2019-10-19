module.exports = {
  "testEnvironment": "node",
  "collectCoverage": true,
  "collectCoverageFrom": [
    "agent/src/**/*.ts",
    "!agent/src/*.d.ts"
  ],
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
  "testMatch": ["**/__tests__/*.spec.+(ts|tsx|js)"],
  "testPathIgnorePatterns": ["/node_modules/", "/agent/dist/"],
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ]
}

