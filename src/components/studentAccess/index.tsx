import React from "react";
import { Route, Routes } from "react-router-dom";

import { withAuthGuardStudent } from "../HOCs/authGuards";
import StudentDashboard from "./StudentDashboard";
import Profile from "./Profile";

function StudentIndex() {
  return (
    <Routes>
      <Route path="/student/dashboard">
        <StudentDashboard />
      </Route>
      <Route path="/student/profile">
        <Profile />
      </Route>
      <Route path="/student/*">
        <StudentDashboard />
      </Route>
    </Routes>
  );
}

export default withAuthGuardStudent(StudentIndex);
