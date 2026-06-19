import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const categoriesList = [
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

const AdminActiveComplaints = () => {
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tableLoading, setTableLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Filters State
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');

  // Modal State for viewing full details
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const isInitialMount = useRef(true);

  // Fetch filtered complaints whenever filters change
  useEffect(() => {
    const fetchFilteredComplaints = async () => {
      if (isInitialMount.current) {
        isInitialMount.current = false;
      } else {
        setTableLoading(true);
      }

      try {
        let queryParams = [];
        if (filterCategory) queryParams.push(`category=${encodeURIComponent(filterCategory)}`);
        if (filterStatus) queryParams.push(`status=${filterStatus}`);
        if (filterDate) queryParams.push(`date=${filterDate}`);
        if (sortOrder) queryParams.push(`sort=${sortOrder}`);
        
        const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
        const res = await axios.get(`/api/complaints${queryString}`);
        setFilteredComplaints(res.data);

      } catch (err) {
        console.error('Error fetching filtered list:', err);
        setError('Failed to fetch complaints registry.');
      } finally {
        setTableLoading(false);
        setLoading(false);
      }
    };

    fetchFilteredComplaints();
  }, [filterCategory, filterStatus, filterDate, sortOrder]);

  // Handle status update actions (In Progress, Resolved)
  const handleStatusUpdate = async (id, newStatus) => {
    try {
      setError('');
      await axios.put(`/api/complaints/${id}`, { status: newStatus });
      
      // Update filtered local complaints state
      setFilteredComplaints(prev => 
        prev.map(c => c._id === id ? { ...c, status: newStatus } : c)
      );

      // Update detail modal state if currently open
      if (selectedComplaint && selectedComplaint._id === id) {
        setSelectedComplaint(prev => ({ ...prev, status: newStatus }));
      }
    } catch (err) {
      console.error('Error updating status:', err);
      const errMsg = err.response?.data?.message || 'Failed to update complaint status.';
      setError(errMsg);
    }
  };

  const resetFilters = () => {
    setFilterCategory('');
    setFilterStatus('');
    setFilterDate('');
    setSortOrder('newest');
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
          <span className="visually-hidden">Loading Registry...</span>
        </div>
        <p className="mt-3 text-secondary">Loading Complaints Registry...</p>
      </div>
    );
  }

  return (
    <div className="container py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4 fade-in-up">
        <div>
          <h2 className="fw-bold text-light mb-1">Active Complaints Registry</h2>
          <p className="text-secondary mb-0">Campus Complaint Management & Dispatch Console</p>
        </div>
        <button className="btn btn-outline-light d-flex align-items-center gap-2 px-3 py-2" onClick={resetFilters} style={{ borderRadius: '8px' }}>
          <i className="bi bi-arrow-counterclockwise"></i>
          <span>Clear Filters</span>
        </button>
      </div>

      {error && (
        <div className="alert alert-danger bg-danger bg-opacity-10 text-danger border-0 d-flex align-items-center gap-2 mb-4" role="alert" style={{ borderRadius: '8px' }}>
          <i className="bi bi-exclamation-triangle-fill"></i>
          <div>{error}</div>
        </div>
      )}

      {/* Complaints Listing Table */}
      <div className="row fade-in-up">
        <div className="col-12">
          <div className="card glass-panel">
            <div className="card-body p-4">
              <h5 className="card-title fw-bold mb-4 d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <i className="bi bi-table text-primary me-2"></i>
                  <span className='text-primary'>Complaints Registry</span>
                </div>
                <span className="badge bg-primary bg-opacity-10 text-primary border border-primary border-opacity-10 px-3 py-1 fs-6">
                  {filteredComplaints.length} matched
                </span>
              </h5>

              {/* Filter controls row */}
              <div className="row g-2 mb-4">
                {/* Category filter */}
                <div className="col-6 col-md-3">
                  <label className="text-white small fw-medium mb-1">Category</label>
                  <select
                    className="form-select custom-input  py-2"
                    style={{ fontSize: '0.85rem' }}
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                  >
                    <option value="" >All Categories</option>
                    {categoriesList.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Status filter */}
                <div className="col-6 col-md-3">
                  <label className="text-white small fw-medium mb-1">Status</label>
                  <select
                    className="form-select custom-input py-2"
                    style={{ fontSize: '0.85rem' }}
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option value="">All Statuses</option>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </div>

                {/* Date Filter */}
                <div className="col-6 col-md-3">
                  <label className="text-white small fw-medium mb-1">Date Raised</label>
                  <input
                    type="date"
                    className="form-control custom-input py-2"
                    style={{ fontSize: '0.85rem' }}
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                  />
                </div>

                {/* Sort Order filter */}
                <div className="col-6 col-md-3">
                  <label className="text-white small fw-medium mb-1">Sort By</label>
                  <select
                    className="form-select custom-input py-2"
                    style={{ fontSize: '0.85rem' }}
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                  </select>
                </div>
              </div>

              {/* Table Data */}
              <div className="table-responsive" style={{ maxHeight: '550px', overflowY: 'auto' }}>
                {tableLoading ? (
                  <div className="text-center py-5">
                    <div className="spinner-border text-primary spinner-border-sm" role="status"></div>
                    <span className="ms-2 text-secondary">Filtering data...</span>
                  </div>
                ) : filteredComplaints.length === 0 ? (
                  <div className="text-center py-5 text-secondary">
                    <i className="bi bi-clipboard-x fs-1 mb-2"></i>
                    <p>No complaints match selected criteria.</p>
                  </div>
                ) : (
                  <table className="table custom-table">
                    <thead>
                      <tr className='text-white'>
                        <th>Subject</th>
                        <th>Student</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredComplaints.map(complaint => (
                        <tr key={complaint._id}>
                          <td>
                            <div className="fw-semibold text-secondary text-truncate" style={{ maxWidth: '300px' }}>{complaint.title}</div>
                            <small className="text-secondary d-flex align-items-center gap-1 mt-1">
                              <span>{complaint.category}</span>
                              <span>•</span>
                              <span>{complaint.location}</span>
                            </small>
                          </td>
                          <td>
                            <div className="text-secondary small">{complaint.createdBy?.name || 'Unknown'}</div>
                            <div className="text-secondary" style={{ fontSize: '0.7rem' }}>{complaint.createdBy?.email}</div>
                          </td>
                          <td>
                            <span  className={`status-badge text-secondary ${complaint.status === 'Pending' ? 'pending' : complaint.status === 'In Progress' ? 'inprogress' : 'resolved'}`} style={{ fontSize: '0.65rem' }}>
                              {complaint.status}
                            </span>
                          </td>
                          <td>
                            <div className="d-flex align-items-center gap-2">
                              {/* View detail button */}
                              <button
                                className="btn btn-outline-light btn-sm"
                                title="Inspect Details"
                                style={{ borderRadius: '6px', padding: '0.25rem 0.5rem' }}
                                onClick={() => setSelectedComplaint(complaint)}
                              >
                                <i className="bi bi-eye"></i>
                              </button>

                              {/* Status Action controls */}
                              {complaint.status !== 'Resolved' && (
                                <div className="dropdown">
                                  <button
                                    className="btn btn-outline-primary btn-sm dropdown-toggle"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                    style={{ borderRadius: '6px', padding: '0.25rem 0.5rem' }}
                                  >
                                    Update
                                  </button>
                                  <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-end border border-opacity-10" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-secondary)' }}>
                                    {complaint.status === 'Pending' && (
                                      <li>
                                        <button className="dropdown-item d-flex align-items-center gap-2 small text-info" onClick={() => handleStatusUpdate(complaint._id, 'In Progress')}>
                                          <i className="bi bi-gear-wide-connected"></i>
                                          <span>Start Progress</span>
                                        </button>
                                      </li>
                                    )}
                                    <li>
                                      <button className="dropdown-item d-flex align-items-center gap-2 small text-success" onClick={() => handleStatusUpdate(complaint._id, 'Resolved')}>
                                        <i className="bi bi-check2-all"></i>
                                        <span>Resolve Case</span>
                                      </button>
                                    </li>
                                  </ul>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Complaint Detail Inspection Modal */}
      {selectedComplaint && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)', backdropFilter: 'blur(4px)' }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content glass-panel text-light border border-opacity-20" style={{ borderColor: 'var(--border-color)' }}>
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title fw-bold d-flex align-items-center gap-2 text-light">
                  <i className="bi bi-journal-check text-primary"></i>
                  <span>Complaint Inspection</span>
                </h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setSelectedComplaint(null)}></button>
              </div>
              <div className="modal-body p-4">
                <div className="row g-3">
                  <div className="col-12">
                    <div className="badge bg-secondary bg-opacity-20 text-light border border-secondary border-opacity-10 px-3 py-2 mb-2">
                      {selectedComplaint.category}
                    </div>
                    <h3 className="fw-bold text-light mb-3">{selectedComplaint.title}</h3>
                  </div>

                  <div className="col-md-6">
                    <div className="bg-dark bg-opacity-20 rounded-3 p-3 border border-opacity-10" style={{ borderColor: 'var(--border-color)' }}>
                      <span className="text-secondary small d-block mb-1">STUDENT INFORMATION</span>
                      <div className="fw-semibold text-light">{selectedComplaint.createdBy?.name || 'Unknown'}</div>
                      <div className="text-secondary small">{selectedComplaint.createdBy?.email}</div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="bg-dark bg-opacity-20 rounded-3 p-3 border border-opacity-10" style={{ borderColor: 'var(--border-color)' }}>
                      <span className="text-secondary small d-block mb-1">INCIDENT METADATA</span>
                      <div className="text-light small">
                        <i className="bi bi-geo-alt-fill text-primary me-2"></i>
                        {selectedComplaint.location}
                      </div>
                      <div className="text-light small mt-1">
                        <i className="bi bi-clock-fill text-primary me-2"></i>
                        Filed: {formatDate(selectedComplaint.createdDate)}
                      </div>
                    </div>
                  </div>

                  <div className="col-12">
                    <label className="text-secondary small fw-medium mb-1">COMPLAINT STATEMENT</label>
                    <div className="p-3 bg-dark bg-opacity-30 rounded-3 border border-opacity-5" style={{ minHeight: '100px', whiteSpace: 'pre-wrap', color: 'var(--text-secondary)', borderColor: 'var(--border-color)', fontSize: '0.95rem' }}>
                      {selectedComplaint.description}
                    </div>
                  </div>

                  <div className="col-12 d-flex justify-content-between align-items-center mt-3 pt-3 border-top border-opacity-10" style={{ borderColor: 'var(--border-color)' }}>
                    <div>
                      <span className="text-secondary small me-2">STATUS:</span>
                      <span className={`status-badge ${selectedComplaint.status === 'Pending' ? 'pending' : selectedComplaint.status === 'In Progress' ? 'inprogress' : 'resolved'}`}>
                        {selectedComplaint.status}
                      </span>
                    </div>

                    <div className="d-flex gap-2">
                      {selectedComplaint.status === 'Pending' && (
                        <button
                          className="btn btn-outline-info btn-sm px-3 py-2 d-flex align-items-center gap-1"
                          onClick={() => handleStatusUpdate(selectedComplaint._id, 'In Progress')}
                          style={{ borderRadius: '6px' }}
                        >
                          <i className="bi bi-gear-wide-connected"></i>
                          <span>Start Progress</span>
                        </button>
                      )}
                      {selectedComplaint.status !== 'Resolved' && (
                        <button
                          className="btn btn-success btn-sm px-3 py-2 d-flex align-items-center gap-1"
                          onClick={() => handleStatusUpdate(selectedComplaint._id, 'Resolved')}
                          style={{ borderRadius: '6px' }}
                        >
                          <i className="bi bi-check2-all"></i>
                          <span>Resolve Case</span>
                        </button>
                      )}
                      <button className="btn btn-outline-light btn-sm px-3 py-2" onClick={() => setSelectedComplaint(null)} style={{ borderRadius: '6px' }}>
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminActiveComplaints;