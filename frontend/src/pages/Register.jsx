import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { registerUser } from "../redux/features/authSlice";

const Register = () => {
  const [formValue, setFormValue] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, message } = useSelector((state) => state.auth);

  useEffect(() => {
    isError && toast.error(message);
  }, [isError, message]);

  const handleChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formValue.password !== formValue.confirmPassword) {
      toast.error("Password should not match");
    }
    dispatch(registerUser({ formValue, toast, navigate }));
  };

  return (
    <div className="login-page bg-light">
      <div className="container">
        <div className="row">
          <div className="col-lg-10 offset-lg-1">
            <h3 className="mb-3">Login Now</h3>
            <div className="bg-white shadow rounded">
              <div className="row">
                <div className="col-md-7 pe-0">
                  <div className="form-left h-100 py-5 px-5">
                    <form action="" className="row g-4" onSubmit={handleSubmit}>
                      <div className="col-12">
                        <label>
                          userName<span className="text-danger">*</span>
                        </label>
                        <div className="input-group">
                          <div className="input-group-text">
                            <i className="bi bi-person-fill"></i>
                          </div>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Name"
                            name="userName"
                            value={formValue.userName}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="col-12">
                        <label>
                          Email<span className="text-danger">*</span>
                        </label>
                        <div className="input-group">
                          <div className="input-group-text">
                            <i className="bi bi-person-fill"></i>
                          </div>
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Enter email"
                            name="email"
                            value={formValue.email}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="col-12">
                        <label>
                          Password<span className="text-danger">*</span>
                        </label>
                        <div className="input-group">
                          <div className="input-group-text">
                            <i className="bi bi-lock-fill"></i>
                          </div>
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Enter Password"
                            name="password"
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="col-12">
                        <label>
                          Confirm Password<span className="text-danger">*</span>
                        </label>
                        <div className="input-group">
                          <div className="input-group-text">
                            <i className="bi bi-lock-fill"></i>
                          </div>
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Enter Password"
                            name="confirmPassword"
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="col-12">
                        <button
                          type="submit"
                          className="btn btn-primary px-4 float-end mt-4"
                        >
                          Sign Up
                        </button>
                      </div>

                      <div className="col-sm-12">
                        <Link to="/login" className="float-end text-primary">
                          Login!
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-md-5 ps-0 d-none d-md-block">
                  <div className="form-right h-100 bg-primary text-white text-center pt-5">
                    <i className="bi bi-bootstrap"></i>
                    <h2 className="fs-1">Welcome Back!!!</h2>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-end text-secondary mt-3">Login For Tour Blog</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
