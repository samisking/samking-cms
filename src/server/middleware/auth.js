/* eslint no-param-reassign: "off" */
import AuthService from '../services/auth';
import config from '../../config';

const authMiddleware = async (ctx, next) => {
  const token = ctx.headers.authorization;

  if (config.SKIP_AUTH) {
    ctx.state.isAuthed = true;
  } else {
    try {
      await AuthService.verifyToken(token);
      ctx.state.isAuthed = true;
    } catch (error) {
      ctx.state.isAuthed = false;
    }
  }

  return await next();
};

export const authRequired = async (ctx, next) => {
  if (!ctx.state.isAuthed) {
    ctx.throw('Authorization is required for this request.');
  }

  return await next();
};

export default authMiddleware;
