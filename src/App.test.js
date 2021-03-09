import { render, screen } from '@testing-library/react';
import App from './App';

beforeAll(() => {
  global.fetch = jest.fn();
  //window.fetch = jest.fn(); if running browser environment
});

let wrapper;

beforeEach((any)= {
  wrapper = shallow(<App/>, {disableLifecycleMethods: true}),
});

afterEach(() => {
  wrapper.unmount();
});

it("renders a loading span before api call success", () => {
  expect(wrapper.find("span").exists()).toBeTruthy();
});

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
