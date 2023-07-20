import React from "react";
import { Route, Routes } from "react-router-dom";

import { withAuthGuardAdmin } from "../HOCs/authGuards";
import AdminUsers from "./AdminUsers";
import AdminDashboard from "./AdminDashboard";

function AdminIndex() {
  return (
    <Routes>
      <Route path="/admin/users">
        <AdminUsers />
      </Route>
      <Route path="/admin/*" >
        <AdminDashboard />
      </Route>
    </Routes>
  );
}

export default withAuthGuardAdmin(AdminIndex);
