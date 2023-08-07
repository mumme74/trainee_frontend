import { combineReducers } from "redux";
import { formReducer } from "./form.reducer";
import { authReducer } from "./auth.reducer";
import { userReducer } from "./user.reducer";
import { sideMenuReducer } from "./sideMenu.reducer";
import { dashboardReducer } from "./dashboard.reducer";
import { communicationReducer } from "./communication.reducer";
import { errorReducer } from "./error.reducer";
import { pwResetReducer } from "./pwReset.reducer";
import { roleReducer } from "./role.reducer";

export default combineReducers({
  form: formReducer,
  auth: authReducer,
  user: userReducer,
  dash: dashboardReducer,
  sideMenu: sideMenuReducer,
  communication: communicationReducer,
  error: errorReducer,
  pwReset: pwResetReducer,
  role: roleReducer,
});
