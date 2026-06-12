import React from "react";
import { Link } from "react-router-dom";
import CategoryChart from "../components/CategoryChart";

const StudentDashboard = () => {
  // Dummy Data Start
  const user = {
    name: "Gokul",
  };
  // const error="this is dummy error"
  const error = null;
  const stats = { total: 3, pending: 2, resolved: 1 };
  //Complaints dummy data
  const complaints = [
  {
    id: 1,
    title: "Projector not working",
    category: "Classroom",
    status: "Pending"
  },
  {
    id: 2,
    title: "Broken classroom chair",
    category: "Classroom",
    status: "Resolved"
  },
  {
    id: 3,
    title: "Computer system failure",
    category: "Laboratory",
    status: "Pending"
  },
  {
    id: 4,
    title: "AC not working in lab",
    category: "Laboratory",
    status: "In Progress"
  },
  {
    id: 5,
    title: "Water leakage in hostel",
    category: "Hostel",
    status: "Pending"
  },
  {
    id: 6,
    title: "Hostel room light issue",
    category: "Hostel",
    status: "Resolved"
  },
  {
    id: 7,
    title: "Books not available",
    category: "Library",
    status: "Pending"
  },
  {
    id: 8,
    title: "Library fan not working",
    category: "Library",
    status: "Resolved"
  },
  {
    id: 9,
    title: "Slow Wi-Fi connection",
    category: "Internet/Wi-Fi",
    status: "In Progress"
  },
  {
    id: 10,
    title: "No internet in block A",
    category: "Internet/Wi-Fi",
    status: "Pending"
  },
  {
    id: 11,
    title: "Power outage in corridor",
    category: "Electrical",
    status: "Pending"
  },
  {
    id: 12,
    title: "Switch board damaged",
    category: "Electrical",
    status: "Resolved"
  },
  {
    id: 13,
    title: "No water in washroom",
    category: "Water Supply",
    status: "Pending"
  },
  {
    id: 14,
    title: "Dirty classroom",
    category: "Cleanliness",
    status: "In Progress"
  },
  {
    id: 15,
    title: "Garbage not cleaned",
    category: "Cleanliness",
    status: "Pending"
  },
  {
    id: 16,
    title: "Miscellaneous complaint",
    category: "Other",
    status: "Pending"
  }
];
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
      <div>
        <CategoryChart complaints={complaints}/>
      </div>
    </div>
  );
};

export default StudentDashboard;
