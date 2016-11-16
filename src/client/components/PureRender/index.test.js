import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import pureRender from '.';

class CounterComponent extends React.Component {
  constructor(props) {
    super(props);
    this.renderCount = 0;
  }

  componentWillReceiveProps() {
    this.renderCount += 1;
    this.setState({ renderCount: this.renderCount });
  }

  render() {
    return <div className="foo">{this.renderCount}</div>;
  }
}

describe('<PureRender />', () => {
  it('renders correctly', () => {
    const Component = pureRender()(CounterComponent);
    const pureComponent = renderer.create(
      <Component />
    );

    expect(pureComponent.toJSON()).toMatchSnapshot();
  });

  it('only renders when props actually change', () => {
    const Component = pureRender()(CounterComponent);
    const pureComponent = mount(
      <Component />
    );

    // it should be 0 even after forcing an update
    expect(pureComponent.find(CounterComponent).text()).toEqual('0');
    pureComponent.update();
    expect(pureComponent.find(CounterComponent).text()).toEqual('0');

    // it should re-render if the props change
    pureComponent.setProps({ bar: 'baz' });
    expect(pureComponent.find(CounterComponent).text()).toEqual('1');

    // it should not render if the props are the same
    pureComponent.setProps({ bar: 'baz' });
    expect(pureComponent.find(CounterComponent).text()).toEqual('1');
  });
});
