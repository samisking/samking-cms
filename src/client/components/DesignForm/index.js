import React, { Component, PropTypes } from 'react';
import { postForm, deleteJSON } from 'sk-fetch-wrapper';
import { slugify } from '../../data/helpers';
import ImagePreview from '../../components/ImagePreview';
import Button from '../Button';
import styles from './DesignForm.css';

class DesignForm extends Component {
  constructor(props) {
    super(props);

    this.fields = ['title', 'slug', 'subtitle', 'date', 'excerpt', 'raw', 'images', 'coverImage'];

    this.state = {
      formFiles: [],
      newImages: [],
      loading: false,
      deleting: false
    };

    for (const field of this.fields) {
      if (this.props.project[field]) {
        this.state[field] = this.props.project[field];
      } else {
        this.state[field] = '';
      }
    }

    this.onTitleChange = this.onTitleChange.bind(this);
    this.onFieldChange = this.onFieldChange.bind(this);
    this.onFileInputChange = this.onFileInputChange.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.renderNewImages = this.renderNewImages.bind(this);
    this.onNewPreviewClick = this.onNewPreviewClick.bind(this);
    this.renderExistingImages = this.renderExistingImages.bind(this);
    this.onExistingPreviewClick = this.onExistingPreviewClick.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.project) {
      for (const field of this.fields) {
        this.setState({
          [field]: newProps.project[field]
        });
      }
    }
  }

  onFieldChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  onTitleChange(event) {
    const slug = slugify(event.target.value);
    this.setState({
      slug
    });

    this.onFieldChange(event);
  }

  onFileInputChange(event) {
    event.preventDefault();
    const files = event.target.files;
    for (const file of files) {
      this.setupReader(file);
    }
  }

  onNewPreviewClick(event, name) {
    this.setState({
      formFiles: this.state.formFiles.filter(f => f.name !== name),
      newImages: this.state.newImages.filter(f => f.name !== name)
    });
  }

  onExistingPreviewClick(event, name) {
    this.setState({
      images: this.state.images.filter(f => f.name !== name)
    });
  }

  onSubmit(event) {
    event.preventDefault();
    this.setState({ loading: true });

    const formData = new FormData(event.target); // eslint-disable-line no-undef

    for (const file of this.state.formFiles) {
      formData.append('images', file);
    }

    formData.append('existingImages', JSON.stringify(this.state.images));

    postForm(this.props.endpoint, formData)
      .then(response => {
        this.setState({
          loading: false,
          formFiles: [],
          newImages: []
        });

        this.props.onSuccess(response);
      })
      .catch(err => {
        this.setState({
          loading: false,
          error: err.data
        });
      });
  }

  onDelete() {
    const sure = confirm('Are you sure you want to delete?'); // eslint-disable-line no-undef

    if (sure) {
      this.setState({ deleting: true });

      deleteJSON(this.props.endpoint, {})
        .then(() => {
          this.setState({
            deleting: false
          });

          this.props.onDelete();
        })
        .catch(err => {
          this.setState({
            deleting: false,
            error: err.data
          });
        });
    }
  }

  setupReader(file) {
    const reader = new FileReader(); // eslint-disable-line no-undef

    reader.onloadend = () => {
      const uploadedFile = {
        url: reader.result,
        name: file.name
      };

      this.setState({
        formFiles: [...this.state.formFiles, file],
        newImages: [...this.state.newImages, uploadedFile]
      });
    };

    reader.readAsDataURL(file);
  }

  renderNewImages() {
    const { newImages } = this.state;

    if (newImages.length === 0) {
      return null;
    }

    return newImages.map(image =>
      <div key={image.id} className={styles.imagePreview_new}>
        <ImagePreview
          id={image.id}
          url={image.url}
          onClick={this.onNewPreviewClick}
          removable
        />
        <p className={styles.imageName}>{image.id}</p>
      </div>
    );
  }

  renderExistingImages() {
    const { images } = this.state;

    if (images.length === 0) {
      return null;
    }

    return images.map(image =>
      <div key={image.id} className={styles.imagePreview}>
        <ImagePreview
          id={image.id}
          url={image.sizes.small.url}
          onClick={this.onExistingPreviewClick}
          removable
        />
        <p className={styles.imageName}>{image.id}</p>
      </div>
    );
  }

  render() {
    return (
      <form onSubmit={this.onSubmit} encType="multipart/form-data">
        <div className={styles.wrapper}>
          <div className={styles.form}>
            <input
              className={styles.input}
              type="text"
              placeholder="Title"
              name="title"
              value={this.state.title}
              onChange={this.onTitleChange}
            />
            <input
              className={styles.input}
              type="text"
              placeholder="Slug"
              name="slug"
              value={this.state.slug}
              onChange={this.onFieldChange}
            />
            <input
              className={styles.input}
              type="text"
              placeholder="Subtitle"
              name="subtitle"
              value={this.state.subtitle}
              onChange={this.onFieldChange}
            />
            <input
              className={styles.input}
              type="text"
              placeholder="Date"
              name="date"
              value={this.state.date}
              onChange={this.onFieldChange}
            />
            <input
              className={styles.input}
              type="text"
              placeholder="Cover Image ID"
              name="coverImage"
              value={this.state.coverImage}
              onChange={this.onFieldChange}
            />
            <textarea
              className={styles.textarea}
              rows={5}
              placeholder="Excerpt"
              name="excerpt"
              value={this.state.excerpt}
              onChange={this.onFieldChange}
            />
            <textarea
              className={styles.content}
              rows={20}
              placeholder="Content"
              name="raw"
              value={this.state.raw}
              onChange={this.onFieldChange}
            />
          </div>

          <div className={styles.images}>
            <input
              className={styles.fileInput}
              type="file"
              multiple="multiple"
              accept="image/*"
              onChange={this.onFileInputChange}
            />

            <div className={styles.imagePreviews}>
              {this.renderNewImages()}
              {this.renderExistingImages()}
            </div>
          </div>
        </div>

        <Button
          type="submit"
          loading={this.state.loading}
        >
          {this.props.buttonText}
        </Button>

        {this.props.onDelete &&
          <Button
            type="button"
            loading={this.state.deleting}
            onClick={this.onDelete}
            danger
          >
            {'Delete Project'}
          </Button>
        }
      </form>
    );
  }
}

DesignForm.propTypes = {
  project: PropTypes.object,
  endpoint: PropTypes.string.isRequired,
  buttonText: PropTypes.string,
  onSuccess: PropTypes.func.isRequired,
  onDelete: PropTypes.func
};

DesignForm.defaultProps = {
  buttonText: 'Create Project'
};

export default DesignForm;
