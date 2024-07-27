import React from 'react';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid ms-5">
        <a className="navbar-brand fs-2 fw-bold text-primary" href="#">Todo.</a>
        <button
          className="navbar-toggler text-bg-secondary"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto me-5 mb-2 mb-lg-0 fs-5 fw-se">
            <li className="nav-item pe-3">
              <a className="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li className="nav-item pe-3">
              <a className="nav-link active" href="#">Contact Us</a>
            </li>
            <li className="nav-item pe-3">
              <a className="nav-link active" href="#">Sign Up</a>
            </li>
            <li className="nav-item pe-3">
              <a className="nav-link active" href="#">Sign In</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
