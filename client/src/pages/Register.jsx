import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/authApi";
import "../styles/auth.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/register", formData);

      alert("Registration Successful");

      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

 return (
  <div className="auth-container">
    <div className="auth-card">
      <h1>Register</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <button type="submit">
          Register
        </button>
      </form>

      <p>
        Already have an account?{" "}
        <Link to="/">
          Login
        </Link>
      </p>
    </div>
  </div>
);
    
}

export default Register;