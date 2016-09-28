import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import withRouter from 'react-router/lib/withRouter';
import { actions } from '../../data/auth';
import '../../GlobalStyle.css';

class Root extends Component {
  componentWillMount() {
    const { dispatch, loggedIn } = this.props;
    const token = localStorage.getItem('token');

    // If there's a token
    if (token && !loggedIn) {
      // Attempt to verify it
      dispatch(actions.verifyToken(token));
    } else {
      // Redirect back to login
      this.props.router.push('/login');
    }
  }

  componentWillReceiveProps(newProps) {
    if (this.props.loggedIn && !newProps.loggedIn) {
      // If the user has logged out, or there was a verify error, go back to login
      this.props.router.push('/login');
    }
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

Root.propTypes = {
  dispatch: PropTypes.func.isRequired,
  router: PropTypes.object.isRequired,
  children: PropTypes.object,
  loggedIn: PropTypes.bool,
  token: PropTypes.string
};

function mapStateToProps(state) {
  const {
    loggedIn,
    token
  } = state.auth;

  return {
    loggedIn,
    token
  };
}

export default withRouter(connect(mapStateToProps)(Root));
