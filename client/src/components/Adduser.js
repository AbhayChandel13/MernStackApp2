import React from 'react';
import Sidenavbar from './Sidenavbar';
import Topnavbar from './Topnavbar';
import Footer from './Footer';
import { HiUserAdd } from 'react-icons/hi';


const Adduser = () => {

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
                                <input type="text" className="form-control  form-control-user" id="FirstName"
                                    placeholder="First Name" />                        
                        </div>                     
                        
                         <div className="form-group col-sm-8">
                                <input type="text" className="form-control form-control-user" id="LastName"
                                    placeholder="Last Name" />
                        </div>
                      
                        
                        <div className="form-group col-sm-8">
                            <input type="email" className="form-control form-control-user" id="Email"
                                placeholder="Email Address" />
                        </div>
                 
                        <div className="form-group col-sm-8">
                                <input type="text" className="form-control form-control-user"
                                    id="employeeId" placeholder="Employee Id " />
                            </div>

                        <div className="form-group col-sm-8">
                                <input type="text" className="form-control form-control-user"
                                    id="Designation" placeholder="Designation" />
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

export default Adduser;