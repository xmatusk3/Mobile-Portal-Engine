import {
  PAGES_TOGGLE_SUBITEMS,
  PAGES_SAVE_PAGES,
  PAGES_SELECT_PAGE,
  PAGES_UPDATE_WORKFLOW_PAGE,
} from '../../actions/types';

const INIT_STATE = {
  publishedPages: {},
  notPublishedPages: {},
  selectedPage: {},
};

export default (state = INIT_STATE, { type, payload }) => {
  switch (type) {
    case PAGES_TOGGLE_SUBITEMS:
      return {
        ...state,
        publishedPages: {
          ...state.publishedPages,
          [payload]: {
            ...state.publishedPages[payload],
            open: !state.publishedPages[payload].open || false,
          },
        },
      };
    case PAGES_SAVE_PAGES:
      return { ...state, ...payload };
    case PAGES_SELECT_PAGE:
      return { ...state, selectedPage: payload };
    case PAGES_UPDATE_WORKFLOW_PAGE:
      return {
        ...state,
        notPublishedPages: {
          ...state.notPublishedPages,
          [payload.DocumentID]: payload,
        },
      };
    default:
      return state;
  }
};
