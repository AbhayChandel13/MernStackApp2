import React, { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Sidenavbar from "./Sidenavbar";
import { HiUserAdd } from "react-icons/hi";
import Topnavbar from "./Topnavbar";
import Footer from "./Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Showadmins = () => {
  let [searchQuery, setSearchQuery] = useState("");
  let [usersdata, setUserdata] = useState([]);
  const [deleteId, setDeleteId] = useState("");
  let navigate = useNavigate();

  const getUsers = async (e) => {
    try {
      const res = await fetch("/api/v1/employees/getUsers", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
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
  };
  useEffect(() => {
    getUsers();
  }, []);

  // useEffect(() => {
  //   // const data = window.localStorage.getItem('MY_APP_STATE');
  //   // if ( data !== null ) state(JSON.parse(data));
  //   dispatch({ type: "USER", payload: true });
  // }, []);

  if (searchQuery) {
    usersdata = usersdata.filter((m) =>
      m.name.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
  }

  const handleClickDelete = (id) => {
    setDeleteId(id);
    console.log(id);
  };

  const deleteEmployee = async (id) => {
    // if (window.confirm("Are You Sure, You want to delete?")) {
    console.log("id selected  from  main delete:", deleteId);
    try {
      const response = await fetch(`/api/v1/employees/${deleteId}`, {
        method: "DELETE",
      });
      const jsonData = await response.json();
      console.log(jsonData);

      setTimeout(function () {
        navigate("/admins", { replace: true });
        toast.success("User Deleted Successfully!", {
          position: "top-center",
        });
      }, 1000);
    } catch (err) {
      console.error(err.message);
    }
    getUsers();
  };

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
                <div className="card-header py-3">
                  <h6 className="font-weight-bold text-primary">Users Table</h6>
                  <NavLink
                    className="float-right font-weight-bold text-success"
                    to="/adduser"
                  >
                    <HiUserAdd /> Add Users{" "}
                  </NavLink>

                  <div
                    className="modal fade"
                    id="exampleModalCenter"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalCenterTitle"
                    aria-hidden="true"
                  >
                    <div
                      className="modal-dialog modal-dialog-centered"
                      role="document"
                    >
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5
                            className="modal-title text-danger"
                            id="exampleModalLongTitle"
                          >
                            Confirm Delete
                          </h5>
                          <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div className="modal-body">
                          Are You Sure, You want to delete?
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-dismiss="modal"
                          >
                            No
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger"
                            data-dismiss="modal"
                            onClick={() => deleteEmployee(usersdata._id)}
                          >
                            Yes
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <div
                      id="dataTable_wrapper"
                      className="dataTables_wrapper dt-bootstrap4"
                    >
                      <div className="row">
                        <div className="col-sm-12 col-md-6">
                          <div
                            className="dataTables_length"
                            id="dataTable_length"
                          >
                            <label>
                              Show entries
                              <select
                                name="dataTable_length"
                                aria-controls="dataTable"
                                className="custom-select custom-select-sm form-control form-control-sm"
                              >
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
                          <div
                            id="dataTable_filter"
                            className="dataTables_filter"
                          >
                            <label>
                              Search:
                              <div>
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  name="name"
                                  id="name"
                                  placeholder={"Search by Name"}
                                  value={searchQuery}
                                  onChange={(e) =>
                                    setSearchQuery(e.target.value)
                                  }
                                />
                              </div>
                            </label>
                          </div>
                        </div>
                      </div>  
                      <div className="row">
                        <table
                          className="table table-bordered"
                          id="dataTable"
                          width="100%"
                          cellSpacing="5%"
                        >
                          <thead>
                            <tr>
                              <th>Name</th>
                              <th>Email</th>
                              <th>Role</th>
                              <th>Phone</th>
                              <th>Password</th>
                              <th>Status</th>

                              {/* <th>Edit</th> */}
                              <th>Delete</th>
                            </tr>
                          </thead>
                          {usersdata.map((usersdata, i) => (
                            <tbody key={usersdata._id}>
                              <tr>
                                <td>{usersdata.name}</td>
                                <td>{usersdata.email}</td>
                                <td>{usersdata.role}</td>
                                <td>{usersdata.phone}</td>
                                <td>{usersdata.password}</td>
                                <td>{usersdata.status}</td>
                                {/* <td>
                                                        <NavLink className="text-success btn-lg" to={`/edituser/${usersdata._id}`} ><FaEdit />  </NavLink>
                                                        </td> */}

                                <td>
                                  <NavLink
                                    onClick={() =>
                                      handleClickDelete(usersdata._id)
                                    }
                                    //className="text-danger btn-lg"

                                    className="text-danger btn-md btn btn"
                                    data-toggle="modal"
                                    data-target="#exampleModalCenter"
                                    to=""
                                  >
                                    <MdDelete />
                                  </NavLink>
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
  );
};

export default Showadmins;
