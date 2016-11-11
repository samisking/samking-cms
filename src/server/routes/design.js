/* eslint no-param-reassign: "off" */
import APIService from '../services/api';
import PublishService from '../services/publish';

export const createProject = async ctx => {
  const API_TOKEN = ctx.state.API_TOKEN;
  const headers = { Authorization: API_TOKEN };
  const { files, body } = ctx.req;

  try {
    const project = await PublishService.publishProject(files, body);

    const variables = { project };
    const query = `mutation ($project: DesignProjectInput) {
      createDesignProject(project: $project) { id }
    }`;

    const created = await APIService.client.mutation(query, variables, { headers });
    ctx.body = { message: 'Created project successfully.', data: created };
    ctx.status = 201;
  } catch (err) {
    ctx.throw(err.message, err.status);
  }
};

export const updateProject = async ctx => {
  const API_TOKEN = ctx.state.API_TOKEN;
  const headers = { Authorization: API_TOKEN };
  const { files, body } = ctx.req;
  const id = Number(ctx.params.id);

  try {
    const project = await PublishService.publishProject(files, body);

    const variables = { id, project };
    const query = `mutation ($id: Int, $project: DesignProjectInput) {
      updateDesignProject(id: $id, project: $project) { id }
    }`;

    const updated = await APIService.client.mutation(query, variables, { headers });
    ctx.body = { message: 'Updated project successfully.', data: updated };
    ctx.status = 201;
  } catch (err) {
    ctx.throw(err.message, err.status);
  }
};

export const deleteProject = async ctx => {
  const API_TOKEN = ctx.state.API_TOKEN;
  const headers = { Authorization: API_TOKEN };
  const id = Number(ctx.params.id);

  try {
    const variables = { id };
    const query = `mutation ($id: Int) {
      deleteDesignProject(id: $id) { id }
    }`;

    const deleted = await APIService.client.mutation(query, variables, { headers });
    ctx.body = { message: 'Deleted project successfully.', data: deleted };
    ctx.status = 200;
  } catch (err) {
    ctx.throw(err.message, err.status);
  }
};
