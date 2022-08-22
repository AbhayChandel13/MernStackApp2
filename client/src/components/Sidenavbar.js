import React from "react";
import { NavLink } from "react-router-dom";
import { FaUsers } from "react-icons/fa";
import { BsInfoLg } from "react-icons/bs";
import { HiUserAdd } from "react-icons/hi";
import { AiFillProject } from "react-icons/ai";
const Sidenavbar = () => {
  return (
    <>
      <ul
        className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
        id="accordionSidebar"
      >
        <a
          className="sidebar-brand d-flex align-items-center justify-content-center"
          href="#"
        >
          <div className="sidebar-brand-icon rotate-n-15">
            <i className="fas fa-laugh-wink"></i>
          </div>
          <div className="sidebar-brand-text mx-3">Wowz United </div>
        </a>

        <hr className="sidebar-divider my-0" />

        <li className="nav-item active">
          <NavLink className="nav-link" to="/dashboard">
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </NavLink>
        </li>

        <hr className="sidebar-divider" />

        <div className="sidebar-heading">Members</div>

        <li className="nav-item">
          <a
            className="nav-link collapsed"
            href="#"
            data-toggle="collapse"
            data-target="#collapseTwo"
            aria-expanded="true"
            aria-controls="collapseTwo"
          >
            <FaUsers />

            <span> Users</span>
          </a>
          <div
            id="collapseTwo"
            className="collapse"
            aria-labelledby="headingTwo"
            data-parent="#accordionSidebar"
          >
            <div className="bg-white py-2 collapse-inner rounded">
              <h6 className="collapse-header">Functionality:</h6>
              <NavLink className="collapse-item" to="/admins">
                <i className="fas fa-fw fa-table"></i> Show Users
              </NavLink>
              <NavLink className="collapse-item" to="/adduser">
                <HiUserAdd /> Add User
              </NavLink>
            </div>
          </div>
        </li>

        <li className="nav-item">
          <a
            className="nav-link collapsed"
            href="#"
            data-toggle="collapse"
            data-target="#usercollapseTwo"
            aria-expanded="true"
            aria-controls="usercollapseTwo"
          >
            <FaUsers />

            <span> Employees</span>
          </a>
          <div
            id="usercollapseTwo"
            className="collapse"
            aria-labelledby="userheadingTwo"
            data-parent="#accordionSidebar"
          >
            <div className="bg-white py-2 collapse-inner rounded">
              <h6 className="collapse-header">Functionality:</h6>
              <NavLink className="collapse-item" to="/showemployee">
                <i className="fas fa-fw fa-table"></i> Show Employees
              </NavLink>
              <NavLink className="collapse-item" to="/addemployee">
                <HiUserAdd /> Add Employee
              </NavLink>
            </div>
          </div>
        </li>

        <li className="nav-item">
          <a className="nav-link" href="#">
            <BsInfoLg />
            <span> Employee Info</span>
          </a>
        </li>

        <hr className="sidebar-divider" />

        <div className="sidebar-heading">Projects</div>

        <li className="nav-item">
          <a
            className="nav-link collapsed"
            href="#"
            data-toggle="collapse"
            data-target="#collapsePages"
            aria-expanded="true"
            aria-controls="collapsePages"
          >
            <i className="fas fa-fw fa-folder"></i>
            <span>Projects</span>
          </a>
          <div
            id="collapsePages"
            className="collapse"
            aria-labelledby="headingPages"
            data-parent="#accordionSidebar"
          >
            <div className="bg-white py-2 collapse-inner rounded">
              <h6 className="collapse-header">Functionality</h6>
              <NavLink className="collapse-item" to="/showproject">
                <i className="fas fa-fw fa-table"></i> Projects List
              </NavLink>
              <NavLink className="collapse-item" to="/addproject">
                <AiFillProject /> Add New Project
              </NavLink>
              <NavLink className="collapse-item" to="/showassignedproject">
                <i className="fas fa-fw fa-table"></i> Assigned Projects List
              </NavLink>
              <NavLink className="collapse-item" to="/assignproject">
                <AiFillProject />
                <HiUserAdd /> Assign New Project
              </NavLink>
            </div>
          </div>
        </li>

        <hr className="sidebar-divider d-none d-md-block" />

        <div className="text-center d-none d-md-inline">
          <button
            className="rounded-circle border-0"
            id="sidebarToggle"
          ></button>
        </div>
      </ul>
    </>
  );
};

export default Sidenavbar;
