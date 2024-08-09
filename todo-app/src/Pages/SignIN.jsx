import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import ForgotPassword from "./ForgotPassword";
import { useAuth } from "../store/Auth";

function SignIn() {
  const { storeToken, baseURL } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${baseURL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const data = await response.json();
        storeToken(data.token);
        navigate("/createtodo");
        setUser({
          email: "",
          password: "",
        });
      } else if (response.status === 404 || response.status === 401) {
        setLoginError(true);
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoginError(true);
    }
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div
        className="navbarnavbar navbar-expand-lg navbar-dark bg-primary "
        style={{ height: "4rem" }}
      >
        <div className="container">
          <NavLink
            className="fs-1 ms-3 p-2 text-light text-decoration-none"
            to="/"
          >
            Todo.
          </NavLink>
        </div>
      </div>
      <section className=" mt-5 ">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-5 col-lg-6 col-xl-4">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="img-fluid"
                alt="Sample image"
              />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1 mt-5">
              <form onSubmit={handleSubmit}>
                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                  <p className="lead fw-normal mb-0 me-3">Sign in with</p>
                  <button
                    type="button"
                    className="btn btn-primary btn-floating mx-1"
                  >
                    <FaFacebookF />
                  </button>

                  <button
                    type="button"
                    className="btn btn-primary btn-floating mx-1"
                  >
                    <FaTwitter />
                  </button>

                  <button
                    type="button"
                    className="btn btn-primary btn-floating mx-1"
                  >
                    <FaLinkedinIn />
                  </button>
                </div>

                <div className="divider d-flex align-items-center my-4">
                  <hr className="w-100" />
                  <p className="text-center fw-bold mx-3 mb-0">Or</p>
                  <hr className="w-100" />
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control form-control-lg"
                    placeholder="Email address"
                    value={user.email}
                    onChange={handleInput}
                    required
                  />
                </div>

                <div className="form-outline mb-3">
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      className="form-control form-control-lg"
                      placeholder="Password"
                      value={user.password}
                      onChange={handleInput}
                      required
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={togglePassword}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                {loginError && (
                  <div className="alert alert-danger" role="alert">
                    Invalid email or password.
                  </div>
                )}

                <div className="d-flex justify-content-between align-items-center mb-4">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                  >
                    Login
                  </button>
                  <NavLink
                    className="text-body"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    Forgot password?
                  </NavLink>
                </div>

                <div className="text-center text-lg-start mt-4 ">
                  <p className="small fw-bold mt-2 pt-1 mb-0">
                    Don't have an account?{" "}
                    <NavLink to="/register" className="link-danger">
                      Register
                    </NavLink>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <ForgotPassword />
    </>
  );
}

export default SignIn;
