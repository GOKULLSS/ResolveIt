import React from 'react'
import { Link } from "react-router-dom";
import CategoryChart from '../components/CategoryChart';


const AdminDashboard = () => {
  // Dummy Data Start

  // const error="this is dummy error"
  const error = null;
  const stats = {
    total: 20,
    pending: 10,
    inprogress: 6,
    resolved: 4
  }
  const allComplaints = [
  {
    id: 1,
    title: "Projector not working",
    category: "Classroom",
    status: "Pending"
  },
 
  {
    id: 2,
    title: "AC not working in lab",
    category: "Laboratory",
    status: "In Progress"
  },
  {
    id: 3,
    title: "Water leakage in hostel",
    category: "Hostel",
    status: "Pending"
  },
  {
    id: 4,
    title: "Hostel room light issue",
    category: "Hostel",
    status: "Resolved"
  },

  {
    id: 5,
    title: "Slow Wi-Fi connection",
    category: "Internet/Wi-Fi",
    status: "In Progress"
  },
  {
    id: 6,
    title: "No internet in block A",
    category: "Internet/Wi-Fi",
    status: "Pending"
  },
  {
    id: 7,
    title: "Power outage in corridor",
    category: "Electrical",
    status: "Pending"
  },
  {
    id: 8,
    title: "Switch board damaged",
    category: "Electrical",
    status: "Resolved"
  },
  {
    id: 9,
    title: "Power outage in corridor",
    category: "Electrical",
    status: "Pending"
  },
  {
    id: 10,
    title: "Switch board damaged",
    category: "Electrical",
    status: "Resolved"
  },
  {
    id: 11,
    title: "Dirty classroom",
    category: "Cleanliness",
    status: "In Progress"
  },
  {
    id: 12,
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