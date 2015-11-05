// Karma configuration
module.exports = function(config) {
	config.set({
		basePath: '',
		frameworks: ['browserify', 'jasmine'],
		files: [
      'lib/**/*.js',
      'test/specs/**/*.js',
			'px-*.html',
			{
				pattern: 'bower_components/**/*.js',
				included: false
			},
			{
				pattern: 'bower_components/**/*.html',
				included: false
			}
		],
		exclude: [
			'test/e2e/*.js',
			'**/bower_components/**/*-spec.*',
			'bower_components/**/*-spec.*'
		],
		reporters: ['progress', 'coverage'],
		port: 9090,
		runnerPort: 9100,
		colors: true,
		logLevel: config.LOG_INFO,
		autoWatch: false,
		client: {
			captureConsole: true,
			useIframe: false
		},
		browsers: ['PhantomJS'],
		captureTimeout: 5000,
		singleRun: true,
		preprocessors: {
      'lib/**/*.js': ['browserify'],
      'test/specs/**/*.js': ['browserify'],
			'dist/*.js': ['coverage']
		},
    browserify: {
      debug: true,
      transform: [ 'babelify' ]
    },
		coverageReporter: {
			type: 'html',
			dir: 'coverage/',
			subdir: function(browser) {
				return browser.toLowerCase().split(/[ /-]/)[0];
			}
		}
	});
};
