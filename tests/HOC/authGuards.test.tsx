import React, { ReactElement } from "react";
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom";
import { act } from "@testing-library/react"
import { MockConsole } from "../common";
import "../i18n_for_tests";

import { fakeLogin, signJwt, cleanupAuth } from "../common";

import {
  withAuthGuardCommon,
  withAuthGuardStudent,
  withAuthGuardAdmin,
  withAuthGuardSuperAdmin,
  withAuthGuardTeacher
} from "../../src/components/HOCs/authGuards";

const squelshConsole = true;


let container: HTMLDivElement;
let root: ReactDOM.Root;
beforeEach(()=>{
  container = document.createElement("div");
  document.body.appendChild(container);
  root = ReactDOM.createRoot(container);
});

afterEach(()=>{
  document.body.removeChild(container);
  container.remove();
});

let mockConsole: MockConsole;
beforeAll(()=>{
  if (squelshConsole)
    mockConsole = new MockConsole();
});

afterAll(()=>{
  if (mockConsole)
    mockConsole.restore();
});

const _TestComp: React.FC<React.PropsWithChildren> = (props) => {
  return (
    <span>{props.children}</span>
  )
}

const TestCommon = withAuthGuardCommon(_TestComp),
      TestStudent = withAuthGuardStudent(_TestComp),
      TestTeacher = withAuthGuardTeacher(_TestComp),
      TestAdmin = withAuthGuardAdmin(_TestComp),
      TestSuperAdmin = withAuthGuardSuperAdmin(_TestComp);

describe("Test withAuthGuardCommon", ()=>{
  function buildRefs(){
    act(()=>{
      root.render(
        <BrowserRouter>
          <TestCommon><span>Inside</span></TestCommon>
        </BrowserRouter>);
    })
  }

  afterEach(cleanupAuth);

  it("Should not be authorised", ()=>{
    buildRefs();
    expect(container.textContent)
      .toBe("unauth_headerunauth_login_firstlogin_here");
  });

  it("Should be authorized, student", ()=>{
    fakeLogin(signJwt(100,["student"]));
    buildRefs();
    expect(container.textContent).toBe("Inside");
  });

  it("Should be authorized, teacher", ()=>{
    fakeLogin(signJwt(100,["teacher"]));
    buildRefs();
    expect(container.textContent).toBe("Inside");
  });

  it("Should be authorized, admin", ()=>{
    fakeLogin(signJwt(100,["admin"]));
    buildRefs();
    expect(container.textContent).toBe("Inside");
  });

  it("Should be authorized, super admin", ()=>{
    fakeLogin(signJwt(100,["super"]));
    buildRefs();
    expect(container.textContent).toBe("Inside");
  });
});

describe("Test withAuthGuardStudent", ()=>{
  function buildRefs() {
    act(()=>{
      root.render(
        <BrowserRouter>
          <TestStudent><span>Inside</span></TestStudent>
        </BrowserRouter>);
    });
  }

  afterEach(cleanupAuth);

  it("Should not pass no login", ()=>{
    buildRefs();
    expect(container.textContent).toContain("unauth_login_first");
    expect(container.textContent).toContain("unauth_req_role_pre student");
  });

  it("Should pass Student", ()=>{
    fakeLogin(signJwt(100,["student"]));
    buildRefs();
    expect(container.textContent).toContain("Inside");
  });

  it("Should not pass as Teacher", ()=>{
    fakeLogin(signJwt(100,["teacher"]));
    buildRefs();
    expect(container.textContent).toContain("unauth_login_first");
    expect(container.textContent).toContain("unauth_req_role_pre student");
  });

  it("Should pass as Teacher and Student", ()=>{
    fakeLogin(signJwt(100,["teacher", "student"]));
    buildRefs();
    expect(container.textContent).toContain("Inside");
  });

  it("Should not pass as Admin", ()=>{
    fakeLogin(signJwt(100,["admin"]));
    buildRefs();
    expect(container.textContent).toContain("unauth_login_first");
    expect(container.textContent).toContain("unauth_req_role_pre student");
  });

  it("Should not pass as super admin", ()=>{
    fakeLogin(signJwt(100,["super"]));
    buildRefs();
    expect(container.textContent).toContain("unauth_login_first");
    expect(container.textContent).toContain("unauth_req_role_pre student");
  });

  it("Should pass as when admin and student", ()=>{
    fakeLogin(signJwt(100,["admin", "student"]));
    buildRefs();
    expect(container.textContent).toContain("Inside");
  });
});

describe("Test withAuthGuardTeacher", ()=>{
  function buildRefs() {
    act(()=>{
      root.render(
        <BrowserRouter>
          <TestTeacher><span>Inside</span></TestTeacher>
        </BrowserRouter>);
    });
  }

  afterEach(cleanupAuth);

  it("Should not pass no login", ()=>{
    buildRefs();
    expect(container.textContent).toContain("unauth_login_first");
    expect(container.textContent).toContain("unauth_req_role_pre teacher");
  });

  it("Should pass Teacher", ()=>{
    fakeLogin(signJwt(100,["teacher"]));
    buildRefs();
    expect(container.textContent).toContain("Inside");
  });

  it("Should not pass as Teacher", ()=>{
    fakeLogin(signJwt(100,["student"]));
    buildRefs();
    expect(container.textContent).toContain("unauth_login_first");
    expect(container.textContent).toContain("unauth_req_role_pre teacher");
  });

  it("Should pass as Teacher and Student", ()=>{
    fakeLogin(signJwt(100,["teacher", "student"]));
    buildRefs();
    expect(container.textContent).toContain("Inside");
  });

  it("Should not pass as Admin", ()=>{
    fakeLogin(signJwt(100,["admin"]));
    buildRefs();
    expect(container.textContent).toContain("unauth_login_first");
    expect(container.textContent).toContain("unauth_req_role_pre teacher");
  });

  it("Should not pass as super admin", ()=>{
    fakeLogin(signJwt(100,["super"]));
    buildRefs();
    expect(container.textContent).toContain("unauth_login_first");
    expect(container.textContent).toContain("unauth_req_role_pre teacher");
  });

  it("Should pass as when admin and teacher", ()=>{
    fakeLogin(signJwt(100,["admin", "teacher"]));
    buildRefs();
    expect(container.textContent).toContain("Inside");
  });
});

describe("Test withAuthGuardAdmin", ()=>{
  function buildRefs() {
    act(()=>{
      root.render(
        <BrowserRouter>
          <TestAdmin><span>Inside</span></TestAdmin>
        </BrowserRouter>);
    });
  }

  afterEach(cleanupAuth);

  it("Should not pass no login", ()=>{
    buildRefs();
    expect(container.textContent).toContain("unauth_login_first");
    expect(container.textContent).toContain("unauth_req_role_pre admin");
  });

  it("Should pass Admin", ()=>{
    fakeLogin(signJwt(100,["admin"]));
    buildRefs();
    expect(container.textContent).toContain("Inside");
  });

  it("Should not pass as Teacher", ()=>{
    fakeLogin(signJwt(100,["teacher"]));
    buildRefs();
    expect(container.textContent).toContain("unauth_login_first");
    expect(container.textContent).toContain("unauth_req_role_pre admin");
  });

  it("Should pass as Teacher and admin", ()=>{
    fakeLogin(signJwt(100,["teacher", "admin"]));
    buildRefs();
    expect(container.textContent).toContain("Inside");
  });

  it("Should not pass as Teacher", ()=>{
    fakeLogin(signJwt(100,["teacher"]));
    buildRefs();
    expect(container.textContent).toContain("unauth_login_first");
    expect(container.textContent).toContain("unauth_req_role_pre admin");
  });

  it("Should not pass as super admin", ()=>{
    fakeLogin(signJwt(100,["super"]));
    buildRefs();
    expect(container.textContent).toContain("unauth_login_first");
    expect(container.textContent).toContain("unauth_req_role_pre admin");
  });

  it("Should pass as when admin and teacher", ()=>{
    fakeLogin(signJwt(100,["admin", "teacher"]));
    buildRefs();
    expect(container.textContent).toContain("Inside");
  });
});

describe("Test withAuthGuardSuperAdmin", ()=>{
  function buildRefs() {
    act(()=>{
      root.render(
        <BrowserRouter>
          <TestSuperAdmin><span>Inside</span></TestSuperAdmin>
        </BrowserRouter>);
    });
  }

  afterEach(cleanupAuth);

  it("Should not pass no login", ()=>{
    buildRefs();
    expect(container.textContent).toContain("unauth_login_first");
    expect(container.textContent).toContain("unauth_req_role_pre super");
  });

  it("Should pass SuperAdmin", ()=>{
    fakeLogin(signJwt(100,["super"]));
    buildRefs();
    expect(container.textContent).toContain("Inside");
  });

  it("Should not pass as Super", ()=>{
    fakeLogin(signJwt(100,["admin"]));
    buildRefs();
    expect(container.textContent).toContain("unauth_login_first");
    expect(container.textContent).toContain("unauth_req_role_pre super");
  });

  it("Should pass as super and admin", ()=>{
    fakeLogin(signJwt(100,["super", "admin"]));
    buildRefs();
    expect(container.textContent).toContain("Inside");
  });

  it("Should not pass as Teacher", ()=>{
    fakeLogin(signJwt(100,["teacher"]));
    buildRefs();
    expect(container.textContent).toContain("unauth_login_first");
    expect(container.textContent).toContain("unauth_req_role_pre super");
  });

  it("Should not pass as student", ()=>{
    fakeLogin(signJwt(100,["student"]));
    buildRefs();
    expect(container.textContent).toContain("unauth_login_first");
    expect(container.textContent).toContain("unauth_req_role_pre super");
  });

  it("Should pass as when super and teacher", ()=>{
    fakeLogin(signJwt(100,["super", "teacher"]));
    buildRefs();
    expect(container.textContent).toContain("Inside");
  });
});
