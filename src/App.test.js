import { render, screen } from '@testing-library/react';
import App from './App';

beforeAll(() => {
  global.fetch = jest.fn();
  //window.fetch = jest.fn(); if running browser environment
});

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText('loading');
  expect(linkElement).toBeInTheDocument();
});
