module.exports = function () {
  return {
    tests: {
      override: (filePatterns) => {
        filePatterns.push('**/*.e2e-spec.ts');
        return filePatterns;
      }
    },
    filesWithNoCoverageCalculated: [
      'src/**/*-dto.ts',
      'src/**/*.factory.ts',
      'src/**/*.module.ts',
      'src/**/*.provider.ts',
      'src/**/*.schema.ts',
      'src/interfaces.ts',
      'src/main.ts',
      'src/types.ts',
      'test/**/*',
      'jest.config.ts',
      'wallaby.conf.js'
    ],
    env: {
      type: 'node',
      runner: 'node'
    },
    testFramework: {
      configFile: './jest.config.ts'
    }
  };
};
