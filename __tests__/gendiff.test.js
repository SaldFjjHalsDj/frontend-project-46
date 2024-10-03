/* eslint-env jest */

import { test, expect, describe } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixture = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const formats = ['json', 'yaml', 'yml'];

describe('genDiff should work correctly', () => {
  test.each(formats)('genDiff should work with %p', (format) => {
    const filepath1 = getFixturePath(`filepath1.${format}`);
    const filepath2 = getFixturePath(`filepath2.${format}`);
    expect(genDiff(filepath1, filepath2)).toEqual(readFixture('stylish'));
  });
});
