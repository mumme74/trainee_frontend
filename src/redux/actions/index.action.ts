// re-export
export * as form from "./form.action";
export * as auth from "./auth.action";
export * as user from "./user.action";
export * as sideMenu from "./sideMenu.action";
export * as error from "./error.action";
export * as communication from "./communication.action";


/// hum?? not really sure why these are here?
import axios from "axios";
import { SERVER_URL } from "../../config/config";
import { DASHBOARD_GET_DATA } from "./action.types";
import { AppDispatch } from "../store";
/*
    Flow in redux, from event to store
    ActionCreators -> create/returns Actions({..}) -> dispatch action -> middlewares -> reducers
 */
export function getSecret(path: string) {
  return async (dispatch: AppDispatch) => {
    try {
      const res = await axios.get(`${SERVER_URL}${path}`);
      console.log("get secret:", res);

      dispatch({
        type: DASHBOARD_GET_DATA,
        payload: res.data.secret,
      });
    } catch (err) {
      console.error(err);
    }
  };
}