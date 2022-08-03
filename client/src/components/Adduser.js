import React from 'react';
import Sidenavbar from './Sidenavbar';
import Topnavbar from './Topnavbar';
import Footer from './Footer';



const Adduser = () => {

  return (
    <>
      <div id="wrapper">

<Sidenavbar />


<div id="content-wrapper" className="d-flex flex-column">


    <div id="content">

        <Topnavbar />

        <div className="container-fluid">
        <form className="user">
                        <div className="form-group row">
                            <div className="col-sm-6 mb-3 mb-sm-0">
                                <input type="text" className="form-control form-control-user" id="exampleFirstName"
                                    placeholder="First Name" />
                            </div>
                            <div className="col-sm-6">
                                <input type="text" className="form-control form-control-user" id="exampleLastName"
                                    placeholder="Last Name" />
                            </div>
                        </div>
                        <div className="form-group">
                            <input type="email" className="form-control form-control-user" id="exampleInputEmail"
                                placeholder="Email Address" />
                        </div>
                        <div className="form-group row">
                            <div className="col-sm-6 mb-3 mb-sm-0">
                                <input type="password" className="form-control form-control-user"
                                    id="exampleInputPassword" placeholder="Password" />
                            </div>
                            
                        </div>
                       
                        
                        
                 </form>
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