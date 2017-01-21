import { defaultBlockParse as parseMarkdown } from 'simple-markdown';
import ImageService from './image';

const PublishService = {
  publishPhotos: async (files, body) => {
    const photos = [];

    for (const image of files) {
      // Get some data from the body
      const bodyData = body[image.filename];

      // Format the additional data from the body
      const caption = bodyData.caption.length ? bodyData.caption : null;
      const tags = bodyData.tags.length ? bodyData.tags.split(',') : [];

      try {
        // Try and resize the image
        const resizedImage = await ImageService.resizeImage(image);

        // Try and read the exif data
        const exif = await ImageService.readExif(image.path);

        // Try and publish all the resized images
        for (const size of resizedImage) {
          const publishedURL = await ImageService.publishImage(size);
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
  },
  publishProject: async (files, body) => {
    let existingImages;

    if (body.existingImages) {
      existingImages = JSON.parse(body.existingImages);
      delete body.existingImages; // eslint-disable-line no-param-reassign
    } else {
      existingImages = [];
    }

    const images = [...existingImages];

    for (const image of files) {
      const id = image.filename.split('.')[0];

      try {
        // Try and resize the image
        const resizedImage = await ImageService.resizeImage(image);

        // Try and publish all the resized images
        for (const size of resizedImage) {
          const publishedURL = await ImageService.publishImage(size);
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
          id,
          sizes
        };

        images.push(imageData);
      } catch (err) {
        throw err;
      }
    }

    const markdown = parseMarkdown(body.raw);

    const project = {
      content: markdown,
      images,
      ...body
    };

    return project;
  }
};

export default PublishService;
