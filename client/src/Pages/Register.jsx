import React, { useState } from "react";
import "../styles/form.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [input, setInput] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    //make sure the input has name like name="email"
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if(!input.username || !input.email || !input.password) {
        setError("Error! All inputs required");
        return;
      }
  
      if(input.password.length < 5) {
        setError("Weak password. Need atleast 5 characters")
        return;
      }

      await axios.post("http://localhost:4000/api/auth/register",input);
      navigate("/login")
    } catch (error) {
      setError(error.response.data);
    }

  };

  return (
    <div className="form_container">
      <h2>REGISTER</h2>
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
          <label htmlFor="email">Email</label>
          <input
            required
            type="email"
            id="email"
            name="email"
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
        <button onClick={handleSubmit} className="form_btn" type="submit">
          REGISTER
        </button>
        {error && <p className="form__error-message">{error}</p>}
        <span id="form__footer">
          <div>
          You have an account? <Link to="/login">Login</Link>
          </div>
          <div>
            Go back home <Link to="/"><i className="fa-solid fa-house"/></Link>
          </div>
        </span>
      </form>
    </div>
  );
};

export default Register;
