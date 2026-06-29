import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const categories = [
  'Classroom',
  'Laboratory',
  'Hostel',
  'Library',
  'Internet/Wi-Fi',
  'Electrical',
  'Water Supply',
  'Cleanliness',
  'Other'
];

const categoryIcons = {
  'Classroom': 'bi-buildings-fill',
  'Laboratory': 'bi-cpu-fill',
  'Hostel': 'bi-houses-fill',
  'Library': 'bi-book-half',
  'Internet/Wi-Fi': 'bi-wifi',
  'Electrical': 'bi-lightning-charge-fill',
  'Water Supply': 'bi-droplet-fill',
  'Cleanliness': 'bi-trash-fill',
  'Other': 'bi-question-circle-fill'
};

const StudentTrackComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await axios.get('/api/complaints');
        setComplaints(res.data);
      } catch (err) {
        console.error('Error fetching complaints:', err);
        setError('Could not retrieve complaints status. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  // Filter complaints
  const filteredComplaints = complaints.filter((c) => {
    const matchesSearch = 
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter ? c.category === categoryFilter : true;
    const matchesStatus = statusFilter ? c.status === statusFilter : true;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="container py-4">
      {/* Spin Animation Styles injection */}
      <style>{`
        @keyframes local-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .local-spin-animation {
          animation: local-spin 2s linear infinite;
        }
      `}</style>

      {/* Header Panel */}
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4 fade-in-up">
        <div>
          <h2 className="fw-bold text-light mb-1">Complaint Tracking & Status</h2>
          <p className="text-secondary mb-0">Follow real-time updates and lifecycle tracking of your grievances.</p>
        </div>
        <Link to="/student-dashboard" className="btn btn-outline-light px-4 py-2" style={{ borderRadius: '8px' }}>
          <i className="bi bi-arrow-left me-2"></i>
          <span>Portal Dashboard</span>
        </Link>
      </div>

      {error && (
        <div className="alert alert-danger bg-danger bg-opacity-10 text-danger border-0 d-flex align-items-center gap-2 mb-4" role="alert" style={{ borderRadius: '8px' }}>
          <i className="bi bi-exclamation-triangle-fill"></i>
          <div>{error}</div>
        </div>
      )}

      {/* Search & Filters Controls */}
      <div className="card glass-panel mb-4 p-4 fade-in-up">
        <div className="row g-3">
          {/* Search bar */}
          <div className="col-12 col-lg-6">
            <label className="form-label text-secondary small fw-medium">Search Complaints</label>
            <div className="input-group">
              <span className="input-group-text custom-input border-end-0 bg-transparent text-secondary">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control custom-input border-start-0 ps-0"
                placeholder="Search by title or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="col-6 col-lg-3">
            <label className="form-label text-secondary small fw-medium">Category</label>
            <select
              className="form-select custom-input"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="col-6 col-lg-3">
            <label className="form-label text-secondary small fw-medium">Status</label>
            <select
              className="form-select custom-input"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="Pending">Pending Review</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tracker List */}
      <h4 className="fw-bold text-light mb-4 fade-in-up">
        <i className="bi bi-activity text-primary me-2"></i>
        Active Trackers ({filteredComplaints.length})
      </h4>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status" style={{ width: '2.5rem', height: '2.5rem' }}>
            <span className="visually-hidden">Loading status trackers...</span>
          </div>
          <p className="mt-3 text-secondary">Loading complaints tracking...</p>
        </div>
      ) : filteredComplaints.length === 0 ? (
        <div className="card glass-panel text-center p-5 fade-in-up">
          <div className="card-body py-4">
            <div className="d-inline-flex justify-content-center align-items-center bg-primary bg-opacity-10 text-primary rounded-circle mb-4" style={{ width: '80px', height: '80px' }}>
              <i className="bi bi-journal-x fs-2"></i>
            </div>
            <h4 className="fw-bold text-light">No Tracker Results</h4>
            <p className="text-secondary mx-auto col-md-8 mb-0" style={{ fontSize: '0.95rem' }}>
              {complaints.length === 0 
                ? "You have not submitted any complaints to track yet. File a new complaint to start."
                : "No complaints match your filters. Try selecting a different category or status."
              }
            </p>
          </div>
        </div>
      ) : (
        <div className="row fade-in-up">
          <div className="col-12">
            {filteredComplaints.map((c) => {
              const iconClass = categoryIcons[c.category] || 'bi-question-circle-fill';
              
              // Status Styling
              const statusDetails = {
                'Pending': { class: 'pending', label: 'Pending Review' },
                'In Progress': { class: 'inprogress', label: 'In Progress' },
                'Resolved': { class: 'resolved', label: 'Resolved' }
              }[c.status] || { class: 'pending', label: c.status };

              return (
                <div key={c._id} className="card glass-panel mb-4 p-4">
                  <div className="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-3">
                    <span className="badge  bg-opacity-20 text-light border border-secondary border-opacity-20 d-flex align-items-center gap-2 px-3 py-2" style={{ borderRadius: '8px', fontSize: '0.8rem' }}>
                      <i className={`bi ${iconClass} text-primary`}></i>
                      <span>{c.category}</span>
                    </span>
                    <span className={`status-badge ${statusDetails.class}`}>
                      <span>{statusDetails.label}</span>
                    </span>
                  </div>

                  <h4 className="fw-bold text-light mb-2">{c.title}</h4>
                  <p className="text-secondary small mb-3 text-truncate-custom">{c.description}</p>
                  
                  {/* Detailed Timeline Tracker */}
                  <div className="my-3 border-top border-bottom border-opacity-10 py-3" style={{ borderColor: 'var(--border-color)' }}>
                    <div className="position-relative d-flex justify-content-between align-items-center mb-2 mx-auto" style={{ maxWidth: '400px' }}>
                      {/* Connection Line */}
                      <div className="position-absolute start-0 top-50 translate-middle-y w-100 bg-secondary bg-opacity-20" style={{ height: '3px', zIndex: 0 }}></div>
                      
                      {/* Connection Line Progress */}
                      <div 
                        className="position-absolute start-0 top-50 translate-middle-y bg-primary" 
                        style={{ 
                          height: '3px', 
                          width: c.status === 'Pending' ? '0%' : c.status === 'In Progress' ? '50%' : '100%', 
                          zIndex: 0,
                          transition: 'width 0.6s ease'
                        }}
                      ></div>

                      {/* Step 1: Submitted */}
                      <div className="d-flex flex-column align-items-center position-relative" style={{ zIndex: 1, width: '70px' }}>
                        <div 
                          className="rounded-circle d-flex align-items-center justify-content-center border border-2"
                          style={{ 
                            width: '32px', 
                            height: '32px', 
                            backgroundColor: 'var(--bg-primary)',
                            borderColor: 'var(--status-pending)',
                            color: 'var(--status-pending)'
                          }}
                        >
                          <i className="bi bi-check-lg fs-6"></i>
                        </div>
                        <span className="small mt-2 text-center fw-medium text-light" style={{ fontSize: '0.65rem' }}>Submitted</span>
                      </div>

                      {/* Step 2: Under Review / In Progress */}
                      <div className="d-flex flex-column align-items-center position-relative" style={{ zIndex: 1, width: '90px' }}>
                        <div 
                          className={`rounded-circle d-flex align-items-center justify-content-center border border-2 ${c.status === 'In Progress' ? 'local-spin-animation' : ''}`}
                          style={{ 
                            width: '32px', 
                            height: '32px', 
                            backgroundColor: 'var(--bg-primary)',
                            borderColor: c.status === 'Resolved' ? 'var(--status-inprogress)' : c.status === 'In Progress' ? 'var(--status-inprogress)' : 'var(--border-color)',
                            color: c.status === 'Resolved' ? 'var(--status-inprogress)' : c.status === 'In Progress' ? 'var(--status-inprogress)' : 'var(--text-muted)'
                          }}
                        >
                          <i className={`bi ${c.status === 'Resolved' ? 'bi-check-lg' : c.status === 'In Progress' ? 'bi-arrow-repeat' : 'bi-circle'} fs-6`}></i>
                        </div>
                        <span className={`small mt-2 text-center fw-medium ${c.status !== 'Pending' ? 'text-light' : 'text-muted'}`} style={{ fontSize: '0.65rem' }}>In Progress</span>
                      </div>

                      {/* Step 3: Resolved */}
                      <div className="d-flex flex-column align-items-center position-relative" style={{ zIndex: 1, width: '70px' }}>
                        <div 
                          className="rounded-circle d-flex align-items-center justify-content-center border border-2"
                          style={{ 
                            width: '32px', 
                            height: '32px', 
                            backgroundColor: 'var(--bg-primary)',
                            borderColor: c.status === 'Resolved' ? 'var(--status-resolved)' : 'var(--border-color)',
                            color: c.status === 'Resolved' ? 'var(--status-resolved)' : 'var(--text-muted)'
                          }}
                        >
                          <i className={`bi ${c.status === 'Resolved' ? 'bi-check2-all' : 'bi-circle'} fs-6`}></i>
                        </div>
                        <span className={`small mt-2 text-center fw-medium ${c.status === 'Resolved' ? 'text-light' : 'text-muted'}`} style={{ fontSize: '0.65rem' }}>Resolved</span>
                      </div>
                    </div>

                    {/* Status Info Text */}
                    <div className="text-center mt-3">
                      <p className="text-secondary mb-0 small" style={{ fontSize: '0.8rem' }}>
                        {c.status === 'Pending' && (
                          <>
                            <i className="bi bi-clock-history text-warning me-1"></i>
                            Awaiting administration action. Filed on {formatDate(c.createdDate)}.
                          </>
                        )}
                        {c.status === 'In Progress' && (
                          <>
                            <i className="bi bi-info-circle text-primary me-1"></i>
                            Admin has assigned action to resolve the issue.
                          </>
                        )}
                        {c.status === 'Resolved' && (
                          <>
                            <i className="bi bi-check-circle-fill text-success me-1"></i>
                            Issue resolved successfully on {formatDate(c.updatedAt || c.createdDate)}.
                          </>
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="d-flex justify-content-between align-items-center small text-muted" style={{ fontSize: '0.75rem' }}>
                    <span>Location: {c.location}</span>
                    <span>ID: #{c._id.substring(c._id.length - 8)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentTrackComplaints;
