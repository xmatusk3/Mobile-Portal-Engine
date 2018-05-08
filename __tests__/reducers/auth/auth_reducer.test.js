import { AUTH_SET_SERVER_ADDRESS } from '../../../src/actions/types';
import authReducer from '../../../src/reducers/auth/auth_reducer';

describe('Auth reducer', () => {
  it('returns initial state', () => {
    expect(authReducer(undefined, {})).toEqual({ address: '' });
  });

  it('handles AUTH_SET_SERVER_ADDRESS', () => {
    const payload = '127.0.0.1';
    expect(
      authReducer(undefined, {
        type: AUTH_SET_SERVER_ADDRESS,
        payload,
      })
    ).toEqual({ address: payload });
  });
});
