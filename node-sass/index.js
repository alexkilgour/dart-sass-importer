const sass = require('node-sass');

// Render
sass.renderSync({
	file: './node-sass/index.scss',
	importer: function (url) {
		console.log('node-sass render: ', url);
		return {
			file: "/some/random/path/file.scss",
			contents: "div {color: yellow;}"
		};
	}
});