import { PAGES_TOGGLE_SUBITEMS, PAGES_SAVE_PAGES, PAGES_SELECT_PAGE } from '../types';

export const toggleSubItems = pageId => ({
  type: PAGES_TOGGLE_SUBITEMS,
  payload: pageId,
});

export const savePages = pages => ({
  type: PAGES_SAVE_PAGES,
  payload: pages,
});

export const selectPage = page => ({
  type: PAGES_SELECT_PAGE,
  payload: page,
});
