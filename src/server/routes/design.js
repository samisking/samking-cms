/* eslint no-param-reassign: "off" */
import { postJSON, putJSON, deleteJSON } from 'sk-fetch-wrapper';
import config from '../../config';
import { uploadProject } from '../utils/upload';

export const createProject = async (ctx) => {
  const token = ctx.state.token;

  try {
    const data = await uploadProject(ctx.req.files, ctx.req.body);
    const project = await postJSON(`${config.API_URL}/api/design`, { data, token });
    ctx.body = { message: 'Created project successfully.', data: project };
    ctx.status = 201;
  } catch (err) {
    ctx.throw(err.message, err.status);
  }
};

export const updateProject = async (ctx) => {
  const token = ctx.state.token;

  try {
    const data = await uploadProject(ctx.req.files, ctx.req.body);
    const project = await putJSON(`${config.API_URL}/api/design/${ctx.params.id}`, { data, token });
    ctx.body = { message: 'Updated project successfully.', data: project };
    ctx.status = 201;
  } catch (err) {
    ctx.throw(err.message, err.status);
  }
};

export const deleteProject = async (ctx) => {
  const token = ctx.state.token;

  try {
    const data = await deleteJSON(`${config.API_URL}/api/design/${ctx.params.id}`, { token });
    ctx.body = { message: 'Deleted project successfully.', data };
    ctx.status = 200;
  } catch (err) {
    ctx.throw(err.message, err.status);
  }
};
