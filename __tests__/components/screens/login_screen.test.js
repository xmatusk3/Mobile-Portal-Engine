import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';

import { LoginScreen } from '../../../src/components/screens';
import store from '../../../src/store';

describe('LoginScreen component', () => {
  it('renders correctly', () => {
    const login = renderer
      .create(
        <Provider store={store}>
          <LoginScreen />
        </Provider>
      )
      .toJSON();
    expect(login).toMatchSnapshot();
  });
});
