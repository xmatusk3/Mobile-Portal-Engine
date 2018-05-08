import React from 'react';
import renderer from 'react-test-renderer';

import { LoadingScreen } from '../../../src/components/screens';

describe('LoadingScreen component', () => {
  it('renders correctly', () => {
    const loading = renderer.create(<LoadingScreen />).toJSON();
    expect(loading).toMatchSnapshot();
  });
});
