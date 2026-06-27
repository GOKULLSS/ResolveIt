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
      <div className="row g-4 mb-5 mt-2 ">
        <div className="col-12 col-md-4 ">
          <div className="glass-panel stat-card">
            <div className="stat-icon danger">
              <i className="bi bi-list-stars"></i>
            </div>

            <div className="stat-content">
              <span>Total Raised</span>
              <h2>{stats.total}</h2>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4 ">
          <div className="glass-panel stat-card">
            <div className="stat-icon primary">
              <i className="bi bi-hourglass"></i>
            </div>

            <div className="stat-content">
              <span>PENDING REVIEW</span>
              <h2>{stats.pending}</h2>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4 ">
          <div className="glass-panel stat-card">
            <div className="stat-icon  success">
              <i className="bi bi-check2-square"></i>
            </div>

            <div className="stat-content">
              <span>RESOLVED CASES</span>
              <h2>{stats.resolved}</h2>
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
