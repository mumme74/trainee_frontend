import {
  ERROR_COMMUNICATION,
  ERROR_AUTHENTICATION_EXPIRED,
  ERROR_CLEAR_ALL,
} from "./action.types";
import { AppDispatch } from "../store";

export const setCommunicationError = (error: Error | string) => {
  return (dispatch: AppDispatch) => {
    if (typeof error === "string") error = new Error(error);

    dispatch({
      type: ERROR_COMMUNICATION,
      payload: error,
    });
  };
};

export const clearAllErrors = () => {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: ERROR_CLEAR_ALL,
      payload: true,
    });
  };
};

export const setAuthenticationExpired = () => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: ERROR_AUTHENTICATION_EXPIRED, payload: true });
  };
};

export const clearAuthenticationExpired = () => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: ERROR_AUTHENTICATION_EXPIRED, payload: false });
  };
};
