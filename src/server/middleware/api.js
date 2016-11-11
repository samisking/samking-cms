/* eslint no-param-reassign: "off" */
import APIService from '../services/api';

let CACHED_API_TOKEN = null;

// Gets a token for each request
export const APIMiddleware = async (ctx, next) => {
  try {
    const apiToken = CACHED_API_TOKEN
      ? await APIService.verifyToken(CACHED_API_TOKEN)
      : await APIService.getToken();
    ctx.state.API_TOKEN = apiToken;
    CACHED_API_TOKEN = apiToken;
    return await next();
  } catch (err) {
    CACHED_API_TOKEN = null;
    throw err;
  }
};
