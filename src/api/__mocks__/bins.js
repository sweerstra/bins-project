const createMockedBin = (id) => ({
  id,
  name: `Bin ${id}`,
  code: 'console.log(\'mock\')'
});

const okResponse = { n: 1, ok: 1 };

export default {
  getBin: jest.fn(id => Promise.resolve(createMockedBin(id))),
  getBins: jest.fn(() => Promise.resolve([createMockedBin('abcdef'), createMockedBin('ghijkl')])),
  addBin: jest.fn(({ name }) => Promise.resolve(createMockedBin(name))),
  saveBin: jest.fn(bin => Promise.resolve(bin)),
  removeBin: jest.fn(() => Promise.resolve(okResponse))
};
