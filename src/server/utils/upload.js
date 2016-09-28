/* eslint no-param-reassign: "off" */
import marked from 'marked-ast';
import * as utils from './images';

export const uploadPhotos = async (files, body) => {
  const photos = [];

  for (const image of files) {
    // Get some data from the body
    const bodyData = body[image.filename];

    // Format the additional data from the body
    const caption = bodyData.caption.length ? bodyData.caption : null;
    const tags = bodyData.tags.length ? bodyData.tags.split(',') : [];

    try {
      // Try and resize the image
      const resizedImage = await utils.resizeImage(image);

      // Try and read the exif data
      const exif = await utils.readExif(image.path);

      // Try and publish all the resized images
      for (const size of resizedImage) {
        const publishedURL = await utils.publishImage(size);
        size.publishedURL = publishedURL;
      }

      // Format a sizes object
      const sizes = resizedImage.reduce((prev, curr) => {
        const size = Object.assign(prev, {
          [curr.size]: {
            width: curr.width,
            height: curr.height,
            url: curr.publishedURL
          }
        });

        return size;
      }, {});

      // Data for a single image to post to the API
      const imageData = {
        type: 'photo',
        sizes,
        caption,
        tags,
        exif
      };

      photos.push(imageData);
    } catch (err) {
      console.log('err in upload:', err);
      throw err;
    }
  }

  // The final data to post to the API after uploading was successful
  return photos;
};

export const uploadProject = async (files, body) => {
  let existingImages;

  if (body.existingImages) {
    existingImages = JSON.parse(body.existingImages);
    delete body.existingImages;
  } else {
    existingImages = [];
  }

  const images = [...existingImages];

  for (const image of files) {
    const id = image.filename.split('.')[0];

    try {
      // Try and resize the image
      const resizedImage = await utils.resizeImage(image);

      // Try and publish all the resized images
      for (const size of resizedImage) {
        const publishedURL = await utils.publishImage(size);
        size.publishedURL = publishedURL;
      }

      // Format a sizes object
      const sizes = resizedImage.reduce((prev, curr) => {
        const size = Object.assign(prev, {
          [curr.size]: {
            width: curr.width,
            height: curr.height,
            url: curr.publishedURL
          }
        });

        return size;
      }, {});

      // Data for a single image to post to the API
      const imageData = {
        type: 'design',
        id,
        sizes
      };

      images.push(imageData);
    } catch (err) {
      throw err;
    }
  }

  const markdown = marked.parse(body.raw);

  const project = {
    content: markdown,
    images,
    ...body
  };

  return project;
};
