import { useEffect, useState } from 'react';
import ComplaintCard from '../components/ComplaintCard';
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

const StudentViewComplaints = () => {

  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Search and Filter State
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
        setError('Could not retrieve complaints list. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this complaint? This action cannot be undone.')) {
      return;
    }

    try {
      setError('');
      await axios.delete(`/api/complaints/${id}`);
      // Filter out deleted item
      setComplaints(complaints.filter((c) => c._id !== id));
    } catch (err) {
      console.error('Error deleting complaint:', err);
      const errorMsg = err.response?.data?.message || 'Failed to delete complaint. Please try again.';
      setError(errorMsg);
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