import React from "react";
import { Route, Routes } from "react-router-dom";

import { withAuthGuardSuperAdmin } from "../HOCs/authGuards";
import SuperAdminDashboard from "./SuperAdminDashboard";

function SuperAdminIndex() {
  return (
    <Routes>
      <Route path="dashboard" element={<SuperAdminDashboard />} />
      <Route path="*"
        element={<SuperAdminIndex />} />
    </Routes>
  );
}

export default withAuthGuardSuperAdmin(SuperAdminIndex);
