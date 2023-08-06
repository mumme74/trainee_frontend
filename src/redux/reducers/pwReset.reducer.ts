import {
  PW_RESET_ERROR_SET,
  PW_RESET_ERROR_CLEAR,
  PW_RESET_STATE_CHANGED,
  ePwResetState,
} from "../actions/action.types";
import { AnyAction } from "redux";

// handles the reset password events

const DEFAULT_STATE: {
  state: ePwResetState,
  error: Error | null
} = {
  state: ePwResetState.NotStarted,
  error: null,
};

export function pwResetReducer(
  stateObj = DEFAULT_STATE,
  action: AnyAction,
) {
  switch(action.type) {
  case PW_RESET_ERROR_SET:
    return {
      ...stateObj,
      error: action.payload
    }
  case PW_RESET_ERROR_CLEAR:
    return {
      ...stateObj,
      error: null,
    }
  case PW_RESET_STATE_CHANGED:
    return {
      ...stateObj,
      state: action.payload
    }
  default:
    return stateObj;
  }
}