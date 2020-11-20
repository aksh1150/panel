import React from 'react';
import { render } from 'react-testing-library';

import Paragraph from '../index';

describe('<Paragraph />', () => {
  it('should render and match the snapshot', () => {
    const children = 'this is the text';
    const {
      container: { firstChild },
    } = render(<Paragraph>{children}</Paragraph>);
    expect(firstChild).toMatchSnapshot();
  });
});
