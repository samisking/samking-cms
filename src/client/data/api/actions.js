import { actionTypes, client, queries } from '.';

export const getAllPhotos = () => (dispatch) => {
  dispatch({
    type: actionTypes.GET_PHOTOS_REQUEST,
    isFetching: true,
  });

  return client.query(queries.allPhotos)
    .then(res => {
      dispatch({
        type: actionTypes.GET_PHOTOS_SUCCESS,
        isFetching: false,
        photos: res.data.allPhotos,
      });
    })
    .catch(error => {
      dispatch({
        type: actionTypes.GET_PHOTOS_FAILURE,
        isFetching: false,
        error
      });
    });
};

export const getAllTags = () => (dispatch) => {
  dispatch({
    type: actionTypes.GET_TAGS_REQUEST,
    isFetching: true,
  });

  return client.query(queries.allTags)
    .then(res => {
      dispatch({
        type: actionTypes.GET_TAGS_SUCCESS,
        isFetching: false,
        tags: res.data.allTags,
      });
    })
    .catch(error => {
      dispatch({
        type: actionTypes.GET_TAGS_FAILURE,
        isFetching: false,
        error
      });
    });
};

export const getAllDesign = () => (dispatch) => {
  dispatch({
    type: actionTypes.GET_DESIGN_REQUEST,
    isFetching: true,
  });

  return client.query(queries.allDesignProjects)
    .then(res => {
      dispatch({
        type: actionTypes.GET_DESIGN_SUCCESS,
        isFetching: false,
        design: res.data.allDesignProjects,
      });
    })
    .catch(error => {
      dispatch({
        type: actionTypes.GET_DESIGN_FAILURE,
        isFetching: false,
        error
      });
    });
};
