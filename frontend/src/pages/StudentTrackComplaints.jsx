import { useState } from 'react';
import { Link } from 'react-router-dom';

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
  'Classroom': 'bi-chalkboard-fill',
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
  const [complaints] = useState([
  {
    _id: "CMP001",
    title: "Fan Not Working",
    description: "Fan in classroom is damaged",
    category: "Classroom",
    status: "Pending",
    location: "Room 101",
    createdDate: "2026-06-12"
  },
  {
    _id: "CMP002",
    title: "WiFi Issue",
    description: "Internet is slow",
    category: "Internet/Wi-Fi",
    status: "In Progress",
    location: "Library",
    createdDate: "2026-06-10"
  },
  {
    _id: "CMP003",
    title: "Water Leakage",
    description: "Leakage in hostel bathroom",
    category: "Hostel",
    status: "Resolved",
    location: "Hostel A",
    createdDate: "2026-06-08"
  }
]);

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

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

      <h4 className="fw-bold text-light mb-4 fade-in-up">
        <i className="bi bi-activity text-primary me-2"></i>
        Active Trackers ({filteredComplaints.length})
      </h4>

      {filteredComplaints.length === 0 ? (
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
          <div className="col-12 col-lg-9">
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
                    <span className="badge bg-secondary bg-opacity-20 text-light border border-secondary border-opacity-20 d-flex align-items-center gap-2 px-3 py-2" style={{ borderRadius: '8px', fontSize: '0.8rem' }}>
                      <i className={`bi ${iconClass} text-primary`}></i>
                      <span>{c.category}</span>
                    </span>
                    <span className={`status-badge ${statusDetails.class}`}>
                      <span>{statusDetails.label}</span>
                    </span>
                  </div>

                  <h4 className="fw-bold text-light mb-2">{c.title}</h4>
                  <p className="text-light small mb-3 text-truncate-custom">{c.description}</p>
                  
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
                            borderColor: 'var(--status-resolved)',
                            color: 'var(--status-resolved)'
                          }}
                        >
                          <i className="bi bi-check-lg fs-6"></i>
                        </div>
                        <span className="small mt-2 text-center fw-medium text-light" style={{ fontSize: '0.65rem' }}>Submitted</span>
                      </div>

                      {/* Step 2: Under Review / In Progress */}
                      <div className="d-flex flex-column align-items-center position-relative" style={{ zIndex: 1, width: '90px' }}>
                        <div 
                          style={{ 
                            width: '32px', 
                            height: '32px', 
                            backgroundColor: 'var(--bg-primary)',
                            borderColor: c.status === 'Resolved' ? 'var(--status-resolved)' : c.status === 'In Progress' ? 'var(--status-inprogress)' : 'var(--border-color)',
                            color: c.status === 'Resolved' ? 'var(--status-resolved)' : c.status === 'In Progress' ? 'var(--status-inprogress)' : 'var(--text-muted)'
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

                  <div className="d-flex justify-content-between align-items-center small text-light" style={{ fontSize: '0.75rem' }}>
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

export default StudentTrackComplaints