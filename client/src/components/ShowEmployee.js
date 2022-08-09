import React,{ useState, useEffect} from 'react';
import { FaEdit, } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Sidenavbar from  './Sidenavbar';
import { HiUserAdd } from 'react-icons/hi';
import Topnavbar from './Topnavbar';
import { UserContext } from '../App';
import Footer from './Footer';
import { NavLink } from 'react-router-dom';

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

            const res = await fetch('/employeedata', {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });
            const data = await res.json();        
           
            setEmployeedata(data);
            // console.log("ye hai request vala data",data);
         
            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getEmployees();
    }, []);

    if (searchQuery) {
        employeedata = employeedata.filter(
            (m) =>
                m.firstname.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                m.lastname.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                m.designation.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                m.empid.toString().startsWith(searchQuery.toString()) 
        );
    }

 
const handleChange = (e) => {
    setValue(e.target.value);
  };
//   console.log(value);


//const size = 3;
const data = employeedata.slice(0,value);
// console.log(" selected data :",data);

 

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
                     
                        <h6 className="font-weight-bold text-primary">Employees Table</h6>
                  <NavLink className="float-right font-weight-bold text-success" to="/addemployee"><HiUserAdd /> Add Employee  </NavLink>
                  
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                            <div id="dataTable_wrapper" className="dataTables_wrapper dt-bootstrap4">
                            <div className="row">
<div className="col-sm-12 col-md-6">
<div className="dataTables_length" id="dataTable_length">
<label>Show entries
<select id="currvalue" name="dataTable_length" aria-controls="dataTable" className="custom-select custom-select-sm form-control form-control-sm" value={value} onChange={handleChange} >
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
<div id="dataTable_filter" className="dataTables_filter">
       <label>Search:
       <div>
                <input
                type="text"
                className="form-control form-control-sm"
                name="name"
                id="name"
                placeholder={"Search Here...."}
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
                                    <tbody>   
                                                                        
                                    {data.map((employeedata,i) => (
                                                
                                                    <tr key={employeedata._id}>
                                                        <td>{employeedata.empid}</td>
                                                        <td>{employeedata.firstname}</td>
                                                        <td>{employeedata.lastname}</td>  
                                                        <td>{employeedata.Role}</td>
                                                        <td>{employeedata.email}</td>
                                                        <td>{employeedata.phone}</td>
                                                                                                               
                                                      <td>
                                               <NavLink className="text-success btn-lg" to={`/editemployee/${employeedata._id}`} ><FaEdit />  </NavLink>                        
                                               {/* onClick={() => editRow(id)}
                                               {/* <button>
                                        <NavLink
                                          to="/editemployee"
                                          className="btn text-primary"

                                        >
                                          <FaEdit className="text-green-500 font-bold text-4xl p-1" />
                                        </NavLink>
                                      </button> */}
                                                        
                                                        </td>

                                                        <td>
                                             <NavLink className="text-danger btn-lg" to=""><MdDelete />
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
  )
}

export default ShowEmployee