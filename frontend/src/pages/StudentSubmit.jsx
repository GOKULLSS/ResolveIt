import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';



const categories = [
  'Classroom',
  'Laboratory',
  'Hostel',
  'Library',
  'Internet/WI-FI',
  'Electrical',
  'Water Supply',
  'Cleanliness',
  'Other'
];
// 1. DUMMY DATA FOR TESTING
// ==========================================
const dummyComplaints = [
  {
    id: '1',
    title: 'Broken fan in Room 102',
    category: 'Electrical',
    description: 'The ceiling fan in Room 102 makes a loud buzzing noise and rotates very slowly.',
    location: 'Block A, 1st floor, Room 102',
    status: 'Pending'
  },
  {
    id: '2',
    title: 'Water leakage in main bathroom',
    category: 'Water Supply',
    description: 'The flush tap in the ground floor washroom keeps running constantly.',
    location: 'Hostel Block C, Ground floor',
    status: 'Pending'
  },
  {
    id: '3',
    title: 'No internet connection',
    category: 'Internet/WI-FI',
    description: 'WiFi is connected but throws DNS errors since this morning.',
    location: 'Library, 2nd floor',
    status: 'Under Review' // Used to test the "cannot edit if under review/resolved" block
  }
];

const StudentSubmit = () => {
  const { id } = useParams();
  const isEditMode = !!id;
  const Navigate = useNavigate();

  const [title,setTitle] = useState('');
  const [category,setCategory] = useState(categories[0]);
  const [description,setDescription] = useState('');
  const [location,setLocation] = useState('');

  const [loading,setLoading] = useState(false);
  const [fetchLoading,setFetchLoading] = useState(false);
  const [error,setError] = useState('');

  useEffect(() => {
    if (isEditMode) {
      const fetchComplainDetail = async () => {
        try {
          setFetchLoading(true);
          setError('');
          //const res = await axios.get('/api/complaints');
          //const complaint = res.data.find((c) => c.id === id);
           
 const complaint = dummyComplaints.find((c) => c.id === id);


          if (!complaint){
            setError('Complaint not found or you do not have permission to edit it.');
            return;
          }

          if (complaint.status !== 'Pending') {
            setError('This complaint is already under review or resolved and cannot be edited.');
            return;
          }

          setTitle(complaint.title);
          setCategory(complaint.category);
          setDescription(complaint.description);
          setLocation(complaint.location);
        } catch (err) {
          console.error('Error fetching complaint detail:',err);
          setError('Failed to load complaint data for editing.');
        } finally{
          setFetchLoading(false);
        }
       };
       
       fetchComplaintDetail();
      }
    }, [id,isEditMode]);
     
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError('');

      if (!title.trim() || !category || !description.trim() || !location.trim()) {
        setError('Please fill in all the required files from fields.');
        return;
      }
     
      setLoading(true);
      try {
        const payload = { title,category,description,location };
        // if(isEditMode) {
        //   await axios.put(`/api/complaints/${id}`, payload);
        // } else {
        //   await axios.post('/api/complaints', payload);
        // }
        Navigate('/view-complaints');
      } catch (err) {
        console.log('Submission Error:', err);
        const errorMsg = err.response?.data?.message || 'Error processing request.please try again.';
        setError(errorMsg);
      } finally {
        setLoading(false);
      }
      } ;
      
      if (fetchLoading) {
        return (
          <div className="container py-5 text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden"> Loading data...</span>
            </div>
            <p className="mt-3 text-secondary"> Loading details for edit...</p>
          </div>
          );
          }

       return (
        <div className="container py-5 d-flex justify-content-center">
          <div className="col-12 col-md-10 col-lg-8 fade-in-up">
            {/* Breadcrumbs */}
            <div className="mb-4">
              <Link to="/view-complaints" className="text-secondary text-decoration-none small d-inline-flex align-items-center gap-1 hovr-underline">
              <i className="bi bi-chevron-left"></i>
              <span>Back to Complaints</span>
               
              </Link>
              </div>
              {/*card PANEL */}
              <div className="card glass-panel p-4 p-md-5">
                <h2 className="fw-bold text-light mb-2">
                  {isEditMode ? (
                    <>
                    <i className="bi bi-pencil-square text-primary me-2"></i>
                    Edit Complaint
                    </>
                  ) : (
                    <>
                    <i className="bi bi-file-earmark-plus text-primary me-2"></i>
                    Submit Campus Complaint
                    </>
                    )}
                    </h2>
                    <p className="text-secondary mb-4">
                      {isEditMode
                      ? 'Update the description,category or location details of your pending complaint.'
                      : 'Provide accurate details below to register your grievence.The administration will inspect it.'
                       }
                       </p>

                       {error && (
                        <div className="alert alert-danger bg-danger bg-opacity-10 text-danger border-0 d-flex align-items-center gap-2 mb-4" role="alert" style={{ borderRadius: '8px' }}>
                          <i className="bi bi-exclamation-triangle-fill"></i>
                          <div>{error}</div>
                          </div>
                           )}

                   {/* Form */}
                   {(!isEditMode || (isEditMode && title)) && (
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-12 col-md-8 mb-3">
                          <label htmlFor="title" className="form-label text-secondary small fw-medium">Complaint Title *</label>
                          <input
                          type="text"
                          className="form-control custom-input"
                          id="title"
                          placeholder="Brief summary of the issue"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          disabled={loading}
                          maxLength="80"
                          required
                          />
                        </div>

                        <div className="col-12 col-md-4 mb-3">
                          <label htmlFor="category" className="form-label text-secondary small fw-medium">Issue Category *</label>
                          <select
                          className="form-select custom-input"
                          id="category"
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          disabled={loading}
                          required
                          >
                            {categories.map((cat) => (
                              <option key={cat} value={cat}>
                                {cat}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="mb-3">
                        <label htmlFor="location" className="form-label text-secondary small fw-medium">Exact Location *</label>
                        <input
                         type="text"
                        className="form-control custom-input"
                        id="location"
                        placeholder="e.g., Block A, 2nd floor, Room 204"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        disabled={loading}
                        maxLength="100"
                        required
                        />
                      </div>

                      <div className="mb-4">
                        <label htmlFor="description" className="form-label text-secondary small fw-medium"> Detailed Description *</label>
                        <textarea
                        className="form-contro custom-input"
                        id="description"
                        rows="6"
                        placeholder="Elaborate on the issue,how long it has been occuring,and any other relevent context..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        disabled={loading}
                        required
                        ></textarea>
                      </div>

                      <div className="d-flex justify-content-end gap-3 boarder-top boarder-opacity-10 pt-4" style={{borderColor: 'var(--border-color)' }}>
                        <Link to="/view-complaints" className="btn btn-outline-light px-4 py-2" style={{ borderRadius: '8px' }}>
                        Cancel
                        </Link>
                        <button
                        type="submit"
                        className="btn btn-primary-gradient px-5 py-2 d-flex align-items-center gap-2 fw-semibold"
                        disabled={loading}
                        >
                          {loading ? (
                            <>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> 
                            <span>Submitting...</span>
                            </>
                            ) : (
                              <>
                              <span>{isEditMode ? 'Save Changes' : 'File Complaint'}</span>
                              <i className="bi bi-send-fill"></i>
                              </>
                            )}
                            </button>
                            </div>
                            </form>
                              )} 
                              </div>
                              </div>
                              </div>
       );
      };

      export default StudentSubmit
                              
            