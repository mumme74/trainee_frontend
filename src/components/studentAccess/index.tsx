import React from "react";
import { Route, Routes } from "react-router-dom";

import { withAuthGuardStudent } from "../HOCs/authGuards";
import StudentDashboard from "./StudentDashboard";
import StudentProfile from "./StudentProfile";
import StudentDefault from "./StudentDefault";


function StudentIndex() {
  return (
    <Routes>
      <Route path="dashboard" element={<StudentDashboard />} />
      <Route path="profile" element={<StudentProfile />} />
      <Route path="*" element={<StudentDefault />} />
    </Routes>
  );
}

export default withAuthGuardStudent(StudentIndex);
