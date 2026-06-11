import React from "react";
import { Link } from "react-router-dom";

const StudentDashboard = () => {
  const user={
    name:"Gokul"

  }
  return (
    <div className="container py-5 ">
      <div className="d-flex justify-content-between align-items-center flex-wrap ">
        <div>
          <h1 className="fw-bold text-light ">StudentDashboard</h1>
          <p className="text-secondary fw-medium">Logedin as : <span className="text-primary">{user?.name}</span></p>
        </div>
        <Link to='/submit-complaint' className="btn btn-primary px-5 py-3 d-flex align-items-center gap-2"><i className="bi bi-plus-circle"></i>File New Complaint</Link>
      </div>
    </div>
  );
};

export default StudentDashboard;
