import { initialState, actionTypes } from '.';

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_PHOTOS_REQUEST:
    case actionTypes.GET_DESIGN_REQUEST:
      return state;

    case actionTypes.GET_PHOTOS_SUCCESS:
      return Object.assign({}, state, {
        photos: action.photos
      });

    case actionTypes.GET_PHOTOS_FAILURE:
      return Object.assign({}, state, {
        photosError: action.photosError
      });

    case actionTypes.GET_TAGS_SUCCESS:
      return Object.assign({}, state, {
        tags: action.tags
      });

    case actionTypes.GET_TAGS_FAILURE:
      return Object.assign({}, state, {
        tagsError: action.tagsError
      });

    case actionTypes.GET_DESIGN_SUCCESS:
      return Object.assign({}, state, {
        design: action.design
      });

    case actionTypes.GET_DESIGN_FAILURE:
      return Object.assign({}, state, {
        designError: action.designError
      });

    default:
      return state;
  }
};
