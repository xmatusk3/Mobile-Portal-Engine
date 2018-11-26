import axios from 'axios';
import { AsyncStorage } from 'react-native';
import querystring from 'querystring';
import _ from 'lodash';

import {
  GLOBAL_SET_ERROR,
  WORKFLOWS_UPDATE_ITEM,
  WORKFLOWS_SAVE_ITEMS,
} from '../types'
import { toggleLoading } from '../';
import utils from '../../utils/utils';

export const updateWorkflowItem = page => ({
  type: WORKFLOWS_UPDATE_ITEM,
  payload: page,
});

export const saveWorkflowItems = pages => ({
  type: WORKFLOWS_SAVE_ITEMS,
  payload: pages,
});

export const approvePage = (nextStepId, comment, navigate) => async (dispatch, getState) => {
  try {
    const { auth, selectedItem } = getState();
    const address = auth.address;
    const domain = auth.selectedSite.siteDomainName;
    const token = await AsyncStorage.getItem('jwt-token');
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${token}`,
    };

    const body = {
      PageID: selectedItem.documentID,
      WorkflowStepID: nextStepId,
      Comment: comment,
    };

    let { data } = await axios.post(`${address}/WorkflowAPI/ApproveWorkflowStep`, querystring.stringify(body), {
      headers,
    });

    navigate('previewContent');
    dispatch(updateWorkflowItem(enrichWorkflowPage(data, domain)));
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

export const rejectPage = (prevStepId, comment, navigate) => async (dispatch, getState) => {
  try {
    const { auth, selectedItem } = getState();
    const address = auth.address;
    const domain = auth.selectedSite.siteDomainName;
    const page = selectedItem;
    const token = await AsyncStorage.getItem('jwt-token');
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${token}`,
    };
    const body = {
      PageID: page.documentID,
      WorkflowStepID: prevStepId,
      Comment: comment,
    };

    let { data } = await axios.post(`${address}/WorkflowAPI/RejectWorkflowStep`, querystring.stringify(body), {
      headers,
    });

    navigate('previewContent');
    dispatch(updateWorkflowItem(enrichWorkflowPage(data, domain)));
    dispatch(toggleLoading());
  } catch (e) {
    console.error(e);
    dispatch({
      type: GLOBAL_SET_ERROR,
      payload: 'Failed rejecting the page. Try restarting the application.',
    });
    dispatch(toggleLoading());
  }
};

export const fetchWorkflowPages = (finishedCallBack) => async (dispatch, getState) => {
  try {
    const { address, selectedSite } = getState().auth;
    const token = await AsyncStorage.getItem('jwt-token');

    let {data} = await axios.get(`${address}/WorkflowAPI/GetWorkflowPages/${selectedSite.siteName}`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${token}`,
      },
    });

    const enrichedWorkflowPages = enrichWorkflowPages(data, selectedSite.siteDomainName);

    dispatch(saveWorkflowItems(enrichedWorkflowPages));
    finishedCallBack();
  } catch (e) {
    console.error(e);
    dispatch(setError('Server error'));
  }
}

const enrichWorkflowPages = (data, domain) => {
  const enrichedPages = data.map(page => enrichWorkflowPage(page, domain));
  
  return _.keyBy(enrichedPages, page => page.documentID);
}

const enrichWorkflowPage = (page, domain) => (
  {
    ...page, 
    previewURL: utils.ensureHttpsAddress(utils.relativeToAbsoluteUrl(page.previewURL, domain)),
  }
);
