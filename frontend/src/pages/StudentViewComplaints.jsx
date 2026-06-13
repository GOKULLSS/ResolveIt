import { useState } from 'react';
import ComplaintCard from '../components/ComplaintCard';

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

const StudentViewComplaints = () => {

  const [complaints, setComplaints] = useState([
    {
      _id: 'CMP001',
      title: 'Classroom Fan Not Working',
      category: 'Classroom',
      description: 'The ceiling fan in Room 204 is not functioning properly.',
      location: 'Block A - Room 204',
      status: 'Pending',
      createdDate: '2025-06-10'
    },
    {
      _id: 'CMP002',
      title: 'Wi-Fi Connectivity Issue',
      category: 'Internet/Wi-Fi',
      description: 'Internet connection is very slow in hostel.',
      location: 'Boys Hostel',
      status: 'In Progress',
      createdDate: '2025-06-08'
    },
    {
      _id: 'CMP003',
      title: 'Water Leakage',
      category: 'Water Supply',
      description: 'Water leakage near washroom area.',
      location: 'Academic Block',
      status: 'Resolved',
      createdDate: '2025-06-05'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const handleDelete = (id) => {
    if (window.confirm('Delete this complaint?')) {
      setComplaints(
        complaints.filter((item) => item._id !== id)
      );
    }
  };

  const filteredComplaints = complaints.filter((complaint) => {

    const matchesSearch =
      complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === ''
        ? true
        : complaint.category === categoryFilter;

    const matchesStatus =
      statusFilter === ''
        ? true
        : complaint.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="container py-4">

      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4 fade-in-up">
        <div>
          <h2 className="fw-bold text-light mb-1">
            My Complaints Registry
          </h2>

          <p className="text-secondary mb-0">
            View, search, edit or delete your complaints.
          </p>
        </div>

        <button className="btn btn-primary-gradient px-4 py-3 d-flex align-items-center gap-2">
          <i className="bi bi-plus-circle-fill"></i>
          <span>File New Complaint</span>
        </button>
      </div>

      <div className="card glass-panel mb-4 p-4 fade-in-up">
        <div className="row g-3">

          <div className="col-12 col-lg-6">
            <label className="form-label text-secondary small fw-medium">
              Search Complaints
            </label>

            <input
              type="text"
              className="form-control custom-input"
              placeholder="Search complaints..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
            />
          </div>

          <div className="col-6 col-lg-3">
            <label className="form-label text-secondary small fw-medium">
              Category
            </label>

            <select
              className="form-select custom-input"
              value={categoryFilter}
              onChange={(e) =>
                setCategoryFilter(e.target.value)
              }
            >
              <option value="">All Categories</option>

              {categories.map((cat) => (
                <option key={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="col-6 col-lg-3">
            <label className="form-label text-secondary small fw-medium">
              Status
            </label>

            <select
              className="form-select custom-input"
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
            >
              <option value="">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>

        </div>
      </div>

      <h4 className="fw-bold text-light mb-4">
        <i className="bi bi-list-task text-primary me-2"></i>
        Results ({filteredComplaints.length})
      </h4>

      {filteredComplaints.length === 0 ? (

        <div className="card glass-panel text-center p-5">
          <h4 className="text-light">
            No Complaints Found
          </h4>
        </div>

      ) : (

        filteredComplaints.map((complaint) => (
          <ComplaintCard
            key={complaint._id}
            complaint={complaint}
            onDelete={handleDelete}
          />
        ))

      )}

    </div>
  );
};

export default StudentViewComplaints;