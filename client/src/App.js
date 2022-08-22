import React, { useReducer, createContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Error from "./components/error";
import Logout from "./components/Users/Logout";
import Login from "./components/Users/Login";
import Signup from "./components/Users/Signup";
import { initialState, reducer } from "./reducer/UseReducer";
import Showadmins from "./components/ShowAdmins";
import AddEmployee from "./components/AddEmployee";
import EditEmployee from "./components/EditEmployee";
import EditProject from "./components/EditProject";
import ShowEmployee from "./components/ShowEmployee";
import AddProject from "./components/AddProject";
import ShowProject from "./components/ShowProject";
import AddUser from "./components/AddUser";
import AssignProject from "./components/AssignProject";
import ShowAssignedproject from "./components/ShowAssignedproject";
import EmployeeInfo from "./components/EmployeeInfo";

export const UserContext = createContext();

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
        <Router>
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/register" element={<Signup />}></Route>

            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/admins" element={<Showadmins />}></Route>
            <Route path="/showemployee" element={<ShowEmployee />}></Route>
            <Route path="/showproject" element={<ShowProject />}></Route>
            <Route
              path="/showassignedproject"
              element={<ShowAssignedproject />}
            ></Route>
            <Route path="/adduser" element={<AddUser />}></Route>
            <Route path="/addemployee" element={<AddEmployee />}></Route>
            <Route path="/employeeinfo" element={<EmployeeInfo />}></Route>
            <Route path="/addproject" element={<AddProject />}></Route>
            <Route path="/assignproject" element={<AssignProject />}></Route>
            <Route path="/editemployee/:id" element={<EditEmployee />}></Route>
            <Route path="/editproject/:id" element={<EditProject />}></Route>
            <Route path="/logout" element={<Logout />}></Route>

            <Route path="*" element={<Error />} />
          </Routes>
        </Router>
      </UserContext.Provider>
    </>
  );
};

export default App;
