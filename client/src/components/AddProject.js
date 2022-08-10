import React,{useState} from 'react';
import Sidenavbar from './Sidenavbar';
import Topnavbar from './Topnavbar';
import Footer from './Footer';
import { AiFillProject } from 'react-icons/ai';
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const AddProject = () => {
    let navigate = useNavigate();

    // const getInitialState = () => {
    //     const value = "";
    //     return value;
    //   };

    const [employee, setEmployee] = useState({ });  
    const [role, setRole] = useState("");

    let name, value;
    const handleInputs = (e) => {
        console.log(e);
        name = e.target.name;
        value = e.target.value;

        setEmployee({ ...employee, [name]: value })
    }

    const handleChange = (e) => {
        // e.target.value
       //setDesignation({...designation,[name]: value});
      // setRole(e.target.value);
      name = e.target.name;
      value = e.target.value;

      setRole({...role,[name]: value});
      };
      console.log(role);

    const PostData = async (e) => {
        e.preventDefault();

        const {firstname,lastname, email, empid, phone} = employee;
        const {roleid} = role;
        
        let res = await fetch("/employee", {
            method: "POST",
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify({firstname,lastname, email, empid, phone, roleid}),
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
    <ToastContainer />

        <Topnavbar />

        <div className="container-fluid">        
        <div className="card shadow mb-4"> 
        <div className="card-header py-3 ">
                            <h6 className="m-0 font-weight-bold text-primary"><AiFillProject />  Add Project </h6>
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
                        <option value="104">Sr. Backend Developer</option>
                        <option value="105">Designer</option>                      
                        <option value="106">Traniee</option>
                        <option value="107">Hr</option>
                        <option value="108">Backend Developer</option>
                        <option value="109">frontend Developer</option>
                        </select> 
                  
                        </div> */}
                        
                      
                        <div className="form-group col-sm-8 ">
                                <input 
                                type="text"
                                name="Projectname"
                                className="form-control input-lg  form-control-user "
                                id="ProjectName"
                                placeholder="Enter Project Name"
                                // value={employee.firstname}
                                // onChange={handleInputs}
                                />                        
                        </div>                     
                        
                         <div className="form-group col-sm-8">
                                <input
                                  type="text"
                                  name="Industrysegment"
                                  className="form-control form-control-user"
                                  id="Industrysegment"
                                  placeholder="Enter Idustry Segment" 
                                //   value={employee.lastname}
                                //   onChange={handleInputs} 
                                  />
                        </div>
                      
                        
                        <div className="form-group col-sm-8">
                            <input 
                            type="text"
                            name="techstack" 
                            className="form-control form-control-user" 
                            id="techstack"
                            placeholder="Enter Tech Stack"
                            // value={employee.email}
                            // onChange={handleInputs} 
                            />
                        </div>
                 
                        <div className="form-group col-sm-8">
                                <input 
                                type="text" 
                                name="api"
                                className="form-control form-control-user"
                                id="api" 
                                placeholder="Enter Third Party API "
                                // value={employee.empid}
                                // onChange={handleInputs} 
                                />
                            </div>
                            <div className="form-group col-sm-8">
                                <input 
                                type="text" 
                                name="payment"
                                className="form-control form-control-user"
                                id="payment"                                 
                                placeholder="Enter Payment GateWay"
                                // value={employee.phone}
                                // onChange={handleInputs} 
                                />
                            </div>
                            <div className="form-group col-sm-8">
                                <input 
                                type="text" 
                                name="giturl"
                                className="form-control form-control-user"
                                id="giturl"                                
                                placeholder="Enter Github URL"
                                // value={employee.phone}
                                // onChange={handleInputs} 
                                />
                            </div>
                            <div className="form-group col-sm-8">
                                <input 
                                type="text" 
                                name="scope"
                                className="form-control form-control-user"
                                id="scope"                                
                                placeholder="Enter Project Scope"
                                // value={employee.phone}
                                // onChange={handleInputs} 
                                />
                            </div>
                            <div className="form-group col-sm-8">
                                <input 
                                type="text" 
                                name="solution"
                                className="form-control form-control-user"
                                id="solution"                                 
                                placeholder="Enter Solution"
                                // value={employee.phone}
                                // onChange={handleInputs} 
                                />
                            </div>
                        

                <div className="mt-4 mb-0">
                <div className="d-grid"><NavLink className="btn btn-primary btn-user btn-block" to="/" name="addproject" id="addproject" value="addproject" onClick={PostData}>Add Project</NavLink></div>
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

export default AddProject;