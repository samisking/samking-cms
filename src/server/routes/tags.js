/* eslint no-param-reassign: "off" */
import { APIClient } from '../services/api';

export const createTag = async ctx => {
  const API_TOKEN = ctx.state.API_TOKEN;
  const headers = { Authorization: API_TOKEN };
  const tag = ctx.request.body;

  try {
    const variables = { tag };
    const query = `mutation ($tag: TagInput) {
      createTag(tag: $tag) { id }
    }`;

    const created = await APIClient.mutation(query, variables, { headers });
    ctx.body = { message: 'Updated photo successfully.', data: created };
    ctx.status = 201;
  } catch (err) {
    ctx.throw(err.message, err.status);
  }
};
