import React from 'react';
import { NavLink } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AdminNavbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container">
        <span className="navbar-brand fw-bold">Admin Dashboard</span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarAdmin"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarAdmin">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? 'nav-link active fw-bold text-warning' : 'nav-link'
                }
                to="/admin/add-product"
              >
                Add Products
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? 'nav-link active fw-bold text-warning' : 'nav-link'
                }
                to="/admin/products"
              >
                Products
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? 'nav-link active fw-bold text-warning' : 'nav-link'
                }
                to="/admin/contacts"
              >
                Contacts
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? 'nav-link active fw-bold text-warning' : 'nav-link'
                }
                to="/admin/user-data"
              >
                User Data
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
