import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  user: null,
  error: null
};

const fetchUserInit = (state, action) => {
  return updateObject(state, { user: null, error: null });
};

const userProcessStart = (state, action) => {
  return updateObject(state, { error: null });
};

const userProcessSuccess = (state, action) => {
  return updateObject(state, {
    user: action.user,
    error: null
  });
};

const userProcessFail = (state, action) => {
  return updateObject(state, { error: action.error });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_USER_INIT:
      return fetchUserInit(state, action);
    case actionTypes.FETCH_USER_START:
      return userProcessStart(state, action);
    case actionTypes.FETCH_USER_SUCCESS:
      return userProcessSuccess(state, action);
    case actionTypes.FETCH_USER_FAIL:
      return userProcessFail(state, action);
    case actionTypes.UPDATE_USER_START:
      return userProcessStart(state, action);
    case actionTypes.UPDATE_USER_SUCCESS:
      return userProcessSuccess(state, action);
    case actionTypes.UPDATE_USER_FAIL:
      return userProcessFail(state, action);
    case actionTypes.ADD_PHOTO_TO_USER_START:
      return userProcessStart(state, action);
    case actionTypes.ADD_PHOTO_TO_USER_SUCCESS:
      return userProcessSuccess(state, action);
    case actionTypes.ADD_PHOTO_TO_USER_FAIL:
      return userProcessFail(state, action);
    case actionTypes.DELETE_USER_PHOTO_START:
      return userProcessStart(state, action);
    case actionTypes.DELETE_USER_PHOTO_SUCCESS:
      return userProcessSuccess(state, action);
    case actionTypes.DELETE_USER_PHOTO_FAIL:
      return userProcessFail(state, action);
    case actionTypes.SET_MAIN_PHOTO_START:
      return userProcessStart(state, action);
    case actionTypes.SET_MAIN_PHOTO_SUCCESS:
      return userProcessSuccess(state, action);
    case actionTypes.SET_MAIN_PHOTO_FAIL:
      return userProcessFail(state, action);
    case actionTypes.ADD_ACTIVITY_START:
      return userProcessStart(state, action);
    case actionTypes.ADD_ACTIVITY_SUCCESS:
      return userProcessSuccess(state, action);
    case actionTypes.ADD_ACTIVITY_FAIL:
      return userProcessFail(state, action);
    case actionTypes.DELETE_ACTIVITY_START:
      return userProcessStart(state, action);
    case actionTypes.DELETE_ACTIVITY_SUCCESS:
      return userProcessSuccess(state, action);
    case actionTypes.DELETE_ACTIVITY_FAIL:
      return userProcessFail(state, action);
      default:
    return state;
  }
};

export default reducer;
