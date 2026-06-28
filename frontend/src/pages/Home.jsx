import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const { user, loading } = useContext(AuthContext);

  // Dynamic button target and label depending on user login state
  const renderCTAButton = () => {
    if (loading) {
      return (
        <button className="btn btn-primary-gradient px-4 py-3 fw-semibold d-inline-flex align-items-center gap-2" disabled>
          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          <span>Checking session...</span>
        </button>
      );
    }

    if (user) {
      const targetPath = user.role === 'Admin' ? '/admin-dashboard' : '/student-dashboard';
      return (
        <Link to={targetPath} className="btn btn-primary px-4 py-3 fw-semibold d-inline-flex align-items-center gap-2">
          <span>Go to Dashboard</span>
          <i className="bi bi-speedometer2"></i>
        </Link>
      );
    }

    return (
      <Link to="/login" className="btn btn-primary px-4 py-3 fw-semibold d-inline-flex align-items-center gap-2">
        <span>Get Started</span>
        <i className="bi bi-arrow-right"></i>
      </Link>
    );
  };

  return (
    <div className="container py-5">
      {/* Hero Section */}
      <div className="row align-items-center justify-content-center text-center py-5 fade-in-up">
        <div className="col-lg-9 col-xl-8">
          <div className="d-inline-flex align-items-center gap-2 bg-primary bg-opacity-10 border border-primary border-opacity-20 px-3 py-2 rounded-pill text-primary mb-4" style={{ fontSize: '0.9rem' }}>
            <span className="badge bg-primary rounded-pill">NEW</span>
            <span className="fw-medium">Enhancing Campus Accountability & Trust</span>
          </div>
          
          <h1 className="display-4 fw-extrabold text-light mb-4" style={{ letterSpacing: '-0.5px' }}>
            Voice Your Concerns.<br />
            <span className="bg-gradient bg-clip-text text-transparent" style={{ backgroundImage: 'var(--accent-gradient)', WebkitBackgroundClip: 'text' }}>
              Transform Campus Life.
            </span>
          </h1>
          
          <p className="lead text-secondary mb-5 px-md-5" style={{ fontSize: '1.15rem', lineHeight: '1.7' }}>
            A modern, transparent, and responsive platform designed to bridge the gap between students and college administration. Report issues, track resolutions in real-time, and make your campus a better place.
          </p>
          
          <div className="d-flex justify-content-center gap-3">
            {renderCTAButton()}
            {!user && (
              <Link to="/register" className="btn btn-outline-light px-4 py-3 fw-semibold" style={{ borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.15)', background: 'rgba(255, 255, 255, 0.05)', transition: 'all 0.2s' }}>
                Create Account
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Stats Counter Section */}
      <div className="row g-4 justify-content-center mb-5 fade-in-up" style={{ animationDelay: '0.1s' }}>
        <div className="col-12 col-md-10">
          <div className="card glass-panel p-4">
            <div className="row g-4 text-center">
              <div className="col-6 col-lg-3 border-end border-white border-opacity-10 border-end-sm-none">
                <h3 className="fw-bold text-light mb-1">98%</h3>
                <span className="text-secondary small fw-medium">Resolution Rate</span>
              </div>
              <div className="col-6 col-lg-3 border-lg-end border-white border-opacity-10 border-end-sm-none">
                <h3 className="fw-bold text-light mb-1">&lt; 24h</h3>
                <span className="text-secondary small fw-medium">Response Time</span>
              </div>
              <div className="col-6 col-lg-3 border-end border-white border-opacity-10 border-end-sm-none">
                <h3 className="fw-bold text-light mb-1">30+</h3>
                <span className="text-secondary small fw-medium">Issues Solved</span>
              </div>
              <div className="col-6 col-lg-3">
                <h3 className="fw-bold text-light mb-1">Active</h3>
                <span className="text-secondary small fw-medium">Student Moderation</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-5 fade-in-up" style={{ animationDelay: '0.2s' }}>
        <div className="text-center mb-5">
          <h2 className="fw-bold text-light">Key Platform Features</h2>
          <p className="text-secondary">Simplifying how grievances are communicated, routed, and resolved.</p>
        </div>

        <div className="row g-4">
          <div className="col-md-6 col-lg-3">
            <div className="card glass-panel metric-card primary h-100 p-4">
              <div className="d-inline-flex align-items-center justify-content-center bg-primary bg-opacity-10 text-primary rounded-3 mb-3" style={{ width: '48px', height: '48px' }}>
                <i className="bi bi-file-earmark-plus fs-4"></i>
              </div>
              <h5 className="fw-bold text-light mb-2">Instant Submission</h5>
              <p className="text-secondary small mb-0">File grievances easily with categories (e.g., Hostel, Academic, Infrastructure), detailed descriptions, and urgency levels.</p>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="card glass-panel metric-card inprogress h-100 p-4">
              <div className="d-inline-flex align-items-center justify-content-center bg-info bg-opacity-10 text-info rounded-3 mb-3" style={{ width: '48px', height: '48px' }}>
                <i className="bi bi-activity fs-4"></i>
              </div>
              <h5 className="fw-bold text-light mb-2">Real-time Track</h5>
              <p className="text-secondary small mb-0">Track status progression in real-time as your complaints move from Pending to In Progress, and finally to Resolved status.</p>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="card glass-panel metric-card resolved h-100 p-4">
              <div className="d-inline-flex align-items-center justify-content-center bg-success bg-opacity-10 text-success rounded-3 mb-3" style={{ width: '48px', height: '48px' }}>
                <i className="bi bi-patch-check fs-4"></i>
              </div>
              <h5 className="fw-bold text-light mb-2">Direct Resolution</h5>
              <p className="text-secondary small mb-0">Direct escalation to campus administrators ensures accountability and prevents complaints from getting lost.</p>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="card glass-panel metric-card pending h-100 p-4">
              <div className="d-inline-flex align-items-center justify-content-center bg-warning bg-opacity-10 text-warning rounded-3 mb-3" style={{ width: '48px', height: '48px' }}>
                <i className="bi bi-bar-chart fs-4"></i>
              </div>
              <h5 className="fw-bold text-light mb-2">Insightful Analytics</h5>
              <p className="text-secondary small mb-0">Interactive dashboards provide administrators with category breakdown analytics to address recurring campus issues proactively.</p>
            </div>
          </div>
        </div>
      </div>

      {/* How it Works Section */}
      <div className="py-5 mb-4 fade-in-up" style={{ animationDelay: '0.3s' }}>
        <div className="text-center mb-5">
          <h2 className="fw-bold text-light">How It Works</h2>
          <p className="text-secondary">A transparent 3-step cycle to address campus concerns.</p>
        </div>

        <div className="row g-4 justify-content-center">
          <div className="col-lg-4 text-center">
            <div className="px-4">
              <div className="d-inline-flex align-items-center justify-content-center bg-primary bg-opacity-10 border border-primary border-opacity-20 text-primary rounded-circle mb-3 fw-bold fs-4" style={{ width: '60px', height: '60px' }}>
                1
              </div>
              <h5 className="fw-bold text-light mb-2">Submit Complaint</h5>
              <p className="text-secondary small">Students register or log in, describe the issue, specify category, and submit the complaint form.</p>
            </div>
          </div>

          <div className="col-lg-4 text-center">
            <div className="px-4">
              <div className="d-inline-flex align-items-center justify-content-center bg-primary bg-opacity-10 border border-primary border-opacity-20 text-primary rounded-circle mb-3 fw-bold fs-4" style={{ width: '60px', height: '60px' }}>
                2
              </div>
              <h5 className="fw-bold text-light mb-2">Admin Evaluation</h5>
              <p className="text-secondary small">Campus administrators review the details, update status to "In Progress", and assign resolve teams.</p>
            </div>
          </div>

          <div className="col-lg-4 text-center">
            <div className="px-4">
              <div className="d-inline-flex align-items-center justify-content-center bg-primary bg-opacity-10 border border-primary border-opacity-20 text-primary rounded-circle mb-3 fw-bold fs-4" style={{ width: '60px', height: '60px' }}>
                3
              </div>
              <h5 className="fw-bold text-light mb-2">Issue Resolved</h5>
              <p className="text-secondary small">Admins document resolution comments, mark complaint as "Resolved", and students get immediate updates.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
