
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
import Pagination from "./pagination";


const ShowEmployee = () => { 

  let [searchQuery, setSearchQuery] = useState("");
  let [employeedata, setEmployeedata] = useState([]);
  
  const [showPerPage, setShowPerPage] = useState(5);
  const [pagination, setPagination] = useState({
    start: 0,
    end: showPerPage
  });
   
  // const handleChange = (e) => {    
  //    setShowPerPage(e.target.value);
  //   console.log(showPerPage);
  // };
  
  
  const onPaginationChange = (start, end) => {
    setPagination({ start: start, end: end });
  };

  const getEmployees = async (e) => {
    try {
      const res = await fetch("/api/v1/employees/getEmployee");
      
      const data = await res.json();  

      setEmployeedata(data);
      //console.log("tableshowEmloyeeData :", data);

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
    // if (window.confirm("Are You Sure, You want to delete?")) {
      try {
        const response = await fetch(`/api/v1/employees/employee/${id}`, {
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
    // }
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

   const data = employeedata; 
  
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
                          {data.slice(0, 1).map((data) => (
                            <button
                              type="button"
                              key={data.email}
                              className="btn btn-primary"
                              data-dismiss="modal"
                              onClick={() => deleteEmployee(data._id)}
                            >
                              Yes
                            </button>
                          ))}
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
                        {/* <div className="col-sm-12 col-md-6">
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
                                value={showPerPage}
                                onChange={handleChange}
                              >
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                              </select>
                            </label>
                          </div>
                        </div> */}

                        {/* text-right */}
                        <div className="col-sm-12 col-md-12 d-flex flex-column justify-content-end align-items-end">
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
                            {data
                              .slice(pagination.start, pagination.end)
                              .map((employeedata, i) => (
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
                                      // onClick={() =>
                                      //   deleteEmployee(employeedata._id)
                                      // }                                     
                                    className="text-danger btn-md btn btn"
                                    data-toggle="modal"
                                    data-target="#exampleModalCenter"
                                    
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
                      <div className="col-sm-12 col-md-12 d-flex flex-column justify-content-end align-items-end">
                        <Pagination
                          showPerPage={showPerPage}                          
                          onPaginationChange={onPaginationChange}
                          total={data.length}
                        />
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