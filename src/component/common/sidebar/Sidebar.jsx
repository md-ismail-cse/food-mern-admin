import React from "react";
import { NavLink } from "react-router-dom";
import navLinks from "../../../assets/data/navLinks";
import SidebarItem from "./SidebarItem";
import "./sidebar.css";

const Sidebar = () => {
  const logout = () => {
    localStorage.removeItem("aID");
    localStorage.removeItem("aToken");
    window.location.href = process.env.REACT_APP_FRONTEND;
  };

  return (
    <>
      <section className="sidebar">
        <div className="sidebar-top">
          <div className="img">
            <a
              href="http://localhost:3000/"
              target="_blank"
              title="Go Home Page"
              rel="noreferrer"
            >
              <img src={"/img/logo.png"} alt="Logo" />
            </a>
          </div>
        </div>
        <div className="sidebar-content">
          <div className="sidebar-menu">
            <ul className="nav-list">
              {navLinks.map((item, index) => (
                <SidebarItem key={index} item={item} />
              ))}
              <li className="nav-item">
                <NavLink
                  onClick={() => {
                    logout();
                  }}
                  className="nav-link sidebar-item"
                >
                  <i className="ri-logout-circle-r-line"></i> Logout
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default Sidebar;
