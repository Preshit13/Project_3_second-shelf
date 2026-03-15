import { useState } from "react";
import { useNavigate } from "react-router";
import { loginUser } from "../../api/auth";
import "./Login.css";

function Login({ onLogin }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
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

    try {
      const data = await loginUser(formData);
      onLogin(data.user);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main className="auth-page">
      <h1>Login</h1>

      <form className="auth-form" onSubmit={handleSubmit}>
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

        <button type="submit">Login</button>
      </form>

      {error ? <p>{error}</p> : null}
    </main>
  );
}

export default Login;