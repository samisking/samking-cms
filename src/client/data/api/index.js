export { default } from './reducer';

export const initialState = {
  photos: [],
  photosError: null,
  tags: [],
  tagsError: null,
  design: [],
  designError: null
};

export * as actions from './actions';

export const actionTypes = {
  GET_PHOTOS_REQUEST: 'api/GET_PHOTOS_REQUEST',
  GET_PHOTOS_SUCCESS: 'api/GET_PHOTOS_SUCCESS',
  GET_PHOTOS_FAILURE: 'api/GET_PHOTOS_FAILURE',

  UPDATE_PHOTO_REQUEST: 'api/UPDATE_PHOTO_REQUEST',
  UPDATE_PHOTO_SUCCESS: 'api/UPDATE_PHOTO_SUCCESS',
  UPDATE_PHOTO_FAILURE: 'api/UPDATE_PHOTO_FAILURE',

  GET_TAGS_REQUEST: 'api/GET_TAGS_REQUEST',
  GET_TAGS_SUCCESS: 'api/GET_TAGS_SUCCESS',
  GET_TAGS_FAILURE: 'api/GET_TAGS_FAILURE',

  GET_DESIGN_REQUEST: 'api/GET_DESIGN_REQUEST',
  GET_DESIGN_SUCCESS: 'api/GET_DESIGN_SUCCESS',
  GET_DESIGN_FAILURE: 'api/GET_DESIGN_FAILURE'
};

export { default as client } from './client';
export * as queries from './queries';
