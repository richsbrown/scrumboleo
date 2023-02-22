import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from './HomePage';

test('renders the application name', () => {
  render(<HomePage />);
  const divElement = screen.getByRole("contentinfo");
  expect(divElement).toHaveTextContent("Scrumboleo");
});
