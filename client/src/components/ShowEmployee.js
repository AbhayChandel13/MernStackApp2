import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Sidenavbar from "./Sidenavbar";
import { HiUserAdd } from "react-icons/hi";
import Topnavbar from "./Topnavbar";
import { UserContext } from "../App";
import Footer from "./Footer";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ShowEmployee = () => {
  const getInitialState = () => {
    const value = "5";
    return value;
  };

  let [searchQuery, setSearchQuery] = useState("");
  let [employeedata, setEmployeedata] = useState([]);
  const [value, setValue] = useState(getInitialState);
  //const { state, dispatch } = useContext(UserContext);

  const getEmployees = async (e) => {
    try {
      const res = await fetch("/employeedata");
      // , {
      //   method: "GET",
      //   headers: {
      //     Accept: "application/json",
      //     "Content-Type": "application/json"
      //   },
      //   credentials: "include"
      // }
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

  const deleteEmployee = async (id) => {
    if (window.confirm("Are You Sure, You want to delete?")) {
      try {
        const response = await fetch(`/employee/${id}`, {
          method: "DELETE",
        });
        const jsonData = await response.json();
        console.log(jsonData);

        toast.success("Employee Deleted Successfully!", {
          position: "top-center",
        });
      } catch (err) {
        console.error(err.message);
      }

      getEmployees();
    }
  };

  if (searchQuery) {
    employeedata = employeedata.filter(
      (m) =>
        m.firstname.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
        m.lastname.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
        m.Role.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
        m.empid.toString().startsWith(searchQuery.toString())
    );
  }

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  //   console.log(value);

  //const size = 3;
  const data = employeedata.slice(0, value);
  // console.log(" selected data :",data);

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
                  <h6 className="font-weight-bold text-primary">
                    Employees Table
                  </h6>
                  <NavLink
                    className="float-right font-weight-bold text-success"
                    to="/addemployee"
                  >
                    <HiUserAdd /> Add Employee{" "}
                  </NavLink>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <div id="dataTable_wrapper"
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
                                id="currvalue"
                                name="dataTable_length"
                                aria-controls="dataTable"
                                className="custom-select custom-select-sm form-control form-control-sm"
                                value={value}
                                onChange={handleChange}
                              >
                                <option value="5">5</option>
                                <option value="10">10</option>
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
                                  placeholder={"Search Here...."}
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
                              <th>EmployeeId</th>
                              <th>FirstName</th>
                              <th>LastName</th>
                              <th>Designation</th>
                              <th>Email</th>
                              <th>Phone</th>
                              <th>Edit</th>
                              <th>Delete</th>
                            </tr>
                          </thead>
                         
                          <tbody>
                            {data.map((employeedata, i) => (
                              <tr key={employeedata._id}>
                                <td>{employeedata.empid}</td>
                                <td>{employeedata.firstname}</td>
                                <td>{employeedata.lastname}</td>
                                <td>{employeedata.Role}</td>
                                <td>{employeedata.email}</td>
                                <td>{employeedata.phone}</td>

                                <td>
                                  <NavLink
                                    className="text-success btn-lg"
                                    to={`/editemployee/${employeedata._id}`}
                                  >
                                    <FaEdit />
                                  </NavLink>
                                </td>

                                <td>
                                  <NavLink
                                    onClick={() =>
                                      deleteEmployee(employeedata._id)
                                    }
                                    className="text-danger btn-lg"
                                    to=""
                                  >
                                    <MdDelete />
                                  </NavLink>
                                </td>
                              </tr>
                            ))}

                  
                          </tbody>
                        </table>                        
                      </div>
                    <div className="row">
                      <div className="col-sm-12 col-md-6">
                        <div className="dataTables_length" id="dataTable_length">
                    <div className="dataTables_info" id="dataTable_info" role="status" aria-live="polite">Show11 to 20 of 57 entries
                    </div>
                          </div>
                        </div>

                       
        <div className="col-sm-12 col-md-6 d-flex flex-column justify-content-end align-items-end">
          <div className="col-sm-12 col-md-9">
      <div className="dataTables_paginate paging_simple_numbers" id="dataTable_paginate">
        <ul className="pagination">
        <li className="paginate_button page-item previous" id="dataTable_previous">
        <a href="#" aria-controls="dataTable" data-dt-idx="0" tabindex="0" class="page-link">Previous</a>
        </li>
        <li className="paginate_button page-item ">
          <a href="#" aria-controls="dataTable" data-dt-idx="1" tabindex="0" className="page-link">1</a>
          </li>
          <li className="paginate_button page-item">
            <a href="#" aria-controls="dataTable" data-dt-idx="2" tabindex="0" className="page-link">2</a>
            </li>
            <li className="paginate_button page-item ">
              <a href="#" aria-controls="dataTable" data-dt-idx="3" tabindex="0" className="page-link">3</a>
              </li>
              <li className="paginate_button page-item ">
                <a href="#" aria-controls="dataTable" data-dt-idx="4" tabindex="0" className="page-link">4</a>
                </li>
                <li className="paginate_button page-item ">                  
                  <a href="#" aria-controls="dataTable" data-dt-idx="5" tabindex="0" className="page-link">5</a>
                  </li>
                  <li className="paginate_button page-item ">
                    <a href="#" aria-controls="dataTable" data-dt-idx="6" tabindex="0" className="page-link">6</a>
                    </li>
                    <li className="paginate_button page-item next" id="dataTable_next">
                      <a href="#" aria-controls="dataTable" data-dt-idx="7" tabindex="0" className="page-link">Next</a>
                      </li>
                      </ul>
                      </div>
                      </div>
                   </div>
                        
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

export default ShowEmployee;
