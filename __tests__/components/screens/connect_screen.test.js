import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';

import { ConnectScreen } from '../../../src/components/screens';
import store from '../../../src/store';

describe('ConnectScreen component', () => {
  it('renders correctly', () => {
    const connect = renderer
      .create(
        <Provider store={store}>
          <ConnectScreen />
        </Provider>
      )
      .toJSON();
    expect(connect).toMatchSnapshot();
  });
});
