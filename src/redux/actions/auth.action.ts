import axios, { AxiosError } from "axios";

import {
  AUTH_SIGN_UP,
  AUTH_ERROR,
  AUTH_SIGN_OUT,
  AUTH_SIGN_IN,
  IAuth,
  IUser,
  ISignUpNewUserForm,
} from "./action.types";

import { SERVER_URL } from "../../config/config";
import { AppDispatch } from "../store";

import { setUserInfo, clearUserInfo } from "./user.action";

type ServerErrT = {
  error: string;
  stack?: [string];
};

type ResponseDataT = {
  access_token: string;
  user: IUser;
};

type ErrT = AxiosError | Error;

export const setAccessToken = (token:string) => {
  axios.defaults.headers.common["Authorization"] = token;
  localStorage.setItem("JWT_TOKEN", token);
}

export const clearAccessToken = () => {
  localStorage.removeItem("JWT_TOKEN");
  delete axios.defaults.headers.common["Authorization"];
}

export interface ILoginData {
  password: string;
  login: string;
}

function errorHandler(dispatch: AppDispatch, err: ErrT) {
  let message: string;

  const axiosErr = err as AxiosError;
  if (axiosErr.response) {
    const response = axiosErr.response;

    if (response.data) {
      const data: any = response.data;
      console.warn(
        "error response from server",
        data.error || data || response,
      );

      message = Array.isArray(data?.details)
        ? data?.details[0]
        : data?.error
        ? data?.error?.message || data?.error
        : `${response.status} ${response.data}`;
    } else {
      message = axiosErr.message;
    }
  } else {
    console.warn("error occurred", err);
    message = err.message;
  }

  dispatch({
    type: AUTH_ERROR,
    payload: { message },
  });

  clearAccessToken();
}

// exported only to be able to test
export function loginHandler(
  dispatch: AppDispatch,
  responseData: ResponseDataT,
  actionType: string,
) {
  const token = responseData.access_token;
  if (!token) return errorHandler(dispatch, new Error("Received empty token"));

  setAccessToken(token);

  dispatch({
    type: actionType,
    payload: token,
  });

  setUserInfo(responseData.user)(dispatch);
}

export const oAuthGoogle = (data: any) => {
  return async (dispatch: AppDispatch) => {
    try {
      if (data.error) throw data.error;

      console.log("we received data", data);

      const res = await axios.post(`${SERVER_URL}/api/v1/users/oauth/google`, {
        access_token: data.tokenId,
      });

      loginHandler(dispatch, res.data, AUTH_SIGN_IN);
    } catch (err: any) {
      errorHandler(dispatch, err);
    }
  };
};

export const signUp = (data: ISignUpNewUserForm) => {
  /*
    Step 1 use the form data make  http request to send to server [X]
    Step 2 take backend response (jwtToken is here now!) [X]
    Step 3 Dispatch user just signed up with jwtToken [X]
    Step 4 Save the jwtToken into LocalStorage [X]
   */
  return async (dispatch: AppDispatch) => {
    try {
      //console.log("ActionCreator called");

      const res = await axios.post(`${SERVER_URL}/api/v1/users/signup`, data);
      loginHandler(dispatch, res.data, AUTH_SIGN_UP);
    } catch (err: any) {
      errorHandler(dispatch, err);
    }
  };
};

export const logout = () => {
  return (dispatch: AppDispatch) => {
    clearAccessToken();

    dispatch({
      type: AUTH_SIGN_OUT,
      payload: "",
    });

    clearUserInfo()(dispatch);
  };
};

export const login = (data: ILoginData) => {
  return async (dispatch: AppDispatch) => {
    try {
      const res = await axios.post(`${SERVER_URL}/api/v1/users/login`, data);
      loginHandler(dispatch, res.data, AUTH_SIGN_UP);
    } catch (err: any) {
      errorHandler(dispatch, err);
    }
  };
};
