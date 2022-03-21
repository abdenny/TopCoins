import type { Asset, HeaderKey } from 'types';

export const sortByOrder = (
  arr: Array<Asset>,
  key: HeaderKey,
  order: 'asc' | 'desc',
  sortType: 'alpha' | 'numeric'
) => {
  return arr.sort((a, b) => {
    if (sortType === 'alpha') {
      if (order === 'desc') {
        return a[key] > b[key] ? -1 : 1;
      } else {
        return a[key] < b[key] ? -1 : 1;
      }
    } else if (sortType === 'numeric') {
      if (order === 'desc') {
        return parseFloat(a[key]) > parseFloat(b[key]) ? -1 : 1;
      } else {
        return parseFloat(a[key]) < parseFloat(b[key]) ? -1 : 1;
      }
    } else {
      return 0;
    }
  });
};
