/* eslint no-param-reassign: "off" */
import config from '../../config';

const assets = require('../../../build/assets.json');

const defaultRoute = async ctx => {
  const css = !config.debug ? `<link href="${assets.main.css}" rel="stylesheet" />` : '';

  ctx.body = `
    <!DOCTYPE html>
    <html lang="en-GB">
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        ${css}
      </head>
      <body>
        <div id="app"></div>
        <script src="${assets.main.js}"></script>
      </body>
    </html>`;
};

export default defaultRoute;
