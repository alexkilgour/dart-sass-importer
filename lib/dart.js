const fs = require('fs').promises;
const sass = require('sass');

async function renderData() {
	const content = await fs.readFile('./lib/dart-sass/index.scss', 'utf-8');
	const calledByImporter = [];

	const result = sass.renderSync({
		data: content,
		includePaths: ['./lib/dart-sass/'],
		importer: function (url) {
			const returnValue = {file: url};

			// Importer was called
			calledByImporter.push(url);

			// Fake response to stop an error being thrown
			if (url === 'missing') {
				returnValue.contents = `div.missing {content: '${url}';}`
			}

			return returnValue;
		}
	});

	return {
		calledByImporter: calledByImporter,
		includedFiles: result.stats.includedFiles,
		data: result.css.toString()
	}
}

async function renderFile() {
	const calledByImporter = [];

	const result = sass.renderSync({
		file: './lib/node-sass/index.scss',
		importer: function (url) {
			const returnValue = {file: url};

			// Importer was called
			calledByImporter.push(url);

			// Fake response to stop an error being thrown
			if (url === 'missing') {
				returnValue.contents = `div {content: '${url}';}`
			}

			return returnValue;
		}
	});

	return {
		calledByImporter: calledByImporter,
		includedFiles: result.stats.includedFiles,
		data: result.css.toString()
	}
}

async function compileData() {
	const content = await fs.readFile('./lib/dart-sass/index.scss', 'utf-8');
	const calledByImporter = [];

	const result = sass.compileString(content, {
		loadPaths: ['./lib/dart-sass/'],
		importers: [{
			canonicalize(url) {
				// Importer was called
				calledByImporter.push(url);

				// Fake response to stop an error being thrown
				if (url === 'missing') {
					return new URL(url, 'http://example.com');
				}

				return null;
			},
			load(canonicalUrl) {
				return {
					contents: `body {content: '${canonicalUrl.pathname}'}`,
					syntax: 'scss'
				};
			}
		}]
	});

	return {
		calledByImporter: calledByImporter,
		includedFiles: result.loadedUrls.map(url => url.pathname),
		data: result.css.toString()
	}
}

async function compileFile() {
	const calledByImporter = [];

	const result = sass.compile('./lib/dart-sass/index.scss', {
		importers: [{
			canonicalize(url) {
				// Importer was called
				calledByImporter.push(url);

				// Fake response to stop an error being thrown
				if (url === 'missing') {
					return new URL(url, 'http://example.com');
				}

				return null;
			},
			load(canonicalUrl) {
				return {
					contents: `body {content: '${canonicalUrl.pathname}'}`,
					syntax: 'scss'
				};
			}
		}]
	});

	return {
		calledByImporter: calledByImporter,
		includedFiles: result.loadedUrls.map(url => url.pathname),
		data: result.css.toString()
	}
}

module.exports = {
	renderData,
	renderFile,
	compileData,
	compileFile
}