import axios from 'axios';
import _ from 'lodash';
import base64 from 'base-64';
import utf8 from 'utf8';
import { AsyncStorage } from 'react-native';

import { AUTH_SET_SERVER_ADDRESS, AUTH_SET_SITES, AUTH_SET_CURRENT_SITE } from '../types';
import { setError, toggleLoading } from '../global/global_actions';
import { savePages } from '..';

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

export const selectSiteById = siteId => (dispatch, getState) => {
  console.log(getState().auth.sites[siteId]);
  dispatch(selectSite(getState().auth.sites[siteId]));
};

export const connectToServer = (address, navigate) => async dispatch => {
  if (address.startsWith('http') && !address.startsWith('http')) {
    address = address.replace('http', 'https');
  }

  if (!address.startsWith('http')) {
    address = `https://${address}`;
  }

  if (!address.endsWith('/customkenticopagesapi')) {
    address += '/customkenticopagesapi';
  }
  dispatch(setServerAddress(address));

  try {
    const res = await axios.get(`${address}/SiteAPI`);
    dispatch(selectSite(res.data.Sites[2]));
    dispatch(setSites(_.keyBy(res.data.Sites, object => object.SiteID)));
    navigate('setSite');
  } catch (e) {
    dispatch(setError('Could not connect to the server.'));
    dispatch(toggleLoading());
  }
};

export const loginToServer = (username, password, navigate) => async (dispatch, getState) => {
  const { address, selectedSite } = getState().auth;
  try {
    await authorizeToServer(dispatch, address, selectedSite, username, password);
    let { data } = await getInitialDataFromServer(dispatch, address, selectedSite);

    console.log('got pages');

    // add client side additional properties to the server objects
    const enrichedPublishedPages = data.PublishedPages.map(page => {
      return {
        ...page,
        open: page.DocumentNamePath === '/',
      };
    });

    console.log('dispatching pages');

    dispatch(
      savePages({
        publishedPages: _.keyBy(enrichedPublishedPages, page => page.DocumentID),
        notPublishedPages: _.keyBy(data.NotPublishedPages, page => page.DocumentID),
        selectedPage: enrichedPublishedPages[0],
      })
    );

    navigate('main');
    dispatch(toggleLoading());
  } catch (e) {
    console.error(e);
    dispatch(toggleLoading());
  }
};

const authorizeToServer = async (dispatch, address, selectedSite, username, password) => {
  try {
    const authorizationHeader = `Basic ${base64.encode(
      `${username}:${password}:${selectedSite.SiteName}`
    )}`;

    let { data } = await axios.post(`${address}/TokenAPI`, null, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: authorizationHeader,
      },
    });
    await AsyncStorage.setItem('jwt-token', data.Token);
  } catch (e) {
    console.error(e);
    dispatch(setError('Invalid username or password.'));
    throw e;
  }
};

const getInitialDataFromServer = async (dispatch, address, selectedSite) => {
  try {
    const token = await AsyncStorage.getItem('jwt-token');

    console.log('requesting pages');

    return axios.get(`${address}/PagesAPI/${selectedSite.SiteID}`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (e) {
    console.error(e);
    dispatch(setError('Server error'));
    throw e;
  }
};
