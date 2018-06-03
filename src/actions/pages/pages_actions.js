import axios from 'axios';
import { AsyncStorage } from 'react-native';
import querystring from 'querystring';
import {
  PAGES_TOGGLE_SUBITEMS,
  PAGES_UPDATE_WORKFLOW_PAGE,
  PAGES_SAVE_PAGES,
  PAGES_SELECT_PAGE,
  GLOBAL_SET_ERROR,
} from '../types';
import { toggleLoading } from '../';

export const toggleSubItems = pageId => ({
  type: PAGES_TOGGLE_SUBITEMS,
  payload: pageId,
});

export const savePages = pages => ({
  type: PAGES_SAVE_PAGES,
  payload: pages,
});

export const selectPage = page => ({
  type: PAGES_SELECT_PAGE,
  payload: page,
});

export const updateWorkflowPage = page => ({
  type: PAGES_UPDATE_WORKFLOW_PAGE,
  payload: page,
});

export const approvePage = (nextStepId, comment, navigate) => async (dispatch, getState) => {
  try {
    const address = getState().auth.address;
    const page = getState().pages.selectedPage;
    const token = await AsyncStorage.getItem('jwt-token');
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${token}`,
    };

    const body = {
      PageID: page.DocumentID,
      WorkflowStepID: nextStepId,
      Comment: comment,
    };

    let { data } = await axios.post(`${address}/ApproveStepAPI`, querystring.stringify(body), {
      headers,
    });

    dispatch(updateWorkflowPage(data.UpdatedPage));
    navigate('preview');
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
    const address = getState().auth.address;
    const page = getState().pages.selectedPage;
    const token = await AsyncStorage.getItem('jwt-token');
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${token}`,
    };
    const body = {
      PageID: page.DocumentID,
      WorkflowStepID: prevStepId,
      Comment: comment,
    };

    let { data } = await axios.post(`${address}/RejectStepAPI`, querystring.stringify(body), {
      headers,
    });

    dispatch(updateWorkflowPage(data.UpdatedPage));
    navigate('preview');
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
