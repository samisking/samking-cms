import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { navigationLinks } from '../../constants';
import Header from '../../components/Header';
import styles from './Dashboard.css';

class Dashboard extends Component {
  render() {
    const { location, children } = this.props;

    return (
      <div className={styles.app}>
        <Header
          navigationLinks={navigationLinks}
          currentPathname={location.pathname}
        />

        {children}
      </div>
    );
  }
}

Dashboard.propTypes = {
  children: PropTypes.object,
  location: PropTypes.shape({
    pathname: PropTypes.string,
    action: PropTypes.string
  }),
};

export default connect()(Dashboard);
