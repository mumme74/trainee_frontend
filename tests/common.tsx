import {store, initStore } from "../src/redux/store";
import { loginHandler, logout } from "../src/redux/actions/auth";
import { AUTH_SIGN_IN } from "../src/redux/actions/types";
import JWT  from "jsonwebtoken";

export function signJwt(
  expires: number = 100,
  roles: string[] = [],
  iat: number = 0)
{
  const now = Math.floor(new Date().getTime()) / 1000; // sec not ms
  return JWT.sign({
      iss: "Testing",
      sub: 1234,
      iat: iat ? iat + now : (expires < 0 ? now - expires : now),
      exp: now + expires,
      roles
    },
    "123456789ABCDFEF"
  );
}

export function fakeLogin(jwt: string) {
  const user = {
    userName:"test", firstName:"Test", lastName:"Testsson",
    email:"test@test.nu", picture:"",method:"",error:{}
  };
  const res = {
    access_token: jwt,
    user:{id:"123", ...user},
    data:jwt,
    status:200, statusText:"OK",
    headers:{},
    config: {},
  }
  loginHandler(store.dispatch, res, AUTH_SIGN_IN);
}

export function cleanupAuth() {
  logout()(store.dispatch);
  initStore();
}

export function mockI18Next(){
  jest.mock('react-i18next', () => ({
    // this mock makes sure any components using the translate hook can use it without a warning being shown
    useTranslation: () => {
      return {
        t: (str:string) => str,
        i18n: {
          changeLanguage: () => new Promise(() => {}),
        },
      };
    },
    initReactI18next: {
      type: '3rdParty',
      init: () => {},
    },
    // this mock makes sure any components using the translate HoC receive the t function as a prop
    withTranslation: () => (Component: any) => {
      Component.defaultProps = { ...Component.defaultProps, t: () => "" };
      return Component;
    }
  }));
  jest.mock('react-i18next', () => ({

  }));
}