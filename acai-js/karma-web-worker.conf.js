module.exports = config => {
  config.set({
    frameworks: ['mocha-webworker'],
    files: [
      {
        pattern: 'test/web-worker.js',
        included: false,
      },
      {
        pattern: 'acai.js',
        included: false,
      },
      {
        pattern: 'node_modules/sinon/pkg/sinon.js',
        included: false,
      },
    ],
    browsers: ['ChromeHeadless'],
    autoWatch: false,
    singleRun: true,
    reporters: ['mocha'],
    client: {
      mochaWebWorker: {
        pattern: [
          'test/web-worker.js',
          'acai.js',
          'node_modules/sinon/pkg/sinon.js'
        ],
        worker: 'Worker',
        mocha: {
          ui: 'bdd'
        }
      }
    }
  });
};
