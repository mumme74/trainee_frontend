import {
  ROLE_CURRENTLY_SELECTED, eRolesAvailable
} from "../actions/action.types";
import { AnyAction } from "redux";

const DEFAULT_STATE: {
  selectedRole: eRolesAvailable;
} = {
  selectedRole: eRolesAvailable.Student
};

export function roleReducer(
  state = DEFAULT_STATE,
  action: AnyAction
) {
  switch (action.type) {
  case ROLE_CURRENTLY_SELECTED:
    return {
      ...state,
      selectedRole: action.payload
    };
  default:
    return state;
  }
}
