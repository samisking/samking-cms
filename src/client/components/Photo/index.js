import React, { Component, PropTypes } from 'react';

const Photo = ({ photo }) => {
  return (
    <div>
      <img src={photo.sizes.small.url} />
    </div>
  );
};

export default Photo;
