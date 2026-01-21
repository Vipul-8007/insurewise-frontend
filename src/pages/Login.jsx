import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "../styles/auth.css";

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errorMsg, setErrorMsg] = useState(""); // ✅ ERROR STATE
  const navigate = useNavigate();

  const [login, { loading }] = useMutation(LOGIN, {
    onCompleted: (data) => {
      localStorage.setItem("token", data.login.token);
      navigate("/dashboard");
    },
    onError: () => {
      setErrorMsg("Invalid email or password");
    },
  });

  const handleLogin = () => {
    setErrorMsg(""); // clear old error
    login({ variables: form });
  };

  return (
    <>
      <Header />
      <div className="auth-page">
        <div className="auth-card">
          <div className="auth-tabs">
            <button className="active">Login</button>
            <Link to="/register">Register</Link>
          </div>

          <h2>Login Form</h2>

          <input
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          {errorMsg && <p className="error-text">{errorMsg}</p>}

          <button
            className="primary-btn"
            disabled={loading}
            onClick={handleLogin}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="auth-footer">
            Create Account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </>
  );
}
