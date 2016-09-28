import React, { PropTypes } from 'react';
import styles from './PageTitle.css';

const PageTitle = ({ title }) =>
  <h2 className={styles.title}>
    {title}
  </h2>;

PageTitle.propTypes = {
  title: PropTypes.string.isRequired
};

export default PageTitle;
