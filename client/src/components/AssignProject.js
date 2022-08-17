import React,{useState,useEffect} from 'react';
import Sidenavbar from './Sidenavbar';
import Topnavbar from './Topnavbar';
import Footer from './Footer';
import Multiselect from 'multiselect-react-dropdown';
import { AiFillProject } from 'react-icons/ai';
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AssignProject = () => {
    let [projectdata, setProjectdata] = useState([]);
    let [employeedata, setEmployeedata] = useState([]);
    let navigate = useNavigate();

    // const getInitialState = () => {
    //     const value = "";
    //     return value;
    //   };

    const [assignedproject, setAssignedproject] = useState({
       projectname:"",
       employeename:"",
       startdate:"",
       enddate:""
     });  
    const [role, setRole] = useState("");
    const [empname, setEmpname] = useState("");

    let name, value;
    const handleInputs = (e) => {
        console.log(e);
        name = e.target.name;
        value = e.target.value;

        setAssignedproject({ ...assignedproject, [name]: value })
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

      const getProjects = async (e) => {

        try {
    
          const res = await fetch('/projectsdata');
          // , {
          //   method: "GET",
          //   headers: {
          //     Accept: "application/json",
          //     "Content-Type": "application/json"
          //   },
          //   credentials: "include"
          // }
          const data = await res.json();
    
          setProjectdata(data);
          console.log("tableshowProjectsData :",data);
    
          if (!res.status === 200) {
            const error = new Error(res.error);
            throw error;
          }
    
        } catch (error) {
          console.log(error);
        }
      }
      useEffect(() => {
        getProjects();
      }, []);

      const getEmployees = async (e) => {

        try {
    
          const res = await fetch('/employeedata');
          
          const data = await res.json();
    
          setEmployeedata(data);
          console.log("tableshowEmloyeeData :",data);
        
          if (!res.status === 200) {
            const error = new Error(res.error);
            throw error;
          }
    
        } catch (error) {
          console.log(error);
        }
      }
      useEffect(() => {
        getEmployees();
      }, []);

    const PostData = async (e) => {
        e.preventDefault();

        const{projectname,employeename,startdate,enddate} = assignedproject;
       //const {projectname} = role;
        
        let res = await fetch("/assignedproject", {
            method: "POST",
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify({projectname,employeename,startdate,enddate}),
        });

     

        const data = await res.json();       

        if (res.status === 422 || !data) {
            //window.alert("Invalid Registration");
            toast.error(" Invalid Project Data", {
                position: "top-center",
            });
            console.log("Invalid Project Data");
        }
        else {
            toast.success("Project Assigned Successfully!", {
                position: "top-center",
            });
            //window.alert("Registration Successful");
            console.log("Project Assigned Successful");

            // history.push("/login");
            navigate("/showassignedproject", { replace: true });
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
                          <h6 className="m-0 font-weight-bold text-primary"><AiFillProject /> Assign Project </h6>
                      </div>
                      <div className="card-body">
      <form className="user mt-2 p-3 d-flex flex-column justify-content-center align-items-center">
      
      <div className="form-group col-sm-8" id="projectname">
      
                      <select id="projectname"
                        name="projectname"                                        
                        style={{ borderRadius: '30px'}}                                       
                        className="custom-select custom-select-lg col-lg-12"
                       // value={role.projectname}                        
                        // onChange={handleChange}
                        value={assignedproject.projectname}  
                        onChange={handleInputs}
                        >
        
                      <option value="">--Select Project Name--</option>     

                      {projectdata.map((projectdataa) => <option key={projectdataa.projectname} value={projectdataa.projectname}>{projectdataa.projectname}</option>)}                    
                     
                      </select> 
      
                      </div>

<div className="form-group col-sm-8" id="empname">
      
      <select id="employeename"
        name="employeename"                                        
        style={{ borderRadius: '30px'}}                                       
        className="custom-select custom-select-lg col-lg-12"
        // value={role.empname} 
        // onChange={handleChange} 
        value={assignedproject.employeename}  
        onChange={handleInputs}
        >

      <option value="">--Select Employee Name--</option>     
      
      {employeedata.map((employeedataa) => <option key={employeedataa.firstname} value={employeedataa.firstname}>{employeedataa.firstname}</option>)}                    
     
      </select> 

      </div>    
 <div className="form-group col-sm-8" id="projectname" >

      {/* <Multiselect
                            isObject={false}                          
                            options={[
                              'Abhay',
                              'Aman',
                              'Harsh',
                              'Sukhwinder',
                              'Ramesh'
                            ]}
                            
                          />  */}

      </div>
                      
                      <div className='row form-group col-sm-8'>
                      <div className="form-group col-sm-6">
                        <label>Start Date</label>
                          <input 
                          type="date"
                          name="startdate" 
                          className="form-control form-control-user" 
                          id="startdate"                          
                          value={assignedproject.startdate}
                          onChange={handleInputs} 
                          />
                      </div>
                      <div className="form-group col-sm-6">
                      <label>End Date</label>
                          <input 
                          type="date"
                          name="enddate" 
                          className="form-control form-control-user" 
                          id="enddate"                          
                          value={assignedproject.enddate}
                          onChange={handleInputs} 
                          />
                      </div>
                      </div>
               
                      

              <div className="mt-4 mb-0">
              <div className="d-grid"><NavLink className="btn btn-primary btn-user btn-block" to="/" name="assignproject" id="assignproject" value="assignproject" onClick={PostData}>Assign Project</NavLink></div>
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

export default AssignProject
