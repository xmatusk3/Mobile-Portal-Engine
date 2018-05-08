import { GLOBAL_SET_ERROR, GLOBAL_TOGGLE_LOADING } from '../../../src/actions/types';
import { setError, toggleLoading } from '../../../src/actions';

describe('Global actions', () => {
  describe('setError action', () => {
    it('returns correct action', () => {
      const payload = 'test error';
      const expectedAction = {
        type: GLOBAL_SET_ERROR,
        payload,
      };
      expect(setError(payload)).toEqual(expectedAction);
    });
  });

  describe('toggleLoading action', () => {
    it('returns correct action', () => {
      const expectedAction = {
        type: GLOBAL_TOGGLE_LOADING,
      };
      expect(toggleLoading()).toEqual(expectedAction);
    });
  });
});
