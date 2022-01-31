const sass = require('node-sass');
const fs = require('fs').promises;

async function renderData() {
	const content = await fs.readFile('./node-sass/index.scss', 'utf-8');
	const calledByImporter = [];

	const result = sass.renderSync({
		data: content,
		includePaths: ['./node-sass/'],
		importer: function (url) {
			const returnValue = {file: url};

			// Fake response to stop an error being thrown
			if (url === 'missing') {
				returnValue.contents = `div {content: ${url};}`
			}

			// Importer was called
			calledByImporter.push(url);

			return returnValue
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
		file: './node-sass/index.scss',
		importer: function (url) {
			const returnValue = {file: url};

			// Fake response to stop an error being thrown
			if (url === 'missing') {
				returnValue.contents = `div {content: ${url};}`
			}

			// Importer was called
			calledByImporter.push(url);

			return returnValue
		}
	});

	return {
		calledByImporter: calledByImporter,
		includedFiles: result.stats.includedFiles,
		data: result.css.toString()
	}
}

module.exports = {
	renderData,
	renderFile
}