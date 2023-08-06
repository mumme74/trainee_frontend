import { AnyAction } from "redux";
import {
  USER_INFO_CLEARED,
  USER_INFO_ERROR,
  USER_INFO_SET,
  USER_INFO_CLEAR_ERROR,
  IUser,
} from "../actions/action.types";

const DEFAULT_STATE: IUser = {
  id: -1,
  userName: "",
  firstName: "",
  lastName: "",
  email: "",
  picture: "",
  method: "",
  googleId: "",
  error: {},
};

export function userReducer(state = DEFAULT_STATE, action: AnyAction) {
  switch (action.type) {
  case USER_INFO_SET:
    return {
      ...state,
      ...action.payload
    };
  case USER_INFO_CLEARED:
    return {
      ...DEFAULT_STATE,
    };
  case USER_INFO_CLEAR_ERROR:
    return {
      ...state,
      error: {},
    };
  case USER_INFO_ERROR:
    return {
      ...state,
      error: action.payload,
    };
  default:
    return state;
  }
}
