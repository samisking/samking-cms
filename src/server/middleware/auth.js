/* eslint no-param-reassign: "off" */
import { postJSON } from 'sk-fetch-wrapper';
import config from '../../config';

let API_TOKEN = null;

export const apiAuthMiddleware = async (ctx, next) => {
  // If there's a token already, then verify it
  if (API_TOKEN) {
    try {
      const res = await postJSON(`${config.API_URL}/api/authenticate`, {
        token: API_TOKEN
      });

      API_TOKEN = res.token;
      ctx.state.token = res.token;
      await next();
      return;
    } catch (err) {
      ctx.throw(err.message, err.status);
      return;
    }
  } else {
    // If no token exists, then try to get a new one
    try {
      const res = await postJSON(`${config.API_URL}/api/login`, {
        username: config.API_USER_NAME,
        password: config.API_USER_PASS
      });

      API_TOKEN = res.token;
      ctx.state.token = API_TOKEN;
      await next();
      return;
    } catch (err) {
      API_TOKEN = null;
      ctx.throw(err.message, err.status);
      return;
    }
  }
};
