import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import logo from "../assets/logo.png";
const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark custom-navbar sticky-top ">
      <div className="container">
        <Link
          className="navbar-brand d-flex align-items-center fw-bold fs-4"
          to={
            user
              ? user.role === "Admin"
                ? "/admin-dashboard"
                : "/student-dashboard"
              : "/login"
          }
        >
          <img src={logo} alt="ResolveIt Logo" className="me-2 navbar-logo" />

          <h4 className="mb-0 fw-bold brand-text">
            <span className="brand-resolve">Resolve</span>
            <span className="brand-it">It</span>
          </h4>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
            {user && user.role === "Student" && (
              <>
                <li className="nav-item">
                  <Link className="nav-link px-3" to="/student-dashboard">
                    <i className="bi bi-speedometer2 me-1"></i> Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link px-3" to="/submit-complaint">
                    <i className="bi bi-plus-circle me-1"></i> File Complaint
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link px-3" to="/view-complaints">
                    <i className="bi bi-journal-text me-1"></i> View Complaint
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link px-3" to="/complaint-status">
                    <i className="bi bi-activity me-1"></i> Complaint Status
                  </Link>
                </li>
              </>
            )}

            {user && user.role === "Admin" && (
              <>
                <li className="nav-item ">
                  <Link className=" nav-link" to="/admin-dashboard">
                    <i className="bi bi-grid-1x2-fill me-1"></i> Admin Dashboard
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
                </div>
                <Link
                  to="/profile"
                  className="btn  btn-sm d-flex align-items-center gap-2 px-3 py-2 text-white shine"
                  style={{
                    borderRadius: "8px",
                    transition: "all 0.2s",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    background: "rgba(212, 191, 191, 0.05)",
                  }}
                >
                  <i className="bi bi-person-circle"></i>
                  <span>Profile</span>
                </Link>
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
                  className="btn btn-primary btn-sm px-3 py-2"
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
