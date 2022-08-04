import React, { useState, useEffect, useContext } from 'react';
// import Header from './header/Header'
// import { NavLink, useNavigate } from 'react-router-dom';
// import { Row, Container, Col, Table } from "react-bootstrap";
// import { FaSearch } from "react-icons/fa";
import { FaEdit, } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Sidenavbar from  './Sidenavbar';
import { HiUserAdd } from 'react-icons/hi';
import Topnavbar from './Topnavbar';
import { UserContext } from '../App';
import Footer from './Footer';
import { NavLink } from 'react-router-dom';



const Showadmins = () => {
    let [searchQuery, setSearchQuery] = useState("");
    let [usersdata, setUserdata] = useState([]);
    const { state, dispatch } = useContext(UserContext);

    const getUsers = async (e) => {

        try {

            const res = await fetch('/users', {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });
            const data = await res.json();
            setUserdata(data);
            console.log(data);

            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getUsers();
    }, []);

    useEffect(() => {
        // const data = window.localStorage.getItem('MY_APP_STATE');       
        // if ( data !== null ) state(JSON.parse(data));
        dispatch({ type: "USER", payload: true })
    }, []);

    if (searchQuery) {
        usersdata = usersdata.filter(
            (m) =>
                m.name.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                m.work.toLowerCase().startsWith(searchQuery.toLowerCase())
        );
    }

    return (
        <>
      <div id="wrapper">
           <Sidenavbar />

          <div id="content-wrapper" className="d-flex flex-column">


            <div id="content">

              <Topnavbar />
         
                <div className="container-fluid">
                                      <div className="card shadow mb-4">
                        <div className="card-header py-3">
                     
                        <h6 className="font-weight-bold text-primary">Admins Table</h6>
                  <NavLink className="float-right font-weight-bold text-success" to="/adduser"><HiUserAdd /> Add Admin  </NavLink>
                        
                        
                           
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                            <div id="dataTable_wrapper" className="dataTables_wrapper dt-bootstrap4">
                            <div className="row">
<div className="col-sm-12 col-md-6">
<div className="dataTables_length" id="dataTable_length">
<label>Show entries
<select name="dataTable_length" aria-controls="dataTable" className="custom-select custom-select-sm form-control form-control-sm">
<option value="10">10</option>
<option value="25">25</option>
<option value="50">50</option>
<option value="100">100</option>
</select> 
</label>
</div>
</div>

{/* text-right */}
<div className="col-sm-12 col-md-6 d-flex flex-column justify-content-end align-items-end">
<div id="dataTable_filter" className="dataTables_filter">
       <label>Search:
       <div>
                <input
                type="text"
                className="form-control form-control-sm"
                name="name"
                id="name"
                placeholder={"Search by Name"}
                value={searchQuery}
                onChange={(e) =>setSearchQuery(e.target.value)}
           />
           </div>
           </label>
</div>
</div>
</div>
<div className="row">
         <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="5%">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th>Work</th>
                                            <th>Edit</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    {/* <tfoot>
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th>Work</th>
                                            <th>Edit</th>
                                            <th>Delete</th>
                                            
                                        </tr>
                                    </tfoot>           */}
                                    {usersdata.map((usersdata, i) => (
                                                <tbody key={usersdata._id}>
                                                    <tr>
                                                        <td>{usersdata.name}</td>
                                                        <td>{usersdata.email}</td>
                                                        <td>{usersdata.phone}</td>
                                                        <td>{usersdata.work}</td>
                                                        <td>
                                                <button className="btn text-success btn-lg"><FaEdit />                           
                                                        </button>
                                                        </td>

                                                        <td>
                                                <button className="btn text-danger btn-lg"><MdDelete />                           
                                                        </button>
                                                        </td>
                                                    </tr>

                                                </tbody>
                                            ))}
                                       
                                </table>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>

                </div>


             </div>


          <Footer />
     
         </div>


        </div>

        </>
    )
}

export default Showadmins;