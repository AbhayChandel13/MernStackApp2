import React, { useState, useEffect } from "react";
import Sidenavbar from "./Sidenavbar";
import Topnavbar from "./Topnavbar";
import Footer from "./Footer";
import { HiUserAdd } from "react-icons/hi";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddEmployee = () => {
  let navigate = useNavigate();
  let [roledata, setRoledata] = useState([]);

  // const getInitialState = () => {
  //     const value = "";
  //     return value;
  //   };

  const [employee, setEmployee] = useState({
    firstname: "",
    lastname: "",
    email: "",
    empid: "",
    phone: "",
  });

  const getRoles = async (e) => {
    try {
      const res = await fetch("/api/v1/employees/getRoles");

      const data = await res.json();

      setRoledata(data);
      console.log("GetRolestable :", data);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getRoles();
  }, []);

  let name, value;
  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;

    setEmployee({ ...employee, [name]: value });
  };

  const PostData = async (e) => {
    e.preventDefault();

    const { firstname, lastname, email, empid, phone, roleid } = employee;
    //const {roleid} = role;

    let res = await fetch("/api/v1/employees/createEmployee", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstname,
        lastname,
        email,
        empid,
        phone,
        roleid,
      }),
    });

    const data = await res.json();

    if (res.status === 422 || !data) {
      //window.alert("Invalid Registration");
      toast.error(" Invalid Employee Data", {
        position: "top-center",
      });
      console.log("Invalid Employee Data");
    } else {
      toast.success("Employee Added Successfully!", {
        position: "top-center",
      });
      console.log("Employee Added Successful");

      setTimeout(function () {
        navigate("/showemployee", { replace: true });
      }, 2000);
    }
  };

  return (
    <>
      <div id="wrapper">
        <Sidenavbar />

        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <ToastContainer />

            <Topnavbar />

            <div className="container-fluid">
              <div className="card shadow mb-4">
                <div className="card-header py-3 ">
                  <h6 className="m-0 font-weight-bold text-primary">
                    <HiUserAdd /> Add Employee
                  </h6>
                </div>
                <div className="card-body">
                  <form className="user mt-2 p-3 d-flex flex-column justify-content-center align-items-center">
                    {/* <div className="form-group col-sm-8" id="roleid">                        
                        <select id="currvalue"
                          name="roleid"  
                          style={{ borderRadius: '30px'}}                                            
                          className="custom-select custom-select-lg col-lg-12"
                          value={role.roleid} 
                          onChange={handleChange} 
                          >
                        <option value="">--Select Designation--</option>
                        <option value="101">Manager</option>
                        <option value="102">Team Leader</option>
                        <option value="103">Sr. frontend Developer</option>                         
                        </select> 
                       
                        </div> */}

                    <div className="form-group col-sm-8" id="roleid">
                      <select
                        id="roleid"
                        name="roleid"
                        style={{ borderRadius: "30px" }}
                        className="custom-select custom-select-lg col-lg-12"
                        value={employee.roleid}
                        onChange={handleInputs}
                      >
                        <option value="">--Select Designation--</option>

                        {roledata.map((roledataa) => (
                          <option
                            key={roledataa.Role_id}
                            value={roledataa.Role_id}
                          >
                            {roledataa.Role}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group col-sm-8 ">
                      <input
                        type="text"
                        name="firstname"
                        className="form-control input-lg  form-control-user "
                        id="FirstName"
                        placeholder="Enter First Name"
                        value={employee.firstname}
                        onChange={handleInputs}
                      />
                    </div>

                    <div className="form-group col-sm-8">
                      <input
                        type="text"
                        name="lastname"
                        className="form-control form-control-user"
                        id="LastName"
                        placeholder="Enter Last Name"
                        value={employee.lastname}
                        onChange={handleInputs}
                      />
                    </div>

                    <div className="form-group col-sm-8">
                      <input
                        type="email"
                        name="email"
                        className="form-control form-control-user"
                        id="Email"
                        placeholder="Enter Email Address"
                        value={employee.email}
                        onChange={handleInputs}
                      />
                    </div>

                    <div className="form-group col-sm-8">
                      <input
                        type="text"
                        name="empid"
                        className="form-control form-control-user"
                        id="employeeId"
                        placeholder="Enter Employee Id "
                        value={employee.empid}
                        onChange={handleInputs}
                      />
                    </div>
                    <div className="form-group col-sm-8">
                      <input
                        type="text"
                        name="phone"
                        className="form-control form-control-user"
                        id="phone"
                        maxLength={10}
                        placeholder="Enter Phone Number"
                        value={employee.phone}
                        onChange={handleInputs}
                      />
                    </div>

                    <div className="mt-4 mb-0">
                      <div className="d-grid">
                        <NavLink
                          className="btn btn-primary btn-user btn-block"
                          to="/"
                          name="signup"
                          id="signup"
                          value="register"
                          onClick={PostData}
                        >
                          Add Employee
                        </NavLink>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>

      <a className="scroll-to-top rounded" href="#page-top">
        <i className="fas fa-angle-up"></i>
      </a>
    </>
  );
};

export default AddEmployee;
