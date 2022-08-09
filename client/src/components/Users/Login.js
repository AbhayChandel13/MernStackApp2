import React, { useState, useContext, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from '../../App';

const Login = () => {

    const { state, dispatch } = useContext(UserContext);



    let navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginUser = async (e) => {
        e.preventDefault();

        const res = await fetch('/signin', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = res.json();
        if (res.status === 400 || !data) {
            toast.error(" Invalid Invalid Credentials", {
                position: "top-center",
            });

        } else {
            dispatch({ type: "USER", payload: true })
            //dispatch({type:"USER"})
            toast.success("Login Successfully!", {
                position: "top-center",
            });

            setTimeout(function () {
                navigate("/dashboard", { replace: true });
            }, 2000);
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
                                <div classNameName="col-lg-5">
                                    <div classNameName="card shadow-lg border-0 rounded-lg mt-5">
                                        <div classNameName="card-header"><h3 classNameName="text-center font-weight-light my-4">Login</h3></div>
                                        <div classNameName="card-body">
                                            <form method='POST'>
                                                <div classNameName="form-floating mb-3">
                                                    <input classNameName="form-control"
                                                        name="email"
                                                        id="inputEmail"
                                                        type="email"
                                                        placeholder="Your email"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)} />
                                                    <label htmlFor="inputEmail">Email address</label>
                                                </div>
                                                <div classNameName="form-floating mb-3">
                                                    <input classNameName="form-control"
                                                        id="inputPassword"
                                                        name='password'
                                                        type="password"
                                                        placeholder="Create a password"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)} />
                                                    <label htmlFor="inputPassword">Password</label>
                                                </div>

                                               
                                                <div classNameName="form-group form-button mt-4 mb-0">
                                                    <div classNameName="d-grid"><NavLink classNameName="btn btn-primary btn-block" to="" name="login" id="login" value="login" onClick={loginUser}>Login</NavLink></div>
                                                </div>
                                            </form>
                                        </div>
                                        <div classNameName="card-footer text-center py-3">
                                            <div classNameName="small"> <NavLink classNameName="nav-link " to="/">Need an account? Sign up!</NavLink></div>
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


<div className="row justify-content-center">

    <div className="col-xl-10 col-lg-12 col-md-9">

        <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
               
                <div className="row">
                    <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                    <div className="col-lg-6">
                        <div className="p-5">
                            <div className="text-center">
                                <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                            </div>
                            <form className="user" method='POST' >
                                <div className="form-group">
                                    <input 
                                    className="form-control form-control-user"
                                    name='email'
                                    type="email"                                    
                                    id="inputEmail"                                    
                                    placeholder="Enter Email Address..."
                                    onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                    name='password'
                                    type="password" 
                                    className="form-control form-control-user"                                    
                                    id="inputPassword"
                                    placeholder="Password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <div className="custom-control custom-checkbox small">
                                        <input
                                        type="checkbox" 
                                        className="custom-control-input" 
                                        id="customCheck" />
                                        <label 
                                        className="custom-control-label" 
                                        htmlFor="customCheck">Remember
                                        Me</label>
                                    </div>
                                </div>
                                <NavLink to="/dashboard" className="btn btn-primary btn-user btn-block" name="login" id="login" value="login" onClick={loginUser}>
                                    Login
                                </NavLink>
                               
                               
                                <hr />
                                <a href="index.html" className="btn btn-google btn-user btn-block">
                                    <i className="fab fa-google fa-fw"></i> Login with Google
                                </a>
                                <a href="index.html" className="btn btn-facebook btn-user btn-block">
                                    <i className="fab fa-facebook-f fa-fw"></i> Login with Facebook
                                </a>
                            </form>
                            <hr />
                            <div className="text-center">
                                <a className="small" href="forgot-password.html">Forgot Password?</a>
                            </div>
                            {/* <div className="text-center">
                                <a className="small" href="register.html">Create an Account!</a>
                            </div> */}
                        </div>
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

export default Login