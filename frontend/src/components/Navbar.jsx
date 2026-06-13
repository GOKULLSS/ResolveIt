import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  //   const { user, logout } = useContext(AuthContext);

  // const user = {
   // name: "Gokul",
   //  role: "Admin",
  // };
  const user = {
   name: "Gokulzz",
   role: "Student",
  };
  //  const user = null;

  const navigate = useNavigate();

  const handleLogout = () => {
    // logout();
    navigate("/login");
  };
  return (
    <nav class="navbar navbar-expand-lg navbar-dark custom-navbar sticky-top ">
      <div className="container">
        
          <Link className="navbar-brand d-flex align-items-center fw-bold fs-4" to={user ? (user.role === 'Admin' ? '/admin-dashboard' : '/student-dashboard') : '/login'}>
          <i className="bi bi-shield-exclamation text-primary me-2 fs-3"></i>
          <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text">ResolveIt</span>
        </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
              {user && user.role === "Student" && (
                <>
                  <li class="nav-item">
                    <Link className="nav-link px-3" to="/student-dashboard">
                      <i className="bi bi-speedometer2 me-1"></i> Dashboard
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link className="nav-link px-3" to="/submit-complaint">
                      <i className="bi bi-plus-circle me-1"></i> File Complaint
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link className="nav-link px-3" to="/view-complaints">
                      <i className="bi bi-journal-text me-1"></i> View Complaint
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link className="nav-link px-3" to="/complaint-status">
                      <i className="bi bi-activity me-1"></i> Complaint Status
                    </Link>
                  </li>
                </>
              )}

              {user && user.role === "Admin" && (
                <>
                  <li class="nav-item ">
                    <Link className=" nav-link" to="/admin-dashboard">
                      <i className="bi bi-grid-1x2-fill me-1"></i> Admin
                      Dashboard
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link px-3" to="/active-complaints">
                      <i className="bi bi-journal-text me-1"></i> Active
                      Complaints
                    </Link>
                  </li>
                </>
              )}
            </ul>
            <div className="d-flex align-items-center">
              {user ? (
              <div className="d-flex align-items-center gap-3">
                <div className="d-none d-md-block text-end">
                  <div className="text-light fw-medium small">{user.name}</div>
                  <span
                    className={`badge rounded-pill  'bg-danger bg-opacity-25 text-danger border border-danger border-opacity-50' px-2 py-1`}
                    style={{ fontSize: "0.65rem" }}
                  >
                    {user.role}
                    student
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="btn btn-outline-danger btn-sm d-flex align-items-center gap-2 px-3 py-2"
                  style={{ borderRadius: "8px", transition: "all 0.2s" }}
                >
                  <i className="bi bi-box-arrow-right"></i>
                  <span>Logout</span>
                </button>
              </div>
              ) : (
              <div className="d-flex gap-2">
                <Link
                  to="/login"
                  className="btn btn-outline-light btn-sm px-3 py-2"
                  style={{ borderRadius: "8px" }}
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="btn btn-primary-gradient btn-sm px-3 py-2"
                >
                  Register
                </Link>
              </div>
              )} 
            </div>
          </div>
        </div>
      
    </nav>
  );
};

export default Navbar;
