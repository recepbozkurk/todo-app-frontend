import { render, screen } from '@testing-library/react';
import App from './App';

//Enzyme
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TodoForm from './components/TodoForm';
configure({ adapter: new Adapter() });

describe('Component Test', () => {
  let wrapper;
  let todoFormWrapper;
  beforeEach(() => {
    wrapper = shallow(<App />);
    todoFormWrapper = shallow(<TodoForm />);
  });

  test('render the title of app as Todo App', () => {
    expect(wrapper.find('h1').text()).toContain("Todo App");
  });

  test('render an element has todo-input class and input type', () => {
    expect(todoFormWrapper.find('.todo-input').type()).toEqual('input')
  })

  test('render a button with text of Add', () => {
    expect(todoFormWrapper.find('button').text()).toEqual('Add')
  })
})

describe('Unit Test', () => {
  let todoFormWrapper;
  beforeEach(() => {
    todoFormWrapper = shallow(<TodoForm />);
  });

  test('should change value of input when change event', () => {
    const changeEvent = { target: { value: 'TestCode001' } };

    todoFormWrapper.find('input').simulate('change', changeEvent)
    expect(todoFormWrapper.find('input').props().value).toEqual('TestCode001')
  });
})
