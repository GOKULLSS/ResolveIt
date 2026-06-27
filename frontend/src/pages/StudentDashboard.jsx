import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CategoryChart from "../components/CategoryChart";
import AuthContext from "../context/AuthContext";
import axios from "axios";

const StudentDashboard = () => {
  const { user } = useContext(AuthContext);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [stats, setStats] = useState({ total: 0, pending: 0, resolved: 0 });

  const calculateStats = (data) => {
    const total = data.length;
    const pending = data.filter((c) => c.status === "Pending").length;
    const resolved = data.filter((c) => c.status === "Resolved").length;
    setStats({ total, pending, resolved });
  };

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await axios.get("/api/complaints");
        setComplaints(res.data);
        calculateStats(res.data);
      } catch (err) {
        console.error("Error fetching complaints:", err);
        setError("Could not retrieve complaints list. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  return (
    <div className="container py-5 fade-in-up ">
      <div className="d-flex justify-content-between align-items-center flex-wrap ">
        <div>
          <h1 className="dashboard-title">Student Dashboard</h1>

          <p className="dashboard-subtitle">
            Welcome back,
            <span className="user-name"> {user?.name}</span>
          </p>
        </div>
        <Link
          to="/submit-complaint"
          className="btn btn-primary px-5 py-3 d-flex align-items-center gap-2"
        >
          <i className="bi bi-plus-circle"></i>File New Complaint
        </Link>
      </div>
      {error && (
        <div
          className="alert alert-danger bg-danger bg-opacity-10 text-danger border-0 d-flex align-items-center gap-2 mb-4"
          role="alert"
          style={{ borderRadius: "8px" }}
        >
          <i className="bi bi-exclamation-triangle-fill"></i>
          <div>{error}</div>
        </div>
      )}
      <div className="row g-4 mb-5 ">
        <div className="col-12 col-md-4">
          <div
            className="card  glass-panel h-100 p-5 mt-2"
            style={{ fontSize: "0.8rem", letterSpacing: "0.5px" }}
          >
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <h3 className="text-danger fw-semibold text-uppercase mb-3">
                  Total <br />
                  Raised
                </h3>
                <h1 className="text-white">{stats.total}</h1>
              </div>
              <div className="bg-primary bg-opacity-10 text-danger p-3 rounded-4">
                <i className="bi bi-list-stars fs-3"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div
            className="card  glass-panel h-100 p-5 mt-2"
            style={{ fontSize: "0.8rem", letterSpacing: "0.5px" }}
          >
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <h3 className="text-primary fw-semibold text-uppercase mb-3">
                  PENDING
                  <br /> REVIEW
                </h3>
                <h1 className="text-white">{stats.pending}</h1>
              </div>
              <div className="bg-primary bg-opacity-10 text-primary p-3 rounded-4">
                <i className="bi bi-hourglass-split fs-3"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div
            className="card  glass-panel h-100  p-5 mt-2"
            style={{ fontSize: "0.8rem", letterSpacing: "0.5px" }}
          >
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <h3 className="text-success fw-semibold text-uppercase mb-3">
                  RESOLVED <br />
                  CASES
                </h3>
                <h1 className="text-white">{stats.resolved}</h1>
              </div>
              <div className="bg-primary bg-opacity-10 text-success p-3 rounded-4">
                <i className="bi bi-check2-square fs-3"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <CategoryChart complaints={complaints} />
      </div>
    </div>
  );
};

export default StudentDashboard;
