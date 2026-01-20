import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "../styles/dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();

  // ✅ Prevent going back to login/register without logout
  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = () => {
      window.history.pushState(null, "", window.location.href);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="dashboard-page">
      <h2 className="dashboard-title">Welcome to InsureWise</h2>
      <p className="dashboard-subtitle">
        Apply for insurance and calculate premium in a few simple steps.
      </p>

      <div className="info-single">
        <h3>Start New Application</h3>
        <p>
          Fill basic business details and get your insurance premium instantly.
        </p>
      </div>

      <button className="primary-btn" onClick={() => navigate("/apply")}>
        Apply for Insurance
      </button>

      <div className="dashboard-footer">
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
