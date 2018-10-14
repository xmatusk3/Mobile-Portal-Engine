import { SELECTEDITEM_SELECT_ITEM } from '../types';

export const selectItem = (item) => ({
  type: SELECTEDITEM_SELECT_ITEM,
  payload: item
});
