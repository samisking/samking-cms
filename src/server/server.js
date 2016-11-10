import Koa from 'koa';
import compress from 'koa-compress';
import serve from 'koa-static';
import convert from 'koa-convert';
import chalk from 'chalk';
import path from 'path';
import webpack from 'webpack';
import config, { URL } from '../config';
import loggerMiddleware, { log } from './middleware/logging';
import routes from './routes';
import webpackConfig from '../../webpack.config.babel';

const app = new Koa();
const _log = (message) => log('CMS', message);

app.use(compress());
app.use(loggerMiddleware('CMS'));

if (config.debug) {
  _log(`${chalk.green('✓')} Enable webpack dev middleware.`);

  const compiler = webpack(webpackConfig);
  const webpackHotMiddleware = require('koa-webpack-hot-middleware');
  const webpackDevMiddleware = require('koa-webpack-dev-middleware');

  app.use(convert(webpackDevMiddleware(compiler, {
    historyApiFallback: true,
    hot: true,
    quiet: true
  })));

  app.use(convert(webpackHotMiddleware(compiler)));
} else {
  app.use(convert(serve(path.resolve(__dirname, '../../build'))));
}

app.use(routes);

if (config.PORT) {
  app.listen(config.PORT, () => {
    _log(`${chalk.green('✓')} CMS running in: ${config.env}.`);
    _log(`${chalk.green('»»')} Access CMS at ${URL}.`);
  });
} else {
  _log(chalk.red('✗'), 'No PORT environment variable has been specified');
}
