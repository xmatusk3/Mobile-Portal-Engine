import axios from 'axios';
import { PAGES_TOGGLE_SUBITEMS, PAGES_SAVE_PAGES, PAGES_SELECT_PAGE, GLOBAL_SET_ERROR } from '../types';
import { toggleLoading } from '../';

import { AsyncStorage } from 'react-native';

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

export const approvePage = (nextStepId, comment, navigate) => async (getState, dispatch) => {
  try {
    console.log("entering");
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

    console.log("about to approve");
    let { data } = await axios.post(`${address}/ApproveStepAPI`, body, { headers });

    console.log("approved, updated page:", data);
    navigate('preview');
    dispatch(toggleLoading());
  } catch (e) {
    console.log(e);
    dispatch({ type: GLOBAL_SET_ERROR, payload: 'Failed approving the page. Try restarting the application.' });
    dispatch(toggleLoading());
  }
};

export const rejectPage = (prevStepId, comment, navigate) => async (getState, dispatch) => {
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

    let { data } = await axios.post(`${address}/RejectStepAPI`, body ,{ headers });

    console.log(data);
    navigate('preview');
    dispatch(toggleLoading());
  } catch (e) {
    console.log(e);
    dispatch({ type: GLOBAL_SET_ERROR, payload: 'Failed rejecting the page. Try restarting the application.' });
    dispatch(toggleLoading());
  }
};
