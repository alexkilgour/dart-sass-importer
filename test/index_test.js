/* global describe, it */

'use strict';

const path = require('path');
const assert = require('assert');
const nodeSass = require('../lib/node-sass');
const dartSass = require('../lib/dart-sass');

describe('Node SASS: all imports should pass through the custom importer', async function () {
	it('sass.renderSync with data', async function () {
		const result = await nodeSass.renderData();
		const actual = result.calledByImporter.map(file => path.basename(file, '.scss'))
		const expected = result.includedFiles.map(file => path.basename(file, '.scss'))
		assert.deepEqual(expected.sort(), actual.sort());
	});

	it('sass.renderSync with file', async function () {
		const result = await nodeSass.renderFile();
		const actual = result.calledByImporter.map(file => path.basename(file, '.scss'))
		const expected = result.includedFiles.map(file => path.basename(file, '.scss')).filter(item => item !== 'index')
		assert.deepEqual(expected.sort(), actual.sort());
	});
});

describe('Dart SASS: all imports should pass through the custom importer', function () {
	describe('Legacy Render', function () {
		it('sass.renderSync with data', async function () {
			const result = await dartSass.renderData();
			const actual = result.calledByImporter.map(file => path.basename(file, '.scss'))
			const expected = result.includedFiles.map(file => path.basename(file, '.scss'))
			assert.deepEqual(expected.sort(), actual.sort());
		});

		it('sass.renderSync with file', async function () {
			const result = await dartSass.renderFile();
			const actual = result.calledByImporter.map(file => path.basename(file, '.scss'))
			const expected = result.includedFiles.map(file => path.basename(file, '.scss')).filter(item => item !== 'index')
			assert.deepEqual(expected.sort(), actual.sort());
		});
	});

	describe('Compile', function () {
		it('sass.compileString with data', async function () {
			const result = await dartSass.compileData();
			const actual = result.calledByImporter.map(file => path.basename(file, '.scss'))
			const expected = result.includedFiles.map(file => path.basename(file, '.scss'))
			assert.deepEqual(expected.sort(), actual.sort());
		});

		it('sass.compile with file', async function () {
			const result = await dartSass.compileFile();
			const actual = result.calledByImporter.map(file => path.basename(file, '.scss'))
			const expected = result.includedFiles.map(file => path.basename(file, '.scss')).filter(item => item !== 'index')
			assert.deepEqual(expected.sort(), actual.sort());
		});
	});
});