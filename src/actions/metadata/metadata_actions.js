import axios from 'axios';
import { AsyncStorage } from 'react-native';
import querystring from 'querystring';

import { 
  GLOBAL_SET_ERROR, 
  AUTH_SAVE_TAG_GROUPS,
  AUTH_SAVE_TAG_GROUP_TAGS,
  PAGES_SAVE_METADATA,
  PAGES_SAVE_METADATA_UI
} from "../types";
import { toggleLoading } from '../global/global_actions';

export const fetchMetadata = () => async (dispatch, getState) => {
  try {
    const { auth, selectedItem } = getState();
    const { address, selectedSite } = auth;
    const token = await AsyncStorage.getItem('jwt-token');

    await fetchTagGroups()(dispatch, getState);

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

export const fetchTags = (tagGroupId, successCallback) => async (dispatch, getState) => {
  try {
    const { address, selectedSite } = getState().auth;
    const token = await AsyncStorage.getItem('jwt-token');

    let { data } = await axios.get(`${address}/PageMetadataAPI/GetTagGroupTags/${selectedSite.siteName}/${tagGroupId}`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${token}`,
      },
    });


    dispatch(saveTagGroupTags(tagGroupId, data));
    successCallback();
  } catch (e) {
    console.error(e);
    dispatch({
      type: GLOBAL_SET_ERROR,
      payload: 'Failed fetching tag group tags.'
    });
  }
}

export const updateMetadata = (documentTitle, documentDescription, documentKeywords, documentTagGroupID, documentTags, onSaveCallback) => 
async (dispatch, getState) => {
  try {
    const { auth, selectedItem } = getState();
    const address = auth.address;
    const token = await AsyncStorage.getItem('jwt-token');

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    const body = {
      DocumentID: selectedItem.documentID,
      DocumentTitle:documentTitle,
      DocumentDescription: documentDescription,
      DocumentKeywords: documentKeywords,
      DocumentTagGroupID: documentTagGroupID,
      DocumentTags: documentTags
    };

    let { data } = await axios.post(`${address}/PageMetadataAPI/SaveMetadata`, JSON.stringify(body), {
      headers,
    });

    dispatch(savePageMetadata(data));
    dispatch(toggleLoading());
    onSaveCallback('Successfully saved.', false);
  } catch (e) {
    dispatch(toggleLoading());
    onSaveCallback(e, true);
  }
};

const saveTagGroupTags = (tagGroupId, data) => ({
  type: AUTH_SAVE_TAG_GROUP_TAGS,
  payload: {
    tagGroupId,
    data
  }
})

const savePageMetadata = (data) => ({
  type: PAGES_SAVE_METADATA,
  payload: data
});

const saveTagGroups = (data) => ({
  type: AUTH_SAVE_TAG_GROUPS,
  payload: data,
});

export const updateMetadataUI = (pageId, metadata) => {
  return {
  type: PAGES_SAVE_METADATA_UI,
  payload: { 
    metadata,
    pageId,
  }}
};
