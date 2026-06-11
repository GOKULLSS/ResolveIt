import React from "react";
import { Link } from "react-router-dom";

const StudentDashboard = () => {
  // Dummy Data Start
  const user = {
    name: "Gokul",
  };
  // const error="this is dummy error"
  const error = null;
  const stats = { total: 3, pending: 2, resolved: 1 };
  // Dummy Data End
  return (
    <div className="container py-5 ">
      <div className="d-flex justify-content-between align-items-center flex-wrap ">
        <div>
          <h1 className="fw-bold text-light ">StudentDashboard</h1>
          <p className="text-secondary fw-medium">
            Logedin as : <span className="text-primary">{user?.name}</span>
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
          <div className="card  glass-panel h-100 p-5 mt-2"style={{ fontSize: '0.8rem', letterSpacing: '0.5px' }}>
            <div className="d-flex align-items-center justify-content-between">
              <div >
                <h3 className="text-danger fw-semibold text-uppercase mb-3">Total <br/>Raised</h3>
                <h1 className="text-white">{stats.total}</h1>
              </div>
              <div className="bg-primary bg-opacity-10 text-danger p-3 rounded-4">
                <i className="bi bi-list-stars fs-3"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="card  glass-panel h-100 p-5 mt-2"style={{ fontSize: '0.8rem', letterSpacing: '0.5px' }}>
            <div className="d-flex align-items-center justify-content-between">
              <div >
                <h3 className="text-primary fw-semibold text-uppercase mb-3">PENDING<br/> REVIEW</h3>
                <h1 className="text-white">{stats.pending}</h1>
              </div>
              <div className="bg-primary bg-opacity-10 text-primary p-3 rounded-4">
                <i className="bi bi-hourglass-split fs-3"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="card  glass-panel h-100  p-5 mt-2"style={{ fontSize: '0.8rem', letterSpacing: '0.5px' }}>
            <div className="d-flex align-items-center justify-content-between">
              <div >
                <h3 className="text-success fw-semibold text-uppercase mb-3">RESOLVED <br/>CASES</h3>
                <h1 className="text-white">{stats.resolved}</h1>
              </div>
              <div className="bg-primary bg-opacity-10 text-success p-3 rounded-4">
                <i className="bi bi-check2-square fs-3"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
