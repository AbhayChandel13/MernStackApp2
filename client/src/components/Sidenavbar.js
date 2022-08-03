import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaUsers } from 'react-icons/fa';
import { BsInfoLg } from 'react-icons/bs';
import {HiUserAdd} from "react-icons/hi"

const Sidenavbar = () => {
  return (
    <>
     <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">


<a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
    <div className="sidebar-brand-icon rotate-n-15">
        <i className="fas fa-laugh-wink"></i>
    </div>
    <div className="sidebar-brand-text mx-3">Wowz United </div>
</a>


<hr className="sidebar-divider my-0" />


<li className="nav-item active">
    <a className="nav-link" href="#">
        <i className="fas fa-fw fa-tachometer-alt"></i>
        <span>Dashboard</span></a>
</li>


<hr className="sidebar-divider" />


<div className="sidebar-heading">
    Members
</div>


<li className="nav-item">
    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo"
        aria-expanded="true" aria-controls="collapseTwo">
        <FaUsers />

        <span>  Users</span>
    </a>
    <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
        <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Functionality:</h6>
            <NavLink className="collapse-item" to="/users"><i className="fas fa-fw fa-table"></i> Show</NavLink>
            <NavLink className="collapse-item" to="/adduser"><HiUserAdd />  Add User</NavLink>
            <a className="collapse-item" href="#">Edit User</a>
            <a className="collapse-item" href="#">Delete User</a>
        </div>
    </div>
</li>


<li className="nav-item">
    <li className="nav-item">
        <a className="nav-link" href="#">
            <BsInfoLg />
            <span> User Info</span></a>
    </li>
</li>


<hr className="sidebar-divider" />


<div className="sidebar-heading">
    Projects
</div>


<li className="nav-item">
    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages"
        aria-expanded="true" aria-controls="collapsePages">
        <i className="fas fa-fw fa-folder"></i>
        <span>Projects</span>
    </a>
    <div id="collapsePages" className="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
        <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Functionality</h6>
            <a className="collapse-item" href="#">Add Project</a>

        </div>
    </div>
</li>

<hr className="sidebar-divider d-none d-md-block" />


<div className="text-center d-none d-md-inline">
    <button className="rounded-circle border-0" id="sidebarToggle"></button>
</div>




</ul>
    
    </>
  )
}

export default Sidenavbar