import React, { useState, useEffect } from "react";
import Sidenavbar from "./Sidenavbar";
import Topnavbar from "./Topnavbar";
import Footer from "./Footer";
import { HiUserAdd } from "react-icons/hi";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FileBase64 from "react-file-base64";

const EmployeeInfo = () => {
  let navigate = useNavigate();
  let [employeedata, setEmployeedata] = useState([]);

  const [employeeinfo, setEmployeeinfo] = useState({
    title: "",
    image: "",
  });

  //   const [role, setRole] = useState("");

  const getitems = async (e) => {
    try {
      const res = await fetch("/api/v1/employees/getitems");

      const data = await res.json();

      setEmployeedata(data);
      console.log("getfiles :", data);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getitems();
  }, []);

  let name, value;
  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;

    setEmployeeinfo({ ...employeeinfo, [name]: value });
  };

  const PostData = async (e) => {
    e.preventDefault();

    const { title, image } = employeeinfo;
    //const {roleid} = role;

    let res = await fetch("/api/v1/employees/createitem", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, image }),
    });

    const data = await res.json();

    if (res.status === 422 || !data) {
      //window.alert("Invalid Registration");
      toast.error(" Error In Uploading ", {
        position: "top-center",
      });
      console.log("Error In Uploading");
    } else {
      toast.success("Image Uploaded Successfully!", {
        position: "top-center",
      });
      console.log("Image Uploaded Added Successful");

      setTimeout(function () {
        navigate("/employeeinfo", { replace: true });
        window.location = "/employeeinfo";
      }, 1000);
    }
      getitems();
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
                <div className="card-header py-3 ">
                  <h6 className="m-0 font-weight-bold text-primary">
                    <HiUserAdd /> Employee Information
                  </h6>
                </div>
                <div className="card-body">
                  <form className="user mt-2 p-3 d-flex flex-column justify-content-center align-items-center">
                    {/* <div className="form-group col-sm-8" id="empname">
                      <select
                        id="empid"
                        name="empid"
                        style={{ borderRadius: "30px" }}
                        className="custom-select custom-select-lg col-lg-12"
                        value={employeeinfo.empid}
                        onChange={handleInputs}
                      >
                        <option value="">--Select Employee Name--</option>

                        {employeedata.map((employeedataa) => (
                          <option
                            key={employeedataa._id}
                            value={employeedataa.empid}
                          >
                            {employeedataa.firstname} {employeedataa.lastname} (
                            {employeedataa.Role})
                          </option>
                        ))}
                      </select>
                    </div> */}

                    <div className="form-group col-sm-8 ">
                      <input
                        type="text"
                        name="title"
                        className="form-control input-lg  form-control-user "
                        id="title"
                        placeholder="Title "
                        value={employeeinfo.title}
                        onChange={handleInputs}
                      />
                    </div>

                    <div className="form-group col-sm-8 ">
                      <FileBase64
                        type="file"
                        multiple={false}
                        onDone={({ base64 }) =>
                          setEmployeeinfo({ ...employeeinfo, image: base64 })
                        }
                      />
                    </div>

                    <div className="mt-4 mb-0">
                      <div className="d-grid">
                        <NavLink
                          className="btn btn-primary btn-user btn-block"
                          to="/"
                          name="signup"
                          id="signup"
                          value="register"
                          onClick={PostData}
                        >
                          Upload Files
                        </NavLink>
                      </div>
                    </div>
                  </form>

                  {employeedata?.map((item) => (
                    <table key={item._id}>
                      <tbody>
                      <tr>  
                        <td>                      
                        <img
                            style={{ width: "100%", height: "70vh" }}
                            src={item.image}
                                />
                          
                        </td>
                      </tr>
                      </tbody>
                    </table>
                  ))}
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
  );
};

export default EmployeeInfo;
