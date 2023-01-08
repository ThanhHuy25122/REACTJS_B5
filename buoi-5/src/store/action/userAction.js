import {
  ADD_USER,
  SET_SELECTED_USER,
  UPDATE_USER,
  DELETE_USER,
} from "../types/userType";

export const addUserAction = (payload) => {
  return {
    type: ADD_USER,
    payload,
  };
};

export const setSelectedUserAction = (payload) => {
  return {
    type: SET_SELECTED_USER,
    payload,
  };
};
export const updateUserAction = (payload) => {
  return {
    type: UPDATE_USER,
    payload,
  };
};

export const deleteUserAciton = (payload) => {
  return {
    type: DELETE_USER,
    payload,
  };
};
