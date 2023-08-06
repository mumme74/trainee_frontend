import axios from "axios";
import { SERVER_URL } from "../../config/config";
import {
  USER_INFO_CLEARED,
  USER_INFO_SET,
  USER_INFO_ERROR,
  USER_INFO_CLEAR_ERROR,
  IUser,
} from "./action.types";
import { AppDispatch } from "../store";

/**
 * Action to refresh my user info
 */
export const refreshUserInfo = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const res = await axios.get(`${SERVER_URL}/api/v1/users/myinfo`);
      return setUserInfo(res.data)(dispatch);
    } catch (err: any) {
      console.error(err);
      return errorUserInfo(err)(dispatch);
    }
  };
};

/**
 * Save my own user data, from settings form
 * @param {IUser} data The formData to save
 */
export const saveMyUserInfo = (data: IUser) => {
  return async (dispatch: AppDispatch) => {
    try {
      const res = await axios.post(`${SERVER_URL}/api/v1/users/savemyuserinfo`, {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        picture: data.picture,
      });
      return setUserInfo(res.data)(dispatch);
    } catch (err: any) {
      return errorUserInfo(err)(dispatch);
    }
  };
};

/**
 * Change my own password
 * @param {string} data The new password
 */
export const changeMyPassword = (data: { password: string }) => {
  return async (dispatch: AppDispatch) => {
    try {
      const res = await axios.post(`${SERVER_URL}/api/v1/users/changemypassword`, data);
      if (res.data.success) return clearUserInfoError()(dispatch);
      return setUserInfo(res.data)(dispatch);
    } catch (err: any) {
      return errorUserInfo(err)(dispatch);
    }
  };
};

/**
 * Set user info to this.
 * @note It only sets it in the browser,
 *   use changeUserInfo to change on server
 * @param {IUser} data The new Data to display
 */
export const setUserInfo = (data: IUser) => {
  return async (dispatch: AppDispatch) => {
    dispatch({
      type: USER_INFO_SET,
      payload: data,
    });
  };
};

// only clears it locally inte browser
/**
 * Clears user info locally in browser
 * @note It only clear it in the browser, not on the server
 */
export const clearUserInfo = () => {
  return async (dispatch: AppDispatch) => {
    dispatch({
      type: USER_INFO_CLEARED,
      payload: "",
    });
  };
};

/**
 * Publish a error for userInfo, such non responding server or something
 * @param {Error} error The error that caused this
 */
export const errorUserInfo = (error: Error) => {
  return async (dispatch: AppDispatch) => {
    dispatch({
      type: USER_INFO_ERROR,
      payload: error,
    });
  };
};

/**
 * Clears error for userInfo, previously set by errorUserInfo
 */
export const clearUserInfoError = () => {
  return async (dispatch: AppDispatch) => {
    dispatch({
      type: USER_INFO_CLEAR_ERROR,
      payload: null,
    });
  };
};
