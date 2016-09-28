import React, { PropTypes } from 'react';
import Link from 'react-router/lib/Link';
import styles from './Button.css';

const Button = ({ children, type, url, loading, danger, disabled, error, onClick }) => {
  let classes;
  if (disabled) {
    classes = styles.button_disabled;
  } else if (loading) {
    classes = styles.button_loading;
  } else if (danger) {
    classes = styles.button_danger;
  } else if (error) {
    classes = styles.button_error;
  } else {
    classes = styles.button;
  }

  const clickHandler = (event) => {
    if (onClick) {
      onClick(event);
    } else {
      return;
    }
  };

  if (type === 'link') {
    return (
      <Link to={url} className={classes} onClick={clickHandler}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={clickHandler}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  url: PropTypes.string,
  type: PropTypes.oneOf(['submit', 'button', 'link']),
  loading: PropTypes.bool,
  danger: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  onClick: PropTypes.func
};

export default Button;
