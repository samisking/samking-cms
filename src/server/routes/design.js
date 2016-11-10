/* eslint no-param-reassign: "off" */
import { GraphClient, makeHeaders } from '../services/api';
import PublishService from '../services/publish';

export const createProject = async ctx => {
  const API_TOKEN = ctx.state.API_TOKEN;
  const headers = makeHeaders(API_TOKEN);
  const { files, body } = ctx.req;

  try {
    const project = await PublishService.publishProject(files, body);

    const variables = { project };
    const query = `{
      mutation ($project: DesignProject) {
        createDesignProject(project: $project) { id }
      }
    }`;

    const created = await GraphClient.mutation(query, variables, headers);
    ctx.body = { message: 'Created project successfully.', data: created };
    ctx.status = 201;
  } catch (err) {
    ctx.throw(err.message, err.status);
  }
};

export const updateProject = async ctx => {
  const API_TOKEN = ctx.state.API_TOKEN;
  const headers = makeHeaders(API_TOKEN);
  const { files, body } = ctx.req;
  const id = parseInt(ctx.params.id, 10);

  try {
    const project = await PublishService.publishProject(files, body);

    const variables = { id, project };
    const query = `{
      mutation ($id: Int, $project: DesignProject) {
        updateDesignProject(id: $id, project: $project) { id }
      }
    }`;

    const updated = await GraphClient.mutation(query, variables, headers);
    ctx.body = { message: 'Updated project successfully.', data: updated };
    ctx.status = 201;
  } catch (err) {
    ctx.throw(err.message, err.status);
  }
};

export const deleteProject = async ctx => {
  const API_TOKEN = ctx.state.API_TOKEN;
  const headers = makeHeaders(API_TOKEN);
  const id = parseInt(ctx.params.id, 10);

  try {
    const variables = { id };
    const query = `{
      mutation ($id: Int) {
        deleteDesignProject(id: $id) { id }
      }
    }`;

    const deleted = await GraphClient.mutation(query, variables, headers);
    ctx.body = { message: 'Deleted project successfully.', data: deleted };
    ctx.status = 200;
  } catch (err) {
    ctx.throw(err.message, err.status);
  }
};
