import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import CategoryChart from '../components/CategoryChart';
import axios from 'axios';


const AdminDashboard = () => {
  // Unfiltered complaints for overall metrics and charts
  const [allComplaints, setAllComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Overall counts for metric cards
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inprogress: 0,
    resolved: 0
  });

  // Fetch overall unfiltered complaints for metrics and chart
  const fetchOverallStats = async () => {
    try {
      const res = await axios.get('/api/complaints');
      setAllComplaints(res.data);
      
      const total = res.data.length;
      const pending = res.data.filter(c => c.status === 'Pending').length;
      const inprogress = res.data.filter(c => c.status === 'In Progress').length;
      const resolved = res.data.filter(c => c.status === 'Resolved').length;
      
      setStats({ total, pending, inprogress, resolved });
    } catch (err) {
      console.error('Error fetching stats:', err);
      setError('Failed to fetch dashboard metrics.');
    }
  };

  // Load everything on startup
  useEffect(() => {
    const loadDashboard = async () => {
      setLoading(true);
      await fetchOverallStats();
      setLoading(false);
    };
    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
          <span className="visually-hidden">Loading Dashboard...</span>
        </div>
        <p className="mt-3 text-secondary">Loading CCMS Admin Dashboard...</p>
      </div>
    );
  }
  return (
    <div className="container py-5 ">
      <div className="d-flex justify-content-between align-items-center flex-wrap ">
        <div>
          <h1 className="fw-bold text-light ">Admin Control Center</h1>
          <p className="text-secondary fw-medium">
            Campus Complaint Management & Dispatch Console
          </p>
        </div>
        <Link
          to="/active-complaints"
          className="btn btn-primary px-5 py-3 d-flex align-items-center gap-2"
        >
          <i className="bi bi-journal-text"></i>Active Complaints
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
        <div className="col-12 col-md-3">
          <div className="card  glass-panel h-100 p-5 mt-2"style={{ fontSize: '0.8rem', letterSpacing: '0.5px' }}>
            <div className="d-flex align-items-center justify-content-between">
              <div >
                <h3 className="text-danger fw-semibold text-uppercase mb-3 " style={{fontSize:"1.2rem"}}>Total Cases</h3>
                <h1 className="text-white">{stats.total}</h1>
              </div>
              <div className="bg-primary bg-opacity-10 text-danger p-3 rounded-4">
                <i className="bi bi-list-stars fs-3"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-3">
          <div className="card  glass-panel h-100 p-5 mt-2"style={{ fontSize: '0.8rem', letterSpacing: '0.5px' }}>
            <div className="d-flex align-items-center justify-content-between">
              <div >
                <h3 className="text-warning fw-semibold text-uppercase mb-3">Pending<br/></h3>
                <h1 className="text-white">{stats.pending}</h1>
              </div>
              <div className="bg-primary bg-opacity-10 text-warning p-3 rounded-4">
                <i className="bi bi-clock-history fs-3"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-3">
          <div className="card  glass-panel h-100  p-5 mt-2"style={{ fontSize: '0.8rem', letterSpacing: '0.5px' }}>
            <div className="d-flex align-items-center justify-content-between">
              <div >
                <h3 className="text-primary fw-semibold text-uppercase mb-3">In Progress</h3>
                <h1 className="text-white">{stats.inprogress}</h1>
              </div>
              <div className="bg-primary bg-opacity-10 text-primary p-3 rounded-4">
                <i className="bi bi-hourglass-split fs-3"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-3">
          <div className="card  glass-panel h-100  p-5 mt-2"style={{ fontSize: '0.8rem', letterSpacing: '0.5px' }}>
            <div className="d-flex align-items-center justify-content-between">
              <div >
                <h3 className="text-success fw-semibold text-uppercase mb-3">Resolved</h3>
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
        <CategoryChart complaints={allComplaints}/>
      </div>
    </div>
  )
}

export default AdminDashboard