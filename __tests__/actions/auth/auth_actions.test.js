import { AUTH_SET_SERVER_ADDRESS } from '../../../src/actions/types';
import { setServerAddress } from '../../../src/actions';

describe('Auth actions', () => {
  describe('setServerAddress', () => {
    it('returns correct action', () => {
      const payload = '127.0.0.1';
      const expectedAction = {
        type: AUTH_SET_SERVER_ADDRESS,
        payload,
      };
      expect(setServerAddress(payload)).toEqual(expectedAction);
    });
  });
});
