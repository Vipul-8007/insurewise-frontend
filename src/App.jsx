import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ApplicationForm from "./pages/ApplicationForm";

/* ✅ PRIVATE ROUTE (Protected pages) */
const PrivateRoute = ({ children }) => {
  return localStorage.getItem("token") ? children : <Navigate to="/login" />;
};

/* ✅ PUBLIC ROUTE (Login/Register) */
const PublicRoute = ({ children }) => {
  return localStorage.getItem("token") ? (
    <Navigate to="/dashboard" />
  ) : (
    children
  );
};

export default function App() {
  console.log("GRAPHQL URI =", import.meta.env.VITE_GRAPHQL_URI);

  return (
    <Routes>
      {/* Default */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* ✅ Public pages (cannot access after login) */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />

      {/* ✅ Private pages (cannot access without login) */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/apply"
        element={
          <PrivateRoute>
            <ApplicationForm />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
