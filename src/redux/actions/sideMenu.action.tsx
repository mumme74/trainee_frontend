import {
  SIDE_MENU_SET_IS_SHOWN,
  SIDE_MENU_TOGGLE
} from "./action.types";
import { store, AppDispatch } from "../store";

export const setSideMenuIsShown = (show: boolean) => {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: SIDE_MENU_SET_IS_SHOWN,
      payload: show,
    });
  };
};

export const toggleSideMenu = () => {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: SIDE_MENU_TOGGLE,
      payload: null,
    });
  };
};
