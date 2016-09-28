import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import withRouter from 'react-router/lib/withRouter';
import { actions } from '../../data/auth';

class Logout extends Component {
  componentDidMount() {
    this.props.dispatch(actions.logout());
    this.props.router.replace('/login');
  }

  render() {
    return (
      <div>
        <h1>Logging out…</h1>
      </div>
    );
  }
}

Logout.propTypes = {
  dispatch: PropTypes.func.isRequired,
  router: PropTypes.object.isRequired
};

export default withRouter(connect()(Logout));
