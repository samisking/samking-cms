/* eslint no-param-reassign: "off" */
import APIService from '../services/api';

let CACHED_API_TOKEN = null;

const APIMiddleware = async (ctx, next) => {
  if (CACHED_API_TOKEN) {
    try {
      // Verify the token, cache it, and set it in state for the next middleware
      const apiToken = await APIService.verifyToken(CACHED_API_TOKEN);
      CACHED_API_TOKEN = apiToken;
      ctx.state.API_TOKEN = apiToken;
      return await next();
    } catch (err) {
      ctx.throw(err.message, err.status);
    }
  }

  try {
    const apiToken = await APIService.getToken();
    CACHED_API_TOKEN = apiToken;
    ctx.state.API_TOKEN = apiToken;
    return await next();
  } catch (err) {
    CACHED_API_TOKEN = null;
    ctx.throw(err.message, err.status);
  }
};

export default APIMiddleware;
