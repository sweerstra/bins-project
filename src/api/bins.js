const getBins = () => {
  const bins = [{ id: 1, name: 'Some fiddle', selection: 'arr.forEach(x => console.log(x));' }, {
    id: 2,
    name: 'How to lambda',
    selection: 'const arr = [...arr1, newValue];'
  }];
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(bins);
    }, 600);
  });
};

export default { getBins };
