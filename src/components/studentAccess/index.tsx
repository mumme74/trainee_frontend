import React from "react";
import { Route, Routes } from "react-router-dom";

import { withAuthGuardStudent } from "../HOCs/authGuards";
import StudentDashboard from "./StudentDashboard";
import Profile from "./Profile";

function StudentIndex() {
  return (
    <Routes>
      <Route path="/student/dashboard" element={<StudentDashboard />}/>
      <Route path="/student/profile" element={<Profile />} />
      <Route path="/student/*" element={<StudentDashboard />} />
    </Routes>
  );
}

export default withAuthGuardStudent(StudentIndex);
