import React from 'react';
import styles from './TagsAutocomplete.css';

const Input = ({ value, onBlur, onFocus, onChange }) =>
  <input
    className={styles.autocompleteInput}
    type="text"
    placeholder="Tags"
    value={value}
    onBlur={onBlur}
    onFocus={onFocus}
    onChange={onChange}
  />;

Input.propTypes = {
  value: React.PropTypes.string,
  onBlur: React.PropTypes.func,
  onFocus: React.PropTypes.func,
  onChange: React.PropTypes.func
};

export default Input;
