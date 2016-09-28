import React, { PropTypes } from 'react';
import Link from 'react-router/lib/Link';
import styles from './DesignPreview.css';

const DesignPreview = ({ url, title, date, excerpt }) =>
  <Link to={url} className={styles.link}>
    <div className={styles.details}>
      <h4 className={styles.title}>{title}</h4>
      <p className={styles.date}>{date}</p>
      <p className={styles.excerpt}>{excerpt}</p>
    </div>

    <p className={styles.cta}>{'Edit'}</p>
  </Link>;

DesignPreview.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string,
  excerpt: PropTypes.string
};

DesignPreview.defaultProps = {
  date: '–',
  excerpt: ''
};

export default DesignPreview;
