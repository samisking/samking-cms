/* eslint no-param-reassign: "off" */
import { GraphClient, makeHeaders } from '../services/api';

export const createTag = async ctx => {
  const API_TOKEN = ctx.state.API_TOKEN;
  const headers = makeHeaders(API_TOKEN);
  const tag = ctx.request.body;

  try {
    const variables = { tag };
    const query = `{
      mutation ($photo: Tag) {
        createTag(tag: $tag) { id }
      }
    }`;

    const created = await GraphClient.mutation(query, variables, headers);
    ctx.body = { message: 'Updated photo successfully.', data: created };
    ctx.status = 201;
  } catch (err) {
    ctx.throw(err.message, err.status);
  }
};
