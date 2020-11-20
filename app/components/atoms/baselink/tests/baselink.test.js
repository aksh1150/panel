import React from 'react';
import { cleanup, render, fireEvent } from 'react-testing-library';
import 'jest-dom/extend-expect';

import BaseLink from '../index';
afterEach(cleanup);
describe('<BaseLink />', () => {
  it('should render and match the snapshot', () => {
    const { asFragment } = render(
      <BaseLink className target to="home">
        Home
      </BaseLink>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('has a class', () => {
    const { getByTestId } = render(<BaseLink className>Home</BaseLink>);
    expect(getByTestId('id')).toHaveClass('baselink');
  });

  it('has clicked', () => {
    const { getByTestId } = render(
      <BaseLink href="https://google.com">Google</BaseLink>,
    );
    fireEvent.click(getByTestId('id'));
  });
  it('has anchor attribute ', () => {
    const { getByTestId } = render(
      <BaseLink link="https://google.com">Google</BaseLink>,
    );
    expect(getByTestId('id')).toHaveAttribute('href', 'https://google.com');
  });
});
