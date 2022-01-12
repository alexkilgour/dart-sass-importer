const sass = require('sass');

// Legacy render
sass.renderSync({
	file: './dart-sass/index.scss',
	importer: [
		function (url) {
			console.log('dart-sass render: ', url);
			return {
				file: "/some/random/path/file.scss",
				contents: "div {color: yellow;}"
			};
		}
	]
});

// Compile
sass.compile('./dart-sass/index.scss', {
	importers: [{
		canonicalize(url) {
			console.log('dart-sass compile: ', url);
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