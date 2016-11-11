const config = {
  env: process.env.NODE_ENV,
  debug: process.env.NODE_ENV !== 'production',
  HOST: process.env.HOST || 'localhost',
  PORT: process.env.PORT || 3001,
  JWT_SECRET: process.env.JWT_SECRET || 'super secret cms key',
  USER_NAME: process.env.USER_NAME || 'admin',
  USER_PASS: process.env.USER_PASS || 'pass',
  API_URL: process.env.API_URL || 'http://localhost:3002',
  API_USER_NAME: process.env.API_USER_NAME || 'admin',
  API_USER_PASS: process.env.API_USER_PASS || 'pass',
  S3: {
    accessKeyId: process.env.AWS_ACCESS_KEY || '123',
    secretAccessKey: process.env.AWS_SECRET_KEY || 'abc',
    endpoint: process.env.AWS_ENDPOINT || 'http://localhost:4569',
    sslEnabled: false,
    s3ForcePathStyle: true
  }
};

export const URL = `http://${config.HOST}:${config.PORT}`;

export default config;
