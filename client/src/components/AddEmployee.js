import React,{useState} from 'react';
import Sidenavbar from './Sidenavbar';
import Topnavbar from './Topnavbar';
import Footer from './Footer';
import { HiUserAdd } from 'react-icons/hi';
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const AddEmployee = () => {
    let navigate = useNavigate();

    const [employee, setEmployee] = useState({
        firstname: "",
        lastname: "",
        email: "",
        empid: "",
        designation: ""
        
    });

    let name, value;
    const handleInputs = (e) => {
        console.log(e);
        name = e.target.name;
        value = e.target.value;

        setEmployee({ ...employee, [name]: value })
    }

    const PostData = async (e) => {
        e.preventDefault();

        const {firstname,lastname, email, empid, designation} = employee;

        let res = await fetch("/employee", {
            method: "POST",
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify({firstname,lastname, email, empid, designation }),
        });

        const data = await res.json();

        if (res.status === 422 || !data) {
            //window.alert("Invalid Registration");
            toast.error(" Invalid Employee Data", {
                position: "top-center",
            });
            console.log("Invalid Employee Data");
        }
        else {
            toast.success("Employee Added Successfully!", {
                position: "top-center",
            });
            //window.alert("Registration Successful");
            console.log("Employee Added Successful");

            // history.push("/login");
            navigate("/showemployee", { replace: true });
        }

    }

  return (
    <>
      <div id="wrapper">

<Sidenavbar />


<div id="content-wrapper" className="d-flex flex-column">


    <div id="content">

        <Topnavbar />

        <div className="container-fluid">
        <div className="card shadow mb-4"> 
        <div className="card-header py-3 ">
                            <h6 className="m-0 font-weight-bold text-primary"><HiUserAdd />  Add User</h6>
                        </div>
                        <div className="card-body">
        <form className="user mt-2 p-3 d-flex flex-column justify-content-center align-items-center">
                        
                      
                        <div className="form-group col-sm-8 ">
                                <input 
                                type="text"
                                name="firstname"
                                className="form-control  form-control-user"
                                id="FirstName"
                                placeholder="First Name"
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
                                  placeholder="Last Name" 
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
                            placeholder="Email Address"
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
                                placeholder="Employee Id "
                                value={employee.empid}
                                onChange={handleInputs} 
                                />
                            </div>

                        <div className="form-group col-sm-8">
                                <input 
                                type="text" 
                                name="designation"
                                className="form-control form-control-user"
                                id="Designation" 
                                placeholder="Designation"
                                value={employee.designation}
                                onChange={handleInputs}  
                                />
                        </div> 

                <div className="mt-4 mb-0">
                <div className="d-grid"><NavLink className="btn btn-primary btn-user btn-block" to="/" name="signup" id="signup" value="register" onClick={PostData}>Add Employee</NavLink></div>
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
  )
}

export default AddEmployee;