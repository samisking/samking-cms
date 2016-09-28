import React, { PropTypes } from 'react';
import styles from './Tag.css';

const Tag = ({ name, onClick }) => {
  const clickHandler = (event) => {
    onClick(event, name);
  };

  return (
    <span
      className={styles.tag}
      onClick={clickHandler}
    >
      {name}
    </span>
  );
};

Tag.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

export default Tag;
