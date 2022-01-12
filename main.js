const sass = require('sass');

// Legacy render
sass.renderSync({
	file: './index.scss',
	importer: [
		function (url) {
			console.log('render: ', url);
			return {};
		}
	]
});

// Compile
sass.compile('./index.scss', {
	importers: [{
		canonicalize(url) {
			console.log('compile: ', url);
			return new URL(url, 'http://example.com');
		},
		load(canonicalUrl) {
			return {
				contents: `.example { content: ${canonicalUrl.pathname} }`,
				syntax: 'scss'
			};
		}
	}]
});