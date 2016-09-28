import React, { PropTypes } from 'react';
import Link from 'react-router/lib/Link';
import styles from './Dashboard.css';

const Dashboard = ({ children }) =>
  <div className={styles.app}>
    <div className={styles.nav}>
      <div className={styles.navItem}>
        <Link
          to="/photos"
          className={styles.navLink}
          activeClassName={styles.navLink_active}
        >
          Photos
        </Link>
      </div>
      <div className={styles.navItem}>
        <Link
          to="/design"
          className={styles.navLink}
          activeClassName={styles.navLink_active}
        >
          Design
        </Link>
      </div>
      <div className={styles.navItem}>
        <Link
          to="/logout"
          className={styles.navLink}
          activeClassName={styles.navLink_active}
        >
          Logout
        </Link>
      </div>
    </div>

    <div className={styles.page}>
      {children}
    </div>
  </div>;

Dashboard.propTypes = {
  children: PropTypes.object
};

export default Dashboard;
