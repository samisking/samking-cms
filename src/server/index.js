/* eslint max-len: "off" */
require('babel-register');
require('babel-polyfill');
require('css-modules-require-hook')({
  generateScopedName: `[name]__[local]${(process.env.NODE_ENV === 'production' ? '-[hash:base64:4]' : '')}`,
  mode: 'local',
  rootDir: './src/client'
});
require('./server');
