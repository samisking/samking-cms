import { getJSON } from 'sk-fetch-wrapper';
import config from '../../../config';
import * as types from './actionTypes';

export const getAllPhotos = () => (dispatch) => {
  dispatch({
    type: types.GET_PHOTOS_REQUEST,
    isFetching: true,
  });

  return getJSON(`${config.API_URL}/api/photos`)
    .then(res => {
      dispatch({
        type: types.GET_PHOTOS_SUCCESS,
        isFetching: false,
        photos: res,
      });
    })
    .catch(error => {
      dispatch({
        type: types.GET_PHOTOS_FAILURE,
        isFetching: false,
        error
      });
    });
};

export const getAllTags = () => (dispatch) => {
  dispatch({
    type: types.GET_TAGS_REQUEST,
    isFetching: true,
  });

  return getJSON(`${config.API_URL}/api/tags`)
    .then(res => {
      dispatch({
        type: types.GET_TAGS_SUCCESS,
        isFetching: false,
        tags: res,
      });
    })
    .catch(error => {
      dispatch({
        type: types.GET_TAGS_FAILURE,
        isFetching: false,
        error
      });
    });
};

export const getAllDesign = () => (dispatch) => {
  dispatch({
    type: types.GET_DESIGN_REQUEST,
    isFetching: true,
  });

  return getJSON(`${config.API_URL}/api/design`)
    .then(res => {
      dispatch({
        type: types.GET_DESIGN_SUCCESS,
        isFetching: false,
        design: res,
      });
    })
    .catch(error => {
      dispatch({
        type: types.GET_DESIGN_FAILURE,
        isFetching: false,
        error
      });
    });
};
