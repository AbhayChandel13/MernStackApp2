import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Signup = () => {
    let navigate = useNavigate();
    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        work: "",
        password: "",
        cpassword: ""
    });

    let name, value;
    const handleInputs = (e) => {
        console.log(e);
        name = e.target.name;
        value = e.target.value;

        setUser({ ...user, [name]: value })
    }


    const PostData = async (e) => {
        e.preventDefault();

        const { name, email, phone, work, password, cpassword } = user;

        let res = await fetch("/register", {
            method: "POST",
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify({ name, email, phone, work, password, cpassword }),
        });

        const data = await res.json();

        if (res.status === 422 || !data) {
            //window.alert("Invalid Registration");
            toast.error(" Invalid Registration Data", {
                position: "top-center",
            });
            console.log("Invalid Registration Data");
        }
        else {
            toast.success("Registration Successfully!", {
                position: "top-center",
            });
            //window.alert("Registration Successful");
            console.log("Registration Successful");

            // history.push("/login");
            navigate("/login", { replace: true });
        }

    }

    return (
        <>
            <ToastContainer />
            {/* <div id="layoutAuthentication">
                <div id="layoutAuthentication_content">
                    <main>
                        <div classNameName="container">
                            <div classNameName="row justify-content-center">
                                <div classNameName="col-lg-7">
                                    <div classNameName="card shadow-lg border-0 rounded-lg mt-5">
                                        <div classNameName="card-header"><h3 classNameName="text-center font-weight-light my-4">Create Account</h3></div>
                                        <div classNameName="card-body">
                                            <form method="POST">
                                                <div classNameName="row mb-3">
                                                    <div classNameName="col-md-6">

                                                        <div classNameName="form-floating mb-3 mb-md-0">

                                                            <input classNameName="form-control"
                                                                name="name"
                                                                id="inputFirstName"
                                                                type="text"
                                                                placeholder="Enter your first name"
                                                                autoComplete="off"
                                                                value={user.name}
                                                                onChange={handleInputs}
                                                            />
                                                            <label htmlFor="inputFirstName"> Your Name </label>
                                                        </div>
                                                    </div>
                                                    <div classNameName="col-md-6">
                                                        <div classNameName="form-floating">

                                                            <input classNameName="form-control"
                                                                name="phone"
                                                                id="phone"
                                                                type="text"
                                                                placeholder="Enter your last name"
                                                                autoComplete="off"
                                                                value={user.phone}
                                                                onChange={handleInputs} />
                                                            <label htmlFor="inputLastName">Phone</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div classNameName="form-floating mb-3">

                                                    <input classNameName="form-control"
                                                        name="email"
                                                        id="inputEmail"
                                                        type="email"
                                                        placeholder="enter email"
                                                        autoComplete="off"
                                                        value={user.email}
                                                        onChange={handleInputs} />
                                                    <label htmlFor="inputEmail">Email address</label>
                                                </div>
                                                <div classNameName="form-floating mb-3">

                                                    <input classNameName="form-control"
                                                        name='work'
                                                        id="work"
                                                        type="text"
                                                        placeholder="enter your profession"
                                                        value={user.work}
                                                        onChange={handleInputs} />
                                                    <label htmlFor="inputwork">Profession</label>
                                                </div>
                                                <div classNameName="row mb-3">
                                                    <div classNameName="col-md-6">
                                                        <div classNameName="form-floating mb-3 mb-md-0">

                                                            <input classNameName="form-control"
                                                                id="inputPassword"
                                                                name='password'
                                                                type="password"
                                                                placeholder="Create a password"
                                                                value={user.password}
                                                                onChange={handleInputs} />
                                                            <label htmlFor="inputPassword">Password</label>
                                                        </div>
                                                    </div>
                                                    <div classNameName="col-md-6">
                                                        <div classNameName="form-floating mb-3 mb-md-0">

                                                            <input classNameName="form-control"
                                                                id="cpassword"
                                                                name='cpassword'
                                                                type="password"
                                                                placeholder="Confirm password"
                                                                value={user.cpassword}
                                                                onChange={handleInputs} />
                                                            <label htmlFor="cpassword">Confirm Password</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div classNameName="mt-4 mb-0">
                                                    <div classNameName="d-grid"><NavLink classNameName="btn btn-primary btn-block" to="/" name="signup" id="signup" value="register" onClick={PostData}>Create Account</NavLink></div>
                                                </div>
                                            </form>
                                        </div>
                                        <div classNameName="card-footer text-center py-3">
                                            <div classNameName="small"> <NavLink classNameName="nav-link " to="/login">Login Have an account? Go to login </NavLink></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
                <div id="layoutAuthentication_footer">
                    <footer classNameName="py-4 bg-light mt-auto">
                        <div classNameName="container-fluid px-4">
                            <div classNameName="d-flex align-items-center justify-content-between small">
                                <div classNameName="text-muted">Copyright &copy; Your Website 2022</div>
                                <div>
                                    <a href="#">Privacy Policy</a>
                                    &middot;
                                    <a href="#">Terms &amp; Conditions</a>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
            </div> */}

<div className="container">

<div className="card o-hidden border-0 shadow-lg my-5">
    <div className="card-body p-0">
      
        <div className="row">
            <div className="col-lg-5 d-none d-lg-block bg-register-image"></div>
            <div className="col-lg-7">
                <div className="p-5">
                    <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-4">Create an Account!</h1>
                    </div>
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
                            <div className="col-sm-6">
                                <input type="password" className="form-control form-control-user"
                                    id="exampleRepeatPassword" placeholder="Repeat Password" />
                            </div>
                        </div>
                        <a href="login.html" className="btn btn-primary btn-user btn-block">
                            Register Account
                        </a>
                        <hr />
                        <a href="index.html" className="btn btn-google btn-user btn-block">
                            <i className="fab fa-google fa-fw"></i> Register with Google
                        </a>
                        <a href="index.html" className="btn btn-facebook btn-user btn-block">
                            <i className="fab fa-facebook-f fa-fw"></i> Register with Facebook
                        </a>
                    </form>
                    <hr />
                    <div className="text-center">
                        <a className="small" href="forgot-password.html">Forgot Password?</a>
                    </div>
                    <div className="text-center">
                        {/* <a className="small" href="login.html">Already have an account? Login!</a> */}
                        <NavLink className="nav-link " to="/login">Already have an account? Login!</NavLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

</div>





        </>
    )
}

export default Signup