export const createMockBin = (id) => ({
  id,
  name: `Bin ${id}`,
  code: 'console.log(\'mock\')'
});

const okResponse = { n: 1, ok: 1 };

export default {
  getBin: jest.fn(id => Promise.resolve(createMockBin(id))),
  getBins: jest.fn(() => Promise.resolve([createMockBin('abcdef'), createMockBin('ghijkl')])),
  addBin: jest.fn(({ name }) => Promise.resolve(createMockBin(name))),
  saveBin: jest.fn(bin => Promise.resolve(bin)),
  removeBin: jest.fn(() => Promise.resolve(okResponse))
};
