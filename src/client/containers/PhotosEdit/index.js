import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import withRouter from 'react-router/lib/withRouter';
import Link from 'react-router/lib/Link';
import { postJSON, deleteJSON } from 'sk-fetch-wrapper';
import { slugify } from '../../utils';
import { actions } from '../../data/api';
import TagsAutocomplete from '../../components/TagsAutocomplete';
import Tag from '../../components/Tag';
import Button from '../../components/Button';
import styles from './PhotoEdit.css';

class PhotoEdit extends Component {
  constructor(props) {
    super(props);

    const { photo } = this.props;

    this.state = {
      caption: photo && photo.caption ? photo.caption : '',
      tags: photo && photo.tags ? photo.tags : [],
      deleting: false
    };

    this.onTagSelect = this.onTagSelect.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.photo) {
      this.setState({
        caption: newProps.photo.caption || '',
        tags: newProps.photo.tags ? [...newProps.photo.tags] : []
      });
    }
  }

  onTagRemove(event, tagSlug) {
    this.setState({
      tags: this.state.tags.filter(t => t.slug !== tagSlug)
    });
  }

  onTagSelect(tag) {
    this.setState({
      tags: [...this.state.tags, tag]
    });
  }

  onAddNewTag(tagName) {
    const tag = {
      name: tagName,
      slug: slugify(tagName)
    };

    const headers = { Authorization: this.props.token };

    postJSON('/tags', tag, { headers })
      .then(() => {
        // Refresh the tags list
        this.props.dispatch(actions.getAllTags());
        this.setState({
          tags: [...this.state.tags, tag]
        });
      })
      .catch(err => {
        this.setState({
          tagError: err.data
        });
      });
  }

  onSubmit(event) {
    event.preventDefault();
    const { photo, dispatch } = this.props;
    const formData = new FormData(event.target); // eslint-disable-line no-undef

    const updates = Object.assign({}, photo, {
      caption: formData.get('caption'),
      tags: this.state.tags.map(t => t.slug)
    });

    delete updates.id;

    console.log('updates:', updates);

    const headers = { Authorization: this.props.token };

    postJSON(`/photos/${photo.id}`, updates, { headers })
      .then(() => {
        dispatch(actions.getAllPhotos());
      })
      .catch(err => {
        console.log(err);
      });
  }

  onDelete() {
    const { photo, dispatch, router } = this.props;
    const sure = confirm('Are you sure you want to delete?'); // eslint-disable-line no-undef

    const headers = { Authorization: this.props.token };

    if (sure) {
      this.setState({ deleting: true });

      deleteJSON(`/photos/${photo.id}`, { photo }, { headers })
        .then(() => {
          this.setState({
            deleting: false
          });

          dispatch(actions.getAllPhotos());
          router.push('/photos');
        })
        .catch(err => {
          this.setState({
            deleting: false,
            error: err.data
          });
        });
    }
  }

  render() {
    const { photo, tags } = this.props;
    const imageRatio = photo ? (photo.sizes.large.height / photo.sizes.large.width) * 100 : 0;

    return (
      <div>
        <div className={styles.toolbar}>
          <Link to={'/photos'} className={styles.toolbarButton}>
            {'← Back'}
          </Link>

          <p className={styles.toolbarButton}>{`ID: ${photo ? photo.id : '00'}`}</p>
        </div>

        {photo &&
          <form onSubmit={this.onSubmit}>
            <div className={styles.container}>
              <div className={styles.imageContainer}>
                <div className={styles.image} style={{ paddingBottom: `${imageRatio}%` }}>
                  <img src={photo.sizes.medium.url} alt={photo.id} />
                </div>
              </div>

              <div className={styles.dataEntry}>
                <input
                  className={styles.caption}
                  type="text"
                  placeholder="Caption"
                  name={'caption'}
                  defaultValue={this.state.caption}
                />
                <TagsAutocomplete
                  className={styles.tagsAutocomplete}
                  data={tags}
                  onSelect={(tag) => this.onTagSelect(tag)}
                  onAddNew={(tagName) => this.onAddNewTag(tagName)}
                  onChange={() => {}}
                  unique
                />
                <div className={styles.tags}>
                  {this.state.tags.map(tag =>
                    <Tag
                      key={tag.slug}
                      name={tag.name}
                      onClick={e => this.onTagRemove(e, tag.slug)}
                    />
                  )}
                </div>
                <Button
                  type="submit"
                  className={styles.buttonSave}
                >
                  {'Update Photo'}
                </Button>
                <Button
                  type="button"
                  className={styles.buttonDelete}
                  loading={this.state.deleting}
                  onClick={this.onDelete}
                  danger
                >
                  {'Delete Photo'}
                </Button>
              </div>
            </div>
          </form>
        }
      </div>
    );
  }
}

PhotoEdit.propTypes = {
  dispatch: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
  photo: PropTypes.object,
  tags: PropTypes.arrayOf(PropTypes.shape({
    slug: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    photosCount: PropTypes.number
  })),
  token: PropTypes.string
};

const mapStateToProps = (state, ownProps) => ({
  photo: state.api.photos.find(p => p.id === Number(ownProps.params.id)),
  tags: state.api.tags,
  token: state.auth.token
});

export default withRouter(connect(mapStateToProps)(PhotoEdit));
