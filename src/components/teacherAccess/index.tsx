import React from "react";
import { Route, Routes } from "react-router-dom";

import { withAuthGuardTeacher } from "../HOCs/authGuards";
import TeacherDashboard from "./TeacherDashboard";

function TeacherIndex() {
  return (
    <Routes>
      <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
      <Route path="/teacher/*" element={<TeacherIndex />} />
    </Routes>
  );
}

export default withAuthGuardTeacher(TeacherIndex);
