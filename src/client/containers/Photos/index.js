import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Link from 'react-router/lib/Link';
import { actions } from '../../data/api';
import PageTitle from '../../components/PageTitle';
import ImagePreview from '../../components/ImagePreview';
import styles from './Photos.css';

class Photos extends Component {
  componentDidMount() {
    this.props.dispatch(actions.getAllPhotos());
    this.props.dispatch(actions.getAllTags());
  }

  render() {
    let photos;
    if (this.props.photos) {
      photos = this.props.photos.map(photo => (
        <div key={photo.id} className={styles.gridItem}>
          <Link to={`/photos/${photo.id}`}>
            <ImagePreview
              id={photo.id}
              url={photo.sizes.small.url}
              cover
            />
          </Link>
        </div>
      ));
    }

    let component;
    if (this.props.children) {
      component = this.props.children;
    } else {
      component = (
        <div>
          <PageTitle title={'All Photos'} />
          <div className={styles.grid}>
            <div className={styles.addNewContainer}>
              <Link to="/photos/new" className={styles.addNewButton}>
                <span className={styles.addNewContent}>{'+'}</span>
              </Link>
            </div>
            {photos}
          </div>
        </div>
      );
    }

    return (
      <div>{component}</div>
    );
  }
}

function mapStateToProps(state) {
  const {
    photos
  } = state.api;

  return {
    photos
  };
}

Photos.propTypes = {
  children: PropTypes.node,
  dispatch: PropTypes.func,
  photos: PropTypes.array,
  tags: PropTypes.array
};

export default connect(mapStateToProps)(Photos);
