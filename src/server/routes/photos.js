/* eslint no-param-reassign: "off" */
import APIService from '../services/api';
import PublishService from '../services/publish';

export const createPhotos = async ctx => {
  const API_TOKEN = ctx.state.API_TOKEN;
  const headers = { Authorization: API_TOKEN };
  const { files, body } = ctx.req;

  try {
    const photos = await PublishService.publishPhotos(files, body);

    const publishAllPhotos = photos.map(photo => {
      const variables = { photo };
      const query = `mutation ($photo: PhotoInput) {
        createPhoto(photo: $photo) { id }
      }`;

      return APIService.client.mutation(query, variables, { headers });
    });

    const created = await Promise.all(publishAllPhotos);
    ctx.body = { message: 'Created photo(s) successfully.', data: created };
    ctx.status = 201;
  } catch (err) {
    ctx.throw(err.message, err.status);
  }
};

export const updatePhoto = async ctx => {
  const API_TOKEN = ctx.state.API_TOKEN;
  const headers = { Authorization: API_TOKEN };
  const photo = ctx.request.body;
  const id = Number(ctx.params.id);

  try {
    const variables = { id, photo };
    const query = `mutation ($id: Int, $photo: PhotoInput) {
      updatePhoto(id: $id, photo: $photo) { id }
    }`;

    const updated = await APIService.client.mutation(query, variables, { headers });
    ctx.body = { message: 'Updated photo successfully.', data: updated };
    ctx.status = 201;
  } catch (err) {
    ctx.throw(err.message, err.status);
  }
};

export const deletePhoto = async ctx => {
  const API_TOKEN = ctx.state.API_TOKEN;
  const headers = { Authorization: API_TOKEN };
  const id = Number(ctx.params.id);

  try {
    const variables = { id };
    const query = `mutation ($id: Int) {
      deletePhoto(id: $id) { id }
    }`;

    const deleted = await APIService.client.mutation(query, variables, { headers });
    ctx.body = { message: 'Deleted photo successfully.', data: deleted };
    ctx.status = 200;
  } catch (err) {
    ctx.throw(err.message, err.status);
  }
};
