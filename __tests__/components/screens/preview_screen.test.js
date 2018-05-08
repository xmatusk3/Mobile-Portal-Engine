import React from 'react';
import renderer from 'react-test-renderer';

import { PreviewScreen } from '../../../src/components/screens';

describe('PreviewScreen component', () => {
  it('renders correctly', () => {
    const preview = renderer.create(<PreviewScreen uri="https://www.kentico.com" />).toJSON();
    expect(preview).toMatchSnapshot();
  });
});
