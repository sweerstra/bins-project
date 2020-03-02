import { getBinFromFile, getFilename } from './file';

jest.mock('../api/Request', () => {
  return {
    getText: jest.fn(() => Promise.resolve('example code'))
  };
});

describe('getFileName', () => {
  it('empty, null or undefined urls', () => {
    expect(getFilename('')).toEqual('');
    expect(getFilename(null)).toEqual('');
    expect(getFilename(undefined)).toEqual('');
  });

  it('urls with .js filename', () => {
    expect(getFilename('https://example.com/example.js')).toEqual('example.js');
    expect(getFilename('https://example.com/example.js/')).toEqual('example.js');
  });

  it('urls without extension', () => {
    expect(getFilename('https://example.com/example')).toEqual('example');
  });
});

describe('getBinFromFile', () => {
  it('fetches bin', async () => {
    const bin = await getBinFromFile('https://example.com/example.js');
    expect(bin).toEqual({ name: 'example.js', code: 'example code' });
  });
});
