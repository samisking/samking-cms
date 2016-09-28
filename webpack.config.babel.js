import AssetsPlugin from 'assets-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import values from 'postcss-modules-values';
import nested from 'postcss-nested';
import autoprefixer from 'autoprefixer';
import path from 'path';
import webpack from 'webpack';
import config, { URL } from './src/config';

export default {
  entry: config.debug ? [
    `webpack-hot-middleware/client?${URL}/__webpack_hmr`,
    './src/client/index.js'
  ] : './src/client/index.js',
  context: path.resolve(__dirname, './'),
  output: {
    filename: `[name]${config.debug ? '' : '.[hash]'}.js`,
    hashDigestLength: 7,
    path: path.resolve(__dirname, './build'),
    publicPath: '/'
  },
  module: {
    loaders: [
      config.debug ? {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]',
          'postcss-loader'
        ],
        exclude: /node_modules/
      } : {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          'style',
          'css?modules&importLoaders=1&localIdentName=[hash:base64:6]}!postcss'
        ),
        exclude: /node_modules/
      },
      {
        // tell webpack to use babel
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: config.debug ? {
          plugins: [['react-transform', {
            transforms: [{
              transform: 'react-transform-hmr',
              imports: ['react'],
              locals: ['module']
            }]
          }]]
        } : {}
      },
      {
        test: /\.(eot|gif|jpe?g|png|svg|woff2?|ttf)$/,
        loader: 'file?name=[name].[ext]',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new AssetsPlugin({
      filename: 'assets.json',
      path: 'build'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(config.debug ? 'development' : 'production')
    }),
    ...config.debug ? [
      new webpack.HotModuleReplacementPlugin(),
    ] : [
      new ExtractTextPlugin(`[name]${config.debug ? '' : '.[hash]'}.css`),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurenceOrderPlugin(true),
      new webpack.optimize.AggressiveMergingPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false },
        comments: false,
        sourceMap: false,
        mangle: true,
        minimize: true
      })
    ]
  ],
  postcss: [
    values,
    nested(),
    autoprefixer({
      browsers: [
        '> 1%',
        'last 2 versions'
      ]
    })
  ]
};
