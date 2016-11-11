/* eslint no-param-reassign: "off" */
import { APIClient } from '../services/api';
import PublishService from '../services/publish';

export const createPhotos = async ctx => {
  const API_TOKEN = ctx.state.API_TOKEN;
  const headers = { Authorization: API_TOKEN };
  const { files, body } = ctx.req;

  try {
    const photos = await PublishService.publishPhotosPhotos(files, body);

    const postAllPhotos = photos.map(photo => {
      const variables = { photo };
      const query = `mutation ($photo: PhotoInput) {
        createPhoto(photo: $photo) { id }
      }`;

      return APIClient.mutation(query, variables, { headers });
    });

    const created = await Promise.all(postAllPhotos);
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
  const id = parseInt(ctx.params.id, 10);

  try {
    const variables = { id, photo };
    const query = `mutation ($id: Int, $photo: PhotoInput) {
      updatePhoto(id: $id, photo: $photo) { id }
    }`;

    const updated = await APIClient.mutation(query, variables, { headers });
    ctx.body = { message: 'Updated photo successfully.', data: updated };
    ctx.status = 201;
  } catch (err) {
    ctx.throw(err.message, err.status);
  }
};

export const deletePhoto = async ctx => {
  const API_TOKEN = ctx.state.API_TOKEN;
  const headers = { Authorization: API_TOKEN };
  const id = parseInt(ctx.params.id, 10);

  try {
    const variables = { id };
    const query = `mutation ($id: Int) {
      deletePhoto(id: $id) { id }
    }`;

    const deleted = await APIClient.mutation(query, variables, { headers });
    ctx.body = { message: 'Deleted photo successfully.', data: deleted };
    ctx.status = 200;
  } catch (err) {
    ctx.throw(err.message, err.status);
  }
};
