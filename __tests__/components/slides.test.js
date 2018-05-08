import React from 'react';
import Slides from '../../src/components/common/Slides.js';

import renderer from 'react-test-renderer';

describe('Slides component', () => {
  describe('renders', () => {
    it('correctly one slide', () => {
      const slideText = ['TestText'];
      const slides = renderer.create(<Slides data={slideText} onComplete={jest.fn()} />).toJSON();

      expect(slides).toMatchSnapshot();
    });

    it('correctly multiple slides', () => {
      const slidesText = ['TestText1', 'TestText2'];
      const slides = renderer.create(<Slides data={slidesText} onComplete={jest.fn()} />).toJSON();

      expect(slides).toMatchSnapshot();
    });
  });
});
