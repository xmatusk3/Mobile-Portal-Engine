import {
  PAGES_TOGGLE_SUBITEMS,
  PAGES_SAVE_ITEMS,
  PAGES_SAVE_INITIAL_ITEMS,
} from '../../actions/types';

const INIT_STATE = {};

export default (state = INIT_STATE, { type, payload }) => {
  switch (type) {
    case PAGES_TOGGLE_SUBITEMS:
      return {
        ...state,
        [payload]: {
          ...state[payload],
          open: !state[payload].open || false,
        },
      };
    case PAGES_SAVE_ITEMS:
      return { 
        ...state,
        ...payload.pages,
        [payload.parentId]: {
          ...state[payload.parentId],
          documentChildrenIDs: payload.childrenIDs
        }
       };
    case PAGES_SAVE_INITIAL_ITEMS:
      return { ...payload };
    default:
      return state;
  }
};
