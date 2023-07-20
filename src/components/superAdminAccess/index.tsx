import React from "react";
import { Route, Routes } from "react-router-dom";

import { withAuthGuardSuperAdmin } from "../HOCs/authGuards";
import SuperAdminDashboard from "./SuperAdminDashboard";

function SuperAdminIndex() {
  return (
    <Routes>
      <Route
        path="/superadmin/dashboard">
        <SuperAdminDashboard />
      </Route>
      <Route path="/superadmin/*">
        <SuperAdminIndex />
      </Route>
    </Routes>
  );
}

export default withAuthGuardSuperAdmin(SuperAdminIndex);
