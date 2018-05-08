import React from 'react';
import renderer from 'react-test-renderer';

import { IntroScreen } from '../../../src/components/screens';
import { Slides } from '../../../src/components/common/Slides';

describe('IntroScreen component', () => {
  it('renders component after getting token correctly', () => {
    const intro = renderer.create(<IntroScreen />);
    intro.getInstance().setState({ token: false });

    expect(intro.toJSON()).toMatchSnapshot();
  });

  it('renders component before getting token correctly', () => {
    const intro = renderer.create(<IntroScreen />);

    expect(intro.toJSON()).toMatchSnapshot();
  });
});
