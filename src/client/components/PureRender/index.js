/**
 * A HOC that wraps any kind of component and implements `shouldComponentUpdate` so the component
 * is never re-rendered if it only needs props to render, and it's props don't change. This is
 * extremely useful for stateless components where you don't want to extend the React Component
 * class just to implement the checking.
 *
 *
 * EXAMPLE USAGE EXTENDING REACT CLASS:
 *
 * import React from 'react';
 * import PureRender from 'PureRender';
 *
 * class MyComponent extends React.Component {
 *   render() (
 *     <div>{this.props.foo}</div>
 *   );
 * }
 *
 * export default PureRender()(MyComponent);
 *
 *
 * EXAMPLE USAGE WITH STATELESS COMPONENT:
 *
 * import React from 'react';
 * import PureRender from 'PureRender';
 *
 * const MyStatelessComponent = ({ foo }) => (
 *   <div>{foo}</div>
 * );
 *
 * export default PureRender()(MyStatelessComponent);
 *
 */

import React, { Component } from 'react';
import { shallowEqual } from '../../utils';

const PureRender = () => WrappedComponent => class extends Component {
  shouldComponentUpdate(props, state) {
    return !(shallowEqual(this.props, props) && shallowEqual(this.state, state));
  }

  render() {
    return (
      <WrappedComponent {...this.props} />
    );
  }
};

export default PureRender;
