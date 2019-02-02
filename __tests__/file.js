import { getFilename } from '../src/api/file';

test('empty, null or undefined urls', () => {
  expect(getFilename('')).toEqual('');
  expect(getFilename(null)).toEqual('');
  expect(getFilename(undefined)).toEqual('');
});

test('urls with .js filename', () => {
  expect(getFilename('https://example.com/example.js')).toEqual('example.js');
  expect(getFilename('https://example.com/example.js/')).toEqual('example.js');
});

test('urls without extension', () => {
  expect(getFilename('https://example.com/example')).toEqual('example');
});
