import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { CREATE_APPLICATION } from "../graphql/mutation";
import "../styles/form.css";

export default function ApplicationForm() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = () => {
      window.history.pushState(null, "", window.location.href);
    };
  }, []);

  const [form, setForm] = useState({
    businessName: "",
    businessType: "",
    state: "",
    revenue: "",
    experience: "",
    coverageLimit: "",
    deductible: "",
    riskLevel: "", // ✅ IMPORTANT: empty for validation
  });

  const [result, setResult] = useState(null);

  const [createApplication, { loading }] = useMutation(CREATE_APPLICATION, {
    onCompleted: (data) => setResult(data.createApplication),
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ REQUIRED FIELD VALIDATION
  const isFormValid =
    form.revenue &&
    form.experience &&
    form.coverageLimit &&
    form.deductible &&
    form.riskLevel;

  const handleSubmit = () => {
    // ✅ SAFETY GUARD (important)
    if (!isFormValid || loading) return;

    createApplication({
      variables: {
        input: {
          ...form,
          revenue: Number(form.revenue),
          experience: Number(form.experience),
          coverageLimit: Number(form.coverageLimit),
          deductible: Number(form.deductible),
        },
      },
    });
  };

  return (
    <div className="apply-wrapper">
      {/* ===== TITLE ===== */}
      <div className="stepper">
        <div className="step">
          <p>Insurance Application</p>
        </div>
      </div>

      {/* ===== FORM ===== */}
      <div className="form-card">
        <div className="form-group">
          <label>Business Name</label>
          <input name="businessName" onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Business Type</label>
          <input name="businessType" onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>State</label>
          <input name="state" onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>
            Annual Revenue <span className="required">*</span>
          </label>
          <input name="revenue" type="number" onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>
            Years of Experience <span className="required">*</span>
          </label>
          <input name="experience" type="number" onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>
            Coverage Limit <span className="required">*</span>
          </label>
          <input name="coverageLimit" type="number" onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>
            Deductible <span className="required">*</span>
          </label>
          <input name="deductible" type="number" onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>
            Risk Level <span className="required">*</span>
          </label>
          <select name="riskLevel" onChange={handleChange}>
            <option value="">Select Risk Level</option>
            <option value="LOW">Low Risk</option>
            <option value="MEDIUM">Medium Risk</option>
            <option value="HIGH">High Risk</option>
          </select>
        </div>

        {!isFormValid && (
          <p className="form-hint">
            Please fill all required fields to calculate premium.
          </p>
        )}

        <button
          className="primary-btn"
          onClick={handleSubmit}
          disabled={loading || !isFormValid}
        >
          {loading ? "Calculating..." : "Calculate Premium"}
        </button>

        {result && (
          <div className="result-box">
            <h3>Premium Summary</h3>
            <p>
              <b>Business:</b> {result.businessName}
            </p>
            <p>
              <b>Base Premium:</b> ₹{result.basePremium}
            </p>
            <p>
              <b>Final Premium:</b> ₹{result.finalPremium}
            </p>
          </div>
        )}
      </div>

      {/* ===== LOGOUT ===== */}
      <div className="apply-footer">
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
