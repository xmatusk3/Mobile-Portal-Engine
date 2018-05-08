import { GLOBAL_SET_ERROR, GLOBAL_TOGGLE_LOADING } from '../../actions/types';

const INIT_STATE = {
  loading: false,
  error: '',
};

export default (state = INIT_STATE, { type, payload }) => {
  switch (type) {
    case GLOBAL_SET_ERROR:
      return { ...state, error: payload };
    case GLOBAL_TOGGLE_LOADING:
      return { ...state, loading: !state.loading };
    default:
      return state;
  }
};
