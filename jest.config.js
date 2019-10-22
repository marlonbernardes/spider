module.exports = {
  "testEnvironment": "node",
  "collectCoverage": true,
  "collectCoverageFrom": [
    "src/**/*.ts",
    "!src/*.d.ts"
  ],
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
  "testMatch": ["**/__tests__/*.spec.+(ts|tsx|js)"],
  "testPathIgnorePatterns": ["/node_modules/", "/dist/"],
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ]
}

