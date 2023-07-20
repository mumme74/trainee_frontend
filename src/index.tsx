// non project imports
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

// non components
import { initAxios } from "./axiosCommon";
import { initStore } from "./redux/store";
import "./i18n/i18n";

// components
import App from "./components/App";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import SignUp from "./components/login/SignUp";
import Login from "./components/login/Login";
import Unauthorized from "./components/Unauthorized";
import Student from "./components/studentAccess";
import Admin from "./components/adminAccess";
import Teacher from "./components/teacherAccess";
import SuperAdmin from "./components/superAdminAccess";
import About from "./components/About";
import DeleteMe from "./components/login/DeleteMe";

const store = initStore();
initAxios();

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <React.Suspense fallback="Ĺoading...">
          <App>
            <Routes>
              <Route path="/dashboard">
                <Dashboard />
              </Route>
              <Route path="/signup" >
                <SignUp />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/unauthorized">
                <Unauthorized />
              </Route>
              <Route path="/student">
                <Student />
              </Route>
              <Route path="/teacher">
                <Teacher />
              </Route>
              <Route path="/admin">
                <Admin />
              </Route>
              <Route path="/superadmin">
                <SuperAdmin />
              </Route>
              <Route path="/deleteme">
                <DeleteMe />
              </Route>
              <Route path="/about">
                <About />
              </Route>
              <Route path="/*">
                <Home />
              </Route>
            </Routes>
          </App>
        </React.Suspense>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
