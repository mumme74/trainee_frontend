import {
  SIDE_MENU_SET_IS_SHOWN,
  SIDE_MENU_TOGGLE
} from "../actions/action.types";
import { AnyAction } from "redux";

const DEFAULT_STATE = {
  isShown: false,
};

export function sideMenuReducer(
  state = DEFAULT_STATE,
  action: AnyAction,
) {
  switch (action.type) {
    case SIDE_MENU_SET_IS_SHOWN:
      return {
        ...state,
        isShown: action.payload,
      };
    case SIDE_MENU_TOGGLE:
      return {
        ...state,
        isShown: !state.isShown,
      };
    default:
      return state;
  }
}
