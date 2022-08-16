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

    const [project, setProject] = useState({
       projectname:"",
       industrysegment:"",
       techstack:"",
       thirdpartyapi:"",
       paymentgateway:"",
       githuburl:"",
       projectscope:"",
       solution:"" 
     });  
    const [role, setRole] = useState("");

    let name, value;
    const handleInputs = (e) => {
        console.log(e);
        name = e.target.name;
        value = e.target.value;

        setProject({ ...project, [name]: value })
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

        const{projectname,industrysegment,techstack,thirdpartyapi,paymentgateway,githuburl,projectscope,solution} = project;
       //const {roleid} = role;
        
        let res = await fetch("/project", {
            method: "POST",
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify({projectname,industrysegment,techstack,thirdpartyapi,paymentgateway,githuburl,projectscope,solution}),
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
            toast.success("Project Added Successfully!", {
                position: "top-center",
            });
            //window.alert("Registration Successful");
            console.log("Project Added Successful");

            // history.push("/login");
            navigate("/showproject", { replace: true });
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
                                name="projectname"
                                className="form-control input-lg  form-control-user "
                                id="projectname"
                                placeholder="Enter Project Name"
                                value={project.projectname}
                                onChange={handleInputs}
                                />                        
                        </div>                     
                        
                         <div className="form-group col-sm-8">
                                <input
                                  type="text"
                                  name="industrysegment"
                                  className="form-control form-control-user"
                                  id="industrysegment"
                                  placeholder="Enter Idustry Segment" 
                                  value={project.industrysegment}
                                  onChange={handleInputs} 
                                  />
                        </div>
                      
                        
                        <div className="form-group col-sm-8">
                            <input 
                            type="text"
                            name="techstack" 
                            className="form-control form-control-user" 
                            id="techstack"
                            placeholder="Enter Tech Stack"
                            value={project.techstack}
                            onChange={handleInputs} 
                            />
                        </div>
                 
                        <div className="form-group col-sm-8">
                                <input 
                                type="text" 
                                name="thirdpartyapi"
                                className="form-control form-control-user"
                                id="thirdpartyapi" 
                                placeholder="Enter Third Party API "
                                value={project.thirdpartyapi}
                                onChange={handleInputs} 
                                />
                            </div>
                            <div className="form-group col-sm-8">
                                <input 
                                type="text" 
                                name="paymentgateway"
                                className="form-control form-control-user"
                                id="paymentgateway"                                 
                                placeholder="Enter Payment GateWay"
                                value={project.paymentgateway}
                                onChange={handleInputs} 
                                />
                            </div>
                            <div className="form-group col-sm-8">
                                <input 
                                type="text" 
                                name="githuburl"
                                className="form-control form-control-user"
                                id="githuburl"                                
                                placeholder="Enter Github URL"
                                value={project.githuburl}
                                onChange={handleInputs} 
                                />
                            </div>
                            <div className="form-group col-sm-8">
                                <input 
                                type="text" 
                                name="projectscope"
                                className="form-control form-control-user"
                                id="projectscope"                                
                                placeholder="Enter Project Scope"
                                value={project.projectscope}
                                onChange={handleInputs} 
                                />
                            </div>
                            <div className="form-group col-sm-8">
                                <input 
                                type="text" 
                                name="solution"
                                className="form-control form-control-user"
                                id="solution"                                 
                                placeholder="Enter Solution"
                                value={project.solution}
                                onChange={handleInputs} 
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