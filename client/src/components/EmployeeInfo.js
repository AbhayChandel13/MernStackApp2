import React,{useState,useEffect} from 'react';
import Sidenavbar from './Sidenavbar';
import Topnavbar from './Topnavbar';
import Footer from './Footer';
import { HiUserAdd } from 'react-icons/hi';
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EmployeeInfo = () => {
    let navigate = useNavigate();
    let [employeedata, setEmployeedata] = useState([]);
   
    const [employeeinfo, setEmployeeinfo] = useState({
       empid: "",
        file1: "",
        file2: "",
        file3: ""       
        
    });
 //   const [role, setRole] = useState("");

 const getEmployees = async (e) => {
    try {
      const res = await fetch("/employeedata");

      const data = await res.json();

      setEmployeedata(data);
      console.log("tableshowEmloyeeData :", data);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getEmployees();
  }, []);

    let name, value;
    const handleInputs = (e) => {
        console.log(e);
        name = e.target.name;
        value = e.target.value;

        setEmployeeinfo({ ...employeeinfo, [name]: value })
    }

    // const handleChange = (e) => {
    //     // e.target.value
    //    //setDesignation({...designation,[name]: value});
    //   // setRole(e.target.value);
    //   name = e.target.name;
    //   value = e.target.value;

    //   setRole({...role,[name]: value});
    //   };
    //   console.log(role);

    const PostData = async (e) => {
        e.preventDefault();

        const {empid,file1,file2,file3} = employeeinfo;
        //const {roleid} = role;
        
        let res = await fetch("/employee", {
            method: "POST",
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify({empid,file1,file2,file3}),
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
            console.log("Employee Added Successful");

            setTimeout(function () {
                navigate("/showemployee", { replace: true });
              }, 2000);
            
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
                            <h6 className="m-0 font-weight-bold text-primary"><HiUserAdd />  Employee Information</h6>
                        </div>
                        <div className="card-body">
        <form className="user mt-2 p-3 d-flex flex-column justify-content-center align-items-center">
      
        <div className="form-group col-sm-8" id="empname">
                      <select
                        id="empid"
                        name="empid"
                        style={{ borderRadius: "30px" }}
                        className="custom-select custom-select-lg col-lg-12"                        
                        value={employeeinfo.empid}
                        onChange={handleInputs}
                      >
                        <option value="">--Select Employee Name--</option>

                        {employeedata.map((employeedataa) => (
                          <option
                            key={employeedataa.firstname}
                            value={employeedataa.empid}
                          >
                            {employeedataa.firstname} {employeedataa.lastname} (
                            {employeedataa.Role})
                          </option>
                        ))}
                      </select>
                    </div>
                        
                      
                        <div className="form-group col-sm-8 ">
                                <input 
                                type="file"
                                name="file1"
                                className="form-control input-lg  form-control-user "
                                id="File1"
                                placeholder="Upload File "
                                value={employeeinfo.file1}
                                onChange={handleInputs}
                                />                        
                        </div>                     
                        
                        <div className="form-group col-sm-8 ">
                                <input 
                                type="file"
                                name="file2"
                                className="form-control input-lg  form-control-user "
                                id="File2"
                                placeholder="Upload File "
                                value={employeeinfo.file2}
                                onChange={handleInputs}
                                />                        
                        </div>   
                      
                        
                        <div className="form-group col-sm-8 ">
                                <input 
                                type="file"
                                name="file3"
                                className="form-control input-lg  form-control-user"
                                id="File3"
                                placeholder="Upload File "
                                value={employeeinfo.file3}
                                onChange={handleInputs}
                                />                        
                        </div>  


                <div className="mt-4 mb-0">
                <div className="d-grid"><NavLink className="btn btn-primary btn-user btn-block" to="/" name="signup" id="signup" value="register" onClick={PostData}>Upload Files</NavLink></div>
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

export default EmployeeInfo;