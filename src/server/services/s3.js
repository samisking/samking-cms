import fs from 'fs';
import AWS from 'aws-sdk';
import config from '../../config';

const AWSConfig = config.S3;
const bucket = 'samking-cms';

AWS.config.update(AWSConfig);
const s3 = new AWS.S3();
s3.endpoint = new AWS.Endpoint(AWSConfig.endpoint);

s3.listBuckets((err, data) => {
  const hasBucket = data.Buckets.find(b => b.Name === bucket);
  if (!hasBucket) s3.createBucket({ Bucket: bucket }, () => {});
});

const S3Service = {
  uploadFile: (name, src) =>
    new Promise((resolve, reject) => {
      fs.readFile(src, (readErr, data) => {
        if (readErr) {
          reject(new Error('Reading image from temp dir.'));
        }

        s3.upload({ Bucket: bucket, Key: name, Body: data }, () => {
          resolve(`${AWSConfig.endpoint}/${bucket}/${name}`);
        });
      });
    })
};

export default S3Service;
