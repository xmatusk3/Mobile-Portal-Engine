import axios from 'axios';
import { AsyncStorage } from 'react-native';
import querystring from 'querystring';

import { 
  GLOBAL_SET_ERROR, 
  AUTH_SAVE_TAG_GROUPS,
  PAGES_SAVE_METADATA
} from "../types";
import { toggleLoading } from '../global/global_actions';

export const fetchMetadata = () => async (dispatch, getState) => {
  try {
    const { auth, selectedItem } = getState();
    const { address, selectedSite } = auth;
    const token = await AsyncStorage.getItem('jwt-token');

    if (!selectedSite.tagGroups) {
      await fetchTagGroups()(dispatch, getState);
    }

    let { data } = await axios.get(`${address}/PageMetadataAPI/GetPageMetadata/${selectedSite.siteName}/${selectedItem.documentID}`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(savePageMetadata(data));
  } catch (e) {
    console.error(e);
    dispatch({
      type: GLOBAL_SET_ERROR,
      payload: 'Failed fetching metadata.'
    });
  }
}

export const fetchTagGroups = () => async (dispatch, getState) => {
  try {
    const { address, selectedSite } = getState().auth;
    const token = await AsyncStorage.getItem('jwt-token');

    let { data } = await axios.get(`${address}/PageMetadataAPI/GetTagGroups/${selectedSite.siteName}`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(saveTagGroups(data));
  } catch (e) {
    console.error(e);
    dispatch({
      type: GLOBAL_SET_ERROR,
      payload: 'Failed fetching tag groups.'
    });
  }
}

export const updateMetadata = (documentTitle, documentDescription, documentKeywords, documentTagGroupID, documentTags) => 
async (dispatch, getState) => {
  try {
    const { auth, selectedItem } = getState();
    const address = auth.address;
    const token = await AsyncStorage.getItem('jwt-token');

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${token}`,
    };

    const body = {
      DocumentID: selectedItem.documentID,
      DocumentTitle: documentTitle,
      DocumentDescription: documentDescription,
      DocumentKeywords: documentKeywords,
      DocumentTagGroupID: parseInt(documentTagGroupID, 10),
      DocumentTags: documentTags
    };

    let { data } = await axios.post(`${address}/PageMetadataAPI/SaveMetadata`, querystring.stringify(body), {
      headers,
    });

    dispatch(savePageMetadata(data));
    dispatch(toggleLoading());
  } catch (e) {
    console.error(e);
    dispatch({
      type: GLOBAL_SET_ERROR,
      payload: 'Failed approving the page. Try restarting the application.',
    });
    dispatch(toggleLoading());
  }
};

const savePageMetadata = (data) => ({
  type: PAGES_SAVE_METADATA,
  payload: data
});

const saveTagGroups = (data) => ({
  type: AUTH_SAVE_TAG_GROUPS,
  payload: data,
});
