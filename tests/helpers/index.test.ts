import { AUTH_SIGN_IN } from "../../src/redux/actions/types";
import { isAuthenticated, isTokenValid, myUserRoles } from "../../src/helpers";
import { setAuthenticationExpired } from "../../src/redux/actions";
import { loginHandler, logout } from "../../src/redux/actions/auth";
import { store, initStore } from "../../src/redux/store";
import JWT  from "jsonwebtoken";


function signJwt(
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

function fakeLogin(jwt: string) {
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

function cleanupAuth() {
  logout()(store.dispatch);
  initStore();
}

describe("Test JsonWebToken", ()=>{
  beforeEach(()=>{
    setAuthenticationExpired()(store.dispatch);
  });

  it("Should be valid", ()=>{
    const jwt = signJwt();
    const res = isTokenValid(jwt);
    expect(res).toBe(true);
  });

  it("Should not be valid", ()=>{
    const jwt = signJwt(-100);
    expect(isTokenValid(jwt)).toBe(false);
  });

  it("Should be invalid clock to far in front", ()=>{
    const jwt = signJwt(1000, ["student"], 60*11);
    expect(isTokenValid(jwt)).toBe(false);
  });
});

describe("Test myUserRoles", ()=>{
  beforeEach(cleanupAuth);

  it("Should not have any roles", ()=>{
    const res = myUserRoles();
    expect(res).toStrictEqual([]);
  });

  it("Should have student role", ()=>{
    fakeLogin(signJwt(100,["student"]));
    expect(myUserRoles()).toStrictEqual(["student"])
  });

  it("Should have teacher and admin roles", ()=>{
    fakeLogin(signJwt(100, ["teacher", "admin"]));
    expect(myUserRoles()).toStrictEqual(["teacher", "admin"]);
  });

  afterAll(cleanupAuth);
});

describe("Test authentication", ()=>{
  beforeEach(cleanupAuth);

  it("Should not be authenticated", ()=>{
    const res = isAuthenticated();
    expect(res).toBe(false);
  });

  it("Should be authenticated", ()=>{
    fakeLogin(signJwt(100));
    expect(isAuthenticated()).toBe(true);
  });

  it("Should not be authenticated", async ()=>{
    fakeLogin(signJwt(0));
    await new Promise(resolve => setTimeout(resolve, 1000));
    const res = isAuthenticated();
    expect(res).toBe(false);
  });

  afterAll(cleanupAuth);
});