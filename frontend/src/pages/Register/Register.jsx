import { useState } from "react";
import { useNavigate } from "react-router";
import { registerUser } from "../../api/auth";
import "./Register.css";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setMessage("");

    try {
      await registerUser(formData);
      setMessage("Registration successful");
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main className="auth-page">
      <h1>Register</h1>

      <form className="auth-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Create Account</button>
      </form>

      {message ? <p>{message}</p> : null}
      {error ? <p>{error}</p> : null}
    </main>
  );
}

export default Register;