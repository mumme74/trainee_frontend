import { AnyAction } from "redux";
import {
  AUTH_ERROR,
  AUTH_SIGN_UP,
  AUTH_SIGN_IN,
  AUTH_SIGN_OUT,
  IAuth,
} from "../actions/action.types";

const DEFAULT_STATE: IAuth = {
  isAuthenticated: false,
  token: "",
  error: {},
  errorOAuth: {},
};

export function authReducer(state: IAuth = DEFAULT_STATE, action: AnyAction) {
  switch (action.type) {
    case AUTH_SIGN_IN:
    case AUTH_SIGN_UP: // fallthrough
      console.log("AuthReducer called");
      return {
        ...state,
        token: action.payload,
        isAuthenticated: !!action.payload,
        error: {},
      };
    case AUTH_ERROR:
      console.log("AuthFail reducer err:", action.payload);
      return {
        ...state,
        error: action.payload,
        isAuthenticated: false,
        token: "",
      };
    case AUTH_SIGN_OUT:
      console.log("AuthSignOut reducer called");
      return {
        ...state,
        token: "",
        isAuthenticated: false,
        error: { message: action.payload },
      };
    default:
      return state;
  }
}
