import React, { useContext, useState } from "react";
import "../styles/form.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../contextApi/authContext";

const Login = () => {
  const [input, setInput] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const naviagte = useNavigate();
  const { login } = useContext(AuthContext);

  const handleInputChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (!input.username || !input.password) {
        setError("Error! All inputs are required");
        return;
      }
      if (input.password.length < 5) {
        setError("Error! password Need atleast 5 characters");
        return;
      }

      await login(input);
      naviagte("/");
    } catch (error) {
      setError(error.response.data);
    }
  };

  return (
    <div className="form_container">
      <h2>LOGIN</h2>
      <form id="form">
        <div className="input_wrapper">
          <label htmlFor="username">Username</label>
          <input
            required
            type="text"
            id="username"
            name="username"
            onChange={handleInputChange}
          />
        </div>
        <div className="input_wrapper">
          <label htmlFor="password">Password</label>
          <input
            required
            type="password"
            id="password"
            name="password"
            onChange={handleInputChange}
          />
        </div>
        <button className="form_btn" type="submit" onClick={handleLoginSubmit}>
          Login
        </button>
        {error && <p className="form__error-message">{error}</p>}
        <span id="form__footer">
          <div>
            Don't have an account? <Link to="/register">Register</Link>
          </div>
          <div>
            Go back home <Link to="/"><i className="fa-solid fa-house"/></Link>
          </div>
        </span>
      </form>
    </div>
  );
};

export default Login;
