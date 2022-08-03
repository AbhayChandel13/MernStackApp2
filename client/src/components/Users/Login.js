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
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-lg-5">
                                    <div className="card shadow-lg border-0 rounded-lg mt-5">
                                        <div className="card-header"><h3 className="text-center font-weight-light my-4">Login</h3></div>
                                        <div className="card-body">
                                            <form method='POST'>
                                                <div className="form-floating mb-3">
                                                    <input className="form-control"
                                                        name="email"
                                                        id="inputEmail"
                                                        type="email"
                                                        placeholder="Your email"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)} />
                                                    <label htmlFor="inputEmail">Email address</label>
                                                </div>
                                                <div className="form-floating mb-3">
                                                    <input className="form-control"
                                                        id="inputPassword"
                                                        name='password'
                                                        type="password"
                                                        placeholder="Create a password"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)} />
                                                    <label htmlFor="inputPassword">Password</label>
                                                </div>

                                               
                                                <div className="form-group form-button mt-4 mb-0">
                                                    <div className="d-grid"><NavLink className="btn btn-primary btn-block" to="" name="login" id="login" value="login" onClick={loginUser}>Login</NavLink></div>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="card-footer text-center py-3">
                                            <div className="small"> <NavLink className="nav-link " to="/">Need an account? Sign up!</NavLink></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
                <div id="layoutAuthentication_footer">
                    <footer className="py-4 bg-light mt-auto">
                        <div className="container-fluid px-4">
                            <div className="d-flex align-items-center justify-content-between small">
                                <div className="text-muted">Copyright &copy; Your Website 2022</div>
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


<div class="container">


<div class="row justify-content-center">

    <div class="col-xl-10 col-lg-12 col-md-9">

        <div class="card o-hidden border-0 shadow-lg my-5">
            <div class="card-body p-0">
               
                <div class="row">
                    <div class="col-lg-6 d-none d-lg-block bg-login-image"></div>
                    <div class="col-lg-6">
                        <div class="p-5">
                            <div class="text-center">
                                <h1 class="h4 text-gray-900 mb-4">Welcome Back!</h1>
                            </div>
                            <form class="user">
                                <div class="form-group">
                                    <input type="email" class="form-control form-control-user"
                                        id="exampleInputEmail" aria-describedby="emailHelp"
                                        placeholder="Enter Email Address..." />
                                </div>
                                <div class="form-group">
                                    <input type="password" class="form-control form-control-user"
                                        id="exampleInputPassword" placeholder="Password" />
                                </div>
                                <div class="form-group">
                                    <div class="custom-control custom-checkbox small">
                                        <input type="checkbox" class="custom-control-input" id="customCheck" />
                                        <label class="custom-control-label" for="customCheck">Remember
                                            Me</label>
                                    </div>
                                </div>
                                <a href="index.html" class="btn btn-primary btn-user btn-block">
                                    Login
                                </a>
                                <hr />
                                <a href="index.html" class="btn btn-google btn-user btn-block">
                                    <i class="fab fa-google fa-fw"></i> Login with Google
                                </a>
                                <a href="index.html" class="btn btn-facebook btn-user btn-block">
                                    <i class="fab fa-facebook-f fa-fw"></i> Login with Facebook
                                </a>
                            </form>
                            <hr />
                            <div class="text-center">
                                <a class="small" href="forgot-password.html">Forgot Password?</a>
                            </div>
                            <div class="text-center">
                                <a class="small" href="register.html">Create an Account!</a>
                            </div>
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