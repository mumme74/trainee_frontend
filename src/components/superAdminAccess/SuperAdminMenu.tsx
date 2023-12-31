import React from "react";
import { Link } from "react-router-dom";

import {
  withAuthGuardStudent,
  withAuthGuardSuperAdmin,
} from "../HOCs/authGuards";

type StatePropsT = object;

type JsxPropsT = {
  closeHandler: () => void;
};

const SuperAdminMenu: React.FC<StatePropsT & JsxPropsT> = (props) => {
  return (
    <React.Fragment>
    <div className="container" onClick={props.closeHandler}>
      <h4>Super Admin menu:</h4>
      <ul className="list-group">
        <li className="list-group-item">
          <Link to="/student/dashboard">Something?</Link>
        </li>
      </ul>
    </div>
    </React.Fragment>
  );
};

export default withAuthGuardSuperAdmin(SuperAdminMenu);
