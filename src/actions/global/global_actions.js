import { 
  GLOBAL_SET_ERROR, 
  GLOBAL_TOGGLE_LOADING 
} from '../types';

export const setError = text => ({
  type: GLOBAL_SET_ERROR,
  payload: text,
});

export const toggleLoading = () => ({
  type: GLOBAL_TOGGLE_LOADING,
});
