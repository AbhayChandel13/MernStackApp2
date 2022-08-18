import React, { useState, useEffect } from "react";
import Sidenavbar from "./Sidenavbar";
import Topnavbar from "./Topnavbar";
import Footer from "./Footer";
import { HiUserAdd } from "react-icons/hi";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditEmployee = () => {
  let id = window.location.pathname.split("/editemployee/")[1];
  // console.log("ID :",id);

  let navigate = useNavigate();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [empid, setEmpid] = useState("");
  const [phone, setPhone] = useState("");
  const [roleid, setRole] = useState("");

  let name, value;
  // const handleChange = (e) => {
  //   name = e.target.name;
  //   value = e.target.value;

  //   setRole({ ...role, [name]: value });
  // };
  let [roledata, setRoledata] = useState([]);

  const getRoles = async (e) => {

        try {
    
          const res = await fetch('/roles');
          
          const data = await res.json();
    
          setRoledata(data);
          console.log("GetRolestable :",data);
    
          if (!res.status === 200) {
            const error = new Error(res.error);
            throw error;
          }
    
        } catch (error) {
          console.log(error);
        }
      }
      useEffect(() => {
        getRoles();
      }, []);

  const getSingleEmployee = async () => {
    try {
      const response = await fetch(`/getemployee/${id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const jsonData = await response.json();
      console.log("SingleEmployee_for_update",jsonData);

      setFirstname(jsonData.firstname);
      setLastname(jsonData.lastname);
      setEmail(jsonData.email);
      setEmpid(jsonData.empid);
      setPhone(jsonData.phone);
      setRole(jsonData.role)
    } catch (err) {
      console.error(err.message);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      let body = {
        firstname,
        lastname,
        email,
        empid,
        phone,
        roleid,
      };

      const response = await fetch(`/employee/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      console.log(response);

      toast.success("Employee Updated Successfully!", {
        position: "top-center",
      });

      setTimeout(function () {
        navigate("/showemployee", { replace: true });
      }, 1000);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getSingleEmployee();
  }, []);

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
                    <HiUserAdd />
                    Update User
                  </h6>
                </div>
                <div className="card-body">
                  <form className="user mt-2 p-3 d-flex flex-column justify-content-center align-items-center">
                    {/* <div className="form-group col-sm-8" id="role">                     
                      <select
                        id="role"
                        name="role"
                        style={{ borderRadius: "30px" }}                       
                        className="custom-select custom-select-lg col-lg-12"
                        // value={role.roleid}
                        // onChange={handleChange}
                        value={roleid}
                        onChange={(e) => setRole(e.target.value)}
                      >
                        <option value="">--Select Designation--</option>
                        <option value="101" >Manager</option>
                        <option value="102">Team Leader</option>
                        <option value="103">Sr. frontend Developer</option>
                        <option value="104">Sr. Backend Developer</option>
                        <option value="105">Designer</option>
                        <option value="106">Traniee</option>
                        <option value="107">Hr</option>
                        <option value="108">Backend Developer</option>
                        <option value="109">frontend Developer</option>
                      </select>
                     
                    </div> */}
                    <div className="form-group col-sm-8" id="roleid">
      
      <select id="roleid"
        name="roleid"                                        
        style={{ borderRadius: '30px'}}                                       
        className="custom-select custom-select-lg col-lg-12"                       
        value={roleid}
        onChange={(e) => setRole(e.target.value)}
        >

      <option value="">--Select Designation--</option>     

      {roledata.map((roledataa) => <option key={roledataa.Role_id} value={roledataa.Role_id}>{roledataa.Role}</option>)}                    
     
      </select> 

      </div>

                    <div className="form-group col-sm-8 ">
                      <input
                        type="text"
                        name="firstname"
                        className="form-control input-lg  form-control-user "
                        id="FirstName"
                        placeholder="Enter First Name"
                        value={firstname}
                        // onChange={handleInputs}
                        onChange={(e) => setFirstname(e.target.value)}
                      />
                    </div>

                    <div className="form-group col-sm-8">
                      <input
                        type="text"
                        name="lastname"
                        className="form-control form-control-user"
                        id="LastName"
                        placeholder="Enter Last Name"
                        value={lastname}
                        //   onChange={handleInputs}
                        onChange={(e) => setLastname(e.target.value)}
                      />
                    </div>

                    <div className="form-group col-sm-8">
                      <input
                        type="email"
                        name="email"
                        className="form-control form-control-user"
                        id="Email"
                        placeholder="Enter Email Address"
                        value={email}
                        // onChange={handleInputs}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="form-group col-sm-8">
                      <input
                        type="text"
                        name="empid"
                        className="form-control form-control-user"
                        id="employeeId"
                        placeholder="Enter Employee Id "
                        value={empid}
                        // onChange={handleInputs}
                        onChange={(e) => setEmpid(e.target.value)}
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
                        value={phone}
                        // onChange={handleInputs}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>

                    {/* <div className="form-group col-sm-8">
                                <input 
                                type="text" 
                                name="designation"
                                className="form-control form-control-user"
                                id="Designation" 
                                placeholder="Enter Designation"
                                value={employee.designation}
                                // onChange={handleInputs}  
                                />
                        </div>  */}

                    <div className="mt-4 mb-0">
                      <div className="d-grid">
                        <NavLink
                          onClick={onSubmit}
                          className="btn btn-primary btn-user btn-block"
                          to="/"
                          name="signup"
                          id="signup"
                          value="register"
                        >
                          Update Employee
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

export default EditEmployee;
