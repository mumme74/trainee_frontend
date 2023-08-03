import { isAuthenticated, isTokenValid, myUserRoles } from "../../src/helpers";
import { setAuthenticationExpired } from "../../src/redux/actions";
import { store } from "../../src/redux/store";
import { signJwt, fakeLogin, cleanupAuth } from "../common";
import { MockConsole } from "../common";

const squelshConsole = true;

let mockConsole: MockConsole;
beforeAll(()=>{
  if (squelshConsole)
    mockConsole = new MockConsole();
});

afterAll(()=>{
  if (mockConsole)
    mockConsole.restore();
});


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