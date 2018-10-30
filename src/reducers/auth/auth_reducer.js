import _ from 'lodash';

import {
  AUTH_SET_SERVER_ADDRESS,
  AUTH_SET_CURRENT_SITE,
  AUTH_SET_SITES,
  AUTH_SAVE_TAG_GROUPS,
} from '../../actions/types';

const INIT_STATE = {
  address: '',
  sites: {},
  selectedSite: {},
};

export default (state = INIT_STATE, { type, payload }) => {
  switch (type) {
    case AUTH_SET_SERVER_ADDRESS:
      return { ...state, address: payload };
    case AUTH_SET_CURRENT_SITE:
      return { ...state, selectedSite: payload };
    case AUTH_SAVE_TAG_GROUPS:
      return { 
        ...state,
        selectedSite: {
          ...state.selectedSite,
          tagGroups: _.keyBy(payload, group => group.tagGroupID)
        }
      };
    case AUTH_SET_SITES:
      return { ...state, sites: payload };
    default:
      return state;
  }
};
