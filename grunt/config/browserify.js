// See https://github.com/jmreidy/grunt-browserify
module.exports = {
	build: {
		files: {
			"dist/yoast-seo.js": [ "js/bc/back-compat.js" ],
		},
		options: {
			browserifyOptions: {
				debug: true,
			},
		},
	},
	example: {
		files: {
			"examples/browserified/example-browserified.js": [ "examples/browserified/example.js" ],
		},
		options: {
			browserifyOptions: {
				debug: true,
			},
		},
	},
};
