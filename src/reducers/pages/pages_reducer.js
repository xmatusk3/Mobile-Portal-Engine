import _ from 'lodash';

import {
  PAGES_TOGGLE_SUBITEMS,
  PAGES_SAVE_ITEMS,
  PAGES_SAVE_INITIAL_ITEMS,
  PAGES_SAVE_METADATA,
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
    case PAGES_SAVE_METADATA:
      return {
        ...state,
        [payload.documentID]: {
          ...state[payload.documentID],
          metadata: _.omit(payload, ['documentID'])
        }
      };
    default:
      return state;
  }
};
