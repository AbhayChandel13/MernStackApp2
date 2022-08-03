import React,{useReducer,createContext} from 'react';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Dashboard from './components/Dashboard';
import Error from './components/error';
import Logout from './components/Users/Logout'
import Login from './components/Users/Login';
import Signup from './components/Users/Signup';
import { initialState,reducer } from './reducer/UseReducer';
import Users from './components/Users';
import Adduser from './components/Adduser';
 
export const UserContext = createContext();

const App = () => {
     const [state,dispatch] = useReducer(reducer,initialState);

  return (
    <>
    
    <UserContext.Provider value={{state, dispatch}}>
    <Router>
    <Routes>
    <Route path="/" element={<Signup />}></Route>
    <Route path="/login" element={<Login />}></Route>

    <Route path="/dashboard" element={<Dashboard />}></Route>    
    <Route path="/users" element={<Users />}></Route>
    <Route path="/adduser" element={<Adduser />}></Route>
    <Route path="/logout" element={<Logout />}></Route>



    <Route path="*" element={<Error />} />
    </Routes>
  
    </Router>
    </UserContext.Provider> 
      
    
    </>
  )
}

export default App
