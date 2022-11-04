import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../redux/features/authSlice";

const Navigation = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const dispatch = useDispatch();

  const handleMobileMenu = () => {
    setMobileMenu((preVal) => !preVal);
  };

  const { user } = useSelector((state) => state.auth);
  const handleLogout = () => {
    dispatch(logoutUser());
  };

  //console.log("user", user);

  return (
    <nav className="navbar navbar-expand-lg navbar-light shadow-sm bg-light fixed-top">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <span className="ml-3 font-weight-bold">BRAND</span>
        </Link>
        <button
          className="navbar-toggler navbar-toggler-right border-0"
          type="button"
          onClick={handleMobileMenu}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`navbar-collapse main-menu ${
            mobileMenu ? "" : "collapse"
          }`}
          id="navbar4"
        >
          <ul className="navbar-nav mr-auto pl-lg-4">
            <li className="nav-item px-lg-2 active">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            {user?.token && (
              <>
                <li className="nav-item px-lg-2">
                  <Link className="nav-link" to="#">
                    <span className="d-inline-block d-lg-none icon-width">
                      <i className="far fa-user"></i>
                    </span>
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item px-lg-2">
                  <Link className="nav-link" to="/addTour">
                    Add Tour
                  </Link>
                </li>
              </>
            )}
          </ul>
          <ul className="navbar-nav ml-auto mt-3 mt-lg-0">
            {user?.token ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="#">
                    {user?.userName}
                  </Link>
                </li>
                <li className="nav-item px-lg-2" onClick={handleLogout}>
                  <Link className="nav-link" to="/login">
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item px-lg-2">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="#">
                    <i className="bi bi-google"></i>
                    <span className="d-lg-none ml-3">Google</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="#">
                    <i className="bi bi-facebook"></i>
                    <span className="d-lg-none ml-3">Facebook</span>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
