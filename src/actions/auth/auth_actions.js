import axios from 'axios';
import _ from 'lodash';
import base64 from 'base-64';
import { AsyncStorage } from 'react-native';

import { AUTH_SET_SERVER_ADDRESS, AUTH_SET_SITES, AUTH_SET_CURRENT_SITE } from '../types';
import { loadPages } from '../pages/pages_actions';
import { setError, toggleLoading } from '../global/global_actions';
import utils from '../../utils/utils';

export const setServerAddress = text => ({
  type: AUTH_SET_SERVER_ADDRESS,
  payload: text,
});

export const setSites = sites => ({
  type: AUTH_SET_SITES,
  payload: sites,
});

export const selectSite = site => ({
  type: AUTH_SET_CURRENT_SITE,
  payload: site,
});

export const selectSiteByName = siteName => (dispatch, getState) => {
  dispatch(selectSite(getState().auth.sites[siteName]));
};

export const connectToServer = (address, navigate) => async dispatch => {
  address = utils.ensureHttpsAddress(address);

  if (!address.endsWith('/kentico.pagesapp')) {
    address += '/kentico.pagesapp';
  }
  dispatch(setServerAddress(address));

  try {
    let { data } = await axios.get(`${address}/SiteAPI/GetSites`);
    dispatch(selectSite(data[0]));
    dispatch(setSites(_.keyBy(data, site => site.siteName)));
    navigate('setSite');
  } catch (e) {
    dispatch(setError('Could not connect to the server.'));
    dispatch(toggleLoading());
    console.error(e);
  }
};

export const authorizeToServer = (username, password, navigate) => async (dispatch, getState) => {
  try {
    const { address, selectedSite } = getState().auth;

    const authorizationHeader = `Basic ${base64.encode(
      `${username}:${password}:${selectedSite.siteName}`
    )}`;

    let { data } = await axios.get(`${address}/TokenAPI/GetJwtToken`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: authorizationHeader,
      },
    });

    await AsyncStorage.setItem('jwt-token', data);
    await loadPages()(dispatch, getState);

    navigate('main');
    dispatch(toggleLoading());
  } catch (e) {
    console.error(e);
    dispatch(setError('Invalid username or password.'));
    dispatch(toggleLoading());
  }
};
