import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useTranslation } from "react-i18next";

import { AppDispatch, RootState } from "../../redux/store";
import { setSideMenuIsShown } from "../../redux/actions/sideMenu.action";
import { myUserRoles } from "../../helpers";
import StudentMenu from "../studentAccess/StudentMenu";
import TeacherMenu from "../teacherAccess/TeacherMenu";
import AdminMenu from "../adminAccess/AdminMenu";
import SuperAdminMenu from "../superAdminAccess/SuperAdminMenu";

import "./SideMenu.css";

type StatePropsT = {
  isShown: boolean;
};
type JsxProps = {
  className?: string;
  caption?: string;
};
type ActionPropsT = {
  setSideMenuIsShown: (e: any) => void;
};

const SideMenu: React.FC<
  React.PropsWithChildren<StatePropsT & ActionPropsT & JsxProps>
> = (props) => {
  const myRoles = myUserRoles();
  const [curRole, setCurRole] = useState(myRoles[0] || "");

  const { t } = useTranslation("core");

  useEffect(() => {
    if (!myRoles.length) {
      // just logged out
      setCurRole("");
    } else if (curRole === "" && myRoles.length) {
      // just logged in
      setCurRole(myRoles[0]);
    }
  });

  function close() {
    props.setSideMenuIsShown(false);
  }

  function changeRole(role: any) {
    setCurRole(role);
    console.log("changed role", role);
  }

  function getSelectedMenu() {
    switch (curRole) {
      case "student":
        return <StudentMenu closeHandler={close} />;
      case "teacher":
        return <TeacherMenu closeHandler={close} />;
      case "admin":
        return <AdminMenu closeHandler={close} />;
      case "super":
        return <SuperAdminMenu closeHandler={close} />;
      default:
        return (
          <React.Fragment>
            <div className="container p-2">
              <h4>{t("menu")}</h4>
              <ul className="list-group">
                <li className="list-group-item">
                  <Link to="/">{t("start")}</Link>
                </li>
                <li className="list-group-item">
                  <Link to="/about">{t("about")}</Link>
                </li>
              </ul>
            </div>
          </React.Fragment>
        );
    }
  }

  return (
    <React.Fragment>
    <nav
      className={
        props.className +
        " sidemenuWrapper" +
        (props.isShown ? " show" : "") +
        " menu"
      }
    >
      <div className="sidemenuHeader">
        <span>{props.caption ? props.caption : t("menu")}</span>
        <button
          className="btn-close btn-small shadow-none"
          onClick={close}
        ></button>
      </div>
      {props.children !== undefined ? (
        <div className="sidemenuContent">{props.children}</div>
      ) : (
        <React.Fragment>
          {myRoles.length > 1 && (
            <React.Fragment>
              <DropdownButton
                className="m-2"
                onSelect={changeRole}
                title={t("role") + ": " + curRole}
              >
                {myRoles.map((role) => (
                  <Dropdown.Item eventKey={role} key={role}>
                    {role}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
              <div className="menu-divider"></div>
            </React.Fragment>
          )}
          {getSelectedMenu()}
        </React.Fragment>
      )}
    </nav>
    </React.Fragment>
  );
};

// redux stuff
const mapStateToProps = (state: RootState): StatePropsT => {
  return {
    isShown: state.sideMenu.isShown,
  };
};

const mapDispatchToProps = (dispatch: AppDispatch): ActionPropsT => {
  return {
    setSideMenuIsShown: (e: any) => {
      setSideMenuIsShown(false)(dispatch);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
