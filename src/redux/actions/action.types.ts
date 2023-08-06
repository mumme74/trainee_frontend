// authenticate types
export const AUTH_SIGN_UP = "AUTH_SIGN_UP";
export const AUTH_ERROR = "AUTH_FAIL";
export const AUTH_SIGN_OUT = "AUTH_SIGN_OUT";
export const AUTH_SIGN_IN = "AUTH_SIGN_IN;";

// user types
export const USER_INFO_SET = "USER_INFO_SET";
export const USER_INFO_CLEARED = "USER_INFO_CLEARED";
export const USER_INFO_ERROR = "USER_INFO_ERROR";
export const USER_INFO_CLEAR_ERROR = "USER_INFO_CLEAR_ERROR";

// password reset on user
export const PW_RESET_ERROR_SET = "PW_RESET_ERROR_SET";
export const PW_RESET_ERROR_CLEAR ="PW_RESET_ERROR_CLEAR";
export const PW_RESET_STATE_CHANGED = "PW_RESET_STATE_CHANGED";

// communication info
export const ERROR_COMMUNICATION = "ERROR_COMMUNICATION";
export const ERROR_COMMUNICATION_CLEAR = "ERROR_COMMUNICATION_CLEAR";
export const ERROR_AUTHENTICATION_EXPIRED = "ERROR_AUTHENTICATION_EXPIRED";
export const ERROR_CLEAR_ALL = "ERROR_CLEAR_ALL";
// fired on start of a request, a counter if many requests is live at the same time
export const COMMUNICATION_CNT = "COMMUNICATION_CNT";

// currently stale, for user form
export const UPDATE_FORM_STATE =
  "final-form-redux-example/finalForm/UPDATE_FORM_STATE";

// dashboard
export const DASHBOARD_GET_DATA = "DASHBOARD_GET_DATA";

// side menu
export const SIDE_MENU_SET_IS_SHOWN = "SIDE_MENU_SET_IS_SHOWN";
export const SIDE_MENU_TOGGLE = "SIDE_MENU_TOGGLE";

/**
 * Base interface to identify a user
 */
interface IUserBase {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  picture: string;
  method: string;
  googleId?: string;
  hd?: string;
  error: { message?: string; error?: Error };
}
/**
 * Formdata when creating a new user
 */
export interface ISignUpNewUserForm extends IUserBase {
  password: string;
}
/**
 * User with userId
 */
export interface IUser extends IUserBase {
  id: number;
}

export interface IDashboard {
  secret: string;
}

/**
 * The form data to submit when logging in
 */
export interface ILoginForm {
  login: string;
  password: string;
}

/**
 * Carries login information
 */
export interface IAuth {
  isAuthenticated: boolean;
  token: string;
  error: { message?: string; error?: Error };
  errorOAuth: { message?: string; error?: Error };
}


/**
 * Formdata when Requesting a password reset
 */
export interface IReqPwReset {
  email:string;
}
/**
 * Formdata when sending a new password
 * after reset Token is obtained
 */
export interface IPwResetNew {
  id: number;
  token:string;
  password:string;
}
/**
 * States the password request engine can have
 */
export enum ePwResetState {
  NotStarted,  // initial state
  RequestReset, // sent a request but not received response from server
  EmailSent,    // server has sent a email with reset token
  HasResetToken, // frontend has gotten the reset token via link from email
  NewPasswordSent, // Sent nwe password to server but not yet confirmed
  PasswordHasChanged, // The password has changed
  // must be last
  ErrorState,  // when a error occurred
}
