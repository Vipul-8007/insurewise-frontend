import { useMutation, gql } from "@apollo/client";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "../styles/auth.css";

const REGISTER = gql`
  mutation Register($name: String!, $email: String!, $password: String!) {
    register(name: $name, email: $email, password: $password) {
      token
    }
  }
`;

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const [register, { loading }] = useMutation(REGISTER, {
    onCompleted: () => {
      navigate("/login");
    },
    onError: () => {
      setErrorMsg("Registration failed. Please try again.");
    },
  });

  const handleSignup = () => {
    setErrorMsg("");

    // ✅ Mandatory check
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setErrorMsg("All fields are mandatory");
      return;
    }

    // ✅ Password match check
    if (form.password !== form.confirmPassword) {
      setErrorMsg("Passwords do not match");
      return;
    }

    register({
      variables: {
        name: form.name,
        email: form.email,
        password: form.password,
      },
    });
  };

  return (
    <>
      <Header />
      <div className="auth-page">
        <div className="auth-card">
          <div className="auth-tabs">
            <Link to="/login">Login</Link>
            <button className="active">Register</button>
          </div>

          <h2>Register Form</h2>

          <label>
            Name <span className="required">*</span>
          </label>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <label>
            Email <span className="required">*</span>
          </label>
          <input
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <label>
            Password <span className="required">*</span>
          </label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <label>
            Confirm Password <span className="required">*</span>
          </label>
          <input
            type="password"
            value={form.confirmPassword}
            onChange={(e) =>
              setForm({ ...form, confirmPassword: e.target.value })
            }
          />

          {errorMsg && <p className="error-text">{errorMsg}</p>}

          <button
            className="primary-btn"
            disabled={loading}
            onClick={handleSignup}
          >
            {loading ? "Registering..." : "Register"}
          </button>

          <p className="auth-footer">
            Existing User? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </>
  );
}
