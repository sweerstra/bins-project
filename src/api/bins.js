import storage from './storage';
import { BINS_KEY } from '../constants/Keys';

const getBins = () => {
  const bins = storage.get(BINS_KEY) || [];
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(bins);
    }, 600);
  });
};

const saveBins = (bins) => {
  storage.set(BINS_KEY, bins);
};

export default { getBins, saveBins };
