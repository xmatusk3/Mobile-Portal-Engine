import { GLOBAL_SET_ERROR, GLOBAL_TOGGLE_LOADING } from '../../../src/actions/types';
import globalReducer from '../../../src/reducers/global/global_reducer';

describe('Global reducer', () => {
  it('returns initial state', () => {
    expect(globalReducer(undefined, {})).toEqual({ loading: false, error: '' });
  });

  it('handles GLOBAL_SET_ERROR', () => {
    const payload = 'test';
    expect(
      globalReducer(undefined, {
        type: GLOBAL_SET_ERROR,
        payload,
      })
    ).toEqual({ loading: false, error: payload });
  });

  describe('handles GLOBAL_TOGGLE_LOADING', () => {
    it('when loading is false', () => {
      expect(
        globalReducer(
          { loading: false, error: '' },
          {
            type: GLOBAL_TOGGLE_LOADING,
          }
        )
      ).toEqual({ loading: true, error: '' });
    });

    it('when loading is true', () => {
      expect(
        globalReducer(
          { loading: true, error: '' },
          {
            type: GLOBAL_TOGGLE_LOADING,
          }
        )
      ).toEqual({
        loading: false,
        error: '',
      });
    });
  });
});
