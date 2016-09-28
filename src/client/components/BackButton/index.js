import React, { PropTypes } from 'react';
import Link from 'react-router/lib/Link';
import styles from './BackButton.css';

const BackButton = ({ url, customText }) => {
  const text = customText || 'Back';

  return (
    <div className={styles.container}>
      <Link to={url} className={styles.button}>
        {'←'} {text}
      </Link>
    </div>
  );
};

BackButton.propTypes = {
  url: PropTypes.string.isRequired,
  customText: PropTypes.string
};

export default BackButton;
