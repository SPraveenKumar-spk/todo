import { useState } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { useAuth } from "../store/Auth";

function Signup() {
  const { storeToken, baseURL } = useAuth();
  console.log(baseURL);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${baseURL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        const data = await response.json();

        storeToken(data.token);
        setUser({
          name: "",
          email: "",
          password: "",
        });
        navigate("/login");
      } else if (response.status === 401) {
        setLoginError(true);
      }
    } catch (error) {
      console.log(error);
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
      <section className="mt-5">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div
                className="card text-black pb-3"
                style={{ borderRadius: "25px" }}
              >
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <h1 className="text-center fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      Sign up
                    </h1>

                    <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                      <div className="mb-4">
                        <div className="input-group">
                          <span className="input-group-text">
                            <FaUser className="fa-lg me-3" />
                          </span>
                          <input
                            type="text"
                            id="form3Example1c"
                            name="name"
                            className="fs-5 form-control"
                            value={user.name}
                            onChange={handleInput}
                            placeholder=" Your Name"
                            required
                          />
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="input-group">
                          <span className="input-group-text">
                            <FaEnvelope className="fa-lg me-3" />
                          </span>
                          <input
                            type="email"
                            id="form3Example3c"
                            name="email"
                            className="fs-5 form-control"
                            value={user.email}
                            onChange={handleInput}
                            placeholder="Your Email"
                            required
                          />
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="input-group">
                          <span className="input-group-text">
                            <FaLock className="fa-lg me-3" />
                          </span>
                          <input
                            type={showPassword ? "text" : "password"}
                            id="form3Example4c"
                            name="password"
                            className="fs-5 form-control"
                            value={user.password}
                            onChange={handleInput}
                            placeholder="Your Password"
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
                          Email already exists.
                        </div>
                      )}

                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button
                          type="submit"
                          className="btn btn-primary btn-lg"
                        >
                          Register
                        </button>
                      </div>
                      <p className="text-center text-muted mt-4 mb-0">
                        Have already an account?{" "}
                        <NavLink to="/login" className="fw-bold text-body">
                          <u>Login here</u>
                        </NavLink>
                      </p>
                    </form>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                      className="img-fluid"
                      alt="Sample image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Signup;
