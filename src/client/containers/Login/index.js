import React, { Component } from 'react';
import { connect } from 'react-redux';
import withRouter from 'react-router/lib/withRouter';
import { actions } from '../../data/auth';
import Button from '../../components/Button';
import styles from './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.loggedIn) {
      this.props.router.push('/');
    }
  }

  componentWillReceiveProps(newProps) {
    if (!this.props.loggedIn && newProps.loggedIn) {
      this.props.router.push('/');
    }
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.dispatch(actions.login(this.state));
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.form}>
          <form onSubmit={this.onSubmit}>
            <input
              className={styles.input}
              type="text"
              name="username"
              placeholder="Username"
              value={this.state.username}
              onChange={this.onChange}
            />
            <input
              className={styles.input}
              type="text"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.onChange}
            />
            <Button type="submit" fullWidth>
              Login
            </Button>
          </form>
          <div>{this.props.errorMessage}</div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  router: React.PropTypes.object.isRequired,
  loggedIn: React.PropTypes.bool,
  errorMessage: React.PropTypes.string
};

function mapStateToProps(state) {
  const {
    loggedIn,
    errorMessage
  } = state.auth;

  return {
    loggedIn,
    errorMessage
  };
}

export default withRouter(connect(mapStateToProps)(Login));
