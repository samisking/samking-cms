/* eslint no-param-reassign: "off" */
import { postJSON } from 'sk-fetch-wrapper';
import config from '../../config';

export const createTag = async (ctx) => {
  const { token } = ctx.state;
  const data = ctx.request.body;

  try {
    await postJSON(`${config.API_URL}/api/tags`, { data, token });
    ctx.body = { message: 'Created tag successfully.', data };
    ctx.status = 201;
  } catch (err) {
    ctx.throw(err.message, err.status);
  }
};
