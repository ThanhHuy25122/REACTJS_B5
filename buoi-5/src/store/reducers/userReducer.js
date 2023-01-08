import {
  ADD_USER,
  DELETE_USER,
  SET_SELECTED_USER,
  UPDATE_USER,
} from "../types/userType";

const DEFAULT_STATE = {
  userList: [
    {
      id: 1,
      username: "Thanhhuy",
      fullName: "Thanh Huy",
      password: "thathu123",
      phoneNumber: "0325216121",
      email: "huyxh@gmail.com",
      type: "Client",
    },
    {
      id: 2,
      username: "Thathu",
      fullName: "Thanh Chung",
      password: "0123456",
      phoneNumber: "0321213212",
      email: "chut@gmail.com",
      type: "Admin",
    },
  ],
  selectedUser: null,
};

export const userReducer = (state = DEFAULT_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_USER: {
      const data = [...state.userList];

      data.push({
        ...payload,
        id: Date.now(),
      });

      state.userList = data;

      break;
    }

    case SET_SELECTED_USER: {
      state.selectedUser = payload;

      break;
    }

    case UPDATE_USER: {
      state.userList = state.userList.map((element) =>
        element.id === payload.id ? payload : element
      );
      state.selectedUser = null;

      break;
    }

    case DELETE_USER: {
      state.userList = state.userList.filter((element) =>
        element.id === payload.id ? false : true
      );

      break;
    }

    default:
      break;
  }

  return { ...state };
};
