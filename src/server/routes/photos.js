/* eslint no-param-reassign: "off" */
import { postJSON, putJSON, deleteJSON } from 'sk-fetch-wrapper';
import config from '../../config';
import { uploadPhotos } from '../utils/upload';

export const createPhotos = async (ctx) => {
  const token = ctx.state.token;

  try {
    const data = await uploadPhotos(ctx.req.files, ctx.req.body);

    for (const photo of data) {
      await postJSON(`${config.API_URL}/api/photos`, { data: photo, token });
    }

    ctx.body = { message: 'Created photo(s) successfully.', data };
    ctx.status = 201;
  } catch (err) {
    ctx.throw(err.message, err.status);
  }
};

export const updatePhoto = async (ctx) => {
  const token = ctx.state.token;
  const data = ctx.request.body;
  const { id } = ctx.params;

  try {
    // Try and update the photo with the new data
    await putJSON(`${config.API_URL}/api/photos/${id}`, { data, token });
    ctx.body = { message: 'Updated photo successfully.', data };
    ctx.status = 201;
  } catch (err) {
    ctx.throw(err.message, err.status);
  }
};

export const deletePhoto = async (ctx) => {
  const token = ctx.state.token;
  const { photo: data } = ctx.request.body;

  try {
    await deleteJSON(`${config.API_URL}/api/photos/${data.id}`, { token });
    ctx.body = { message: 'Deleted photo successfully.', data };
    ctx.status = 200;
  } catch (err) {
    ctx.throw(err.message, err.status);
  }
};
