import React from 'react';
import ReactDOM from "react-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
  ReactDOM.render(

  <React.StrictMode>
      
      <App />
   
    {/* <UserContext.Provider value={{state, dispatch}}>
    <Router>
    <Routes>
    <Route path="/" element={<Signup />}></Route>
    <Route path="/login" element={<Login />}></Route>

    <Route path="/dashboard" element={<Dashboard />}></Route>
    <Route path="/about" element={<About />}></Route>
    <Route path="/contact" element={<Contact />}></Route>
    <Route path="/logout" element={<Logout />}></Route>



    <Route path="*" element={<Error />} />
    </Routes>
  
    </Router>
    </UserContext.Provider> */}
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
