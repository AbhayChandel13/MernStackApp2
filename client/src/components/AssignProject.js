import React,{useState,useEffect} from 'react';
import Sidenavbar from './Sidenavbar';
import Topnavbar from './Topnavbar';
import Footer from './Footer';
import { AiFillProject } from 'react-icons/ai';
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AssignProject = () => {
    let [projectdata, setProjectdata] = useState([]);
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

    const PostData = async (e) => {
        e.preventDefault();

        const{projectname,industrysegment,techstack,thirdpartyapi,paymentgateway,githuburl,projectscope,solution} = project;
       //const {projectname} = role;
        
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
                          <h6 className="m-0 font-weight-bold text-primary"><AiFillProject /> Assign Project </h6>
                      </div>
                      <div className="card-body">
      <form className="user mt-2 p-3 d-flex flex-column justify-content-center align-items-center">
      
      <div className="form-group col-sm-8" id="projectname">
      
                      <select id="currvalue"
                        name="projectname"                                        
                        style={{ borderRadius: '30px'}}                                       
                        className="custom-select custom-select-lg col-lg-12"
                        value={role.projectname} 
                        onChange={handleChange} 
                        >
        
                      <option value="">--Select Project Name--</option>     
    
                      {projectdata.map((projectdataa) => <option key={projectdataa.projectname} value={projectdataa.projectname}>{projectdataa.projectname}</option>)}                    
                     
                      </select> 
      
                      </div>
                    
                    
                      {/* <div className="form-group col-sm-8 ">
                      <label>Project Name </label>
                              <input 
                              type="text"
                              name="projectname"
                              className="form-control input-lg  form-control-user "
                              id="projectname"
                              placeholder="Enter Project Name"
                              value={project.projectname}
                              onChange={handleInputs}
                              />                        
                      </div>                      */}
                      
                       <div className="form-group col-sm-8">
                       <label>Employee Name  </label>
                              <input
                                type="text"
                                name="industrysegment"
                                className="form-control form-control-user"
                                id="industrysegment"
                                placeholder="Enter Employee Name " 
                                value={project.industrysegment}
                                onChange={handleInputs} 
                                />
                      </div>
                      
                      <div className='row form-group col-sm-8'>
                      <div className="form-group col-sm-6">
                        <label>Start Date</label>
                          <input 
                          type="date"
                          name="techstack" 
                          className="form-control form-control-user" 
                          id="techstack"
                          placeholder="Enter Tech Stack"
                          value={project.startdate}
                          onChange={handleInputs} 
                          />
                      </div>
                      <div className="form-group col-sm-6">
                      <label>End Date</label>
                          <input 
                          type="date"
                          name="techstack" 
                          className="form-control form-control-user" 
                          id="techstack"
                          placeholder="Enter Tech Stack"
                          value={project.startdate}
                          onChange={handleInputs} 
                          />
                      </div>
                      </div>
               
                      

              <div className="mt-4 mb-0">
              <div className="d-grid"><NavLink className="btn btn-primary btn-user btn-block" to="/" name="addproject" id="addproject" value="addproject" onClick={PostData}>Assign Project</NavLink></div>
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
