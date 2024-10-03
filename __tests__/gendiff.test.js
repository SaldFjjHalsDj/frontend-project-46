import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'fs';
import generateDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fileExtensions = ['json', 'yml', 'yaml'];
const formatters = ['stylish'];

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const stylish = readFileSync(getFixturePath('stylish'), { encoding: 'utf8', flag: 'r' });

const output = { stylish };

const testArgs = formatters.flatMap((format) => (
  fileExtensions.map((fileExtension) => [fileExtension, format])
));

test.each(testArgs)('%s type files difference with %s output', (fileExtension, format) => {
  const file1 = getFixturePath(`filepath1.${fileExtension}`);
  const file2 = getFixturePath(`filepath2.${fileExtension}`);
  expect(generateDiff(file1, file2, format)).toEqual(output[format]);
});