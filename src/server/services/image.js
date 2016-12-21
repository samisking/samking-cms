import os from 'os';
import uuid from 'uuid';
import sharp from 'sharp';
import path from 'path';
import { ExifImage } from 'exif';
import S3Service from './s3';

const ImageService = {
  readExif: async image =>
    new Promise((resolve, reject) => {
      ExifImage({ image }, (error, exifData) => { // eslint-disable-line new-cap
        if (error) reject(error);

        const { exif } = exifData;

        const dateArr = exif.DateTimeOriginal.replace(' ', ':').split(':');
        const captureTime = new Date(...dateArr.map(i => Number(i))).getTime();

        resolve({
          captureTime,
          exposure: exif.ExposureTime,
          aperture: exif.FNumber,
          iso: exif.ISO,
          focal: exif.FocalLength,
        });
      });
    }),
  resizeImage: async file => {
    const extension = path.extname(file.filename);
    const name = uuid.v4();

    const sizes = [
      {
        suffix: 'large',
        width: 2880,
        quality: 60
      },
      {
        suffix: 'medium',
        width: 1216,
        quality: 75
      },
      {
        suffix: 'small',
        width: 768,
        quality: 75
      }
    ];

    const resize = sizes.map(size =>
      new Promise((resolve, reject) => {
        const outputName = `${name}_${size.suffix}${extension}`;
        const dest = path.resolve(os.tmpdir(), outputName);

        sharp(file.path)
          .resize(size.width, size.width)
          .max()
          .withoutEnlargement()
          .quality(size.quality)
          .toFile(dest, (writeError, info) => {
            if (writeError) reject(new Error(`Resizing ${file.filename}`));
            resolve({
              size: size.suffix,
              filename: outputName,
              tempPath: dest,
              width: info.width,
              height: info.height
            });
          });
      })
    );

    return Promise.all(resize);
  },
  publishImage: async image => {
    const { filename, tempPath } = image;

    return new Promise((resolve, reject) => {
      S3Service.uploadFile(filename, tempPath)
        .then(imageURL => resolve(imageURL))
        .catch(err => reject(err));
    });
  }
};

export default ImageService;
