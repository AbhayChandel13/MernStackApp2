import React,{useState} from 'react';
import Sidenavbar from './Sidenavbar';
import Topnavbar from './Topnavbar';
import Footer from './Footer';
import { HiUserAdd } from 'react-icons/hi';
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
 


const AddUser = () => {
    let navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        cpassword: "",
        status:""
    });
        
    
     const [userrole, setRole] = useState({role:""});

    let name, value;
    const handleInputs = (e) => {
        console.log(e);
        name = e.target.name;
        value = e.target.value;

        setUser({ ...user, [name]: value })
    }

    const handleChange = (e) => {
      name = e.target.name;
      value = e.target.value;

      setRole({...userrole,[name]: value});
      };

      console.log(userrole);

    const PostData = async (e) => {
        e.preventDefault();
        try {
            const {name, email, phone,password,cpassword,status} = user;
            const {role} = userrole;
            
            let res = await fetch("/api/v1/employees/createUser", { 
                method: "POST",
                headers: { "Content-Type": "application/json", },
                body: JSON.stringify({name,email,phone,password,cpassword,role,status }),
            });
    
            const data = await res.json(); 

            if (res.status === 422 || !data) {              
                toast.error("Invalid User Data", {
                    position: "top-center",
                });
                console.log("Invalid User Data");
            }
            else {
                toast.success("User Added Successfully!", {
                    position: "top-center",
                });                
                console.log("User Added Successful");
    
                   setTimeout(function () {
                    navigate("/admins", { replace: true });
                  }, 1000);
            
            }
    
        } catch (error) {
            console.log(error);
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
                            <h6 className="m-0 font-weight-bold text-primary"><HiUserAdd />  Add Admin</h6>
                        </div>
                        <div className="card-body">
        <form className="user mt-2 p-3 d-flex flex-column justify-content-center align-items-center">

        <div className="form-group col-sm-8" id="role">
                        {/* <label>roleid */}
                        <select id="currvalue"
                          name="role"  
                          style={{ borderRadius: '30px'}}
                        //   style={{border-radius:"20px"}}                        
                          className="custom-select custom-select-lg col-lg-12"
                          value={userrole.role} 
                          onChange={handleChange} 
                          >
                        <option value="">--Select Role--</option>
                        <option value="super_admin">Super Admin</option>
                        <option value="admin">Admin</option>
                        <option value="User">User</option>
                       
                        </select> 
                        {/* </label> */}
                        </div>

                        <div className="form-group col-sm-8 ">
                                <input 
                                type="text"
                                name="name"
                                className="form-control input-lg  form-control-user "
                                id="Name"
                                placeholder="Enter Name"
                                value={user.name}
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
                            value={user.email}
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
                                value={user.phone}
                                onChange={handleInputs} 
                                />
                            </div>

                           
                            {/* <div class="form-check">
  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
  <label class="form-check-label" for="flexRadioDefault1">
   Active
  </label>
</div>
<div class="form-check">
  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
  <label class="form-check-label" for="flexRadioDefault2">
    Inactive
  </label>
</div> */}

                        <div className="form-group col-sm-8">
                                <input 
                                type="password" 
                                name="password"
                                className="form-control form-control-user"
                                id="password" 
                                placeholder="Enter Password"
                                value={user.password}
                                onChange={handleInputs}  
                                />
                        </div> 
                        <div className="form-group col-sm-8">
                                <input 
                                type="password" 
                                name="cpassword"
                                className="form-control form-control-user"
                                id="cpassword" 
                                placeholder="Confirm Password"
                                value={user.cpassword}
                                onChange={handleInputs}  
                                />
                        </div>
                        Status:{user.status }
                        <div className="form-group col-sm-4">
                           
                                <input 
                                type="radio" 
                                name="status"
                                className="form-control form-control-user form-check-input test nohover"
                                id="flexRadioDefault1"                                 
                                value="Active"                                               
                               // value={user.phone}
                                 onChange={handleInputs} 
                                
                                />
                                 <label className="form-check-label" htmlFor="flexRadioDefault1"><b>Active</b></label>
                            </div>
                            <div className="form-group col-sm-4 m-2">
                                <input 
                                type="radio" 
                                name="status"
                                className="form-control form-control-user form-check-input"
                                id="flexRadioDefault2"
                                value="InActive"                                                       
                                // value={user.phone}
                                 onChange={handleInputs} 
                                />
                                 <label className="form-check-label" htmlFor="flexRadioDefault2"><b>InActive</b></label>
                            </div>
                            {/* <div class="custom-control custom-radio">
      <input type="radio" className="custom-control-input" id="customRadio1" name="example1"  />
      <label class="custom-control-label" for="customRadio1">Active</label>
    </div>  
    <div class="custom-control custom-radio">
      <input type="radio" class="custom-control-input" id="customRadio2" name="example2"  />
      <label class="custom-control-label" for="customRadio2">InActive</label>
    </div>   */}

                        
                        

                <div className="mt-4 mb-0">
                <div className="d-grid"><NavLink className="btn btn-primary btn-user btn-block" to="/" name="signup" id="signup" value="register" onClick={PostData}>Add Admin</NavLink></div>
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

export default AddUser;