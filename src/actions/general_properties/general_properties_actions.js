import axios from 'axios';
import { AsyncStorage } from 'react-native';

import { 
  GLOBAL_SET_ERROR, 
  PAGES_SAVE_GENERAL_PROPERTIES,
  PAGES_UPDATE_GENERAL_PROPERTIES_UI
} from "../types";
import { toggleLoading } from '..';

export const fetchGeneralProperties = () => async (dispatch, getState) => {
  try {
    const { auth, selectedItem, global } = getState();
    const { address, selectedSite } = auth;
    
    if (!global.loading) {
      dispatch(toggleLoading());
    }

    const token = await AsyncStorage.getItem('jwt-token');
    
    let { data } = await axios.get(`${address}/PageGeneralPropertiesAPI/GetPageGeneralProperties/${selectedSite.siteName}/${selectedItem.documentID}`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(savePageGeneralProperties(data));
    dispatch(toggleLoading());
  } catch (e) {
    console.error(e);
    dispatch({
      type: GLOBAL_SET_ERROR,
      payload: 'Failed fetching metadata.'
    });
  }
}

const savePageGeneralProperties = (data) => ({
  type: PAGES_SAVE_GENERAL_PROPERTIES,
  payload: data,
});

export const updateGeneralPropertiesUI = (data, propertiesSectionIdentifier) => ({
  type: PAGES_UPDATE_GENERAL_PROPERTIES_UI,
  payload: {
    data,
    propertiesSectionIdentifier
  }
});
