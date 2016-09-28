import React, { PropTypes } from 'react';
import styles from './ImagePreview.css';

const ImagePreview = ({ id, url, onClick, removable, contain }) => {
  const clickHandler = (event) => {
    if (onClick) {
      onClick(event, id);
    }
  };

  let classNames;
  if (removable && contain) {
    classNames = styles.image_contain_removable;
  } else if (removable) {
    classNames = styles.image_cover_removable;
  } else if (contain) {
    classNames = styles.image_contain;
  } else {
    classNames = styles.image_cover;
  }

  return (
    <div
      onClick={clickHandler}
      className={classNames}
      style={{
        backgroundImage: `url(${url})`
      }}
    />
  );
};

ImagePreview.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  url: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  removable: PropTypes.bool,
  contain: PropTypes.bool
};

export default ImagePreview;
