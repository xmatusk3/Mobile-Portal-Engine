import {
  AUTH_SET_SERVER_ADDRESS,
  AUTH_SET_CURRENT_SITE,
  AUTH_SET_SITES,
} from '../../actions/types';

const INIT_STATE = {
  address: 'matusmkenticopages.azurewebsites.net',
  sites: {},
  selectedSite: {},
};

export default (state = INIT_STATE, { type, payload }) => {
  switch (type) {
    case AUTH_SET_SERVER_ADDRESS:
      return { ...state, address: payload };
    case AUTH_SET_CURRENT_SITE:
      return { ...state, selectedSite: payload };
    case AUTH_SET_SITES:
      return { ...state, sites: payload };
    default:
      return state;
  }
};
