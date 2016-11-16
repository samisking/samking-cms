import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import withRouter from 'react-router/lib/withRouter';
import { actions } from '../../data/auth';
import '../../GlobalStyle.css';

class Root extends Component {
  componentWillMount() {
    const { dispatch } = this.props;
    const token = localStorage.getItem('token'); // eslint-disable-line no-undef

    // If a token exists then verify it
    if (token) {
      dispatch(actions.verifyToken(token)).then(isAuthed => {
        if (!isAuthed) {
          // If auth failed, redirect back to login
          this.props.router.push('/login');
        }
      });
    } else {
      // Redirect back to login if no token
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

const mapStateToProps = (state) => ({
  loggedIn: state.auth.loggedIn,
  token: state.auth.token
});

export default withRouter(connect(mapStateToProps)(Root));
