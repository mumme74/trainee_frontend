import React from "react";
import { Route, Routes } from "react-router-dom";

import { withAuthGuardAdmin } from "../HOCs/authGuards";
import AdminUsers from "./AdminUsers";
import AdminDashboard from "./AdminDashboard";

function AdminIndex() {
  return (
    <Routes>
      <Route path="/admin/users" element={<AdminUsers />} />
      <Route path="/admin/*" element={<AdminDashboard />} />
    </Routes>
  );
}

export default withAuthGuardAdmin(AdminIndex);
