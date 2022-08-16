import React, { useState, useEffect } from "react";
import Sidenavbar from "./Sidenavbar";
import Topnavbar from "./Topnavbar";
import Footer from "./Footer";
import { HiUserAdd } from "react-icons/hi";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditEmployee = () => {
  let id = window.location.pathname.split("/editproject/")[1];
  // console.log("ID :",id);

  let navigate = useNavigate();
  const [projectname, setProjectname] = useState("");
  const [industrysegment, setIndustrysegment] = useState("");
  const [techstack, setTechstack] = useState("");
  const [thirdpartyapi, setThirdpartyapi] = useState("");
  const [paymentgateway, setPaymentgateway] = useState("");
  const [githuburl, setGithuburl] = useState("");
  const [projectscope, setProjectscope] = useState("");
  const [solution, setSolution] = useState("");

  let name, value;
  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;

   // setRole({ ...role, [name]: value });
  };

  const getSingleProject = async () => {
    try {
      const response = await fetch(`/getproject/${id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const jsonData = await response.json();
      console.log("singleproject",jsonData);

      setProjectname(jsonData.projectname);
      setIndustrysegment(jsonData.industrysegment);
      setTechstack(jsonData.techstack);
      setThirdpartyapi(jsonData.thirdpartyapi);
      setPaymentgateway(jsonData.paymentgateway);
      setGithuburl(jsonData.githuburl);
      setProjectscope(jsonData.projectscope);
      setSolution(jsonData.solution);
      //setRoleid(jsonData.role)
    } catch (err) {
      console.error(err.message);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      let body = {
         projectname,
         industrysegment,
         techstack,
         thirdpartyapi,
         paymentgateway,
         githuburl,
         projectscope,
         solution,
         };

      const response = await fetch(`/project/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      console.log(response);

      toast.success("Project Updated Successfully!", {
        position: "top-center",
      });

      setTimeout(function () {
        navigate("/showproject", { replace: true });
      }, 1000);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getSingleProject();
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
                            <h6 className="m-0 font-weight-bold text-primary"> Update Project </h6>
                        </div>
                        <div className="card-body">
        <form className="user mt-2 p-3 d-flex flex-column justify-content-center align-items-center">
      
                        <div className="form-group col-sm-8 ">
                                <input 
                                type="text"
                                name="projectname"
                                className="form-control input-lg  form-control-user "
                                id="projectname"
                                placeholder="Enter Project Name"
                                value={projectname}
                                onChange={(e) => setProjectname(e.target.value)}
                                />                        
                        </div>                     
                        
                         <div className="form-group col-sm-8">
                                <input
                                  type="text"
                                  name="industrysegment"
                                  className="form-control form-control-user"
                                  id="industrysegment"
                                  placeholder="Enter Idustry Segment" 
                                  value={industrysegment}
                                  onChange={(e) => setIndustrysegment(e.target.value)}
                                  />
                        </div>
                      
                        
                        <div className="form-group col-sm-8">
                            <input 
                            type="text"
                            name="techstack" 
                            className="form-control form-control-user" 
                            id="techstack"
                            placeholder="Enter Tech Stack"
                            value={techstack}
                            onChange={(e) => setTechstack(e.target.value)}
                            />
                        </div>
                 
                        <div className="form-group col-sm-8">
                                <input 
                                type="text" 
                                name="thirdpartyapi"
                                className="form-control form-control-user"
                                id="thirdpartyapi" 
                                placeholder="Enter Third Party API "
                                value={thirdpartyapi}
                                onChange={(e) => setThirdpartyapi(e.target.value)}
                                />
                            </div>
                            <div className="form-group col-sm-8">
                                <input 
                                type="text" 
                                name="paymentgateway"
                                className="form-control form-control-user"
                                id="paymentgateway"                                 
                                placeholder="Enter Payment GateWay"
                                value={paymentgateway}
                                onChange={(e) => setPaymentgateway(e.target.value)}
                                />
                            </div>
                            <div className="form-group col-sm-8">
                                <input 
                                type="text" 
                                name="githuburl"
                                className="form-control form-control-user"
                                id="githuburl"                                
                                placeholder="Enter Github URL"
                                value={githuburl}
                                onChange={(e) => setGithuburl(e.target.value)}
                                />
                            </div>
                            <div className="form-group col-sm-8">
                                <input 
                                type="text" 
                                name="projectscope"
                                className="form-control form-control-user"
                                id="projectscope"                                
                                placeholder="Enter Project Scope"
                                value={projectscope}
                                onChange={(e) => setProjectscope(e.target.value)}
                                />
                            </div>
                            <div className="form-group col-sm-8">
                                <input 
                                type="text" 
                                name="solution"
                                className="form-control form-control-user"
                                id="solution"                                 
                                placeholder="Enter Solution"
                                value={solution}
                                onChange={(e) => setSolution(e.target.value)}
                                />
                            </div>
                            <div className="mt-4 mb-0">
                      <div className="d-grid">
                        <NavLink
                          onClick={onSubmit}
                          className="btn btn-primary btn-user btn-block"
                          to="/"
                        //   name="signup"
                        //   id="signup"
                        //   value="register"
                        >
                          Update Project
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
