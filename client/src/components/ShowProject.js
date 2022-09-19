import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Sidenavbar from "./Sidenavbar";
import { AiFillProject } from "react-icons/ai";
import Topnavbar from "./Topnavbar";
import { UserContext } from "../App";
import Footer from "./Footer";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ShowProject = () => {
  const getInitialState = () => {
    const value = "5";
    return value;
  };

  let [searchQuery, setSearchQuery] = useState("");
  let [projectdata, setProjectdata] = useState([]);
  const [value, setValue] = useState(getInitialState);
  const [deleteId, setDeleteId] = useState("");
  //const { state, dispatch } = useContext(UserContext);

  const getProjects = async (e) => {
    try {
      const res = await fetch("/api/v1/employees/projectsdata");
      // , {
      //   method: "GET",
      //   headers: {
      //     Accept: "application/json",
      //     "Content-Type": "application/json"
      //   },
      //   credentials: "include"
      // }
      const data = await res.json();

      setProjectdata(data);
      console.log("tableshowProjectsData :", data);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProjects();
  }, []);

  const handleClickDelete = (id) => {
    setDeleteId(id);
    //  console.log(id);
  };
  const deleteProject = async (id) => {
    // if (window.confirm("Are You Sure, You want to delete?")) {
    try {
      const response = await fetch(`/api/v1/employees/project/${deleteId}`, {
        method: "DELETE",
      });
      const jsonData = await response.json();
      console.log(jsonData);

      toast.success("Project Deleted Successfully!", {
        position: "top-center",
      });
    } catch (err) {
      console.error(err.message);
    }

    getProjects();
    // }
  };

  if (searchQuery) {
    projectdata = projectdata.filter(
      (m) =>
        m.projectname.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
        m.industrysegment.toLowerCase().startsWith(searchQuery.toLowerCase())
      // m.Role.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
      // m.empid.toString().startsWith(searchQuery.toString())
    );
  }

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  //   console.log(value);

  //const size = 3;
  const data = projectdata.slice(0, value);
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
                    Projects Table
                  </h6>
                  <NavLink
                    className="float-right font-weight-bold text-success"
                    to="/addproject"
                  >
                    <AiFillProject /> Add Project{" "}
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
                            className="btn btn-primary"
                            data-dismiss="modal"
                            onClick={() => deleteProject()}
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
                              <th>Project Name</th>
                              <th>Industry Segment </th>
                              <th>TechStack</th>
                              <th>ThirdParty API</th>
                              <th>Payment Gateway</th>
                              <th>Github URL</th>
                              <th>Project Scope</th>
                              <th>Solution</th>
                              <th>Edit</th>
                              <th>Delete</th>
                            </tr>
                          </thead>

                          <tbody>
                            {data.map((projectdata, i) => (
                              <tr key={projectdata._id}>
                                <td>{projectdata.projectname}</td>
                                <td>{projectdata.industrysegment}</td>
                                <td>{projectdata.techstack}</td>
                                <td>{projectdata.thirdpartyapi}</td>
                                <td>{projectdata.paymentgateway}</td>
                                <td>{projectdata.githuburl}</td>
                                <td>{projectdata.projectscope}</td>
                                <td>{projectdata.solution}</td>

                                <td>
                                  <NavLink
                                    className="text-success btn-lg"
                                    to={`/editproject/${projectdata._id}`}
                                  >
                                    <FaEdit />{" "}
                                  </NavLink>
                                </td>

                                <td>
                                  <NavLink
                                    onClick={() =>
                                      handleClickDelete(projectdata._id)
                                    }
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

export default ShowProject;
