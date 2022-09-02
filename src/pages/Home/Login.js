import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.scss";

const Login = () => {
  return (
    <div
      className="background"
      style={{ backgroundImage: 'url("images/bg.png")' }}
    >
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <div class="center">
              <img src="/images/logo.png" className="loginLogo" />
            </div>
            <div className="form-group mt-3">
              <label>Username</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Enter username"
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
              />
            </div>
            <div className="d-grid mt-1">
              <p className="forgot-password text-right mt-1">
                <a href="#">Forgot password?</a>
              </p>
            </div>
            <div className="login-btn">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;