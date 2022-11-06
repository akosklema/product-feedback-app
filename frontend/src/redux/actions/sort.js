import { SET_SORT } from './types';

export function setSort(sortBy, ascending = true ) {
  return { type: SET_SORT, payload: { sortBy, ascending } };
};