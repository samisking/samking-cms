import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Link from 'react-router/lib/Link';
import { actions } from '../../data/api';
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
              contain
            />
          </Link>
        </div>
      ));
    }

    let component = null;

    if (this.props.children) {
      component = this.props.children;
    } else {
      component = (
        <div>
          <div className={styles.toolbar}>
            <Link to="/photos/new" className={styles.toolbarButton}>
              {'Add New'}
            </Link>
            <p className={styles.toolbarButton}>
              {'Filter'}
            </p>
          </div>
          <div className={styles.grid}>
            {photos}
          </div>
        </div>
      );
    }

    return component;
  }
}

Photos.propTypes = {
  children: PropTypes.node,
  dispatch: PropTypes.func,
  photos: PropTypes.array,
  tags: PropTypes.arrayOf(PropTypes.shape({
    slug: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    photosCount: PropTypes.number
  }))
};

const mapStateToProps = state => ({ photos: state.api.photos });

export default connect(mapStateToProps)(Photos);
