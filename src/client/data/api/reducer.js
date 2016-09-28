import initialState from './initialState';
import * as types from './actionTypes';

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_PHOTOS_REQUEST:
    case types.GET_DESIGN_REQUEST:
      return state;

    case types.GET_PHOTOS_SUCCESS:
      return Object.assign({}, state, {
        photos: action.photos
      });

    case types.GET_PHOTOS_FAILURE:
      return Object.assign({}, state, {
        photosError: action.photosError
      });

    case types.GET_TAGS_SUCCESS:
      return Object.assign({}, state, {
        tags: action.tags
      });

    case types.GET_TAGS_FAILURE:
      return Object.assign({}, state, {
        tagsError: action.tagsError
      });

    case types.GET_DESIGN_SUCCESS:
      return Object.assign({}, state, {
        design: action.design
      });

    case types.GET_DESIGN_FAILURE:
      return Object.assign({}, state, {
        designError: action.designError
      });

    default:
      return state;
  }
};
