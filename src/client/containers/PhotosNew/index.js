import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { postJSON, postForm } from 'sk-fetch-wrapper';
import { slugify } from '../../data/helpers';
import { actions } from '../../data/api';
import BackButton from '../../components/BackButton';
import PageTitle from '../../components/PageTitle';
import ImagePreview from '../../components/ImagePreview';
import TagsAutocomplete from '../../components/TagsAutocomplete';
import Tag from '../../components/Tag';
import Button from '../../components/Button';
import styles from './PhotosNew.css';

export class PhotosNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rawFiles: [],
      files: {},
      tmpUrls: {},
      loading: false,
      error: '',
      tagError: ''
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onFileInputChange = this.onFileInputChange.bind(this);
    this.onTagSelect = this.onTagSelect.bind(this);
    this.onTagRemove = this.onTagRemove.bind(this);
    this.onAddNewTag = this.onAddNewTag.bind(this);
    this.onPreviewClick = this.onPreviewClick.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(actions.getAllTags());
  }

  onTagSelect(tag, filename) {
    this.addTagToFile(tag.slug, filename);
  }

  onTagRemove(event, tag, filename) {
    this.removeTagFromFile(tag, filename);
  }

  onAddNewTag(tagName, filename) {
    const tag = {
      name: tagName,
      slug: slugify(tagName)
    };

    const headers = { Authorization: this.props.token };

    postJSON('/tags', tag, { headers })
      .then(() => {
        // Refresh the tags list
        this.props.dispatch(actions.getAllTags());
        this.addTagToFile(tag.slug, filename);
      })
      .catch(err => {
        this.setState({
          tagError: err.message
        });
      });
  }

  onFileInputChange(event) {
    event.preventDefault();
    const inputFiles = event.target.files;

    const rawFiles = [...this.state.rawFiles];
    const files = Object.assign({}, this.state.files);

    for (const file of inputFiles) {
      const uploadedFile = {
        loading: true,
        name: file.name,
        tmpUrl: '',
        tags: []
      };

      rawFiles.push(file);
      files[file.name] = uploadedFile;

      this.setupReader(file);
    }

    this.setState({
      rawFiles,
      files,
      tagError: ''
    });
  }

  onPreviewClick(event, filename) {
    // Remove the file from the upload queue
    const updatedFiles = Object.assign({}, this.state.files);
    delete updatedFiles[filename];

    this.setState({
      rawFiles: this.state.rawFiles.filter(f => f.name !== filename),
      files: updatedFiles,
      error: ''
    });
  }

  onSubmit(event) {
    event.preventDefault();
    this.setState({ loading: true });
    const formData = new FormData(event.target); // eslint-disable-line no-undef

    // Add the actual files to the formData
    for (const file of this.state.rawFiles) {
      formData.append('images', file);
    }

    // Add the tags to the formData
    for (const file of Object.keys(this.state.files)) {
      const tags = this.state.files[file].tags.join(',');
      formData.append(`${file}[tags]`, tags);
    }

    const headers = { Authorization: this.props.token };

    postForm('/photos', formData, { headers })
      .then(() => {
        this.setState({
          rawFiles: [],
          files: {},
          loading: false
        });
      })
      .catch(err => {
        this.setState({
          loading: false,
          error: err.data
        });
      });
  }

  setupReader(file) {
    const reader = new FileReader(); // eslint-disable-line no-undef

    reader.onloadend = () => {
      this.setState({
        files: {
          ...this.state.files,
          [file.name]: {
            ...this.state.files[file.name],
            loading: false,
            tmpUrl: reader.result
          }
        }
      });
    };

    reader.readAsDataURL(file);
  }

  addTagToFile(tag, filename) {
    const stateFile = this.state.files[filename];
    const withNewTag = Object.assign({}, stateFile, {
      tags: [tag, ...stateFile.tags]
    });

    this.setState({
      files: {
        ...this.state.files,
        [filename]: withNewTag
      }
    });
  }

  removeTagFromFile(tag, filename) {
    const stateFile = this.state.files[filename];
    const withoutTag = Object.assign(
      {},
      stateFile,
      { tags: stateFile.tags.filter(t => t !== tag) }
    );

    this.setState({
      files: {
        ...this.state.files,
        [filename]: withoutTag
      }
    });
  }

  renderPreview(file) {
    return (
      <div>
        <p className={styles.previewName}>{file.name}</p>
        <div className={styles.preview}>
          <div className={styles.previewImage}>
            <ImagePreview
              id={file.name}
              url={file.tmpUrl}
              onClick={this.onPreviewClick}
              removable
            />
          </div>
          <div className={styles.previewData}>
            <textarea
              className={styles.previewCaption}
              type="text"
              placeholder="Caption"
              name={`${file.name}[caption]`}
            />
            <TagsAutocomplete
              className={styles.previewTagsAutocomplete}
              data={this.props.tags}
              onSelect={(item) => this.onTagSelect(item, file.name)}
              onAddNew={(tag) => this.onAddNewTag(tag, file.name)}
              onChange={() => {}}
              unique
            />
            <div className={styles.previewTags}>
              {this.state.files[file.name].tags.map(tag =>
                <Tag
                  key={tag.slug}
                  name={tag.slug}
                  onClick={e => this.onTagRemove(e, tag.slug, file.name)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { files, rawFiles, error } = this.state;
    const hasFiles = rawFiles.length > 0;
    const hasError = error.length > 0 && hasFiles;

    return (
      <div>
        <BackButton url={'/photos'} />
        <PageTitle title={'Add New Photos'} />

        <form onSubmit={this.onSubmit} encType="multipart/form-data">
          <input
            className={styles.fileInput}
            type="file"
            multiple="multiple"
            accept="image/*"
            onChange={this.onFileInputChange}
          />
          <div className={styles.previews}>
            {Object.keys(files).map(filename =>
              <div key={filename} className={styles.previewContainer}>
                {this.renderPreview(files[filename])}
              </div>
            )}
          </div>
          {hasFiles &&
            <Button
              type="submit"
              loading={this.state.loading}
              error={hasError}
            >
              Upload
            </Button>
          }
          {hasError &&
            <p className={styles.errorText}>{error}</p>
          }
        </form>
      </div>
    );
  }
}

PhotosNew.propTypes = {
  dispatch: PropTypes.func,
  tags: PropTypes.arrayOf(PropTypes.shape({
    slug: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    photosCount: PropTypes.number
  })),
  token: PropTypes.string
};

const mapStateToProps = state => ({
  tags: state.api.tags,
  token: state.auth.token
});

export default connect(mapStateToProps)(PhotosNew);
