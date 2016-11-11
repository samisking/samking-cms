/* eslint no-param-reassign: "off" */
import { postJSON } from 'sk-fetch-wrapper/lib/json';
import config from '../../config';

// Gets a token for each request
// TODO: Refactor this!!
export const APIMiddleware = async (ctx, next) => {
  const res = await postJSON(`${config.API_URL}/get-token`, {
    username: config.API_USER_NAME,
    password: config.API_USER_PASS
  });

  if (!res.success) {
    ctx.throw('Failed to get a token');
  }

  const apiToken = res.token;
  ctx.state.API_TOKEN = apiToken;
  return await next();
};
