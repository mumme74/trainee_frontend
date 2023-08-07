import {
  ROLE_CURRENTLY_SELECTED, eRolesAvailable,
} from "./action.types";
import { AppDispatch, store } from "../store";
import { myUserRoles } from "../../helpers";
import { useTranslation } from "react-i18next";
import i18next from "../../i18n/i18n";


/**
 * Select another role within the app
 * @param {eRolesAvailable} role The role to use
 */
export function selectCurrentRole(role: eRolesAvailable) {
  return async (dispatch: AppDispatch) => {
    i18next
    const t = i18next.t;//useTranslation('core');

    if (myUserRoles().indexOf(role) < 0) {
      throw new Error(
        `${t('cant_select', {ns:'core'})} "${role}", ${t('do_not_have_privilege',{ns:'core'})}.`);
    }

    localStorage.setItem('selectedRole', role);

    dispatch({type: ROLE_CURRENTLY_SELECTED, payload: role});
  }
}
