import { AsyncStorage } from 'react-native';
import axios from 'axios';
import _ from 'lodash';

import {
  PAGES_TOGGLE_SUBITEMS,
  PAGES_SAVE_ITEMS,
  PAGES_SAVE_INITIAL_ITEMS,
} from '../types';
import { setError, toggleLoading, selectItem } from '..';
import utils from '../../utils/utils.js';

export const toggleSubItems = pageId => ({
  type: PAGES_TOGGLE_SUBITEMS,
  payload: pageId,
});

export const savePages = (pages, parentId, childrenIDs) => ({
  type: PAGES_SAVE_ITEMS,
  payload: {
    pages,
    parentId,
    childrenIDs
  }
});

export const saveInitialPages = pages => ({
  type: PAGES_SAVE_INITIAL_ITEMS,
  payload: pages,
});

export const loadPages = (parentId = 0) => async (dispatch, getState) => {
  try {
    const { address, selectedSite } = getState().auth;
    const token = await AsyncStorage.getItem('jwt-token');

    let {data} = await axios.get(`${address}/PagesAPI/GetPages/${selectedSite.siteName}/${parentId || ''}`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!parentId) {
      const rootPageId = data.find(page => page.documentParentID === 0).documentID;;
      const { processedPages, childIds } = processPages(data, selectedSite.siteDomainName, rootPageId);

      processedPages[rootPageId] = {
        ...processedPages[rootPageId],
        documentChildrenIDs: childIds
      };

      dispatch(selectItem(processedPages[rootPageId]));
      dispatch(saveInitialPages(processedPages));
    } else {
      const { processedPages, childIds } = processPages(data, selectedSite.siteDomainName, parentId);
      dispatch(savePages(processedPages, parentId, childIds));
    }
  } catch (e) {
    console.error(e);
    dispatch(setError('Server error'));
    dispatch(toggleLoading());
  }
}

const processPages = (data, domain, parentId) => {
  const childIds = [];
  const enrichedPages = data.map(page => {
    if (page.documentParentID === parentId) {
      childIds.push(page.documentID);
    }

    return { 
      ...page, 
      open: page.documentParentID === 0,
      previewURL: utils.ensureHttpsAddress(utils.relativeToAbsoluteUrl(page.previewURL, domain)),
    };
  });

  const processedPages =  _.keyBy(enrichedPages, page => page.documentID);
  
  return {processedPages, childIds};
}
