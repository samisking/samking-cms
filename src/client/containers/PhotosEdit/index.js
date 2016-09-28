import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import withRouter from 'react-router/lib/withRouter';
import { postJSON, deleteJSON } from 'sk-fetch-wrapper';
import { slugify } from '../../data/helpers';
import { actions } from '../../data/api';
import BackButton from '../../components/BackButton';
import PageTitle from '../../components/PageTitle';
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
        tags: newProps.photo.tags ? [...new Set(this.state.tags.concat(newProps.photo.tags))] : []
      });
    }
  }

  onTagRemove(event, tag) {
    this.setState({
      tags: this.state.tags.filter(t => t !== tag)
    });
  }

  onTagSelect(tag) {
    this.setState({
      tags: [...this.state.tags, tag.slug]
    });
  }

  onAddNewTag(tagName) {
    const tag = {
      name: tagName,
      slug: slugify(tagName)
    };

    postJSON('/tags', tag)
      .then(() => {
        // Refresh the tags list
        this.props.dispatch(actions.getAllTags());
        this.setState({
          tags: [...this.state.tags, tag.slug]
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
      tags: this.state.tags
    });

    postJSON(`/photos/${photo.id}`, updates)
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

    if (sure) {
      this.setState({ deleting: true });

      deleteJSON(`/photos/${photo.id}`, { photo })
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
    const { params, photo, tags } = this.props;

    return (
      <div>
        <BackButton url={'/photos'} />
        <PageTitle title={`Edit ${params.id}`} />
        {photo &&
          <form onSubmit={this.onSubmit}>
            <div className={styles.container}>
              <div className={styles.image}>
                <img src={photo.sizes.medium.url} alt={photo.id} />
              </div>

              <div className={styles.data}>
                <textarea
                  className={styles.caption}
                  type="text"
                  placeholder="Caption"
                  name={'caption'}
                  defaultValue={this.state.caption}
                />
                <TagsAutocomplete
                  className={styles.tagsAutocomplete}
                  data={tags}
                  onSelect={(item) => this.onTagSelect(item)}
                  onAddNew={(tag) => this.onAddNewTag(tag)}
                  onChange={() => {}}
                  unique
                />
                <div className={styles.tags}>
                  {this.state.tags.map(tag =>
                    <Tag
                      key={tag}
                      name={tag}
                      onClick={e => this.onTagRemove(e, tag)}
                    />
                  )}
                </div>
              </div>
            </div>
            <Button type="submit">Save</Button>
            <Button
              type="button"
              loading={this.state.deleting}
              onClick={this.onDelete}
              danger
            >
              {'Delete Photo'}
            </Button>
          </form>
        }
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const {
    photos,
    tags
  } = state.api;

  return {
    photo: photos.find(p => p.id === parseInt(ownProps.params.id, 10)),
    tags
  };
}

PhotoEdit.propTypes = {
  dispatch: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
  photo: PropTypes.object,
  tags: PropTypes.array
};

export default withRouter(connect(mapStateToProps)(PhotoEdit));
