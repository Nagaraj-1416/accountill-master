import {
  AUTH,
  LOGOUT,
  UPDATE_USER,
  FETCH_USERS,
  DELETE_USER,
} from "../actions/constants";

const authReducer = (state = { authData: null, users: [] }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      // console.log(action?.data)
      return { ...state, authData: action?.data };

    case LOGOUT:
      localStorage.removeItem("profile");
      return { ...state, authData: null };
    case FETCH_USERS:
      return { ...state, users: action.payload };

    case UPDATE_USER:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      // console.log(action?.data)
      return { ...state, authData: action?.data };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter((client) => client._id !== action.payload),
      };

    default:
      return state;
  }
};

export default authReducer;
