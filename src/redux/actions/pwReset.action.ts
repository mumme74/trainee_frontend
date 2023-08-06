import {
  IReqPwReset,
  IPwResetNew,
  PW_RESET_ERROR_CLEAR,
  PW_RESET_ERROR_SET,
  PW_RESET_STATE_CHANGED,
  ePwResetState,
} from "./action.types";
import axios, { AxiosError } from "axios";
import { SERVER_URL } from "../../config/config";
import { AppDispatch } from "../store";
import { setAccessToken } from "./auth.action";

/**
 * Call when you want to initiate a password reset sequence
 * @param {IReqPwReset} data The email to identify user
 */
export const pwResetRequest = (data: IReqPwReset)=> {
  return async (dispatch: AppDispatch) => {
    try {
      pwResetStateChanged(ePwResetState.RequestReset)(dispatch);
      const res = await axios.post(
        `${SERVER_URL}/api/v1/users/requestpasswordreset`, data);
      if (res.data?.success)
        pwResetStateChanged(ePwResetState.EmailSent)(dispatch);
      else
        throw new Error(res.data?.error.message);

    } catch (err: any) {
      return pwResetSetError(err)(dispatch);
    }
  }
}

/**
 * Call this action when we have a password reset token
 * ie: A pwResetRequest has been successful
 * @param {IPwResetNew} data The data to send
 */
export const pwResetNewSubmit = (data: IPwResetNew) => {
  return async (dispatch: AppDispatch) => {
    try {
      pwResetStateChanged(ePwResetState.NewPasswordSent)(dispatch);
      const res = await axios.post(
        `${SERVER_URL}/api/v1/users/setpasswordonreset`, data);
      if (res.data.success) {
        setAccessToken(res.data.access_token);
        pwResetStateChanged(ePwResetState.PasswordHasChanged)(dispatch);
      } else
        throw new Error(res.data?.error.message);

    } catch(err:any) {
      const err2 = new AxiosError(
        err?.response?.data?.error?.message || err?.message || err+"",
        err?.code, err?.config, err?.request, err?.response);
      return pwResetSetError(err2)(dispatch);
    }
  }
}

/**
 * Clears any stored password reset errors
 */
export const pwResetClearError = () => {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: PW_RESET_ERROR_CLEAR,
      payload: null
    });
    // reset process
    pwResetStateChanged(ePwResetState.NotStarted)(dispatch);
  }
}

// sets an error received from server
const pwResetSetError = (error: Error) => {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: PW_RESET_ERROR_SET,
      payload: error
    });
    // also notify state change
    pwResetStateChanged(ePwResetState.ErrorState)(dispatch);
  }
}

// dispatched when the whole process has gone through
export const pwResetStateChanged = (state: ePwResetState) => {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: PW_RESET_STATE_CHANGED,
      payload: state,
    });
  }
}
