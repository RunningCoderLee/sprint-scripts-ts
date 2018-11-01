import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('Test App', () => {
  it('renders without crashing!', () => {
    shallow(<App />);
  });

  it('should renders learn react anchor!', () => {
    const wrapper = shallow(<App />);
    const learn = (
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    )
    expect(wrapper.contains(learn)).toEqual(true);
  });
})