import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import App from './app';

it('renders without crashing with react', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing with enzyme', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.exists()).toBe(true);
});
