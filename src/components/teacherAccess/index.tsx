import React from "react";
import { Route, Routes } from "react-router-dom";

import { withAuthGuardTeacher } from "../HOCs/authGuards";
import TeacherDashboard from "./TeacherDashboard";

function TeacherIndex() {
  return (
    <Routes>
      <Route path="dashboard" element={<TeacherDashboard />} />
      <Route path="*" element={<TeacherIndex />} />
    </Routes>
  );
}

export default withAuthGuardTeacher(TeacherIndex);
